'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Link2,
    Image as ImageIcon,
    ImagePlus,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Undo,
    Redo,
    Minus,
} from 'lucide-react';
import MediaPickerButton from '@/components/admin/MediaPickerButton';

function Btn({ onClick, active, disabled, title, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            aria-label={title}
            aria-pressed={active || undefined}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:opacity-30 ${
                active
                    ? 'bg-primary text-white'
                    : 'text-slate-600 hover:bg-slate-200'
            }`}
        >
            {children}
        </button>
    );
}

export default function Editor({ value = '', onChange }) {
    const [, force] = useState(0);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
                link: {
                    openOnClick: false,
                    autolink: true,
                    HTMLAttributes: {
                        rel: 'noopener noreferrer nofollow',
                        target: '_blank',
                    },
                },
            }),
            Image.configure({
                HTMLAttributes: { class: 'rounded-lg' },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({
                placeholder: 'Write your story…',
            }),
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: 'prose-editor focus:outline-none min-h-[420px] px-5 py-4',
            },
        },
        onUpdate: ({ editor: ed }) => onChange?.(ed.getHTML()),
    });

    // Re-render the toolbar when the selection / state changes.
    useEffect(() => {
        if (!editor) return undefined;
        const update = () => force((n) => n + 1);
        editor.on('transaction', update);
        editor.on('selectionUpdate', update);
        return () => {
            editor.off('transaction', update);
            editor.off('selectionUpdate', update);
        };
    }, [editor]);

    if (!editor) {
        return (
            <div className="min-h-[480px] animate-pulse rounded-xl border border-slate-300 bg-slate-50" />
        );
    }

    const setLink = () => {
        const prev = editor.getAttributes('link').href || '';
        const url = window.prompt('Link URL', prev);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    };

    const onPickImage = () => fileInputRef.current?.click();

    const onFileChange = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
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
            const alt = window.prompt('Image alt text (for SEO)', '') || '';
            editor
                .chain()
                .focus()
                .setImage({ src: data.url, alt })
                .run();
        } catch (err) {
            window.alert(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">
            <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-2">
                <Btn
                    title="Bold"
                    active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold size={16} />
                </Btn>
                <Btn
                    title="Italic"
                    active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic size={16} />
                </Btn>
                <Btn
                    title="Underline"
                    active={editor.isActive('underline')}
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <UnderlineIcon size={16} />
                </Btn>
                <Btn
                    title="Strikethrough"
                    active={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough size={16} />
                </Btn>

                <span className="mx-1 h-5 w-px bg-slate-300" />

                <Btn
                    title="Heading 2"
                    active={editor.isActive('heading', { level: 2 })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                >
                    <Heading2 size={16} />
                </Btn>
                <Btn
                    title="Heading 3"
                    active={editor.isActive('heading', { level: 3 })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                    }
                >
                    <Heading3 size={16} />
                </Btn>

                <span className="mx-1 h-5 w-px bg-slate-300" />

                <Btn
                    title="Bullet list"
                    active={editor.isActive('bulletList')}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List size={16} />
                </Btn>
                <Btn
                    title="Numbered list"
                    active={editor.isActive('orderedList')}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered size={16} />
                </Btn>
                <Btn
                    title="Quote"
                    active={editor.isActive('blockquote')}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <Quote size={16} />
                </Btn>
                <Btn
                    title="Code block"
                    active={editor.isActive('codeBlock')}
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                >
                    <Code size={16} />
                </Btn>

                <span className="mx-1 h-5 w-px bg-slate-300" />

                <Btn
                    title="Align left"
                    active={editor.isActive({ textAlign: 'left' })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign('left').run()
                    }
                >
                    <AlignLeft size={16} />
                </Btn>
                <Btn
                    title="Align center"
                    active={editor.isActive({ textAlign: 'center' })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign('center').run()
                    }
                >
                    <AlignCenter size={16} />
                </Btn>
                <Btn
                    title="Align right"
                    active={editor.isActive({ textAlign: 'right' })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign('right').run()
                    }
                >
                    <AlignRight size={16} />
                </Btn>

                <span className="mx-1 h-5 w-px bg-slate-300" />

                <Btn
                    title="Link"
                    active={editor.isActive('link')}
                    onClick={setLink}
                >
                    <Link2 size={16} />
                </Btn>
                <Btn
                    title="Upload image from computer"
                    disabled={uploading}
                    onClick={onPickImage}
                >
                    <ImageIcon size={16} />
                </Btn>
                <MediaPickerButton
                    multiple
                    label=""
                    title="Insert from Media library"
                    icon={<ImagePlus size={16} />}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-200"
                    onSelect={(urls) =>
                        urls.forEach((u) =>
                            editor.chain().focus().setImage({ src: u }).run()
                        )
                    }
                />
                <Btn
                    title="Horizontal rule"
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    <Minus size={16} />
                </Btn>

                <span className="mx-1 h-5 w-px bg-slate-300" />

                <Btn
                    title="Undo"
                    disabled={!editor.can().undo()}
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo size={16} />
                </Btn>
                <Btn
                    title="Redo"
                    disabled={!editor.can().redo()}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo size={16} />
                </Btn>

                {uploading && (
                    <span className="ml-2 text-xs text-slate-500">
                        Uploading…
                    </span>
                )}
            </div>

            <EditorContent editor={editor} />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onFileChange}
            />
        </div>
    );
}
