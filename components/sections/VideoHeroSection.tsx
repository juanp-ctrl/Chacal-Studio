'use client';

import Image from 'next/image';
import { motion, Transition } from 'motion/react';
import { useEffect, useState } from 'react';

// This will be replaced with a video in the future
const HERO_MEDIA_URL = '/chacal-paisaje-.webp';

export function VideoHeroSection() {
  const [hasSeenIntro, setHasSeenIntro] = useState(true);

  useEffect(() => {
    // Check if intro was seen
    const seen = sessionStorage.getItem('chacal-intro-seen');
    if (!seen) {
      setTimeout(() => setHasSeenIntro(false), 0);
    }
  }, []);

  // Define animation states
  // If intro NOT seen yet (hasSeenIntro = false), start fully visible (seamless transition)
  // If intro SEEN (hasSeenIntro = true), use standard fade in
  const initial = !hasSeenIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 };

  const target = { opacity: 1, scale: 1 };

  const transition: Transition = !hasSeenIntro
    ? { duration: 0 } // No animation when coming from intro
    : { duration: 1.2, ease: 'easeOut' };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image/Video */}
      <motion.div
        className="absolute inset-0"
        initial={initial}
        animate={target}
        transition={transition}
      >
        <Image
          src={HERO_MEDIA_URL}
          alt="Patagonia landscape - Chacal Studio"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Gradient overlays for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2F2E59]/30 via-transparent to-[#2F2E59]/30" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-28 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: !hasSeenIntro ? 0.5 : 1, duration: 0.8 }}
      >
        <motion.div
          className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="mt-2 h-3 w-1.5 rounded-full bg-white/80"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
