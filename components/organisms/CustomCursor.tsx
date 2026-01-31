'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { LogoMinimal } from '@/components/atoms/LogoMinimal';
import { cn } from '@/lib/utils';

/**
 * CustomCursor - Decorative Chacal logo that follows the cursor
 *
 * Accessibility: Native browser cursor remains visible and functional.
 * The logo trails behind with an offset to avoid obscuring the pointer.
 * pointer-events: none ensures no interference with user interactions.
 */
export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring configuration for smooth trailing effect
  // Lower stiffness and higher damping create a more noticeable trail
  const springConfig = { damping: 25, stiffness: 200, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Offset to position logo trailing behind cursor (bottom-right)
  const OFFSET_X = 2;
  const OFFSET_Y = 2;

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;

      setIsTouchDevice(isTouch);

      // Only show if not touch device
      if (!isTouch) {
        setIsVisible(true);
      }
    };

    checkTouch();

    // Resize listener to re-check (e.g. dev tools toggle)
    window.addEventListener('resize', checkTouch);

    return () => {
      window.removeEventListener('resize', checkTouch);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      // Apply offset so the logo trails behind/beside the actual cursor
      mouseX.set(e.clientX + OFFSET_X);
      mouseY.set(e.clientY + OFFSET_Y);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or its parents are interactive
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouchDevice, mouseX, mouseY, OFFSET_X, OFFSET_Y]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-9999 flex items-center justify-center mix-blend-difference'
      )}
      style={{
        x: cursorX,
        y: cursorY,
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.3 : 1,
          opacity: isHovering ? 0.9 : 0.7,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
        className="flex h-10 w-10 items-center justify-center"
      >
        <LogoMinimal className="h-full w-full text-white" />
      </motion.div>
    </motion.div>
  );
};
