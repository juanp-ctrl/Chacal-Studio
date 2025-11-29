import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

export function ProjectsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-primary/30">
      {/* Header */}
      <div className="bg-primary dark:bg-primary/95 text-white py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.a
            href="#/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-8 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {t('projects.backHome') || 'Volver al inicio'}
          </motion.a>
          
          <motion.h1
            className="mb-6 tracking-tight font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('projects.allProjects') || 'Nuestros Proyectos'}
          </motion.h1>
          
          <motion.p
            className="text-white/80 text-lg sm:text-xl max-w-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('projects.allProjectsSubtitle') || 'Cada proyecto es una oportunidad para generar impacto positivo. Descubre cómo el diseño y la comunicación pueden transformar realidades.'}
          </motion.p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-24 px-6 sm:px-8 lg:px-12" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={`#/proyectos/${project.id}`}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-secondary dark:bg-primary/40">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-primary/60 dark:text-white/60 uppercase tracking-wider font-medium">
                    {project.category}
                  </p>
                  <h2 className="text-primary dark:text-white text-2xl sm:text-3xl font-bold group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-primary/70 dark:text-white/70 font-light leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
