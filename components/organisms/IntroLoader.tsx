'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const SESSION_KEY = 'chacal-intro-seen';
const FINAL_IMAGE = '/chacal-paisaje-.webp';

export function IntroLoader() {
  
  const [showLoader, setShowLoader] = useState(false);
  // Stages: initial -> expand (image in) -> complete
  const [stage, setStage] = useState<'initial' | 'expand' | 'complete'>('initial');
  
  const initializedRef = useRef(false);

  // Check session storage
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    // Only run on client
    const shouldShow = typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY);

    if (shouldShow) {
      // Use requestAnimationFrame to avoid synchronous setState warning and ensure smooth start
      requestAnimationFrame(() => {
        setShowLoader(true);
        document.body.style.overflow = 'hidden';
        // Small delay to ensure initial render allows for animation
        setTimeout(() => {
          setStage('expand');
        }, 100);
      });
    }
  }, []);

  // Sequence Controller
  useEffect(() => {
    if (!showLoader) return;

    let timer: NodeJS.Timeout;

    if (stage === 'expand') {
      // Wait for expansion to finish before removing loader
      timer = setTimeout(() => {
        setStage('complete');
        setShowLoader(false);
        sessionStorage.setItem(SESSION_KEY, 'true');
        document.body.style.overflow = '';
      }, 2600); // Expansion duration + buffer
    }

    return () => clearTimeout(timer);
  }, [stage, showLoader]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-9999 flex items-center justify-center bg-[#2F2E59]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Reveal */}
        <motion.div
          className="relative overflow-hidden shadow-2xl flex items-center justify-center z-10"
          initial={{
            width: 0,
            height: 0,
          }}
          animate={stage === 'expand' ? {
            width: '100vw',
            height: '100vh',
            opacity: 1,
            borderRadius: 0
          } : {
            width: 0,
            height: 0,
            opacity: 0,
          }}
          transition={{
            duration: 2.5,
            ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for dramatic expansion
          }}
        >
          <Image
            src={FINAL_IMAGE}
            alt="Intro"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlays to match site style */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-linear-to-r from-[#2F2E59]/30 via-transparent to-[#2F2E59]/30" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
