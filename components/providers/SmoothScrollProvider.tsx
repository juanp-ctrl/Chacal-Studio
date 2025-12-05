'use client';

import { ReactNode, useEffect, useRef, Suspense, RefObject } from 'react';
import Lenis from 'lenis';
import { usePathname, useSearchParams } from 'next/navigation';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

function ScrollHandler({ lenisRef }: { lenisRef: RefObject<Lenis | null> }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname, searchParams, lenisRef]);

  return null;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion is preferred, do not initialize Lenis
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2.2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ScrollHandler lenisRef={lenisRef} />
      </Suspense>
      {children}
    </>
  );
}
