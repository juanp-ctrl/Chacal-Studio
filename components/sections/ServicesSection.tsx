'use client';

import { motion } from 'motion/react';
import { Compass, MessageCircle, Search, Settings, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { AnimatedText } from '../atoms/AnimatedText';

export function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      icon: Compass,
      key: 'consulting',
    },
    {
      icon: MessageCircle,
      key: 'advisory',
    },
    {
      icon: Search,
      key: 'diagnostic',
    },
    {
      icon: Settings,
      key: 'management',
    },
  ];

  return (
    <section
      id="servicios"
      className="bg-blue-darkest border-t border-transparent px-6 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedText
            text={t('title')}
            as="h2"
            className="font-heading text-foreground mb-6 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
          />
        </motion.div>

        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group bg-primary hover:border-accent/20 rounded-3xl border border-transparent p-10 transition-[border-color] duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="group-hover:bg-accent/10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-300">
                <service.icon
                  className="group-hover:text-accent h-7 w-7 text-white transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <Heading as="h3" className="mb-4 text-2xl font-bold text-white">
                {t(`${service.key}.title`)}
              </Heading>
              <Text className="leading-relaxed font-light text-white/70">
                {t(`${service.key}.description`)}
              </Text>
            </motion.div>
          ))}
        </div>

        {/* Sustainability Banner */}
        <motion.div
          className="from-primary via-primary to-accent/80 rounded-3xl bg-linear-to-br p-12 text-white md:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex max-w-5xl flex-col items-center gap-8 md:flex-row">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Leaf className="h-10 w-10 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-center md:text-left">
              <Heading as="h3" className="mb-4 text-3xl font-bold text-white">
                {t('sustainability.title')}
              </Heading>
              <Text className="text-lg leading-relaxed font-light text-white/90">
                {t('sustainability.description')}
              </Text>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
