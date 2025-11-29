import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  // Show only first 3 projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="proyectos" className="py-44 sm:py-52 px-6 sm:px-8 lg:px-12 bg-white dark:bg-blue-dark border-t border-transparent dark:border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary dark:text-white mb-6 tracking-tight font-serif text-3xl sm:text-4xl md:text-5xl">
            {t('projects.title')}
          </h2>
          <p className="text-primary/70 dark:text-white/70 max-w-2xl text-lg sm:text-xl font-light">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={`#/proyectos/${project.id}`}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-secondary dark:bg-primary/40">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-primary/60 dark:text-white/60 uppercase tracking-wider font-medium">
                  {project.category}
                </p>
                <h3 className="text-primary dark:text-white text-2xl sm:text-3xl font-bold group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-primary/70 dark:text-white/70 font-light leading-relaxed">
                  {project.subtitle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="#/proyectos"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary rounded-full hover:scale-105 transition-all duration-300 hover:shadow-xl font-medium group"
          >
            {t('projects.viewAll')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
