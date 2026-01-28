'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

const sdgColors = ['#EF402D', '#A31C44', '#F99D26', '#CF8D2A', '#48773E'];

export function SDGSection() {
  const t = useTranslations('sdg');

  const sdgs = [
    {
      number: 5,
      color: sdgColors[0],
    },
    {
      number: 8,
      color: sdgColors[1],
    },
    {
      number: 11,
      color: sdgColors[2],
    },
    {
      number: 12,
      color: sdgColors[3],
    },
    {
      number: 13,
      color: sdgColors[4],
    },
  ];

  return (
    <section id="ods" className="bg-blue-background px-6 py-24 text-white sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-6 inline-flex h-[66px] items-center justify-center rounded-full bg-white px-4 py-2">
              <div className="relative h-[66px] w-[280px] sm:w-[357px]">
                <Image
                  src="/ODS-logo.svg"
                  alt={t('title')}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <Heading
              as="h2"
              className="mb-6 text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              {t('title')}
            </Heading>
          </div>
          <Text className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-white/80 sm:text-xl">
            {t('subtitle')}
          </Text>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={sdg.number}
              className="group w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="relative flex h-32 items-center justify-between overflow-hidden px-6 text-white"
                style={{ backgroundColor: sdg.color }}
              >
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />
                <div className="relative z-10">
                  <span className="block text-6xl font-bold opacity-90">{sdg.number}</span>
                </div>
                <div className="relative z-10 h-20 w-20">
                  <Image
                    src={`/ODS/ODS-${index + 1}.svg`}
                    alt={`ODS ${sdg.number}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="p-8">
                <Heading
                  as="h3"
                  className="mb-4 flex min-h-[3.5rem] items-center text-xl leading-tight font-bold text-white"
                >
                  {t(`${sdg.number}.title`)}
                </Heading>
                <Text className="text-sm leading-relaxed font-light text-white/70">
                  {t(`${sdg.number}.description`)}
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
