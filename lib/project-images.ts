export interface ProjectImage {
  /** Unique identifier for the image */
  id: string;
  /** Image source URL (Unsplash for now, will be /projects/filename.webp in production) */
  src: string;
  /** Reference to the project this image belongs to */
  projectSlug: string;
  /** Aspect ratio for masonry grid layout */
  aspectRatio: 'landscape' | 'portrait' | 'square';
  /** Alt text for accessibility */
  alt: string;
}

/**
 * Flat array of all project images for the homepage masonry grid.
 * Each image is a separate card in the grid.
 * Order determines visual composition - arrange for best masonry flow.
 * Using popular/featured Unsplash images for reliability.
 */
export const projectImages: ProjectImage[] = [
  // Column 1 - Mixed aspects for visual interest
  {
    id: 'ecosfera-01',
    src: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=90&fm=webp',
    projectSlug: 'ecosfera-urbana',
    aspectRatio: 'landscape',
    alt: 'Ecosfera Urbana - Urban sustainability campaign',
  },
  {
    id: 'conexion-01',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=90&fm=webp',
    projectSlug: 'conexion-aula',
    aspectRatio: 'portrait',
    alt: 'Conexión Aula - Digital learning platform',
  },
  {
    id: 'raices-01',
    src: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=90&fm=webp',
    projectSlug: 'raices-del-futuro',
    aspectRatio: 'square',
    alt: 'Raíces del Futuro - Community reforestation',
  },
  {
    id: 'impacto-01',
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=90&fm=webp',
    projectSlug: 'impacto-visual',
    aspectRatio: 'square',
    alt: 'Impacto Visual - Data visualization',
  },
  // Column 2
  {
    id: 'voces-01',
    src: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=90&fm=webp',
    projectSlug: 'voces-nativas',
    aspectRatio: 'portrait',
    alt: 'Voces Nativas - Indigenous languages podcast',
  },
  {
    id: 'energia-01',
    src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=90&fm=webp',
    projectSlug: 'energia-limpia',
    aspectRatio: 'landscape',
    alt: 'Energía Limpia - Solar panels field',
  },
  {
    id: 'ecosfera-02',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=90&fm=webp',
    projectSlug: 'ecosfera-urbana',
    aspectRatio: 'square',
    alt: 'Ecosfera Urbana - Modern office space',
  },
  {
    id: 'conexion-02',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=90&fm=webp',
    projectSlug: 'conexion-aula',
    aspectRatio: 'landscape',
    alt: 'Conexión Aula - Team collaboration',
  },
  // Column 3
  {
    id: 'raices-02',
    src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=90&fm=webp',
    projectSlug: 'raices-del-futuro',
    aspectRatio: 'portrait',
    alt: 'Raíces del Futuro - Mountain peaks',
  },
  {
    id: 'impacto-02',
    src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&q=90&fm=webp',
    projectSlug: 'impacto-visual',
    aspectRatio: 'landscape',
    alt: 'Impacto Visual - Analytics workspace',
  },
  {
    id: 'voces-02',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=90&fm=webp',
    projectSlug: 'voces-nativas',
    aspectRatio: 'square',
    alt: 'Voces Nativas - Community gathering',
  },
  {
    id: 'energia-02',
    src: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=90&fm=webp',
    projectSlug: 'energia-limpia',
    aspectRatio: 'square',
    alt: 'Energía Limpia',
  },
  // Column 4
  {
    id: 'ecosfera-03',
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=90&fm=webp',
    projectSlug: 'ecosfera-urbana',
    aspectRatio: 'portrait',
    alt: 'Ecosfera Urbana - Modern architecture',
  },
  {
    id: 'conexion-03',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=90&fm=webp',
    projectSlug: 'conexion-aula',
    aspectRatio: 'square',
    alt: 'Conexión Aula - Workshop session',
  },
  {
    id: 'raices-03',
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=90&fm=webp',
    projectSlug: 'raices-del-futuro',
    aspectRatio: 'landscape',
    alt: 'Raíces del Futuro - Green valley landscape',
  },
  {
    id: 'voces-03',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90&fm=webp',
    projectSlug: 'voces-nativas',
    aspectRatio: 'landscape',
    alt: 'Voces Nativas - Mountain range',
  },
];
