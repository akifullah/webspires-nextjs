import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { timingSafeEqual } from 'node:crypto';
import { getSession } from '@/lib/session';
import { verifyUserCredentials } from '@/lib/users';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/** Constant-time string comparison to avoid timing attacks. */
function safeEqual(a = '', b = '') {
    const bufA = Buffer.from(String(a));
    const bufB = Buffer.from(String(b));
    if (bufA.length !== bufB.length) {
        // Still run a comparison to keep timing roughly constant.
        timingSafeEqual(bufA, bufA);
        return false;
    }
    return timingSafeEqual(bufA, bufB);
}

/**
 * Validate a login against BOTH the built-in env admin (always available,
 * even if the DB is down) and the `users` table created from the admin.
 * Returns true when either matches.
 */
export async function validateCredentials(username, password) {
    // 1. Built-in env admin (bootstrap account).
    if (
        ADMIN_USERNAME &&
        ADMIN_PASSWORD &&
        safeEqual(username, ADMIN_USERNAME) &&
        safeEqual(password, ADMIN_PASSWORD)
    ) {
        return true;
    }

    // 2. Database users. Guarded so a DB outage never breaks the env admin.
    try {
        const user = await verifyUserCredentials(username, password);
        if (user) return true;
    } catch {
        // ignore DB errors here the env admin above still works
    }

    return false;
}

/**
 * Verify the admin session. Memoised per render pass so multiple
 * components can call it without repeated work.
 */
export const verifyAdmin = cache(async () => {
    const session = await getSession();
    if (!session?.username || session.role !== 'admin') return null;
    return { username: session.username, role: session.role };
});

/** Use in admin pages/layouts redirects to login if unauthenticated. */
export async function requireAdmin() {
    const admin = await verifyAdmin();
    if (!admin) redirect('/admin/login');
    return admin;
}

/** Use in Server Actions / Route Handlers returns the admin or null. */
export async function getAdminOrNull() {
    return verifyAdmin();
}
