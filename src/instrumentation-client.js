// Sentry initialisation for the browser.
// In Next.js 15.3+/16 this `instrumentation-client` file replaces the legacy
// `sentry.client.config` — it runs after the HTML loads but before hydration.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only report from production — keeps local errors out of the dashboard.
  enabled: process.env.NODE_ENV === "production",

  // Capture 10% of transactions for performance monitoring (free-tier friendly).
  tracesSampleRate: 0.1,

  debug: false,
});

// Lets Sentry tie navigation spans to client-side (App Router) route changes.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
