'use client';

import { Trash2 } from 'lucide-react';
import { deleteUserAction } from '@/app/actions/users';

export default function UserRowActions({ user, isSelf }) {
    if (isSelf) {
        return (
            <span className="text-xs font-medium text-slate-400">You</span>
        );
    }
    return (
        <form
            action={deleteUserAction}
            onSubmit={(e) => {
                if (
                    !window.confirm(
                        `Delete user “${user.username}”? This cannot be undone.`
                    )
                ) {
                    e.preventDefault();
                }
            }}
        >
            <input type="hidden" name="id" value={user.id} />
            <input type="hidden" name="username" value={user.username} />
            <button
                type="submit"
                title="Delete user"
                className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
            >
                <Trash2 size={16} />
            </button>
        </form>
    );
}
