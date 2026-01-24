'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as motion from 'motion/react-client';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { AnimatedText } from '../atoms/AnimatedText';

export function FutureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations('future');

  return (
    <section className="overflow-hidden bg-(--bg-brand-blue-dark) px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedText
              text={t('title')}
              as="h2"
              className="mb-6 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl"
              delay={0.3}
            />
            <div className="space-y-4 text-lg leading-relaxed font-light text-white/90">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>{t('p4')}</p>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl sm:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1688501935726-d231682e79d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHBsYW5ldCUyMG5hdHVyZXxlbnwxfHx8fDE3NjMzMTgwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Earth and nature"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
