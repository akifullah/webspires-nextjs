'use client';

import { useState, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Trash2, Copy, Check, FileText, Film, File } from 'lucide-react';
import { deleteMediaAction } from '@/app/actions/media';

const IMAGE_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg'];
const VIDEO_EXT = ['mp4', 'webm'];

function extOf(name = '') {
    const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
    return m ? m[1] : '';
}

function humanSize(bytes) {
    if (!bytes) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let n = bytes;
    let i = 0;
    while (n >= 1024 && i < units.length - 1) {
        n /= 1024;
        i += 1;
    }
    return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

function MediaCard({ item, onDeleted }) {
    const [copied, setCopied] = useState(false);
    const [pending, startTransition] = useTransition();
    const ext = extOf(item.name);
    const isImage = IMAGE_EXT.includes(ext);
    const isVideo = VIDEO_EXT.includes(ext);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(item.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            /* ignore */
        }
    };

    const remove = () => {
        if (!window.confirm(`Delete “${item.name}”? This cannot be undone.`))
            return;
        startTransition(async () => {
            const res = await deleteMediaAction(item.key);
            if (res?.error) window.alert(res.error);
            else onDeleted();
        });
    };

    return (
        <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex h-32 items-center justify-center bg-slate-50">
                {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.url}
                        alt={item.name}
                        className="h-full w-full object-contain"
                    />
                ) : isVideo ? (
                    <Film size={30} className="text-slate-400" />
                ) : ext === 'pdf' ? (
                    <FileText size={30} className="text-slate-400" />
                ) : (
                    <File size={30} className="text-slate-400" />
                )}
            </div>

            <div className="p-2.5">
                <p
                    className="truncate text-xs font-semibold text-slate-700"
                    title={item.name}
                >
                    {item.name}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                    {humanSize(item.size)}
                </p>

                <div className="mt-2 flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={copy}
                        className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 px-2 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied' : 'Copy URL'}
                    </button>
                    <button
                        type="button"
                        onClick={remove}
                        disabled={pending}
                        title="Delete"
                        className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                        <Trash2 size={13} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MediaManager({ items, error }) {
    const router = useRouter();
    const inputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState('');

    if (error === 'not-configured') {
        return (
            <div>
                <h1 className="mb-2 text-2xl font-extrabold text-slate-900">
                    Media
                </h1>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
                    <p className="font-semibold">
                        Cloudflare R2 storage is not configured yet.
                    </p>
                    <p className="mt-2">
                        Add these environment variables (locally in{' '}
                        <code>.env.local</code>, on Vercel in Project Settings →
                        Environment Variables), then redeploy:
                    </p>
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-white/70 p-3 text-xs text-slate-700">{`R2_ACCOUNT_ID=cd15ad0da57162f7271e52faac2dda55
R2_ACCESS_KEY_ID=<your R2 access key id>
R2_SECRET_ACCESS_KEY=<your R2 secret access key>
R2_BUCKET=webspires
R2_PREFIX=own/
R2_PUBLIC_BASE_URL=https://uploads.webspires.co.uk`}</pre>
                </div>
            </div>
        );
    }

    const onFiles = async (e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = '';
        if (!files.length) return;
        setUploadErr('');
        setUploading(true);
        try {
            for (const file of files) {
                const fd = new FormData();
                fd.append('file', file);
                const res = await fetch('/api/admin/media', {
                    method: 'POST',
                    body: fd,
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Upload failed');
            }
            router.refresh();
        } catch (e2) {
            setUploadErr(e2.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        Media
                    </h1>
                    <p className="text-sm text-slate-500">
                        {items.length}{' '}
                        {items.length === 1 ? 'file' : 'files'} · stored in
                        Cloudflare R2
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
                >
                    <Upload size={16} />
                    {uploading ? 'Uploading…' : 'Upload files'}
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    hidden
                    accept="image/*,application/pdf,video/mp4,video/webm"
                    onChange={onFiles}
                />
            </div>

            {uploadErr && (
                <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {uploadErr}
                </p>
            )}
            {error && error !== 'not-configured' && (
                <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Could not load media: {error}
                </p>
            )}

            {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <Upload size={30} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-500">No media yet.</p>
                    <p className="mt-1 text-sm text-slate-400">
                        Upload images, PDFs or videos to your R2 bucket.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {items.map((item) => (
                        <MediaCard
                            key={item.key}
                            item={item}
                            onDeleted={() => router.refresh()}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
