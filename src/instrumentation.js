// Server-side instrumentation hub. Next.js calls register() once per server
// instance; we load the Sentry config for whichever runtime is active.
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Forwards errors thrown in Server Components, Route Handlers, Server Actions,
// etc. to Sentry (Next.js 15+ onRequestError hook).
export const onRequestError = Sentry.captureRequestError;
