'use server';

import { sendContactEmail, sendEnquiryConfirmation } from '@/lib/mailer';
import { createInquiry } from '@/lib/inquiries';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ATTACH = 10 * 1024 * 1024; // 10 MB
const ATTACH_TYPES = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
]);

export async function submitContact(_prevState, formData) {
    // Honeypot bots fill hidden fields; humans never see them.
    if (String(formData.get('company_website') || '').trim() !== '') {
        return { success: true };
    }

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const source = String(formData.get('source') || 'Website').trim();

    if (!name || name.length < 2) {
        return { error: 'Please enter your name.' };
    }
    if (!EMAIL_RE.test(email)) {
        return { error: 'Please enter a valid email address.' };
    }
    if (!message || message.length < 10) {
        return { error: 'Please enter a message (at least 10 characters).' };
    }

    let attachment = null;
    const file = formData.get('file');
    if (file && typeof file !== 'string' && file.size > 0) {
        if (file.size > MAX_ATTACH) {
            return { error: 'Attachment is too large (max 10 MB).' };
        }
        if (file.type && !ATTACH_TYPES.has(file.type)) {
            return {
                error: 'Unsupported attachment type (PDF, DOC, DOCX, PNG, JPG only).',
            };
        }
        attachment = {
            filename: file.name || 'attachment',
            contentType: file.type || undefined,
            buffer: Buffer.from(await file.arrayBuffer()),
        };
    }

    // Save to the database first this is what the admin "Inquiries" page
    // reads. It's the source of truth, so a successful save means success even
    // if the notification email later fails.
    let saved = false;
    try {
        await createInquiry({ name, email, phone, service, message, source });
        saved = true;
    } catch (err) {
        console.error('Inquiry save failed:', err);
    }

    // Send the notification email (best effort). Attachments only go by email.
    try {
        await sendContactEmail({
            name,
            email,
            phone,
            service,
            message,
            attachment,
            source,
        });
    } catch (err) {
        console.error('Contact email failed:', err);
        // Only surface an error if we also failed to persist the inquiry.
        if (!saved) {
            return {
                error:
                    'Sorry, we could not send your message right now. Please email us directly at info@webspires.co.uk.',
            };
        }
    }

    // Auto-reply to the enquirer (best effort — never blocks the submission).
    try {
        await sendEnquiryConfirmation({ name, email, message });
    } catch (err) {
        console.error('Enquiry confirmation email failed:', err);
    }

    return { success: true };
}
