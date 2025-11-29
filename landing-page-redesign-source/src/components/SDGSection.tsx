import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const sdgColors = ['#EF402D', '#A31C44', '#F99D26', '#CF8D2A', '#48773E'];

export function SDGSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  const sdgs = [
    {
      number: 5,
      title: t('sdg.5.title'),
      description: t('sdg.5.description'),
      color: sdgColors[0],
    },
    {
      number: 8,
      title: t('sdg.8.title'),
      description: t('sdg.8.description'),
      color: sdgColors[1],
    },
    {
      number: 11,
      title: t('sdg.11.title'),
      description: t('sdg.11.description'),
      color: sdgColors[2],
    },
    {
      number: 12,
      title: t('sdg.12.title'),
      description: t('sdg.12.description'),
      color: sdgColors[3],
    },
    {
      number: 13,
      title: t('sdg.13.title'),
      description: t('sdg.13.description'),
      color: sdgColors[4],
    },
  ];

  return (
    <section className="py-40 sm:py-48 px-4 sm:px-6 lg:px-8 bg-[#2F2E59] text-white dark:bg-blue-dark border-t border-transparent dark:border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white mb-6 tracking-tight capitalize font-serif text-3xl sm:text-4xl">
            {t('sdg.title')}
          </h2>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            {t('sdg.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={sdg.number}
              className="bg-white dark:bg-primary/40 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="h-32 flex items-center justify-center text-white relative overflow-hidden"
                style={{ backgroundColor: sdg.color }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                <div className="relative z-10 text-center">
                  <div className="text-6xl opacity-80 mb-2">{sdg.number}</div>
                  <div className="text-sm uppercase tracking-wider">ODS</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-primary dark:text-white mb-4">{sdg.title}</h3>
                <p className="text-muted-foreground dark:text-white/80 leading-relaxed">{sdg.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}