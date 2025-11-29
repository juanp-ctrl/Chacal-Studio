"use client";

import * as React from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Compass, 
  Target, 
  Map, 
  Zap, 
  TrendingUp, 
  Footprints 
} from "lucide-react";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "Análisis",
    description: "Investigación profunda del contexto y necesidades.",
  },
  {
    icon: Compass,
    title: "Descubrimiento",
    description: "Hallazgos clave para orientar el proyecto.",
  },
  {
    icon: Target,
    title: "Objetivos",
    description: "Definición clara de metas y alcance.",
  },
  {
    icon: Map,
    title: "Estrategias",
    description: "Plan de acción a medida y rutas creativas.",
  },
  {
    icon: Zap,
    title: "Soluciones",
    description: "Implementación efectiva y desarrollo.",
  },
  {
    icon: TrendingUp,
    title: "Resultados",
    description: "Medición de impacto y análisis de métricas.",
  },
  {
    icon: Footprints,
    title: "Huellas",
    description: "Legado positivo sostenible y seguimiento.",
  },
];

export function MethodSection() {
  return (
    <section 
      id="method" 
      className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12 dark:bg-zinc-900"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <Heading
            as="h2"
            className="mb-6 text-3xl font-medium tracking-tight text-primary sm:text-4xl md:text-5xl"
          >
            Nuestro Método
          </Heading>
          <Text className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Un proceso integral diseñado para transformar ideas en impacto real,
            paso a paso, con consciencia y propósito.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative flex flex-col items-start rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              )}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <step.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              
              <Heading as="h3" className="mb-3 text-xl font-semibold text-primary">
                {step.title}
              </Heading>
              
              <Text className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </Text>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

