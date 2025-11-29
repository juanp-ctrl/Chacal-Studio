import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Target, Lightbulb, Rocket, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

interface ProjectDetailPageProps {
  projectId: string;
}

export function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const heroRef = useRef(null);
  const challengeRef = useRef(null);
  const processRef = useRef(null);
  const solutionRef = useRef(null);
  const resultsRef = useRef(null);
  const galleryRef = useRef(null);
  
  const isChallengeInView = useInView(challengeRef, { once: true, amount: 0.3 });
  const isProcessInView = useInView(processRef, { once: true, amount: 0.3 });
  const isSolutionInView = useInView(solutionRef, { once: true, amount: 0.3 });
  const isResultsInView = useInView(resultsRef, { once: true, amount: 0.2 });
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });
  
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Scroll to top when component mounts or projectId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const project = projects.find((p) => p.id === projectId);
  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary/30 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-primary dark:text-white mb-6 font-serif text-3xl">
            Proyecto no encontrado
          </h1>
          <a
            href="#/proyectos"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            <ArrowLeft size={20} />
            Ver todos los proyectos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary/30 overflow-hidden">
      {/* Navigation - Fixed */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-primary/95 backdrop-blur-sm py-4 px-6 sm:px-8 lg:px-12 border-b border-border dark:border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto">
          <a
            href="#/proyectos"
            className="inline-flex items-center gap-2 text-primary/80 dark:text-white/80 hover:text-accent transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {t('projects.backToProjects') || 'Volver a proyectos'}
          </a>
        </div>
      </motion.div>

      {/* Hero Section - Reduced height with overlay */}
      <div ref={heroRef} className="relative h-[75vh] sm:h-[80vh] overflow-hidden bg-secondary dark:bg-primary/40 mt-16">
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 sm:px-8 lg:px-12 pb-12 sm:pb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <p className="text-accent uppercase tracking-wider font-medium mb-3 sm:mb-4">
                  {project.category}
                </p>
                <h1 className="text-white mb-4 sm:mb-6 tracking-tight font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-5xl">
                  {project.title}
                </h1>
                <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mb-8 sm:mb-10">
                  {project.subtitle}
                </p>
                
                {/* Project Meta Info */}
                <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12 text-white/80">
                  <div>
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Cliente</p>
                    <p className="text-base sm:text-lg">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Año</p>
                    <p className="text-base sm:text-lg">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Lugar</p>
                    <p className="text-base sm:text-lg">{project.location}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Section - With side image */}
      <div ref={challengeRef} className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isChallengeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-primary dark:text-white font-serif text-2xl sm:text-3xl md:text-4xl">
                  {t('projects.detail.challenge') || 'El desafío'}
                </h2>
              </div>
              <p className="text-primary/70 dark:text-white/70 text-lg sm:text-xl leading-relaxed">
                {project.challenge}
              </p>
            </motion.div>
            
            <motion.div
              className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-secondary dark:bg-primary/40"
              initial={{ opacity: 0, x: 50 }}
              animate={isChallengeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={project.images[0] || project.heroImage}
                alt="Challenge"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Process Section - Dark Background */}
      <div ref={processRef} className="py-24 sm:py-32 bg-primary dark:bg-primary/95 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                {t('projects.detail.process') || 'El proceso'}
              </h2>
            </div>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-4xl">
              {project.process}
            </p>
          </motion.div>

          {/* Process Image */}
          {project.images[1] && (
            <motion.div
              className="relative overflow-hidden rounded-3xl aspect-[16/9]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isProcessInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={project.images[1]}
                alt="Process"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Solution Section - With side image (reversed) */}
      <div ref={solutionRef} className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-secondary dark:bg-primary/40 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isSolutionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={project.images[2] || project.heroImage}
                alt="Solution"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isSolutionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-primary dark:text-white font-bold text-3xl sm:text-4xl md:text-5xl">
                  {t('projects.detail.solution') || 'La solución'}
                </h2>
              </div>
              <p className="text-primary/70 dark:text-white/70 text-lg sm:text-xl leading-relaxed">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Results Section - Highlighted */}
      <div ref={resultsRef} className="py-24 sm:py-32 bg-gradient-to-br from-accent/5 via-accent/10 to-primary/5 dark:from-accent/10 dark:via-accent/20 dark:to-primary/20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isResultsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-full bg-accent/20 dark:bg-accent/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-primary dark:text-white font-bold text-3xl sm:text-4xl md:text-5xl">
                {t('projects.detail.results') || 'Resultados'}
              </h2>
            </div>
            <p className="text-primary/80 dark:text-white/80 text-xl sm:text-2xl leading-relaxed font-light">
              {project.results}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Image Gallery - Asymmetric Grid */}
      {project.images && project.images.length > 0 && (
        <div ref={galleryRef} className="py-24 sm:py-32 bg-white dark:bg-primary/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.h2
              className="text-primary dark:text-white mb-16 font-bold text-3xl sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              {t('projects.detail.gallery') || 'Galería'}
            </motion.h2>
            
            {/* Asymmetric Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
              {project.images.map((image, index) => {
                // Different layouts for different images
                const layouts = [
                  'md:col-span-7',
                  'md:col-span-5',
                  'md:col-span-5',
                  'md:col-span-7',
                  'md:col-span-12'
                ];
                const aspectRatios = [
                  'aspect-[16/10]',
                  'aspect-[4/5]',
                  'aspect-[4/5]',
                  'aspect-[16/10]',
                  'aspect-[21/9]'
                ];
                
                return (
                  <motion.div
                    key={index}
                    className={`relative overflow-hidden rounded-2xl ${layouts[index % layouts.length]} ${aspectRatios[index % aspectRatios.length]} bg-secondary dark:bg-primary/40 group`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Next Project - Full Width with Image */}
      <a
        href={`#/proyectos/${nextProject.id}`}
        className="block relative h-[60vh] sm:h-[70vh] overflow-hidden bg-primary dark:bg-primary/95 group cursor-pointer"
      >
        <div className="absolute inset-0">
          <img
            src={nextProject.heroImage}
            alt={nextProject.title}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 sm:px-8 lg:px-12 pb-16 sm:pb-24">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-accent uppercase tracking-wider font-medium mb-4 sm:mb-6">
                  {t('projects.detail.nextProject') || 'Siguiente proyecto'}
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <h2 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl group-hover:text-accent transition-colors duration-300">
                    {nextProject.title}
                  </h2>
                  <ArrowRight 
                    size={48} 
                    className="flex-shrink-0 text-white group-hover:text-accent group-hover:translate-x-2 transition-all duration-300" 
                  />
                </div>
                <p className="text-white/80 text-lg sm:text-xl max-w-3xl">
                  {nextProject.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
