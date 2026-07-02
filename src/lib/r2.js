import 'server-only';
import crypto from 'node:crypto';
import {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';

/*
 * Cloudflare R2 (S3-compatible) client for the admin Media library.
 * All media is stored under the `own/` prefix in the `webspires` bucket and
 * served publicly through the custom domain (uploads.webspires.co.uk).
 *
 * Required env (see .env.local / Vercel):
 *   R2_ACCOUNT_ID           e.g. cd15ad0da57162f7271e52faac2dda55
 *   R2_ACCESS_KEY_ID        from an R2 API token (Object Read & Write)
 *   R2_SECRET_ACCESS_KEY    from that same token  (SECRET — server only)
 *   R2_BUCKET               webspires
 *   R2_PREFIX               own/            (optional, defaults to own/)
 *   R2_PUBLIC_BASE_URL      https://uploads.webspires.co.uk
 */

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET = process.env.R2_BUCKET || 'webspires';

// Normalise the folder prefix to `something/` (no leading slash, one trailing).
const PREFIX = (() => {
    let p = (process.env.R2_PREFIX || 'own/').replace(/^\/+/, '');
    if (p && !p.endsWith('/')) p += '/';
    return p;
})();

const PUBLIC_BASE = (
    process.env.R2_PUBLIC_BASE_URL || 'https://uploads.webspires.co.uk'
).replace(/\/$/, '');

let cached = global._r2;
if (!cached) cached = global._r2 = { client: null };

export function isR2Configured() {
    return Boolean(ACCOUNT_ID && ACCESS_KEY_ID && SECRET_ACCESS_KEY && BUCKET);
}

function getR2() {
    if (!isR2Configured()) {
        throw new Error(
            'R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and ' +
                'R2_SECRET_ACCESS_KEY (and R2_BUCKET) in your environment.'
        );
    }
    if (cached.client) return cached.client;
    cached.client = new S3Client({
        region: 'auto',
        endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
        },
    });
    return cached.client;
}

/** Public URL for a stored object key (served via the custom domain). */
export function r2PublicUrl(key) {
    return `${PUBLIC_BASE}/${key}`;
}

/** Upload a buffer and return { key, url }. */
export async function uploadToR2({ buffer, contentType, ext }) {
    const client = getR2();
    const name = `${Date.now()}-${crypto
        .randomBytes(6)
        .toString('hex')}.${ext}`;
    const key = `${PREFIX}${name}`;
    await client.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        })
    );
    return { key, url: r2PublicUrl(key) };
}

/** List everything under the media prefix, newest first. */
export async function listR2Media() {
    const client = getR2();
    const out = [];
    let ContinuationToken;
    do {
        const res = await client.send(
            new ListObjectsV2Command({
                Bucket: BUCKET,
                Prefix: PREFIX,
                ContinuationToken,
                MaxKeys: 1000,
            })
        );
        for (const o of res.Contents || []) {
            if (!o.Key || o.Key.endsWith('/')) continue; // skip folder markers
            out.push({
                key: o.Key,
                name: o.Key.slice(PREFIX.length),
                url: r2PublicUrl(o.Key),
                size: o.Size || 0,
                uploaded: o.LastModified
                    ? new Date(o.LastModified).toISOString()
                    : null,
            });
        }
        ContinuationToken = res.IsTruncated
            ? res.NextContinuationToken
            : undefined;
    } while (ContinuationToken);

    out.sort((a, b) => (b.uploaded || '').localeCompare(a.uploaded || ''));
    return out;
}

/** Delete one object. Guarded so only keys under our prefix can be removed. */
export async function deleteR2Object(key) {
    if (!key || !key.startsWith(PREFIX)) return;
    const client = getR2();
    await client.send(
        new DeleteObjectCommand({ Bucket: BUCKET, Key: key })
    );
}
