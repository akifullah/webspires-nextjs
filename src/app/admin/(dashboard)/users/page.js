import { requireAdmin } from '@/lib/auth';
import { listUsers, PROTECTED_USERNAMES } from '@/lib/users';
import UserCreateForm from '@/components/admin/UserCreateForm';
import UserRowActions from '@/components/admin/UserRowActions';
import DbErrorNotice from '@/components/admin/DbErrorNotice';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    const admin = await requireAdmin();

    let users = [];
    let dbError = false;
    try {
        users = await listUsers();
    } catch {
        dbError = true;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Users</h1>
                <p className="text-sm text-slate-500">
                    People who can sign in to this admin. The built-in
                    environment admin is always available and is not listed here.
                </p>
            </div>

            {dbError && <DbErrorNotice />}

            <UserCreateForm />

            <div>
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                    Existing users{' '}
                    <span className="text-sm font-normal text-slate-400">
                        ({users.length})
                    </span>
                </h2>

                {users.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                        No users created yet. Use the form above to add one.
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-3">Username</th>
                                    <th className="px-5 py-3">Name</th>
                                    <th className="px-5 py-3">Role</th>
                                    <th className="px-5 py-3">Created</th>
                                    <th className="px-5 py-3 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-slate-50">
                                        <td className="px-5 py-3 font-semibold text-slate-800">
                                            {u.username}
                                        </td>
                                        <td className="px-5 py-3 text-slate-500">
                                            {u.name || '—'}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-slate-600">
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-slate-500">
                                            {u.createdAt
                                                ? new Date(
                                                      u.createdAt
                                                  ).toLocaleDateString()
                                                : '—'}
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex justify-end">
                                                <UserRowActions
                                                    user={u}
                                                    isSelf={
                                                        u.username ===
                                                        admin.username
                                                    }
                                                    isProtected={PROTECTED_USERNAMES.has(
                                                        u.username.toLowerCase()
                                                    )}
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
        </div>
    );
}
