import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Users, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const impactImages = [
  'https://images.unsplash.com/photo-1752650735943-d0fbf1edce21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjMyOTI3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1761250027507-c0be614c0254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBoZWxwaW5nfGVufDF8fHx8MTc2MzIyMzc5MXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1647901493574-204e18ae897f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudHMlMjBncmVlbiUyMGVudmlyb25tZW50fGVufDF8fHx8MTc2MzMxODA5OHww&ixlib=rb-4.1.0&q=80&w=1080',
];

export function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  const impacts = [
    {
      icon: Users,
      title: t('impact.team.title'),
      description: t('impact.team.description'),
      image: impactImages[0],
    },
    {
      icon: Heart,
      title: t('impact.community.title'),
      description: t('impact.community.description'),
      image: impactImages[1],
    },
    {
      icon: Globe,
      title: t('impact.planet.title'),
      description: t('impact.planet.description'),
      image: impactImages[2],
    },
  ];

  return (
    <section id="impacto" className="py-44 sm:py-52 px-6 sm:px-8 lg:px-12 bg-white dark:bg-blue-dark border-t border-transparent dark:border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary dark:text-white mb-6 tracking-tight font-serif text-3xl sm:text-4xl md:text-5xl">
            {t('impact.title')}
          </h2>
          <p className="text-primary/70 dark:text-white/70 text-lg sm:text-xl font-light max-w-2xl">
            {t('impact.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-32">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center mr-4">
                    <impact.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-primary dark:text-white text-3xl font-bold">{impact.title}</h3>
                </div>
                <p className="text-primary/70 dark:text-white/70 text-lg font-light leading-relaxed">{impact.description}</p>
              </div>

              <div className={`relative h-[500px] rounded-3xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <img
                  src={impact.image}
                  alt={impact.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
