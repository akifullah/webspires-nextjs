import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses
  compress: true,

  // Optimise images: allow modern formats, set sensible device sizes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webspires.co.uk',
        pathname: '/wp-content/uploads/**',
      },
      {
        // Cloudflare R2 media library (served via the custom domain).
        protocol: 'https',
        hostname: 'uploads.webspires.co.uk',
        pathname: '/**',
      },
    ],
  },

  // Strict mode for better React warnings
  reactStrictMode: true,

  // Experimental: optimise CSS
  experimental: {
    optimizeCss: false, // keep off unless critters is installed
  },

  // Permanent redirects. Every historical service slug (original
  // keyword-stuffed names AND the later short names) points directly to
  // its newest silo URL — no redirect chains.
  async redirects() {
    const redirects = [];

    // Service slug history → newest slug
    const serviceSlugMap = {
      'professional-seo-services': 'seo',
      'google-ads-management-services': 'google-ads-management',
      'google-ads': 'google-ads-management',
      'meta-ads-agency-services': 'meta-ads-management',
      'meta-ads': 'meta-ads-management',
      'shopify-development-services': 'shopify-development',
      'shopify': 'shopify-development',
      'crm-development-services': 'crm-development',
      'crm-services': 'crm-development',
      'social-media-management-services': 'social-media-management',
      'social-media-marketing': 'social-media-management',
      'google-guarantee-services': 'google-guarantee',
    };
    for (const [oldSlug, newSlug] of Object.entries(serviceSlugMap)) {
      redirects.push({
        source: `/services/${oldSlug}`,
        destination: `/services/${newSlug}`,
        permanent: true,
      });
    }

    // Legacy bare paths (the originally incorrect canonicals) → newest
    const bareLegacy = {
      'professional-seo-services': 'seo',
      'google-ads-management-services': 'google-ads-management',
      'meta-ads-agency-services': 'meta-ads-management',
      'shopify-development-services': 'shopify-development',
      'crm-development-services': 'crm-development',
      'social-media-management-services': 'social-media-management',
      'google-guarantee-services': 'google-guarantee',
    };
    for (const [oldSlug, newSlug] of Object.entries(bareLegacy)) {
      redirects.push({
        source: `/${oldSlug}`,
        destination: `/services/${newSlug}`,
        permanent: true,
      });
    }

    // Industry slug renames
    redirects.push(
      { source: '/industries/b2b', destination: '/industries/b2b-companies', permanent: true },
      { source: '/industries/healthcare', destination: '/industries/healthcare-clinics', permanent: true },
    );

    // Top-level route renames + legacy pre-rebuild WordPress routes
    redirects.push(
      { source: '/service', destination: '/services', permanent: true },
      { source: '/web-development', destination: '/services/web-design', permanent: true },
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
    );

    // GEO short slug → full canonical slug
    redirects.push(
      { source: '/services/geo', destination: '/services/generative-engine-optimisation', permanent: true },
    );

    // National SEO killed and merged into the SEO hub (every head term ~50/mo;
    // its only distinct job, national vs local, lives on the hub now).
    redirects.push(
      { source: '/services/seo/national-seo', destination: '/services/seo', permanent: true },
    );

    return redirects;
  },

  // Security / performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Cache static assets for 1 year
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Any *.vercel.app host (preview + the staging alias) is a duplicate of
        // production and must never be indexed. noindex is the instruction;
        // the canonical is only a hint. Production (webspires.co.uk) is unaffected.
        source: '/:path*',
        has: [{ type: 'host', value: '(.*\\.)?vercel\\.app' }],
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry org/project for source map upload (from the wizard invocation).
  org: "webspires-ltd",
  project: "webspires-nextjs",

  // Source maps are uploaded at build time only when SENTRY_AUTH_TOKEN is set
  // in the build environment (e.g. Vercel). Missing token => upload is skipped,
  // it does not fail the build.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI.
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time).
  widenClientFileUpload: true,

  // Route Sentry requests through /monitoring to bypass ad-blockers.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size.
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
