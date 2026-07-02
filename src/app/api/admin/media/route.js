import { NextResponse } from 'next/server';
import { getAdminOrNull } from '@/lib/auth';
import { uploadToR2, isR2Configured, listR2Media } from '@/lib/r2';

export const runtime = 'nodejs';

// List media (used by the "Choose from Media" picker).
export async function GET() {
    const admin = await getAdminOrNull();
    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!isR2Configured()) {
        return NextResponse.json({ items: [], configured: false });
    }
    try {
        const items = await listR2Media();
        return NextResponse.json({ items, configured: true });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB
const ALLOWED = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
};

export async function POST(request) {
    const admin = await getAdminOrNull();
    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!isR2Configured()) {
        return NextResponse.json(
            { error: 'R2 storage is not configured on the server.' },
            { status: 500 }
        );
    }

    let formData;
    try {
        formData = await request.formData();
    } catch {
        return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const file = formData.get('file');
    if (!file || typeof file === 'string') {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const ext = ALLOWED[file.type];
    if (!ext) {
        return NextResponse.json(
            { error: `Unsupported file type: ${file.type || 'unknown'}` },
            { status: 415 }
        );
    }

    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > MAX_BYTES) {
        return NextResponse.json(
            { error: 'File too large (max 50 MB)' },
            { status: 413 }
        );
    }

    try {
        const { url, key } = await uploadToR2({
            buffer: Buffer.from(bytes),
            contentType: file.type,
            ext,
            originalName: file.name,
        });
        return NextResponse.json({ url, key });
    } catch (err) {
        return NextResponse.json(
            { error: `Upload failed: ${err.message}` },
            { status: 500 }
        );
    }
}
