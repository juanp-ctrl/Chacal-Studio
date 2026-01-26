'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Search, Compass, Target, Map, Zap, TrendingUp, Footprints } from 'lucide-react';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/utils';
import { AnimatedText } from '../atoms/AnimatedText';

export function MethodSection() {
  const t = useTranslations('method');

  const stepsMapped = [
    { icon: Search, key: 'step1' },
    { icon: Compass, key: 'step2' },
    { icon: Target, key: 'step3' },
    { icon: Map, key: 'step4' }, // Strategies
    { icon: Zap, key: 'step5' }, // Solutions
    { icon: TrendingUp, key: 'step6' }, // Results
    { icon: Footprints, key: 'step7' }, // Footprints
  ];

  return (
    <section id="method" className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <AnimatedText
            text={t('title')}
            as="h2"
            className="text-primary mb-6 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
            delay={0.3}
          />
          <Text className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t('description')}
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stepsMapped.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'bg-primary relative flex flex-col items-start rounded-2xl border-none p-6 shadow-sm'
              )}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-white">
                <step.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>

              <Heading as="h3" className="mb-3 text-xl font-semibold text-white">
                {t(`${step.key}.title`)}
              </Heading>

              <Text className="text-sm leading-relaxed text-white/90">
                {t(`${step.key}.description`)}
              </Text>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
