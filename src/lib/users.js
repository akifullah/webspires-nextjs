import 'server-only';
import { getSupabase, isValidId } from '@/lib/supabase';
import { hashPassword, verifyPassword } from '@/lib/password';

/* Admin users stored in the `users` table. Passwords are scrypt-hashed;
   the plain password is never stored or returned. */

function serialize(row) {
    if (!row) return null;
    return {
        id: String(row.id),
        username: row.username,
        name: row.name || '',
        role: row.role || 'admin',
        createdAt: row.created_at
            ? new Date(row.created_at).toISOString()
            : null,
    };
}

export async function listUsers() {
    const supabase = getSupabase();
    const { data } = await supabase
        .from('users')
        .select('id, username, name, role, created_at')
        .order('created_at', { ascending: true });
    return (data || []).map(serialize);
}

export async function getUserByUsername(username) {
    const supabase = getSupabase();
    const { data } = await supabase
        .from('users')
        .select('*')
        .eq('username', String(username).toLowerCase())
        .maybeSingle();
    return data || null;
}

export async function userCount() {
    const supabase = getSupabase();
    const { count } = await supabase
        .from('users')
        .select('id', { count: 'exact', head: true });
    return count || 0;
}

/** Create a user. Returns { user } or { error }. */
export async function createUser({ username, password, name = '', role = 'admin' }) {
    const uname = String(username || '').trim().toLowerCase();
    if (!/^[a-z0-9._-]{3,40}$/.test(uname)) {
        return {
            error: 'Username must be 3–40 chars: letters, numbers, dot, dash or underscore.',
        };
    }
    if (String(password || '').length < 8) {
        return { error: 'Password must be at least 8 characters.' };
    }

    const supabase = getSupabase();
    const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('username', uname)
        .maybeSingle();
    if (existing) return { error: 'That username is already taken.' };

    const { data, error } = await supabase
        .from('users')
        .insert({
            username: uname,
            name: String(name || '').trim(),
            role: role === 'editor' ? 'editor' : 'admin',
            password_hash: hashPassword(password),
        })
        .select('id, username, name, role, created_at')
        .single();
    if (error) return { error: `Could not create user: ${error.message}` };
    return { user: serialize(data) };
}

export async function deleteUser(id) {
    if (!isValidId(id)) return;
    const supabase = getSupabase();
    await supabase.from('users').delete().eq('id', id);
}

/** Verify a username/password against the DB. Returns the user or null. */
export async function verifyUserCredentials(username, password) {
    const user = await getUserByUsername(username);
    if (!user) return null;
    if (!verifyPassword(password, user.password_hash)) return null;
    return serialize(user);
}
