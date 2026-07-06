import Link from 'next/link';
import { Inbox } from 'lucide-react';
import { listInquiries } from '@/lib/inquiries';
import InquiryRowActions from '@/components/admin/InquiryRowActions';
import DbErrorNotice from '@/components/admin/DbErrorNotice';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
    let inquiries = [];
    let dbError = false;
    try {
        inquiries = await listInquiries();
    } catch {
        dbError = true;
    }

    const newCount = inquiries.filter((i) => i.status === 'new').length;

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        Inquiries
                    </h1>
                    <p className="text-sm text-slate-500">
                        {inquiries.length}{' '}
                        {inquiries.length === 1 ? 'message' : 'messages'}
                        {newCount > 0 && (
                            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                                {newCount} new
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {dbError && <DbErrorNotice />}

            {inquiries.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <Inbox size={32} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-500">No inquiries yet.</p>
                    <p className="mt-1 text-sm text-slate-400">
                        Form submissions from your website will appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3">Name</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Service</th>
                                <th className="px-5 py-3">Source</th>
                                <th className="px-5 py-3">Received</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inquiries.map((i) => (
                                <tr
                                    key={i.id}
                                    className={`hover:bg-slate-50 ${
                                        i.status === 'new' ? 'bg-primary/[0.03]' : ''
                                    }`}
                                >
                                    <td className="px-5 py-3">
                                        <Link
                                            href={`/admin/inquiries/${i.id}`}
                                            className={`hover:text-primary ${
                                                i.status === 'new'
                                                    ? 'font-bold text-slate-900'
                                                    : 'font-semibold text-slate-700'
                                            }`}
                                        >
                                            {i.name}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-slate-500">
                                        {i.email}
                                    </td>
                                    <td className="px-5 py-3 text-slate-500">
                                        {i.service || '—'}
                                    </td>
                                    <td className="px-5 py-3 text-slate-500">
                                        {i.source}
                                    </td>
                                    <td className="px-5 py-3 text-slate-500">
                                        {i.createdAt
                                            ? new Date(
                                                  i.createdAt
                                              ).toLocaleDateString()
                                            : '—'}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                i.status === 'new'
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {i.status === 'new' ? 'New' : 'Read'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <InquiryRowActions inquiry={i} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
