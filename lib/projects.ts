export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  thumbnail: string;
  client?: string;
}

export const projects: Project[] = [
  {
    slug: 'ecosfera-urbana',
    title: 'Ecosfera Urbana',
    summary: 'Campaña creativa para promover prácticas sostenibles en ciudades latinoamericanas.',
    tags: ['Branding', 'Campaña'],
    thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
    client: 'Red Latinoamericana de Ciudades Sostenibles'
  },
  {
    slug: 'conexion-aula',
    title: 'Conexión Aula',
    summary: 'Plataforma educativa que humaniza el aprendizaje digital para comunidades vulnerables.',
    tags: ['UX/UI', 'Producto Digital'],
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    client: 'Fundación Educación para Todos'
  },
  {
    slug: 'raices-del-futuro',
    title: 'Raíces del Futuro',
    summary: 'Identidad visual y storytelling para una organización enfocada en reforestación comunitaria.',
    tags: ['Branding', 'Estrategia'],
    thumbnail: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    client: 'Organización Comunitaria Bosques Vivos'
  },
  {
    slug: 'impacto-visual',
    title: 'Impacto Visual',
    summary: 'Diseño de reporte anual interactivo para ONG de derechos humanos.',
    tags: ['Diseño Editorial', 'Web'],
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    client: 'Human Rights Watch'
  },
  {
    slug: 'voces-nativas',
    title: 'Voces Nativas',
    summary: 'Plataforma de podcast para preservar lenguas indígenas en peligro de extinción.',
    tags: ['Audio', 'Web', 'Cultura'],
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
    client: 'UNESCO'
  },
  {
    slug: 'energia-limpia',
    title: 'Energía Limpia',
    summary: 'Rebranding para startup de energía solar accesible.',
    tags: ['Branding', 'Identidad'],
    thumbnail: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800',
    client: 'SolarTech'
  }
];

