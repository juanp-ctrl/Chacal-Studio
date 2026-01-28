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
 * - For GIFs: Shows the first frame statically, plays animation on hover
 * - For PNGs: Shows the image normally (no animation)
 *
 * Uses canvas to extract the first frame of GIFs for the static state.
 */
export function AnimatedGifCard({ image, className = '' }: AnimatedGifCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [staticFrame, setStaticFrame] = useState<string | null>(null);
  // PNGs are considered loaded immediately since they don't need frame extraction
  const [isLoaded, setIsLoaded] = useState(image.type === 'png');
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine if this is a GIF that needs animation control
  const isAnimatedGif = useMemo(() => image.type === 'gif', [image.type]);

  // Get the aspect ratio class for this image
  const aspectClass = getAspectRatioClass(image.aspectRatio);

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

  // Handle image load - extract first frame for GIFs
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    if (isAnimatedGif && imgRef.current) {
      const frame = extractFirstFrame(imgRef.current);
      if (frame) {
        setStaticFrame(frame);
      }
    }
  }, [isAnimatedGif, extractFirstFrame]);

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

  // For GIFs, show static frame by default, animated on hover
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${aspectClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading skeleton */}
      {!isLoaded && <div className="bg-muted absolute inset-0 animate-pulse" />}

      {/* Static frame (shown when not hovered) */}
      {staticFrame && !isHovered && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={staticFrame}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-500"
        />
      )}

      {/* Animated GIF (shown on hover or as fallback) */}
      {(isHovered || !staticFrame) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-500"
          onLoad={handleImageLoad}
          loading="lazy"
          // Add unique key to force GIF restart on hover
          key={isHovered ? `${image.id}-animated` : `${image.id}-static`}
        />
      )}

      {/* Project name overlay on hover */}
      <div
        className={`absolute inset-0 flex items-end bg-linear-to-t from-black/40 via-black/10 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="p-4 text-sm font-medium text-white">{image.projectName}</p>
      </div>
    </div>
  );
}
