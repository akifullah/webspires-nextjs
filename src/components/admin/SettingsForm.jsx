'use client';

import { useState, useRef, useActionState } from 'react';
import { Upload, Trash2, CheckCircle2, ChevronDown } from 'lucide-react';
import { saveSettings } from '@/app/actions/settings';
import { SETTINGS_SECTIONS, SOCIAL_PLATFORMS } from '@/lib/settingsSchema';

const inputCls =
    'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

function Field({ label, hint, children }) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                {label}
            </label>
            {children}
            {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
        </div>
    );
}

/* Image field: upload to /api/admin/upload or paste a URL, with a small preview. */
function ImageField({ value, onChange }) {
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState('');
    const inputRef = useRef(null);

    const onFile = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        setErr('');
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: fd,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');
            onChange(data.url);
        } catch (e2) {
            setErr(e2.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-3">
                {value ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={value}
                        alt="Preview"
                        className="h-12 w-12 shrink-0 rounded-lg border border-slate-200 bg-slate-50 object-contain p-1"
                    />
                ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-[10px] text-slate-400">
                        None
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 disabled:opacity-60"
                    >
                        <Upload size={13} />
                        {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload'}
                    </button>
                    {value ? (
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            <Trash2 size={13} /> Remove
                        </button>
                    ) : null}
                </div>
            </div>

            <input
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="…or paste an image URL / path"
                className={inputCls}
            />
            {err ? <p className="text-xs text-red-600">{err}</p> : null}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onFile}
            />
        </div>
    );
}

export default function SettingsForm({ settings }) {
    const [state, action, pending] = useActionState(saveSettings, null);
    const [values, setValues] = useState(() => ({ ...settings }));
    const [social, setSocial] = useState(() => ({ ...(settings.social || {}) }));

    // Accordion: open the first section by default.
    const [open, setOpen] = useState(() => ({
        [SETTINGS_SECTIONS[0]?.title]: true,
    }));
    const toggle = (title) => setOpen((o) => ({ ...o, [title]: !o[title] }));

    const setField = (name, val) =>
        setValues((v) => ({ ...v, [name]: val }));
    const setSocialField = (key, val) =>
        setSocial((s) => ({ ...s, [key]: val }));

    const payload = JSON.stringify({ ...values, social });

    const renderField = (f) => (
        <Field key={f.name} label={f.label} hint={f.hint}>
            {f.type === 'image' ? (
                <ImageField
                    value={values[f.name]}
                    onChange={(url) => setField(f.name, url)}
                />
            ) : f.type === 'textarea' ? (
                <textarea
                    value={values[f.name] || ''}
                    onChange={(e) => setField(f.name, e.target.value)}
                    rows={3}
                    className={inputCls}
                />
            ) : f.type === 'number' ? (
                <input
                    type="number"
                    min="12"
                    max="80"
                    value={values[f.name] || ''}
                    onChange={(e) => setField(f.name, e.target.value)}
                    className={inputCls}
                />
            ) : (
                <input
                    value={values[f.name] || ''}
                    onChange={(e) => setField(f.name, e.target.value)}
                    className={inputCls}
                />
            )}
        </Field>
    );

    // Sections + a synthetic "Social links" panel, all rendered as accordions.
    const panels = [
        ...SETTINGS_SECTIONS.map((s) => ({
            title: s.title,
            grid: s.grid,
            count: s.fields.length,
            body: (
                <div
                    className={
                        s.grid ? 'grid gap-4 sm:grid-cols-2' : 'space-y-5'
                    }
                >
                    {s.fields.map(renderField)}
                </div>
            ),
        })),
        {
            title: 'Social links',
            count: SOCIAL_PLATFORMS.length,
            body: (
                <div className="space-y-3">
                    <p className="text-xs text-slate-400">
                        Leave a field blank to hide that icon in the footer.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {SOCIAL_PLATFORMS.map((p) => (
                            <Field key={p.key} label={p.label}>
                                <input
                                    value={social[p.key] || ''}
                                    onChange={(e) =>
                                        setSocialField(p.key, e.target.value)
                                    }
                                    placeholder={p.placeholder}
                                    className={inputCls}
                                />
                            </Field>
                        ))}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <form action={action} className="space-y-4">
            <input type="hidden" name="data" value={payload} />

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        Settings
                    </h1>
                    <p className="text-sm text-slate-500">
                        Logo, contact details and social links used across the
                        website.
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={pending}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
                >
                    {pending ? 'Saving…' : 'Save changes'}
                </button>
            </div>

            {state?.error && (
                <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {state.error}
                </p>
            )}
            {state?.success && (
                <p
                    role="status"
                    className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                    <CheckCircle2 size={16} /> Settings saved.
                </p>
            )}

            {panels.map((panel) => {
                const isOpen = Boolean(open[panel.title]);
                return (
                    <div
                        key={panel.title}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                        <button
                            type="button"
                            onClick={() => toggle(panel.title)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50"
                        >
                            <span className="text-sm font-extrabold uppercase tracking-wide text-slate-700">
                                {panel.title}
                                <span className="ml-2 text-xs font-normal normal-case text-slate-400">
                                    {panel.count} field
                                    {panel.count !== 1 ? 's' : ''}
                                </span>
                            </span>
                            <ChevronDown
                                size={18}
                                className={`text-slate-400 transition-transform ${
                                    isOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {isOpen ? (
                            <div className="border-t border-slate-100 px-5 py-5">
                                {panel.body}
                            </div>
                        ) : null}
                    </div>
                );
            })}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={pending}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
                >
                    {pending ? 'Saving…' : 'Save changes'}
                </button>
            </div>
        </form>
    );
}
