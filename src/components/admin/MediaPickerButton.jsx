'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Image as ImageIcon,
    Check,
    X,
    Upload,
    Loader2,
} from 'lucide-react';

const IMAGE_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg'];

function isImageName(name = '') {
    const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
    return Boolean(m && IMAGE_EXT.includes(m[1]));
}

function MediaPickerModal({ multiple, onClose, onConfirm }) {
    const [items, setItems] = useState(null); // null = loading
    const [selected, setSelected] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState('');

    const load = useCallback(async () => {
        setErr('');
        try {
            const res = await fetch('/api/admin/media');
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to load media');
            setItems((data.items || []).filter((i) => isImageName(i.name)));
        } catch (e) {
            setErr(e.message);
            setItems([]);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    const toggle = (url) => {
        setSelected((prev) => {
            if (multiple) {
                return prev.includes(url)
                    ? prev.filter((u) => u !== url)
                    : [...prev, url];
            }
            return prev.includes(url) ? [] : [url];
        });
    };

    const onUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = '';
        if (!files.length) return;
        setUploading(true);
        setErr('');
        try {
            for (const file of files) {
                const fd = new FormData();
                fd.append('file', file);
                // eslint-disable-next-line no-await-in-loop
                const res = await fetch('/api/admin/media', {
                    method: 'POST',
                    body: fd,
                });
                // eslint-disable-next-line no-await-in-loop
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Upload failed');
            }
            await load();
        } catch (e2) {
            setErr(e2.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute inset-0 h-full w-full cursor-default bg-black/50"
            />
            <div className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-lg font-extrabold text-slate-900">
                        Select {multiple ? 'images' : 'an image'}
                    </h2>
                    <div className="flex items-center gap-2">
                        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                            <Upload size={14} />
                            {uploading ? 'Uploading…' : 'Upload'}
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                hidden
                                disabled={uploading}
                                onChange={onUpload}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="min-h-[200px] flex-1 overflow-y-auto p-5">
                    {err && (
                        <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {err}
                        </p>
                    )}
                    {items === null ? (
                        <div className="flex h-40 items-center justify-center text-slate-400">
                            <Loader2 className="animate-spin" size={24} />
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex h-40 flex-col items-center justify-center text-center text-slate-400">
                            <ImageIcon size={28} className="mb-2" />
                            <p className="text-sm">
                                No images yet. Click “Upload” to add some.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                            {items.map((it) => {
                                const isSel = selected.includes(it.url);
                                return (
                                    <button
                                        type="button"
                                        key={it.key}
                                        onClick={() => toggle(it.url)}
                                        title={it.name}
                                        className={`group relative aspect-square overflow-hidden rounded-lg border-2 bg-slate-50 ${
                                            isSel
                                                ? 'border-primary'
                                                : 'border-transparent hover:border-slate-300'
                                        }`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={it.url}
                                            alt={it.name}
                                            className="h-full w-full object-cover"
                                        />
                                        {isSel && (
                                            <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                                                <Check size={12} />
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                    <span className="text-sm text-slate-500">
                        {selected.length} selected
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={!selected.length}
                            onClick={() => onConfirm(selected)}
                            className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
                        >
                            {multiple
                                ? `Add selected${
                                      selected.length
                                          ? ` (${selected.length})`
                                          : ''
                                  }`
                                : 'Select'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Button that opens the media library in a popup and returns the chosen
 * image URL(s) via onSelect(urls: string[]).
 */
export default function MediaPickerButton({
    multiple = false,
    onSelect,
    label = 'Choose from Media',
    className = '',
    icon = null,
    title = '',
}) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                title={title || label || 'Choose from media'}
                aria-label={title || label || 'Choose from media'}
                className={
                    className ||
                    'inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50'
                }
            >
                {icon || <ImageIcon size={15} />}
                {label ? <span>{label}</span> : null}
            </button>
            {open && (
                <MediaPickerModal
                    multiple={multiple}
                    onClose={() => setOpen(false)}
                    onConfirm={(urls) => {
                        if (urls?.length) onSelect(urls);
                        setOpen(false);
                    }}
                />
            )}
        </>
    );
}
