import { Metadata } from 'next';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Proyectos | Chacal Studio',
  description: 'Descubre nuestros proyectos de impacto social, diseño y comunicación estratégica.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Header Section */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="max-w-3xl">
          <Heading level={1} className="mb-6">
            Nuestros Proyectos
          </Heading>
          <Text size="lg" className="text-muted-foreground">
            Cada proyecto es una oportunidad para generar impacto positivo. 
            Descubre cómo el diseño y la comunicación pueden transformar realidades 
            a través de nuestras colaboraciones con organizaciones y marcas con propósito.
          </Text>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

