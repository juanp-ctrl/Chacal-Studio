'use client';

import Script from 'next/script';
import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_MEASUREMENT_ID = 'G-6C1MS2BX21';

// Declare gtag on window for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// Helper to check consent from localStorage
function getConsentFromStorage(): boolean | null {
  if (typeof window === 'undefined') return null;
  const consent = localStorage.getItem('chacal-cookie-consent');
  return consent === 'accepted';
}

// Inner component that uses useSearchParams (requires Suspense boundary)
function GoogleAnalyticsInner() {
  // Lazy initialization - runs only once on mount, avoids useEffect setState
  const [hasConsent, setHasConsent] = useState<boolean | null>(() => getConsentFromStorage());
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Listen for consent changes (custom event dispatched by CookieBanner)
    const handleConsentChange = () => {
      setHasConsent(getConsentFromStorage());
    };

    // Listen for storage changes (in case consent is changed in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chacal-cookie-consent') {
        setHasConsent(e.newValue === 'accepted');
      }
    };

    window.addEventListener('cookie-consent-change', handleConsentChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('cookie-consent-change', handleConsentChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (hasConsent !== true || typeof window === 'undefined' || !window.gtag) {
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams, hasConsent]);

  // Update consent mode when consent changes
  useEffect(() => {
    if (typeof window === 'undefined' || hasConsent === null) return;

    // If gtag exists, update consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: hasConsent ? 'granted' : 'denied',
      });
    }
  }, [hasConsent]);

  // Don't render scripts if consent hasn't been checked yet or was declined
  if (hasConsent !== true) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Set default consent to granted since user accepted
          gtag('consent', 'default', {
            'analytics_storage': 'granted'
          });
          
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}

// Wrapper component with Suspense boundary
export function GoogleAnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}

// Helper function to track page views (can be used in other components)
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// Helper function to track events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
