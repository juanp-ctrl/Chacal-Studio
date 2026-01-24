export interface ProjectImage {
  /** Unique identifier for the image */
  id: string;
  /** Image source URL (Unsplash for now, will be /projects/filename.webp in production) */
  src: string;
  /** Reference to the project this image belongs to */
  projectSlug: string;
  /** Aspect ratio for masonry grid layout */
  aspectRatio: "landscape" | "portrait" | "square";
  /** Alt text for accessibility */
  alt: string;
}

/**
 * Flat array of all project images for the homepage masonry grid.
 * Each image is a separate card in the grid.
 * Order determines visual composition - arrange for best masonry flow.
 */
export const projectImages: ProjectImage[] = [
  // Row 1 - Mixed aspects for visual interest
  {
    id: "ecosfera-01",
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80&fm=webp",
    projectSlug: "ecosfera-urbana",
    aspectRatio: "landscape",
    alt: "Ecosfera Urbana - Urban sustainability campaign",
  },
  {
    id: "conexion-01",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fm=webp",
    projectSlug: "conexion-aula",
    aspectRatio: "portrait",
    alt: "Conexión Aula - Digital learning platform",
  },
  {
    id: "raices-01",
    src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80&fm=webp",
    projectSlug: "raices-del-futuro",
    aspectRatio: "square",
    alt: "Raíces del Futuro - Community reforestation",
  },
  {
    id: "impacto-01",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=webp",
    projectSlug: "impacto-visual",
    aspectRatio: "landscape",
    alt: "Impacto Visual - Data visualization",
  },
  // Row 2
  {
    id: "voces-01",
    src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80&fm=webp",
    projectSlug: "voces-nativas",
    aspectRatio: "portrait",
    alt: "Voces Nativas - Indigenous languages podcast",
  },
  {
    id: "energia-01",
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&fm=webp",
    projectSlug: "energia-limpia",
    aspectRatio: "landscape",
    alt: "Energía Limpia - Solar energy branding",
  },
  {
    id: "ecosfera-02",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fm=webp",
    projectSlug: "ecosfera-urbana",
    aspectRatio: "square",
    alt: "Ecosfera Urbana - Office sustainability",
  },
  {
    id: "conexion-02",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&fm=webp",
    projectSlug: "conexion-aula",
    aspectRatio: "landscape",
    alt: "Conexión Aula - Collaborative learning",
  },
  // Row 3
  {
    id: "raices-02",
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80&fm=webp",
    projectSlug: "raices-del-futuro",
    aspectRatio: "portrait",
    alt: "Raíces del Futuro - Forest conservation",
  },
  {
    id: "impacto-02",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&fm=webp",
    projectSlug: "impacto-visual",
    aspectRatio: "landscape",
    alt: "Impacto Visual - Annual report design",
  },
  {
    id: "voces-02",
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?w=800&q=80&fm=webp",
    projectSlug: "voces-nativas",
    aspectRatio: "square",
    alt: "Voces Nativas - Cultural preservation",
  },
  {
    id: "energia-02",
    src: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80&fm=webp",
    projectSlug: "energia-limpia",
    aspectRatio: "portrait",
    alt: "Energía Limpia - Solar panel installation",
  },
  // Row 4
  {
    id: "ecosfera-03",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fm=webp",
    projectSlug: "ecosfera-urbana",
    aspectRatio: "portrait",
    alt: "Ecosfera Urbana - Sustainable architecture",
  },
  {
    id: "conexion-03",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&fm=webp",
    projectSlug: "conexion-aula",
    aspectRatio: "square",
    alt: "Conexión Aula - Remote education",
  },
  {
    id: "raices-03",
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fm=webp",
    projectSlug: "raices-del-futuro",
    aspectRatio: "landscape",
    alt: "Raíces del Futuro - Environmental impact",
  },
  {
    id: "voces-03",
    src: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&q=80&fm=webp",
    projectSlug: "voces-nativas",
    aspectRatio: "landscape",
    alt: "Voces Nativas - Sound recording",
  },
];
