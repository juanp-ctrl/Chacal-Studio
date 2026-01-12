"use client";

import { motion } from "motion/react";
import { Users, Heart, Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatedText } from "@/components/atoms/AnimatedText";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

// Using the same Unsplash images from the reference implementation
const impactImages = [
  '/chacal-image-1.webp',
  '/chacal-image-2.webp',
  '/chacal-image-3.webp',
];

export function ImpactSection() {
  const t = useTranslations("impact");

  const impacts = [
    {
      icon: Users,
      key: "team",
      image: impactImages[0],
      objectPosition: "center",
    },
    {
      icon: Heart,
      key: "community",
      image: impactImages[1],
      objectPosition: "center",
    },
    {
      icon: Globe,
      key: "planet",
      image: impactImages[2],
      objectPosition: "center 25%",
    },
  ];

  return (
    <section id="impacto" className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12 dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <AnimatedText
            as="h2"
            className="mb-6 text-3xl font-heading font-medium tracking-tight text-primary dark:text-white sm:text-4xl md:text-5xl"
            text={t("title")}
          />
          <Text className="text-lg text-muted-foreground dark:text-white/80 max-w-2xl">
            {t("subtitle")}
          </Text>
        </motion.div>

        <div className="space-y-32">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.key}
              className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 dark:bg-accent/20 text-accent">
                    <impact.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <Heading as="h3" className="text-3xl font-bold text-primary dark:text-white">
                    {t(`${impact.key}.title`)}
                  </Heading>
                </div>
                <Text className="text-lg leading-relaxed text-muted-foreground dark:text-white/80">
                  {t(`${impact.key}.description`)}
                </Text>
              </div>

              <div className={cn("relative h-[400px] sm:h-[500px] overflow-hidden rounded-3xl bg-gray-100", index % 2 === 1 ? "lg:order-1" : "")}>
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
