'use client';

import { useState } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';
import { deleteSubscriberAction } from '@/app/actions/newsletter';

export function CopyEmailsButton({ emails }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(emails.join(', '));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard unavailable ignore
        }
    };

    if (!emails.length) return null;

    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy all emails'}
        </button>
    );
}

export function SubscriberRowActions({ subscriber }) {
    return (
        <form
            action={deleteSubscriberAction}
            onSubmit={(e) => {
                if (
                    !window.confirm(
                        `Remove “${subscriber.email}” from the newsletter list?`
                    )
                ) {
                    e.preventDefault();
                }
            }}
        >
            <input type="hidden" name="id" value={subscriber.id} />
            <button
                type="submit"
                title="Remove subscriber"
                className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
            >
                <Trash2 size={16} />
            </button>
        </form>
    );
}
