'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const SESSION_KEY = 'chacal-intro-seen';
const FINAL_IMAGE = '/chacal-paisaje-.webp';

const CONTENT = {
  es: {
    title: "Comunicando lo humano",
    subtitle: "Con un foco socio ambiental"
  },
  en: {
    title: "Communicating the human",
    subtitle: "With a socio-environmental focus"
  }
};

export function IntroLoader() {
  const locale = useLocale();
  const t = CONTENT[locale as keyof typeof CONTENT] || CONTENT.en;
  
  const [showLoader, setShowLoader] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  // Stages: initial -> title-in -> subtitle-in -> expand (text out + image in) -> complete
  const [stage, setStage] = useState<'initial' | 'title-in' | 'subtitle-in' | 'expand' | 'complete'>('initial');
  
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
        setStage('title-in');
      });
    }
  }, []);

  // Sequence Controller
  useEffect(() => {
    if (!showLoader) return;

    let timer: NodeJS.Timeout;

    if (stage === 'title-in') {
      // Show subtitle after title animation
      timer = setTimeout(() => {
        setStage('subtitle-in');
      }, 1200);
    } else if (stage === 'subtitle-in') {
      // Allow time for typing and reading
      timer = setTimeout(() => {
        setStage('expand');
      }, 3000);
    } else if (stage === 'expand') {
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

  // Typing Effect
  useEffect(() => {
    if (stage === 'subtitle-in') {
      const fullText = t.subtitle;
      let index = 0;
      setDisplayedText(''); // Start empty

      const interval = setInterval(() => {
        index++;
        setDisplayedText(fullText.slice(0, index));
        if (index >= fullText.length) {
          clearInterval(interval);
        }
      }, 50); // Typing speed

      return () => clearInterval(interval);
    }
  }, [stage, t.subtitle]);

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
        {/* Text Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
          <AnimatePresence>
            {/* Title: Left to Center */}
            {(stage === 'title-in' || stage === 'subtitle-in') && (
              <motion.h1
                key="title"
                initial={{ x: -1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ y: -500, opacity: 0 }} // Center to Top
                transition={{ duration: 0.8, ease: "easeOut"}}
                className="text-white font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 text-center leading-tight"
              >
                {t.title}
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {/* Subtitle: Typing Animation */}
            {(stage === 'subtitle-in') && (
              <motion.div
                key="subtitle"
                exit={{ y: 500, opacity: 0 }} // Center to Bottom/Right
                transition={{ duration: 0.8, ease: "easeIn" }}
                className="text-white/90 font-sans text-lg sm:text-2xl md:text-3xl font-light tracking-wide text-center h-8 sm:h-10 flex items-center justify-center"
              >
                <span>
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="inline-block w-[3px] h-[1.1em] bg-white ml-1 align-middle"
                  />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
