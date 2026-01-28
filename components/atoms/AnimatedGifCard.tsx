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
 * A card component that displays GIFs/MP4s with hover-to-play functionality.
 * - Desktop: Shows the first frame statically, plays animation on hover
 * - Mobile: Shows the first frame statically, plays animation on tap (click)
 * - For PNGs: Shows the image normally (no animation)
 * - For MP4s: Uses video element with play/pause on hover
 */
export function AnimatedGifCard({ image, className = '' }: AnimatedGifCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [staticFrame, setStaticFrame] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasExtractedFrame = useRef(false);

  // Determine media type
  const isAnimatedGif = useMemo(() => image.type === 'gif', [image.type]);
  const isVideo = useMemo(() => image.type === 'mp4', [image.type]);
  const isStaticImage = useMemo(() => image.type === 'png', [image.type]);

  // Get the aspect ratio class for this image
  const aspectClass = getAspectRatioClass(image.aspectRatio);

  // Check for touch device
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Increased margin for earlier loading
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Extract first frame from GIF using canvas
  const extractFirstFrameFromImage = useCallback((imgElement: HTMLImageElement) => {
    if (hasExtractedFrame.current) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx && canvas.width > 0 && canvas.height > 0) {
        ctx.drawImage(imgElement, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setStaticFrame(dataUrl);
        hasExtractedFrame.current = true;
      }
    } catch (error) {
      console.warn('Could not extract first frame from image:', error);
    }
  }, []);

  // Extract first frame from video using canvas
  const extractFirstFrameFromVideo = useCallback((videoElement: HTMLVideoElement) => {
    if (hasExtractedFrame.current) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx && canvas.width > 0 && canvas.height > 0) {
        ctx.drawImage(videoElement, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setStaticFrame(dataUrl);
        hasExtractedFrame.current = true;
      }
    } catch (error) {
      console.warn('Could not extract first frame from video:', error);
    }
  }, []);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    if (isAnimatedGif && imgRef.current && !hasExtractedFrame.current) {
      // Use setTimeout to ensure the image is fully decoded
      setTimeout(() => {
        if (imgRef.current) {
          extractFirstFrameFromImage(imgRef.current);
        }
      }, 50);
    }
  }, [isAnimatedGif, extractFirstFrameFromImage]);

  // Handle image error
  const handleImageError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true); // Hide skeleton even on error
  }, []);

  // Handle video loaded
  const handleVideoLoaded = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    if (videoRef.current && !hasExtractedFrame.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Handle video error
  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Handle video seeked
  const handleVideoSeeked = useCallback(() => {
    if (videoRef.current && !hasExtractedFrame.current) {
      extractFirstFrameFromVideo(videoRef.current);
    }
  }, [extractFirstFrameFromVideo]);

  // Control video playback
  useEffect(() => {
    if (!isVideo || !videoRef.current || !isLoaded) return;

    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive, isVideo, isLoaded]);

  // Handle click outside to deactivate on mobile
  useEffect(() => {
    if (!isTouchDevice || !isActive) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

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
    if (!isTouchDevice) setIsActive(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsActive(false);
  };

  const handleClick = () => {
    if (isTouchDevice) setIsActive((prev) => !prev);
  };

  // Error state display
  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={`bg-muted relative flex items-center justify-center overflow-hidden rounded-lg ${aspectClass} ${className}`}
      >
        <p className="text-muted-foreground text-sm">Failed to load</p>
      </div>
    );
  }

  // For PNGs
  if (isStaticImage) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-lg ${aspectClass} ${className}`}
      >
        {!isLoaded && <div className="bg-muted absolute inset-0 animate-pulse" />}

        {isInView && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={image.alt}
            className={`h-full w-full object-cover transition-all duration-500 hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
          />
        )}

        <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
          <p className="p-4 text-sm font-medium text-white">{image.projectName}</p>
        </div>
      </div>
    );
  }

  // For MP4 videos
  if (isVideo) {
    return (
      <div
        ref={containerRef}
        className={`relative cursor-pointer overflow-hidden rounded-lg ${aspectClass} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {!isLoaded && <div className="bg-muted absolute inset-0 animate-pulse" />}

        {/* Static frame thumbnail */}
        {staticFrame && !isActive && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={staticFrame}
            alt={image.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Video element */}
        {isInView && (
          <video
            ref={videoRef}
            src={image.src}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isActive || !staticFrame ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={handleVideoLoaded}
            onSeeked={handleVideoSeeked}
            onError={handleVideoError}
          />
        )}

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

  // For GIFs - keep both images in DOM to avoid flicker
  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer overflow-hidden rounded-lg ${aspectClass} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {!isLoaded && <div className="bg-muted absolute inset-0 animate-pulse" />}

      {isInView && (
        <>
          {/* Static frame - shown when not active */}
          {staticFrame && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={staticFrame}
              alt={image.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                !isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Animated GIF - always loaded, visible when active or no static frame */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isActive || !staticFrame ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        </>
      )}

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
