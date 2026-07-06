'use server';

import { revalidatePath } from 'next/cache';
import { getAdminOrNull } from '@/lib/auth';
import { saveSettingsRow } from '@/lib/settings';
import { cleanSettings } from '@/lib/settingsSchema';

/**
 * Save global site settings. Used with useActionState returns
 * `{ success }` or `{ error }` and stays on the settings page.
 */
export async function saveSettings(_prevState, formData) {
    const admin = await getAdminOrNull();
    if (!admin) return { error: 'Not authorized. Please sign in again.' };

    let raw;
    try {
        raw = JSON.parse(String(formData.get('data') || '{}'));
    } catch {
        return { error: 'Invalid form data.' };
    }
    if (!raw || typeof raw !== 'object') raw = {};

    const data = cleanSettings(raw);

    try {
        await saveSettingsRow(data);
    } catch (err) {
        return { error: `Could not save settings: ${err.message}` };
    }

    // Settings feed the shared (site) layout (header, footer, JSON-LD) and the
    // root metadata, so revalidate everything under the root layout.
    revalidatePath('/', 'layout');
    revalidatePath('/admin/settings');

    return { success: true };
}
