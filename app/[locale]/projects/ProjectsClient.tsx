'use client';

import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { projects } from '@/lib/projects';

export function ProjectsClient() {
  const t = useTranslations('projects');

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Header - Matches Figma/Source Design */}
      <div className="bg-primary text-primary-foreground px-6 py-24 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="text-primary-foreground/80 hover:text-primary-foreground group mb-8 inline-flex items-center gap-2 transition-colors duration-300"
            >
              <ArrowLeft
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              {t('backHome')}
            </Link>
          </motion.div>

          <motion.h1
            className="font-heading mb-6 text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('allProjects')}
          </motion.h1>

          <motion.p
            className="text-primary-foreground/80 max-w-3xl text-lg leading-relaxed font-light sm:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('allProjectsSubtitle')}
          </motion.p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
