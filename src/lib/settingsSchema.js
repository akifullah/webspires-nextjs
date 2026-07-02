// src/lib/settingsSchema.js
// Pure (client + server) descriptors and helpers for global site settings.
// No `server-only`, no DB imports so both the admin form (client) and the
// server action can import it. Mirrors the contentSchemas.js pattern.

/** Social platforms shown in the settings form and rendered in the footer. */
export const SOCIAL_PLATFORMS = [
    { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/…' },
    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/…' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/…' },
    { key: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/…' },
    { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@…' },
    { key: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/44…' },
    { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@…' },
];

/** Grouped, editable text/image fields (social handled separately). */
export const SETTINGS_SECTIONS = [
    {
        title: 'Branding',
        fields: [
            { name: 'siteName', label: 'Site name', type: 'text' },
            {
                name: 'description',
                label: 'Site description / tagline',
                type: 'textarea',
                hint: 'Used for the default SEO meta description and the footer blurb.',
            },
            {
                name: 'logoHeader',
                label: 'Header logo',
                type: 'image',
                hint: 'Shown in the top navigation bar. A wide/horizontal logo works best.',
            },
            {
                name: 'logoFooter',
                label: 'Footer logo',
                type: 'image',
                hint: 'Shown in the footer on a dark background (a white/light logo works best).',
            },
            {
                name: 'ogImage',
                label: 'Preview / social share image',
                type: 'image',
                hint: 'Shown when your site is shared on social media, and used as the app touch icon.',
            },
            {
                name: 'favicon',
                label: 'Favicon (browser tab icon)',
                type: 'image',
                hint: 'The small icon shown in the browser tab. A square PNG (e.g. 32×32 or 512×512) or .ico works best.',
            },
        ],
    },
    {
        title: 'Contact details',
        fields: [
            { name: 'phone', label: 'Phone (display)', type: 'text', hint: 'e.g. +44 161 524 1569' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'addressLine', label: 'Address (one line)', type: 'text', hint: 'Shown in the footer.' },
            { name: 'mapsUrl', label: 'Google Maps link', type: 'text' },
            { name: 'bookCallUrl', label: '“Book a Call” button URL', type: 'text' },
        ],
    },
    {
        title: 'Structured address (for SEO / Google)',
        fields: [
            { name: 'addressStreet', label: 'Street address', type: 'text' },
            { name: 'addressLocality', label: 'City / town', type: 'text' },
            { name: 'addressPostalCode', label: 'Postcode', type: 'text' },
            { name: 'addressCountry', label: 'Country code', type: 'text', hint: 'ISO code, e.g. GB' },
        ],
    },
];

/** Every non-social field name, flattened. */
export const SETTINGS_FIELD_NAMES = SETTINGS_SECTIONS.flatMap((s) =>
    s.fields.map((f) => f.name)
);

/**
 * Built-in defaults these mirror the values that were previously hard-coded
 * across the header, footer and layout, so the live site looks identical
 * until something is edited in the admin.
 */
export const DEFAULT_SETTINGS = {
    siteName: 'Webspires',
    description:
        "Looking for the best Web Design Agency UK? Webspires builds websites that help your business grow and stand out online. We offer web development, SEO, social media, Google Ads, Meta Ads & more.",
    logoHeader: '/images/webspires.png',
    logoFooter: '/images/webspires-logo-light.png',
    ogImage: '/images/webspires-logo-icon.png',
    favicon: '/favicon.ico',

    phone: '+44 161 524 1569',
    email: 'info@webspires.co.uk',
    addressLine: '39A Manchester Rd, Bolton BL3 2NZ, UK',
    mapsUrl: 'https://maps.google.com/?q=39A+Manchester+Rd+Bolton+BL3+2NZ',
    bookCallUrl: 'https://call.webspires.co.uk?utm_source=websiteheader',

    addressStreet: '39A Manchester Rd',
    addressLocality: 'Bolton',
    addressPostalCode: 'BL3 2NZ',
    addressCountry: 'GB',

    social: {
        facebook: 'https://facebook.com/webspires',
        instagram: 'https://instagram.com/webspires',
        linkedin: 'https://linkedin.com/company/webspires',
        twitter: 'https://twitter.com/webspires',
        youtube: 'https://youtube.com/@webspires',
        whatsapp: '',
        tiktok: '',
    },
};

/** Merge stored settings over the defaults (deep-merging `social`). */
export function mergeSettings(data) {
    const d = data && typeof data === 'object' ? data : {};
    return {
        ...DEFAULT_SETTINGS,
        ...d,
        social: { ...DEFAULT_SETTINGS.social, ...(d.social || {}) },
    };
}

/** Whitelist + trim raw form values into a clean settings object to store. */
export function cleanSettings(raw = {}) {
    const out = {};
    for (const name of SETTINGS_FIELD_NAMES) {
        out[name] = String(raw?.[name] ?? '').trim();
    }
    const social = {};
    for (const p of SOCIAL_PLATFORMS) {
        social[p.key] = String(raw?.social?.[p.key] ?? '').trim();
    }
    out.social = social;
    return out;
}

/** Build a `tel:` href from a display phone number. */
export function telHref(phone = '') {
    const cleaned = String(phone).replace(/[^\d+]/g, '');
    return cleaned ? `tel:${cleaned}` : '';
}

/** Ordered list of non-empty social {key,label,href} for rendering. */
export function socialList(settings) {
    const social = settings?.social || {};
    return SOCIAL_PLATFORMS.map((p) => ({
        key: p.key,
        label: p.label,
        href: social[p.key] || '',
    })).filter((s) => s.href);
}
