"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GTM_ID, gtmEnabled, pageview } from "@/lib/gtm";

// Fires a dataLayer pageview on every client-side route change.
// Kept in its own component behind <Suspense> because useSearchParams() opts its
// subtree into dynamic rendering — isolating it here stops that from bubbling up
// and forcing the whole app to render dynamically.
function GtmPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const qs = searchParams?.toString();
    pageview(qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

// Note: the <Script> id must NOT be "dataLayer" (or anything a global reads) —
// an element id becomes window[id] and would shadow window.dataLayer. Same class
// of bug that stopped Smartlook loading when its id was "smartlook".
export default function GoogleTagManager() {
  if (!gtmEnabled) return null;

  return (
    <>
      {/* Initialise dataLayer before the GTM loader runs. */}
      <Script id="gtm-datalayer-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>

      {/* Standard GTM loader. afterInteractive is the App Router idiom for the
          "paste in <head>" analytics snippet — Next injects it after hydration. */}
      <Script id="gtm-base" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      <Suspense fallback={null}>
        <GtmPageview />
      </Suspense>
    </>
  );
}
