'use client';

import { ScrollLink } from '@/components/atoms/ScrollLink';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations(`projects.${project.slug}`);
  // Use the first tag as the category
  const category = project.tags[0] || 'Project';

  // Use localized content if available, fallback to project data
  // If translation returns the key, it means translation doesn't exist, so use project data
  const titleTranslation = t('title');
  const summaryTranslation = t('summary');
  const localizedTitle =
    titleTranslation !== `projects.${project.slug}.title` ? titleTranslation : project.title;
  const localizedSummary =
    summaryTranslation !== `projects.${project.slug}.summary`
      ? summaryTranslation
      : project.summary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <ScrollLink href={`/projects/${project.slug}`} className="group block">
        {/* Image Container */}
        <div className="bg-muted relative mb-6 aspect-4/5 overflow-hidden rounded-2xl">
          <Image
            src={project.thumbnail}
            alt={localizedTitle}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            {category}
          </p>
          <h2 className="text-foreground font-heading group-hover:text-accent text-2xl font-bold transition-colors duration-300 sm:text-3xl">
            {localizedTitle}
          </h2>
          <p className="text-muted-foreground line-clamp-2 leading-relaxed font-light">
            {localizedSummary}
          </p>
        </div>
      </ScrollLink>
    </motion.div>
  );
}
