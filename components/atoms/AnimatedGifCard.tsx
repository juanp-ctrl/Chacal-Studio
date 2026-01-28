'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { ProjectImage } from '@/lib/project-images';

interface AnimatedGifCardProps {
  image: ProjectImage;
  className?: string;
}

/** Returns Tailwind aspect ratio class based on image aspectRatio property */
function getAspectRatioClass(aspectRatio: ProjectImage['aspectRatio']): string {
  switch (aspectRatio) {
    case 'portrait':
      return 'aspect-[3/4]';
    case 'square':
      return 'aspect-square';
    case 'landscape':
    default:
      return 'aspect-video';
  }
}

/**
 * A card component that displays GIFs with hover-to-play functionality.
 * - Desktop: Shows the first frame statically, plays animation on hover
 * - Mobile: Shows the first frame statically, plays animation on tap (click)
 * - For PNGs: Shows the image normally (no animation)
 *
 * Uses canvas to extract the first frame of GIFs for the static state.
 * Both images are kept in DOM to prevent flicker on transition.
 */
export function AnimatedGifCard({ image, className = '' }: AnimatedGifCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [staticFrame, setStaticFrame] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(image.type === 'png');
  const [gifLoaded, setGifLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine if this is a GIF that needs animation control
  const isAnimatedGif = useMemo(() => image.type === 'gif', [image.type]);

  // Get the aspect ratio class for this image
  const aspectClass = getAspectRatioClass(image.aspectRatio);

  // Detect touch device on mount
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
  }, []);

  // Extract first frame from GIF using canvas
  const extractFirstFrame = useCallback((imgElement: HTMLImageElement): string | null => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(imgElement, 0, 0);
        return canvas.toDataURL('image/png');
      }
    } catch (error) {
      console.warn('Could not extract first frame:', error);
    }
    return null;
  }, []);

  // Handle GIF load
  const handleGifLoad = useCallback(() => {
    setGifLoaded(true);
    if (isAnimatedGif && imgRef.current && !staticFrame) {
      const frame = extractFirstFrame(imgRef.current);
      if (frame) {
        setStaticFrame(frame);
        setIsLoaded(true);
      }
    }
  }, [isAnimatedGif, extractFirstFrame, staticFrame]);

  // Preload the GIF image to extract first frame
  useEffect(() => {
    if (!isAnimatedGif) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const frame = extractFirstFrame(img);
      if (frame) {
        setStaticFrame(frame);
      }
      setIsLoaded(true);
    };
    img.onerror = () => {
      setIsLoaded(true);
    };
    img.src = image.src;
  }, [image.src, isAnimatedGif, extractFirstFrame]);

  // Handle click outside to deactivate on mobile
  useEffect(() => {
    if (!isTouchDevice || !isActive) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    // Small delay to prevent immediate deactivation from the same tap
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isTouchDevice, isActive]);

  // Event handlers
  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsActive(false);
    }
  };

  const handleClick = () => {
    if (isTouchDevice) {
      setIsActive((prev) => !prev);
    }
  };

  // For PNGs, just show the image
  if (!isAnimatedGif) {
    return (
      <div className={`relative overflow-hidden rounded-lg ${aspectClass} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* Project name overlay on hover */}
        <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
          <p className="p-4 text-sm font-medium text-white">{image.projectName}</p>
        </div>
      </div>
    );
  }

  // For GIFs, keep both images in DOM and use opacity to switch (prevents flicker)
  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer overflow-hidden rounded-lg ${aspectClass} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Loading skeleton */}
      {!isLoaded && <div className="bg-muted absolute inset-0 animate-pulse" />}

      {/* Static frame - always in DOM, visible when not active */}
      {staticFrame && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={staticFrame}
          alt={image.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isActive ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Animated GIF - always in DOM (for preloading), visible when active */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={image.src}
        alt={image.alt}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isActive && gifLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleGifLoad}
        loading="lazy"
      />

      {/* Fallback while loading - show GIF directly if no static frame yet */}
      {!staticFrame && isLoaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}

      {/* Project name overlay */}
      <div
        className={`absolute inset-0 flex items-end bg-linear-to-t from-black/40 via-black/10 to-transparent transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="p-4 text-sm font-medium text-white">{image.projectName}</p>
      </div>
    </div>
  );
}
