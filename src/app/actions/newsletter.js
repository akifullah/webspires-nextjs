'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminOrNull } from '@/lib/auth';
import { addSubscriber, deleteSubscriber } from '@/lib/newsletter';
import { sendNewsletterNotification } from '@/lib/mailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Public subscribe action (used by the footer form). Used with
 * useActionState returns { success } or { error }.
 */
export async function subscribeNewsletter(_prevState, formData) {
    // Honeypot bots fill hidden fields; humans never see them.
    if (String(formData.get('company_website') || '').trim() !== '') {
        return { success: 'Thanks for subscribing!' };
    }

    const email = String(formData.get('email') || '').trim();
    const source = String(formData.get('source') || 'Website').trim();

    if (!EMAIL_RE.test(email)) {
        return { error: 'Please enter a valid email address.' };
    }

    try {
        const result = await addSubscriber(email, source);
        if (result.duplicate) {
            return { success: "You're already subscribed — thank you!" };
        }
    } catch {
        return {
            error: 'Sorry, we could not subscribe you right now. Please try again later.',
        };
    }

    // Notify the admin inbox (best effort — never blocks the signup).
    try {
        await sendNewsletterNotification({ email, source });
    } catch (err) {
        console.error('Newsletter notification email failed:', err);
    }

    return { success: 'Thanks for subscribing!' };
}

/** Admin-only: remove a subscriber. */
export async function deleteSubscriberAction(formData) {
    const admin = await getAdminOrNull();
    if (!admin) redirect('/admin/login');

    const id = String(formData.get('id') || '').trim();
    await deleteSubscriber(id);
    revalidatePath('/admin/newsletter');
    redirect('/admin/newsletter');
}
