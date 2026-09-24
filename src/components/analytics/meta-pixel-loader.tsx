"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { analyticsConfig } from "@/config/analytics";
import {
  pageview,
  trackViewConfrontoPage,
  trackViewPilotPage,
} from "@/lib/analytics/meta-pixel";

type MetaPixelLoaderProps = {
  consentGranted: boolean;
};

export function MetaPixelLoader({ consentGranted }: MetaPixelLoaderProps) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const trackedUrls = useRef(new Set<string>());
  const trackedCustomEvents = useRef(new Set<string>());

  useEffect(() => {
    const currentUrl = `${pathname}${window.location.search}`;

    if (
      !analyticsConfig.metaPixel.isConfigured ||
      !consentGranted ||
      !isReady ||
      trackedUrls.current.has(currentUrl)
    ) {
      return;
    }

    pageview();
    trackedUrls.current.add(currentUrl);

    if (
      pathname === "/percorso-pilota" &&
      !trackedCustomEvents.current.has("ViewPilotPage")
    ) {
      trackViewPilotPage();
      trackedCustomEvents.current.add("ViewPilotPage");
    }

    if (
      pathname === "/confronto" &&
      !trackedCustomEvents.current.has("ViewConfrontoPage")
    ) {
      trackViewConfrontoPage();
      trackedCustomEvents.current.add("ViewConfrontoPage");
    }
  }, [consentGranted, isReady, pathname]);

  if (!analyticsConfig.metaPixel.isConfigured || !consentGranted) {
    return null;
  }

  return (
    <Script
      id="mf-meta-pixel"
      onReady={() => {
        const currentUrl = `${window.location.pathname}${window.location.search}`;

        trackedUrls.current.add(currentUrl);

        if (
          window.location.pathname === "/percorso-pilota" &&
          !trackedCustomEvents.current.has("ViewPilotPage")
        ) {
          trackViewPilotPage();
          trackedCustomEvents.current.add("ViewPilotPage");
        }

        if (
          window.location.pathname === "/confronto" &&
          !trackedCustomEvents.current.has("ViewConfrontoPage")
        ) {
          trackViewConfrontoPage();
          trackedCustomEvents.current.add("ViewConfrontoPage");
        }

        setIsReady(true);
      }}
      strategy="afterInteractive"
    >
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${analyticsConfig.metaPixel.pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
