'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const LOADER_IMAGES = [
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800', // Ecosfera Urbana
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', // Conexión Aula
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800', // Raíces del Futuro
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800', // Impacto Visual
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800', // Voces Nativas
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800', // Energía Limpia
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', // Patagonia mountains
];

const SESSION_KEY = 'chacal-intro-seen';

// Scale values: frontmost image stays at 1.0, images behind scale up progressively
const getScaleForImage = (imageIndex: number, currentImageCount: number): number => {
  if (currentImageCount <= 1) return 1;
  const distanceFromFront = currentImageCount - 1 - imageIndex;
  // Each layer behind scales up by 0.1
  return 1 + distanceFromFront * 0.1;
};

// Check session storage - only runs on client
const shouldShowIntro = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !sessionStorage.getItem(SESSION_KEY);
};

export function IntroLoader() {
  const t = useTranslations('IntroLoader');
  const initializedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [textExiting, setTextExiting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const taglines = [t('tagline1'), t('tagline2')];

  // Initialize visibility on mount (runs once)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    if (shouldShowIntro()) {
      // Use requestAnimationFrame to defer state update
      requestAnimationFrame(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
      });
    }
  }, []);

  // Preload images
  useEffect(() => {
    if (!isVisible) return;
    
    LOADER_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.onload = () => setImagesLoaded((prev) => prev + 1);
      img.src = src;
    });
  }, [isVisible]);

  // Image stacking animation sequence
  useEffect(() => {
    if (!isVisible || imagesLoaded < LOADER_IMAGES.length) return;

    // Stagger images appearing
    const imageTimers: NodeJS.Timeout[] = [];
    
    LOADER_IMAGES.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
      }, 300 + index * 450); // Start at 0.3s, 450ms between each
      imageTimers.push(timer);
    });

    return () => imageTimers.forEach(clearTimeout);
  }, [isVisible, imagesLoaded]);

  // Tagline cycling
  useEffect(() => {
    if (!isVisible || visibleImages.length < 3) return;

    const taglineInterval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 1800);

    return () => clearInterval(taglineInterval);
  }, [isVisible, visibleImages.length, taglines.length]);

  // Final expansion and exit sequence
  useEffect(() => {
    if (visibleImages.length !== LOADER_IMAGES.length) return;

    // Wait a moment after last image, then start expansion
    const expansionTimer = setTimeout(() => {
      setTextExiting(true);
      setIsExpanding(true);
    }, 800);

    // Fade out loader after expansion
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem(SESSION_KEY, 'true');
      document.body.style.overflow = '';
    }, 1800);

    return () => {
      clearTimeout(expansionTimer);
      clearTimeout(exitTimer);
    };
  }, [visibleImages.length]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAnimationComplete = useCallback(() => {
    if (!isVisible) {
      document.body.style.overflow = '';
    }
  }, [isVisible]);

  if (!isVisible && visibleImages.length === 0) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#2F2E59' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Top Text - "Comunicando lo humano" */}
          <motion.h1
            className="absolute text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight z-20"
            style={{
              fontFamily: 'var(--font-family-heading)',
              top: '20%',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: textExiting ? 0 : 1,
              y: textExiting ? 0 : 0,
              x: textExiting ? '-100vw' : 0,
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.2 },
              y: { duration: 0.6, delay: 0.2 },
              x: { duration: 0.8, ease: 'easeInOut' },
            }}
          >
            {t('headline')}
          </motion.h1>

          {/* Image Stack Container */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {visibleImages.map((imageIndex) => {
              const scale = getScaleForImage(imageIndex, visibleImages.length);
              const isFrontImage = imageIndex === visibleImages.length - 1;
              
              return (
                <motion.div
                  key={imageIndex}
                  className="absolute rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    width: 'clamp(180px, 40vw, 300px)',
                    height: 'clamp(220px, 50vw, 380px)',
                    willChange: 'transform',
                    zIndex: imageIndex + 1,
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: isExpanding && !isFrontImage ? 0 : 1,
                    scale: isExpanding && isFrontImage ? 8 : scale,
                    y: 0,
                  }}
                  transition={{
                    opacity: { duration: 0.4, ease: 'easeOut' },
                    scale: {
                      duration: isExpanding ? 1 : 0.5,
                      ease: isExpanding ? [0.25, 0.1, 0.25, 1] : 'easeOut',
                    },
                    y: { duration: 0.5, ease: 'easeOut' },
                  }}
                >
                  <Image
                    src={LOADER_IMAGES[imageIndex]}
                    alt={`Chacal project ${imageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 180px, 300px"
                    priority
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Text - Cycling taglines */}
          <motion.div
            className="absolute z-20"
            style={{ bottom: '20%' }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: textExiting ? 0 : visibleImages.length >= 3 ? 1 : 0,
              x: textExiting ? '100vw' : 0,
            }}
            transition={{
              opacity: { duration: 0.5 },
              x: { duration: 0.8, ease: 'easeInOut' },
            }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTaglineIndex}
                className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl font-light text-center px-4"
                style={{ fontFamily: 'var(--font-family-body)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {taglines[currentTaglineIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Loading indicator while images preload */}
          {imagesLoaded < LOADER_IMAGES.length && (
            <motion.div
              className="absolute bottom-10 flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

