'use client';

import { useTranslations } from 'next-intl';
import { projectImages } from '@/lib/project-images';
import { motion } from 'motion/react';
import { AnimatedText } from '../atoms/AnimatedText';
import { AnimatedGifCard } from '../atoms/AnimatedGifCard';

export function ProjectsSection() {
  const t = useTranslations('ProjectsSection');

  return (
    <section id="projects" className="bg-background px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto">
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
            className="text-foreground mb-6 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
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
              <AnimatedGifCard image={image} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
