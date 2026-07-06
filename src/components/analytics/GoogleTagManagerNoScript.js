import { GTM_ID, gtmEnabled } from "@/lib/gtm";

// <noscript> fallback for GTM. Must be rendered immediately after the opening
// <body> tag. Server component (no "use client") so it ships in the initial HTML.
export default function GoogleTagManagerNoScript() {
  if (!gtmEnabled) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
