'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminOrNull } from '@/lib/auth';
import { createUser, deleteUser, PROTECTED_USERNAMES } from '@/lib/users';

/** Create a user. Used with useActionState returns { success } or { error }. */
export async function createUserAction(_prevState, formData) {
    const admin = await getAdminOrNull();
    if (!admin) return { error: 'Not authorized. Please sign in again.' };

    const username = String(formData.get('username') || '').trim();
    const name = String(formData.get('name') || '').trim();
    const password = String(formData.get('password') || '');
    const confirm = String(formData.get('confirm') || '');
    const role = String(formData.get('role') || 'admin');

    if (password !== confirm) {
        return { error: 'Passwords do not match.' };
    }

    const result = await createUser({ username, password, name, role });
    if (result.error) return { error: result.error };

    revalidatePath('/admin/users');
    return { success: `User “${result.user.username}” created.` };
}

export async function deleteUserAction(formData) {
    const admin = await getAdminOrNull();
    if (!admin) redirect('/admin/login');

    const id = String(formData.get('id') || '').trim();
    const username = String(formData.get('username') || '').trim();

    // Never let a signed-in DB user delete their own account,
    // and never allow deleting a protected account.
    if (
        (username && username === admin.username) ||
        PROTECTED_USERNAMES.has(username.toLowerCase())
    ) {
        redirect('/admin/users');
    }

    await deleteUser(id);
    revalidatePath('/admin/users');
    redirect('/admin/users');
}
