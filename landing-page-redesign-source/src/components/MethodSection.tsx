import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Search, Lightbulb, TrendingUp, Footprints } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function MethodSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('method.step1.title'),
      description: t('method.step1.description'),
    },
    {
      icon: Lightbulb,
      title: t('method.step2.title'),
      description: t('method.step2.description'),
    },
    {
      icon: Target,
      title: t('method.step3.title'),
      description: t('method.step3.description'),
    },
    {
      icon: TrendingUp,
      title: t('method.step4.title'),
      description: t('method.step4.description'),
    },
    {
      icon: Footprints,
      title: t('method.step5.title'),
      description: t('method.step5.description'),
    },
  ];

  return (
    <section id="metodo" className="py-44 sm:py-52 px-6 sm:px-8 lg:px-12 bg-white dark:bg-blue-dark border-t border-transparent dark:border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary dark:text-white mb-8 tracking-tight font-serif text-3xl sm:text-4xl md:text-5xl">
            {t('method.title')}
          </h2>
          <p className="text-primary/70 dark:text-white/70 max-w-4xl text-lg sm:text-xl font-light leading-relaxed">
            {t('method.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="flex flex-col items-start text-left group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
                <step.icon className="w-8 h-8 text-primary dark:text-white group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-primary dark:text-white mb-3 text-xl font-bold">{step.title}</h3>
              <p className="text-primary/60 dark:text-white/60 font-light leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
