'use server';

import { redirect } from 'next/navigation';
import { validateCredentials } from '@/lib/auth';
import { createSession, deleteSession } from '@/lib/session';

export async function loginAction(_prevState, formData) {
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '');
    const from = String(formData.get('from') || '/admin');

    if (!username || !password) {
        return { error: 'Username and password are required.' };
    }

    let ok = false;
    try {
        ok = await validateCredentials(username, password);
    } catch (err) {
        return { error: err.message };
    }

    if (!ok) {
        return { error: 'Invalid username or password.' };
    }

    await createSession(username);
    redirect(from.startsWith('/admin') ? from : '/admin');
}

export async function logoutAction() {
    await deleteSession();
    redirect('/admin/login');
}
