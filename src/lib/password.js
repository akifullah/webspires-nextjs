import 'server-only';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

// Password hashing with Node's built-in scrypt (no external dependency).
// Stored format: scrypt$<saltHex>$<hashHex>
const KEYLEN = 64;

export function hashPassword(password) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(String(password), salt, KEYLEN).toString('hex');
    return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password, stored) {
    if (typeof stored !== 'string') return false;
    const parts = stored.split('$');
    if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
    const [, salt, hashHex] = parts;
    const expected = Buffer.from(hashHex, 'hex');
    let actual;
    try {
        actual = scryptSync(String(password), salt, expected.length);
    } catch {
        return false;
    }
    if (actual.length !== expected.length) return false;
    return timingSafeEqual(actual, expected);
}
