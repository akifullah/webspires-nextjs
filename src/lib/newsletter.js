import 'server-only';
import { getSupabase, isValidId, UNIQUE_VIOLATION } from '@/lib/supabase';

/* Newsletter subscribers stored in the `newsletter_subscribers` table. */

function serialize(row) {
    if (!row) return null;
    return {
        id: String(row.id),
        email: row.email || '',
        source: row.source || 'Website',
        createdAt: row.created_at
            ? new Date(row.created_at).toISOString()
            : null,
    };
}

/**
 * Add a subscriber. Returns { ok } on success, { duplicate } if the email
 * is already subscribed, or throws on other DB errors.
 */
export async function addSubscriber(email, source = 'Website') {
    const supabase = getSupabase();
    const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: String(email).toLowerCase().trim(), source });
    if (error) {
        if (error.code === UNIQUE_VIOLATION) return { duplicate: true };
        throw error;
    }
    return { ok: true };
}

export async function listSubscribers() {
    const supabase = getSupabase();
    const { data } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
    return (data || []).map(serialize);
}

export async function countSubscribers() {
    const supabase = getSupabase();
    const { count } = await supabase
        .from('newsletter_subscribers')
        .select('id', { count: 'exact', head: true });
    return count || 0;
}

export async function deleteSubscriber(id) {
    if (!isValidId(id)) return;
    const supabase = getSupabase();
    await supabase.from('newsletter_subscribers').delete().eq('id', id);
}
