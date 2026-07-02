'use client';

import { useState, useRef, useActionState } from 'react';
import {
    Plus,
    Trash2,
    ArrowUp,
    ArrowDown,
    Upload,
    ChevronDown,
} from 'lucide-react';
import { saveContentItem } from '@/app/actions/content';
import { CONTENT_TYPES, slugify } from '@/lib/contentSchemas';
import Editor from '@/components/admin/Editor';
import MediaPickerButton from '@/components/admin/MediaPickerButton';

const inputCls =
    'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

function Field({ label, hint, required, children }) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            {children}
            {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
        </div>
    );
}

/* ── List of plain strings (one per line) ──────────────── */
function StringListField({ value, onChange }) {
    return (
        <textarea
            rows={Math.max(3, (value?.length || 0) + 1)}
            value={(value || []).join('\n')}
            onChange={(e) => onChange(e.target.value.split('\n'))}
            placeholder="One item per line"
            className={inputCls}
        />
    );
}

/* ── List of objects with sub-fields ───────────────────── */
function ObjectListField({ field, rows, onChange }) {
    const subfields = field.subfields;
    const emptyRow = () =>
        Object.fromEntries(subfields.map((sf) => [sf.name, '']));

    const list = rows || [];
    const update = (i, key, val) =>
        onChange(
            list.map((r, idx) => (idx === i ? { ...r, [key]: val } : r))
        );
    const add = () => onChange([...list, emptyRow()]);
    const remove = (i) => onChange(list.filter((_, idx) => idx !== i));
    const move = (i, dir) => {
        const j = dir === 'up' ? i - 1 : i + 1;
        if (j < 0 || j >= list.length) return;
        const next = [...list];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };

    return (
        <div className="space-y-3">
            {list.length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center text-sm text-slate-400">
                    No rows yet.
                </p>
            ) : (
                list.map((row, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-slate-200 p-4"
                    >
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                #{i + 1}
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => move(i, 'up')}
                                    disabled={i === 0}
                                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                                    title="Move up"
                                >
                                    <ArrowUp size={14} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => move(i, 'down')}
                                    disabled={i === list.length - 1}
                                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                                    title="Move down"
                                >
                                    <ArrowDown size={14} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => remove(i)}
                                    className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                    title="Remove"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {subfields.map((sf) =>
                                sf.type === 'textarea' ? (
                                    <textarea
                                        key={sf.name}
                                        value={row[sf.name] || ''}
                                        onChange={(e) =>
                                            update(i, sf.name, e.target.value)
                                        }
                                        rows={2}
                                        placeholder={sf.label}
                                        className={inputCls}
                                    />
                                ) : (
                                    <input
                                        key={sf.name}
                                        value={row[sf.name] || ''}
                                        onChange={(e) =>
                                            update(i, sf.name, e.target.value)
                                        }
                                        placeholder={sf.label}
                                        className={inputCls}
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))
            )}
            <button
                type="button"
                onClick={add}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
                <Plus size={15} /> Add row
            </button>
        </div>
    );
}

/* ── Image: upload (local) or paste a URL, with preview ── */
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
        <div className="space-y-3">
            {value ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={value}
                    alt="Preview"
                    className="h-40 w-auto max-w-full rounded-lg border border-slate-200 bg-slate-50 object-contain"
                />
            ) : (
                <div className="flex h-40 w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
                    No image selected
                </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
                >
                    <Upload size={15} />
                    {uploading
                        ? 'Uploading…'
                        : value
                          ? 'Replace image'
                          : 'Upload image'}
                </button>
                <MediaPickerButton onSelect={(urls) => onChange(urls[0])} />
                {value ? (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        <Trash2 size={15} /> Remove
                    </button>
                ) : null}
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

/* ── Multiple images: upload many / paste URLs, thumbnails + reorder ── */
function ImageListField({ value, onChange }) {
    const list = Array.isArray(value) ? value : [];
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const inputRef = useRef(null);

    const removeAt = (i) => onChange(list.filter((_, idx) => idx !== i));
    const move = (i, dir) => {
        const j = dir === 'up' ? i - 1 : i + 1;
        if (j < 0 || j >= list.length) return;
        const next = [...list];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };
    const addUrl = () => {
        const u = urlInput.trim();
        if (!u) return;
        onChange([...list, u]);
        setUrlInput('');
    };

    const onFiles = async (e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = '';
        if (!files.length) return;
        setErr('');
        setUploading(true);
        try {
            const urls = [];
            for (const file of files) {
                const fd = new FormData();
                fd.append('file', file);
                const res = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: fd,
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Upload failed');
                urls.push(data.url);
            }
            onChange([...list, ...urls]);
        } catch (e2) {
            setErr(e2.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-3">
            {list.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {list.map((src, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={src}
                                alt={`Image ${i + 1}`}
                                className="h-28 w-full object-cover"
                            />
                            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-1 bg-black/40 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                                <span className="flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => move(i, 'up')}
                                        disabled={i === 0}
                                        title="Move earlier"
                                        className="rounded bg-white/90 p-1 text-slate-700 disabled:opacity-30"
                                    >
                                        <ArrowUp size={13} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => move(i, 'down')}
                                        disabled={i === list.length - 1}
                                        title="Move later"
                                        className="rounded bg-white/90 p-1 text-slate-700 disabled:opacity-30"
                                    >
                                        <ArrowDown size={13} />
                                    </button>
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeAt(i)}
                                    title="Remove"
                                    className="rounded bg-white/90 p-1 text-red-600"
                                >
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
                    No images yet
                </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
                >
                    <Upload size={15} />
                    {uploading ? 'Uploading…' : 'Upload images'}
                </button>
                <MediaPickerButton
                    multiple
                    onSelect={(urls) => onChange([...list, ...urls])}
                />
                <input
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addUrl();
                        }
                    }}
                    placeholder="…or paste an image URL"
                    className="min-w-[160px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                    type="button"
                    onClick={addUrl}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                    Add
                </button>
            </div>
            {err ? <p className="text-xs text-red-600">{err}</p> : null}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={onFiles}
            />
        </div>
    );
}

function ColorField({ value, onChange }) {
    const valid = /^#[0-9a-fA-F]{6}$/.test(value || '');
    return (
        <div className="flex items-center gap-2">
            <input
                type="color"
                value={valid ? value : '#000000'}
                onChange={(e) => onChange(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
                aria-label="Colour picker"
            />
            <input
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="#EE314F"
                className={inputCls}
            />
        </div>
    );
}

function initialValues(cfg, item) {
    const data = item?.data || {};
    const values = {};
    for (const f of cfg.fields) {
        const v = data[f.name];
        if (f.type === 'stringList' || f.type === 'imageList') {
            values[f.name] = Array.isArray(v) ? v : [];
        } else if (f.type === 'objectList') {
            values[f.name] = Array.isArray(v) ? v : [];
        } else if (f.type === 'boolean') {
            values[f.name] = Boolean(v);
        } else {
            values[f.name] = v == null ? '' : String(v);
        }
    }
    return values;
}

export default function ContentForm({ type, item = null }) {
    const cfg = CONTENT_TYPES[type];
    const isEdit = Boolean(item);
    const [state, action, pending] = useActionState(saveContentItem, null);

    const [values, setValues] = useState(() => initialValues(cfg, item));
    const [slug, setSlug] = useState(item?.slug || '');
    const [openSections, setOpenSections] = useState(() =>
        Array.isArray(cfg.sections) && cfg.sections.length
            ? { [cfg.sections[0].title]: true }
            : {}
    );

    const setField = (name, val) =>
        setValues((v) => ({ ...v, [name]: val }));
    const toggleSection = (title) =>
        setOpenSections((s) => ({ ...s, [title]: !s[title] }));

    const titleValue = values[cfg.slugFromField] || '';

    // Group fields into (collapsible) sections. Types without a `sections`
    // config render as a single plain card.
    const fieldByName = Object.fromEntries(cfg.fields.map((f) => [f.name, f]));
    const groups =
        Array.isArray(cfg.sections) && cfg.sections.length
            ? cfg.sections
                  .map((s) => ({
                      title: s.title,
                      fields: (s.fields || [])
                          .map((n) => fieldByName[n])
                          .filter(Boolean),
                  }))
                  .filter((g) => g.fields.length)
            : [{ title: null, fields: cfg.fields }];
    // Safety net: any field not listed in a section still shows up.
    if (Array.isArray(cfg.sections) && cfg.sections.length) {
        const placed = new Set(
            groups.flatMap((g) => g.fields.map((f) => f.name))
        );
        const leftover = cfg.fields.filter((f) => !placed.has(f.name));
        if (leftover.length) groups.push({ title: 'Other', fields: leftover });
    }

    return (
        <form action={action} className="space-y-6">
            <input type="hidden" name="type" value={type} />
            {isEdit && <input type="hidden" name="id" value={item.id} />}
            <input type="hidden" name="slug" value={slug} />
            <input
                type="hidden"
                name="data"
                value={JSON.stringify(values)}
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-extrabold text-slate-900">
                    {isEdit ? `Edit ${cfg.singular}` : `New ${cfg.singular}`}
                </h1>
                <button
                    type="submit"
                    disabled={pending}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
                >
                    {pending ? 'Saving…' : isEdit ? 'Update' : 'Create'}
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

            {/* Slug */}
            {cfg.dynamicPath || cfg.slugRequired ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <Field
                        label="Slug (URL)"
                        hint={
                            cfg.slugRequired
                                ? 'Leave blank to auto-generate from the title. Lowercase, hyphenated.'
                                : 'Optional auto-generated if left blank.'
                        }
                    >
                        <input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder={
                                slugify(titleValue) || 'my-page-url'
                            }
                            className={inputCls}
                        />
                    </Field>
                </div>
            ) : null}

            {/* Fields grouped into collapsible sections when configured */}
            {groups.map((g, gi) => {
                const renderField = (f) => {
                    if (f.type === 'richtext') {
                        return (
                            <Field
                                key={f.name}
                                label={f.label}
                                hint={f.hint}
                                required={f.required}
                            >
                                <Editor
                                    value={values[f.name] || ''}
                                    onChange={(html) => setField(f.name, html)}
                                />
                            </Field>
                        );
                    }
                    if (f.type === 'boolean') {
                        return (
                            <div key={f.name} className="flex items-start gap-3">
                                <input
                                    id={`bool-${f.name}`}
                                    type="checkbox"
                                    checked={Boolean(values[f.name])}
                                    onChange={(e) =>
                                        setField(f.name, e.target.checked)
                                    }
                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary/20"
                                />
                                <label
                                    htmlFor={`bool-${f.name}`}
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    {f.label}
                                    {f.hint && (
                                        <span className="mt-0.5 block text-xs font-normal text-slate-400">
                                            {f.hint}
                                        </span>
                                    )}
                                </label>
                            </div>
                        );
                    }
                    if (f.type === 'objectList') {
                        return (
                            <Field
                                key={f.name}
                                label={f.label}
                                hint={f.hint}
                                required={f.required}
                            >
                                <ObjectListField
                                    field={f}
                                    rows={values[f.name]}
                                    onChange={(rows) => setField(f.name, rows)}
                                />
                            </Field>
                        );
                    }
                    if (f.type === 'stringList') {
                        return (
                            <Field
                                key={f.name}
                                label={f.label}
                                hint={f.hint || 'One item per line.'}
                                required={f.required}
                            >
                                <StringListField
                                    value={values[f.name]}
                                    onChange={(arr) => setField(f.name, arr)}
                                />
                            </Field>
                        );
                    }
                    if (f.type === 'color') {
                        return (
                            <Field
                                key={f.name}
                                label={f.label}
                                hint={f.hint}
                                required={f.required}
                            >
                                <ColorField
                                    value={values[f.name]}
                                    onChange={(val) => setField(f.name, val)}
                                />
                            </Field>
                        );
                    }
                    if (f.type === 'image') {
                        return (
                            <Field
                                key={f.name}
                                label={f.label}
                                hint={f.hint}
                                required={f.required}
                            >
                                <ImageField
                                    value={values[f.name]}
                                    onChange={(url) => setField(f.name, url)}
                                />
                            </Field>
                        );
                    }
                    if (f.type === 'imageList') {
                        return (
                            <Field
                                key={f.name}
                                label={f.label}
                                hint={f.hint}
                                required={f.required}
                            >
                                <ImageListField
                                    value={values[f.name]}
                                    onChange={(arr) => setField(f.name, arr)}
                                />
                            </Field>
                        );
                    }
                    if (f.type === 'textarea') {
                        return (
                            <Field
                                key={f.name}
                                label={f.label}
                                hint={f.hint}
                                required={f.required}
                            >
                                <textarea
                                    value={values[f.name] || ''}
                                    onChange={(e) =>
                                        setField(f.name, e.target.value)
                                    }
                                    rows={f.rows || 3}
                                    placeholder={f.placeholder}
                                    className={inputCls}
                                />
                            </Field>
                        );
                    }
                    return (
                        <Field
                            key={f.name}
                            label={f.label}
                            hint={f.hint}
                            required={f.required}
                        >
                            <input
                                value={values[f.name] || ''}
                                onChange={(e) =>
                                    setField(f.name, e.target.value)
                                }
                                placeholder={f.placeholder}
                                className={inputCls}
                            />
                        </Field>
                    );
                };

                const body = g.fields.map(renderField);
                if (!g.title) {
                    return (
                        <div
                            key={gi}
                            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5"
                        >
                            {body}
                        </div>
                    );
                }
                const open = Boolean(openSections[g.title]);
                return (
                    <div
                        key={gi}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                        <button
                            type="button"
                            onClick={() => toggleSection(g.title)}
                            aria-expanded={open}
                            className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50"
                        >
                            <span className="text-sm font-extrabold uppercase tracking-wide text-slate-700">
                                {g.title}
                                <span className="ml-2 text-xs font-normal normal-case text-slate-400">
                                    {g.fields.length} field
                                    {g.fields.length !== 1 ? 's' : ''}
                                </span>
                            </span>
                            <ChevronDown
                                size={18}
                                className={`text-slate-400 transition-transform ${
                                    open ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {open ? (
                            <div className="space-y-6 border-t border-slate-100 px-5 py-5">
                                {body}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </form>
    );
}
