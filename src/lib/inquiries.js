import 'server-only';
import { getSupabase, isValidId } from '@/lib/supabase';

/* Contact-form submissions ("inquiries") stored in the `inquiries` table. */

function serialize(row) {
    if (!row) return null;
    return {
        id: String(row.id),
        name: row.name || '',
        email: row.email || '',
        phone: row.phone || '',
        service: row.service || '',
        message: row.message || '',
        source: row.source || 'Website',
        status: row.status || 'new',
        createdAt: row.created_at
            ? new Date(row.created_at).toISOString()
            : null,
    };
}

/** Insert a new inquiry. Throws on DB error (caller decides how to handle). */
export async function createInquiry({
    name,
    email,
    phone = '',
    service = '',
    message,
    source = 'Website',
}) {
    const supabase = getSupabase();
    const { error } = await supabase.from('inquiries').insert({
        name,
        email,
        phone,
        service,
        message,
        source,
        status: 'new',
    });
    if (error) throw error;
}

export async function listInquiries() {
    const supabase = getSupabase();
    const { data } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
    return (data || []).map(serialize);
}

export async function getInquiry(id) {
    if (!isValidId(id)) return null;
    const supabase = getSupabase();
    const { data } = await supabase
        .from('inquiries')
        .select('*')
        .eq('id', id)
        .maybeSingle();
    return serialize(data);
}

export async function countNewInquiries() {
    const supabase = getSupabase();
    const { count } = await supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new');
    return count || 0;
}

export async function setInquiryStatus(id, status) {
    if (!isValidId(id)) return;
    const next = status === 'read' ? 'read' : 'new';
    const supabase = getSupabase();
    await supabase.from('inquiries').update({ status: next }).eq('id', id);
}

export async function deleteInquiry(id) {
    if (!isValidId(id)) return;
    const supabase = getSupabase();
    await supabase.from('inquiries').delete().eq('id', id);
}
