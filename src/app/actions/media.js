'use server';

import { revalidatePath } from 'next/cache';
import { getAdminOrNull } from '@/lib/auth';
import { deleteR2Object } from '@/lib/r2';

/** Delete a media object from R2. Returns { success } or { error }. */
export async function deleteMediaAction(key) {
    const admin = await getAdminOrNull();
    if (!admin) return { error: 'Not authorized. Please sign in again.' };

    try {
        await deleteR2Object(String(key || ''));
    } catch (err) {
        return { error: `Could not delete: ${err.message}` };
    }

    revalidatePath('/admin/media');
    return { success: true };
}
