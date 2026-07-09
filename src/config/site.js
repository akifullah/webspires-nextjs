const PRODUCTION_URL = 'https://webspires.co.uk';

/**
 * Resolve the canonical site origin.
 *
 * Dev vs prod is decided by NODE_ENV (set automatically by `next dev` vs
 * `next build`), never by a custom flag that can be mis-set in the Vercel
 * environment. A localhost value can therefore NEVER reach a production build:
 * a localhost NEXT_PUBLIC_BASE_URL in production throws loudly, and a missing
 * value falls back to the real production host (not localhost).
 */
function resolveSiteUrl() {
    if (process.env.NODE_ENV === 'development') {
        return process.env.NEXT_PUBLIC_LOCAL_URL || 'http://localhost:3000';
    }
    const configured = process.env.NEXT_PUBLIC_BASE_URL;
    if (configured && configured.includes('localhost')) {
        throw new Error(
            `NEXT_PUBLIC_BASE_URL is a localhost URL ("${configured}") in a production ` +
            `build. Set it to ${PRODUCTION_URL} or leave it unset.`
        );
    }
    return configured || PRODUCTION_URL;
}

export const siteConfig = {
    name: 'Webspires',
    url: resolveSiteUrl(),
    description:
        'Grow your business with a trusted digital marketing agency in the UK. We build high-performance websites, SEO strategies, and ROI-driven solutions.',
    defaultImage: '/images/webspires-logo-icon.png',
    twitter: '@webspires',
};