// import { ProjectsClient } from './ProjectsClient';
// import { JsonLd } from '@/components/SEO/JsonLd';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const baseUrl = 'https://chacalestudio.ar';
  const currentPath = locale === routing.defaultLocale ? '/projects' : `/${locale}/projects`;
  const canonicalUrl = `${baseUrl}${currentPath}`;
  const alternateEs = `${baseUrl}${locale === 'es' ? '/projects' : '/es/projects'}`;
  const alternateEn = `${baseUrl}${locale === 'en' ? '/projects' : '/en/projects'}`;

  const title =
    locale === 'es' ? 'Nuestros Proyectos | Chacal Estudio' : 'Our Projects | Chacal Estudio';
  const description =
    locale === 'es'
      ? 'Descubre nuestros proyectos de comunicación con propósito. Casos seleccionados que reflejan nuestro compromiso con el triple impacto y la comunicación estratégica.'
      : 'Discover our purpose-driven communication projects. Selected cases that reflect our commitment to triple impact and strategic communication.';

  return {
    title,
    description,
    keywords:
      locale === 'es'
        ? [
            'proyectos comunicación',
            'portfolio agencia Argentina',
            'casos de estudio',
            'comunicación con propósito',
            'proyectos sustentables',
            'triple impacto',
          ]
        : [
            'communication projects',
            'agency portfolio Argentina',
            'case studies',
            'purpose-driven communication',
            'sustainable projects',
            'triple impact',
          ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: alternateEs,
        en: alternateEn,
        'x-default': alternateEs,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Chacal Estudio',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_AR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ProjectsPage() {
  // const { locale } = await params;

  // Temporarily disabled
  notFound();
  return null;

  /*
  const baseUrl = 'https://chacalestudio.ar';
  const currentPath = locale === routing.defaultLocale ? '/projects' : `/${locale}/projects`;
  const canonicalUrl = `${baseUrl}${currentPath}`;

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'es' ? 'Inicio' : 'Home',
        item: `${baseUrl}${locale === routing.defaultLocale ? '' : `/${locale}`}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'es' ? 'Proyectos' : 'Projects',
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ProjectsClient />
    </>
  );
  */
}
