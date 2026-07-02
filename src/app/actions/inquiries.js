'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminOrNull } from '@/lib/auth';
import { setInquiryStatus, deleteInquiry } from '@/lib/inquiries';

export async function markInquiryAction(formData) {
    const admin = await getAdminOrNull();
    if (!admin) redirect('/admin/login');

    const id = String(formData.get('id') || '').trim();
    const status = String(formData.get('status') || 'read');
    const back = String(formData.get('back') || '/admin/inquiries');

    await setInquiryStatus(id, status);
    revalidatePath('/admin/inquiries');
    revalidatePath(`/admin/inquiries/${id}`);
    redirect(back);
}

export async function deleteInquiryAction(formData) {
    const admin = await getAdminOrNull();
    if (!admin) redirect('/admin/login');

    const id = String(formData.get('id') || '').trim();
    await deleteInquiry(id);
    revalidatePath('/admin/inquiries');
    redirect('/admin/inquiries');
}
