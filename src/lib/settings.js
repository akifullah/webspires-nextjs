import 'server-only';
import { cache } from 'react';
import { getSupabase } from '@/lib/supabase';
import {
    SETTINGS_SECTIONS,
    SOCIAL_PLATFORMS,
    DEFAULT_SETTINGS,
    mergeSettings,
} from '@/lib/settingsSchema';

// Global site settings live as a single row in the existing `content`
// table (type = 'settings', slug = 'global'). Reusing that table means no
// extra migration is needed and the jsonb `data` column stores everything.
const SETTINGS_TYPE = 'settings';
const SETTINGS_SLUG = 'global';

/**
 * Read the site settings, merged over the built-in defaults so the site
 * renders identically until a value is edited. Cached per render pass and
 * falls back to defaults if the DB is empty or unreachable (so the public
 * site never breaks because of settings).
 */
export const getSettings = cache(async () => {
    try {
        const supabase = getSupabase();
        const { data: row, error } = await supabase
            .from('content')
            .select('data')
            .eq('type', SETTINGS_TYPE)
            .eq('slug', SETTINGS_SLUG)
            .maybeSingle();
        if (error) throw error;
        return mergeSettings(row?.data);
    } catch {
        return mergeSettings(null);
    }
});

/** Persist settings (upsert the singleton row). Throws on DB error. */
export async function saveSettingsRow(data) {
    const supabase = getSupabase();
    const { error } = await supabase.from('content').upsert(
        {
            type: SETTINGS_TYPE,
            slug: SETTINGS_SLUG,
            sort_order: 0,
            data,
        },
        { onConflict: 'type,slug' }
    );
    if (error) throw error;
}

export { SETTINGS_SECTIONS, SOCIAL_PLATFORMS, DEFAULT_SETTINGS };
