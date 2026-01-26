'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { projectImages, type ProjectImage } from '@/lib/project-images';
import { motion } from 'motion/react';
import { AnimatedText } from '../atoms/AnimatedText';

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

export function ProjectsSection() {
  const t = useTranslations('ProjectsSection');

  return (
    <section id="projects" className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <AnimatedText
            text={t('title')}
            as="h2"
            className="text-primary mb-6 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
            delay={0.3}
          />
        </motion.div>

        {/* Masonry Grid - CSS Columns approach */}
        {/* Responsive: 2 cols default, 3 cols at lg (1024px), 4 cols at xl (1280px) */}
        <div className="columns-2 gap-4 lg:columns-3 xl:columns-4">
          {projectImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="mb-4 break-inside-avoid"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: index * 0.05,
              }}
            >
              <div
                className={`relative overflow-hidden rounded-lg ${getAspectRatioClass(image.aspectRatio)}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
