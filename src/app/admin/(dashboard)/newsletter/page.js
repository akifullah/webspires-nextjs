import { Mail } from 'lucide-react';
import { listSubscribers } from '@/lib/newsletter';
import {
    CopyEmailsButton,
    SubscriberRowActions,
} from '@/components/admin/NewsletterActions';
import DbErrorNotice from '@/components/admin/DbErrorNotice';

export const dynamic = 'force-dynamic';

export default async function NewsletterPage() {
    let subscribers = [];
    let dbError = false;
    try {
        subscribers = await listSubscribers();
    } catch {
        dbError = true;
    }

    const emails = subscribers.map((s) => s.email);

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        Newsletter
                    </h1>
                    <p className="text-sm text-slate-500">
                        {subscribers.length}{' '}
                        {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
                    </p>
                </div>
                <CopyEmailsButton emails={emails} />
            </div>

            {dbError && <DbErrorNotice />}

            {subscribers.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <Mail size={32} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-500">No subscribers yet.</p>
                    <p className="mt-1 text-sm text-slate-400">
                        Emails from the footer newsletter form will appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Source</th>
                                <th className="px-5 py-3">Subscribed</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {subscribers.map((s) => (
                                <tr key={s.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3 font-semibold text-slate-800">
                                        <a
                                            href={`mailto:${s.email}`}
                                            className="hover:text-primary"
                                        >
                                            {s.email}
                                        </a>
                                    </td>
                                    <td className="px-5 py-3 text-slate-500">
                                        {s.source}
                                    </td>
                                    <td className="px-5 py-3 text-slate-500">
                                        {s.createdAt
                                            ? new Date(
                                                  s.createdAt
                                              ).toLocaleDateString()
                                            : '—'}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex justify-end">
                                            <SubscriberRowActions
                                                subscriber={s}
                                            />
                                        </div>
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
