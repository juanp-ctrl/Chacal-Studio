import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Compass, MessageCircle, Search, Settings, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  const services = [
    {
      icon: Compass,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
    },
    {
      icon: MessageCircle,
      title: t('services.advisory.title'),
      description: t('services.advisory.description'),
    },
    {
      icon: Search,
      title: t('services.diagnostic.title'),
      description: t('services.diagnostic.description'),
    },
    {
      icon: Settings,
      title: t('services.management.title'),
      description: t('services.management.description'),
    },
  ];

  return (
    <section id="servicios" className="py-44 sm:py-52 px-6 sm:px-8 lg:px-12 bg-secondary/30 dark:bg-blue-dark border-t border-transparent dark:border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary dark:text-white mb-6 tracking-tight font-serif text-3xl sm:text-4xl md:text-5xl">
            {t('services.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white dark:bg-primary/40 p-10 rounded-3xl border border-transparent hover:border-accent/20 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary dark:text-white group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-primary dark:text-white mb-4 text-2xl font-bold">{service.title}</h3>
              <p className="text-primary/70 dark:text-white/70 font-light leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Sustainability Banner */}
        <motion.div
          className="bg-gradient-to-br from-primary via-primary to-accent/80 p-12 md:p-16 rounded-3xl text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-center md:text-left">
              <h3 className="mb-4 text-3xl font-bold">{t('services.sustainability.title')}</h3>
              <p className="text-white/90 text-lg font-light leading-relaxed">
                {t('services.sustainability.description')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
