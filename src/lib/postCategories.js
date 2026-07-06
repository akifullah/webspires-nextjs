import 'server-only';
import { getContentItems } from '@/lib/content';
import { getAllCategories } from '@/lib/blog';

/**
 * Names for the blog post category picker: the managed categories
 * (admin → Categories) merged with any categories already used by posts,
 * de-duplicated and sorted. Safe against DB errors (returns what it can).
 */
export async function getPostCategoryNames() {
    const [managed, used] = await Promise.all([
        getContentItems('blogCategories').catch(() => []),
        getAllCategories().catch(() => []),
    ]);

    const names = new Set();
    for (const c of managed) {
        if (c?.name) names.add(String(c.name).trim());
    }
    for (const c of used) {
        if (c) names.add(String(c).trim());
    }
    return [...names].filter(Boolean).sort((a, b) => a.localeCompare(b));
}
