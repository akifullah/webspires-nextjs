// Google Tag Manager configuration + helpers.
//
// The container ID lives in the environment (NEXT_PUBLIC_GTM_ID) so it is never
// hardcoded and can differ per deployment.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Load GTM in production automatically. In development it stays OFF unless
// NEXT_PUBLIC_GTM_ENABLE_DEV is explicitly set to "true", so local work and
// automated tests don't pollute analytics.
export const gtmEnabled =
  Boolean(GTM_ID) &&
  (process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_GTM_ENABLE_DEV === "true");

// Push a pageview to the dataLayer. Next.js client-side (SPA) navigation does
// not trigger a full document load, so GTM's built-in History/pageview trigger
// won't fire on route changes — we push one explicitly.
export function pageview(url) {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event: "pageview", page: url });
}
