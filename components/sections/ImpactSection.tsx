'use client';

import { motion } from 'motion/react';
import { Users, Heart, Globe } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatedText } from '@/components/atoms/AnimatedText';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/utils';

// Using the same Unsplash images from the reference implementation
const impactImages = ['/chacal-image1.webp', '/chacal-image2.webp', '/chacal-image3.webp'];

export function ImpactSection() {
  const t = useTranslations('impact');

  const impacts = [
    {
      icon: Users,
      key: 'team',
      image: impactImages[0],
      objectPosition: 'center',
    },
    {
      icon: Heart,
      key: 'community',
      image: impactImages[1],
      objectPosition: 'center',
    },
    {
      icon: Globe,
      key: 'planet',
      image: impactImages[2],
      objectPosition: 'center 25%',
    },
  ];

  return (
    <section
      id="impacto"
      className="border-t border-gray-100 bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12 dark:border-white/10 dark:bg-zinc-900"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <AnimatedText
            as="h2"
            className="font-heading text-primary mb-6 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl dark:text-white"
            text={t('title')}
          />
          <Text className="text-muted-foreground text-center text-lg dark:text-white/80">
            {t('subtitle')}
          </Text>
        </motion.div>

        <div className="space-y-16">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.key}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-6 flex items-center">
                  <div className="bg-accent/10 dark:bg-accent/20 text-accent mr-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                    <impact.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <Heading as="h3" className="text-primary text-3xl font-bold dark:text-white">
                    {t(`${impact.key}.title`)}
                  </Heading>
                </div>
                <Text className="text-muted-foreground text-lg leading-relaxed dark:text-white/80">
                  {t(`${impact.key}.description`)}
                </Text>
              </div>

              <div
                className={cn(
                  'relative h-[400px] overflow-hidden rounded-3xl bg-gray-100 sm:h-[500px]',
                  index % 2 === 1 ? 'lg:order-1' : ''
                )}
              >
                <Image
                  src={impact.image}
                  alt={t(`${impact.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  style={{ objectPosition: impact.objectPosition }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
