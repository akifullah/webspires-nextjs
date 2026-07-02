'use client';

import Link from 'next/link';
import { Eye, MailOpen, Mail, Trash2 } from 'lucide-react';
import { markInquiryAction, deleteInquiryAction } from '@/app/actions/inquiries';

export default function InquiryRowActions({ inquiry, back = '/admin/inquiries' }) {
    const isNew = inquiry.status === 'new';
    return (
        <div className="flex items-center justify-end gap-1.5">
            <Link
                href={`/admin/inquiries/${inquiry.id}`}
                title="View"
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-primary"
            >
                <Eye size={16} />
            </Link>

            <form action={markInquiryAction}>
                <input type="hidden" name="id" value={inquiry.id} />
                <input
                    type="hidden"
                    name="status"
                    value={isNew ? 'read' : 'new'}
                />
                <input type="hidden" name="back" value={back} />
                <button
                    type="submit"
                    title={isNew ? 'Mark as read' : 'Mark as new'}
                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-amber-600"
                >
                    {isNew ? <MailOpen size={16} /> : <Mail size={16} />}
                </button>
            </form>

            <form
                action={deleteInquiryAction}
                onSubmit={(e) => {
                    if (
                        !window.confirm(
                            `Delete the inquiry from “${inquiry.name}”? This cannot be undone.`
                        )
                    ) {
                        e.preventDefault();
                    }
                }}
            >
                <input type="hidden" name="id" value={inquiry.id} />
                <button
                    type="submit"
                    title="Delete"
                    className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                >
                    <Trash2 size={16} />
                </button>
            </form>
        </div>
    );
}
