import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Phone, Trash2, MailOpen } from 'lucide-react';
import { getInquiry, setInquiryStatus } from '@/lib/inquiries';
import { markInquiryAction, deleteInquiryAction } from '@/app/actions/inquiries';
import { telHref } from '@/lib/settingsSchema';

export const dynamic = 'force-dynamic';

export default async function InquiryDetailPage({ params }) {
    const { id } = await params;
    const inquiry = await getInquiry(id);
    if (!inquiry) notFound();

    // Opening a "new" inquiry marks it read.
    if (inquiry.status === 'new') {
        try {
            await setInquiryStatus(id, 'read');
            inquiry.status = 'read';
        } catch {
            // non-fatal
        }
    }

    const rows = [
        ['Name', inquiry.name],
        ['Email', inquiry.email],
        ['Phone', inquiry.phone || '—'],
        ['Service', inquiry.service || '—'],
        ['Source', inquiry.source],
        [
            'Received',
            inquiry.createdAt
                ? new Date(inquiry.createdAt).toLocaleString()
                : '—',
        ],
    ];

    return (
        <div className="mx-auto max-w-3xl">
            <Link
                href="/admin/inquiries"
                className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary"
            >
                <ArrowLeft size={16} /> Back to inquiries
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">
                            {inquiry.name}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {inquiry.email}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={`mailto:${inquiry.email}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-bold text-white hover:opacity-90"
                        >
                            <Mail size={15} /> Reply
                        </a>
                        {inquiry.phone && (
                            <a
                                href={telHref(inquiry.phone)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                <Phone size={15} /> Call
                            </a>
                        )}
                    </div>
                </div>

                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {rows.map(([k, v]) => (
                        <div key={k}>
                            <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                {k}
                            </dt>
                            <dd className="text-sm text-slate-800">{v}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                        Message
                    </p>
                    <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
                        {inquiry.message}
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5">
                    <form action={markInquiryAction}>
                        <input type="hidden" name="id" value={inquiry.id} />
                        <input type="hidden" name="status" value="new" />
                        <input
                            type="hidden"
                            name="back"
                            value={`/admin/inquiries/${inquiry.id}`}
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            <MailOpen size={15} /> Mark as unread
                        </button>
                    </form>
                    <form action={deleteInquiryAction}>
                        <input type="hidden" name="id" value={inquiry.id} />
                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3.5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                        >
                            <Trash2 size={15} /> Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
