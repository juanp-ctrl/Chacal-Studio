"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

const sdgColors = ['#EF402D', '#A31C44', '#F99D26', '#CF8D2A', '#48773E'];

export function SDGSection() {
  const t = useTranslations("sdg");

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
    <section id="ods" className="py-24 sm:py-32 px-6 lg:px-8 bg-blue-darker text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image 
                src="/ODS-logo.svg" 
                alt={t("title")}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <Text className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            {t("subtitle")}
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={sdg.number}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="h-32 flex items-center justify-between text-white relative overflow-hidden px-6"
                style={{ backgroundColor: sdg.color }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                <div className="relative z-10">
                  <span className="block text-6xl font-bold opacity-90">{sdg.number}</span>
                </div>
                <div className="relative z-10 w-20 h-20">
                  <Image 
                    src={`/ODS/ODS-${sdg.number}.svg`} 
                    alt={`ODS ${sdg.number}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="p-8">
                <Heading as="h3" className="text-white mb-4 text-xl font-bold leading-tight min-h-[3.5rem] flex items-center">
                  {t(`${sdg.number}.title`)}
                </Heading>
                <Text className="text-white/70 leading-relaxed font-light text-sm">
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
