'use client';

import { useState, useActionState } from 'react';
import { ChevronDown, UploadCloud, Plus, Trash2 } from 'lucide-react';
import Editor from '@/components/admin/Editor';
import MediaPickerButton from '@/components/admin/MediaPickerButton';
import { savePost } from '@/app/actions/posts';

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

const inputCls =
    'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

export default function PostForm({ post = null, categories = [] }) {
    const isEdit = Boolean(post);
    const [state, action, pending] = useActionState(savePost, null);

    const [content, setContent] = useState(post?.content || '');
    const [cover, setCover] = useState(post?.coverImage || '');
    const [coverUploading, setCoverUploading] = useState(false);
    const [ogImage, setOgImage] = useState(post?.seo?.ogImage || '');
    const [ogUploading, setOgUploading] = useState(false);
    const [seoOpen, setSeoOpen] = useState(false);
    const [faqs, setFaqs] = useState(
        Array.isArray(post?.faqs) && post.faqs.length
            ? post.faqs.map((f) => ({
                  question: f.question || '',
                  answer: f.answer || '',
              }))
            : []
    );

    const addFaq = () =>
        setFaqs((f) => [...f, { question: '', answer: '' }]);
    const removeFaq = (i) =>
        setFaqs((f) => f.filter((_, idx) => idx !== i));
    const updateFaq = (i, key, value) =>
        setFaqs((f) =>
            f.map((item, idx) =>
                idx === i ? { ...item, [key]: value } : item
            )
        );

    const uploadFile = async (file) => {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/upload', {
            method: 'POST',
            body: fd,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        return data.url;
    };

    const makeUploadHandler = (setUrl, setLoading) => async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        setLoading(true);
        try {
            setUrl(await uploadFile(file));
        } catch (err) {
            window.alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadCover = makeUploadHandler(setCover, setCoverUploading);
    const uploadOg = makeUploadHandler(setOgImage, setOgUploading);

    return (
        <form action={action} className="space-y-6">
            {isEdit && <input type="hidden" name="id" value={post.id} />}
            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="faqs" value={JSON.stringify(faqs)} />

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        {isEdit ? 'Edit post' : 'New post'}
                    </h1>
                    {isEdit && (
                        <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                post.status === 'published'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-amber-100 text-amber-700'
                            }`}
                        >
                            {post.status === 'published'
                                ? 'Published'
                                : 'Draft'}
                        </span>
                    )}
                </div>

                {/* The clicked submit button sets the post status, so it is
                    always explicit no hidden dropdown to forget. */}
                <div className="flex items-center gap-2">
                    <button
                        type="submit"
                        name="status"
                        value="draft"
                        disabled={pending}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                        {post?.status === 'published'
                            ? 'Unpublish (save as draft)'
                            : 'Save as draft'}
                    </button>
                    <button
                        type="submit"
                        name="status"
                        value="published"
                        disabled={pending}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
                    >
                        {pending
                            ? 'Saving…'
                            : post?.status === 'published'
                              ? 'Update'
                              : 'Publish'}
                    </button>
                </div>
            </div>

            {state?.error && (
                <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {state.error}
                </p>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main column */}
                <div className="space-y-6 lg:col-span-2">
                    <Field label="Title">
                        <input
                            name="title"
                            defaultValue={post?.title || ''}
                            required
                            placeholder="An SEO-friendly headline"
                            className={`${inputCls} text-base font-semibold`}
                        />
                    </Field>

                    <Field
                        label="Slug"
                        hint="Leave blank to auto-generate from the title. Lowercase, hyphenated."
                    >
                        <input
                            name="slug"
                            defaultValue={post?.slug || ''}
                            placeholder="my-post-url"
                            className={inputCls}
                        />
                    </Field>

                    <Field
                        label="Excerpt"
                        hint="Short summary used in listings & as a fallback meta description."
                    >
                        <textarea
                            name="excerpt"
                            defaultValue={post?.excerpt || ''}
                            rows={2}
                            maxLength={320}
                            placeholder="One or two sentences that sell the article…"
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Content">
                        <Editor value={content} onChange={setContent} />
                    </Field>
                </div>

                {/* Sidebar column */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="mb-3 text-sm font-bold text-slate-800">
                            Cover image
                        </p>
                        {cover ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={cover}
                                alt="Cover preview"
                                className="mb-3 aspect-video w-full rounded-lg object-cover"
                            />
                        ) : (
                            <div className="mb-3 flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
                                No image
                            </div>
                        )}
                        <input type="hidden" name="coverImage" value={cover} />
                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                            <UploadCloud size={16} />
                            {coverUploading ? 'Uploading…' : 'Upload image'}
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={uploadCover}
                            />
                        </label>
                        <div className="mt-2">
                            <MediaPickerButton
                                onSelect={(urls) => setCover(urls[0])}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            />
                        </div>
                        {cover && (
                            <button
                                type="button"
                                onClick={() => setCover('')}
                                className="mt-2 w-full text-xs text-red-500 hover:underline"
                            >
                                Remove image
                            </button>
                        )}
                        <input
                            name="coverImageAlt"
                            defaultValue={post?.coverImageAlt || ''}
                            placeholder="Cover alt text (SEO)"
                            className={`${inputCls} mt-3`}
                        />
                    </div>

                    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                        <Field
                            label="Category"
                            hint="Pick a managed category or type a new one. Manage the list under Categories."
                        >
                            <input
                                name="category"
                                defaultValue={post?.category || 'General'}
                                list="post-category-options"
                                autoComplete="off"
                                className={inputCls}
                            />
                            <datalist id="post-category-options">
                                {categories.map((c) => (
                                    <option key={c} value={c} />
                                ))}
                            </datalist>
                        </Field>
                        <Field label="Tags" hint="Comma separated">
                            <input
                                name="tags"
                                defaultValue={(post?.tags || []).join(', ')}
                                placeholder="seo, web design"
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Author">
                            <input
                                name="author"
                                defaultValue={post?.author || 'Webspires Team'}
                                className={inputCls}
                            />
                        </Field>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                name="featured"
                                defaultChecked={post?.featured || false}
                                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            Feature this post
                        </label>
                    </div>
                </div>
            </div>

            {/* SEO panel */}
            <div className="rounded-2xl border border-slate-200 bg-white">
                <button
                    type="button"
                    onClick={() => setSeoOpen((o) => !o)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                    <span className="text-sm font-bold text-slate-800">
                        SEO settings
                    </span>
                    <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform ${
                            seoOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>
                {seoOpen && (
                    <div className="grid grid-cols-1 gap-4 border-t border-slate-100 p-5 md:grid-cols-2">
                        <Field
                            label="Meta title"
                            hint="≤ 60 chars recommended. Falls back to the post title."
                        >
                            <input
                                name="seoTitle"
                                defaultValue={post?.seo?.metaTitle || ''}
                                maxLength={70}
                                className={inputCls}
                            />
                        </Field>
                        <Field
                            label="Canonical URL"
                            hint="Optional. Defaults to the post URL."
                        >
                            <input
                                name="seoCanonical"
                                defaultValue={post?.seo?.canonicalUrl || ''}
                                className={inputCls}
                            />
                        </Field>
                        <Field
                            label="Meta description"
                            hint="≤ 160 chars recommended. Falls back to the excerpt."
                        >
                            <textarea
                                name="seoDescription"
                                defaultValue={post?.seo?.metaDescription || ''}
                                rows={2}
                                maxLength={200}
                                className={inputCls}
                            />
                        </Field>
                        <Field
                            label="Social share image (OG)"
                            hint="Optional. Defaults to the cover image. 1200×630 recommended."
                        >
                            <input
                                type="hidden"
                                name="seoOgImage"
                                value={ogImage}
                            />
                            {ogImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={ogImage}
                                    alt="OG preview"
                                    className="mb-2 aspect-[1200/630] w-full rounded-lg object-cover"
                                />
                            ) : (
                                <div className="mb-2 flex aspect-[1200/630] w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
                                    No image
                                </div>
                            )}
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                                <UploadCloud size={16} />
                                {ogUploading
                                    ? 'Uploading…'
                                    : 'Upload image'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={uploadOg}
                                />
                            </label>
                            <div className="mt-2">
                                <MediaPickerButton
                                    onSelect={(urls) => setOgImage(urls[0])}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                />
                            </div>
                            {ogImage && (
                                <button
                                    type="button"
                                    onClick={() => setOgImage('')}
                                    className="mt-2 w-full text-xs text-red-500 hover:underline"
                                >
                                    Remove image
                                </button>
                            )}
                        </Field>
                        <Field label="Focus keywords" hint="Comma separated">
                            <input
                                name="seoKeywords"
                                defaultValue={(post?.seo?.keywords || []).join(
                                    ', '
                                )}
                                className={inputCls}
                            />
                        </Field>
                        <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                name="seoNoIndex"
                                defaultChecked={post?.seo?.noIndex || false}
                                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            Hide from search engines (noindex)
                        </label>
                    </div>
                )}
            </div>

            {/* FAQ builder */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-slate-800">
                            FAQs
                        </p>
                        <p className="text-xs text-slate-400">
                            Shown as an accordion on the post and added to
                            Google FAQ rich-result schema.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={addFaq}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        <Plus size={15} /> Add FAQ
                    </button>
                </div>

                {faqs.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
                        No FAQs yet. Click “Add FAQ” to create question &
                        answer pairs.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {faqs.map((f, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-slate-200 p-4"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                        Q{i + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeFaq(i)}
                                        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                        title="Remove"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                                <input
                                    value={f.question}
                                    onChange={(e) =>
                                        updateFaq(i, 'question', e.target.value)
                                    }
                                    placeholder="Question"
                                    className={`${inputCls} mb-2 font-semibold`}
                                />
                                <textarea
                                    value={f.answer}
                                    onChange={(e) =>
                                        updateFaq(i, 'answer', e.target.value)
                                    }
                                    rows={3}
                                    placeholder="Answer"
                                    className={inputCls}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
}
