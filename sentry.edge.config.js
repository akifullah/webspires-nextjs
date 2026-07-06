// Sentry initialisation for the Edge runtime (middleware, edge routes).
// Imported by src/instrumentation.js when NEXT_RUNTIME === "edge".
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only report from production — keeps local errors out of the dashboard.
  enabled: process.env.NODE_ENV === "production",

  // Capture 10% of transactions for performance monitoring (free-tier friendly).
  tracesSampleRate: 0.1,

  debug: false,
});
