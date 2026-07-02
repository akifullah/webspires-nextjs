'use client';

import { useActionState, useRef, useEffect } from 'react';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { createUserAction } from '@/app/actions/users';

const inputCls =
    'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

export default function UserCreateForm() {
    const [state, action, pending] = useActionState(createUserAction, null);
    const formRef = useRef(null);

    // Clear the fields after a successful create.
    useEffect(() => {
        if (state?.success) formRef.current?.reset();
    }, [state]);

    return (
        <form
            ref={formRef}
            action={action}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5"
        >
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-slate-700">
                <UserPlus size={16} /> Add a user
            </h2>

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
                    <CheckCircle2 size={16} /> {state.success}
                </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Username <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="username"
                        required
                        autoComplete="off"
                        placeholder="jane"
                        className={inputCls}
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Full name
                    </label>
                    <input
                        name="name"
                        autoComplete="off"
                        placeholder="Jane Doe"
                        className={inputCls}
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        required
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        className={inputCls}
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Confirm password <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="confirm"
                        type="password"
                        required
                        autoComplete="new-password"
                        placeholder="Re-enter password"
                        className={inputCls}
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Role
                    </label>
                    <select name="role" className={inputCls} defaultValue="admin">
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
                <UserPlus size={16} /> {pending ? 'Creating…' : 'Create user'}
            </button>
        </form>
    );
}
