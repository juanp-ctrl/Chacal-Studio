export interface ProjectImage {
  /** Unique identifier for the image */
  id: string;
  /** Image source URL - path to the file in /Proyectos/ folder */
  src: string;
  /** Project name extracted from filename */
  projectName: string;
  /** File type for handling static vs animated content */
  type: 'gif' | 'png';
  /** Aspect ratio for masonry grid layout */
  aspectRatio: 'landscape' | 'portrait' | 'square';
  /** Alt text for accessibility */
  alt: string;
}

/**
 * Array of all project images for the homepage masonry grid.
 * Each image is a separate card in the grid.
 * Ordered to create balanced column heights in masonry layout.
 *
 * Aspect ratio assignments:
 * - Portrait (vertical): 01, 05, 06, 08, 10, 11, 12, 13, 18, 20, 21
 * - Landscape: 02, 03, 04, 09, 15, 17
 * - Square: 07, 14, 16, 19
 *
 * Order optimized for CSS columns to balance heights across 4 columns.
 * Pattern: distribute landscapes early, mix squares in middle, portraits throughout.
 */
export const projectImages: ProjectImage[] = [
  // Row 1 - Start with mix to establish balanced column heights
  {
    id: '02-clinica-emilia',
    src: '/Proyectos/02 - Clínica Integral Emilia Monsalvez.gif',
    projectName: 'Clínica Integral Emilia Monsalvez',
    type: 'gif',
    aspectRatio: 'landscape',
    alt: 'Clínica Integral Emilia Monsalvez - Project showcase',
  },
  {
    id: '01-enso',
    src: '/Proyectos/01 - ēnso.gif',
    projectName: 'ēnso',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'ēnso - Project showcase',
  },
  {
    id: '03-fresca',
    src: '/Proyectos/03 - Fresca.gif',
    projectName: 'Fresca',
    type: 'gif',
    aspectRatio: 'landscape',
    alt: 'Fresca - Project showcase',
  },
  {
    id: '05-hhs',
    src: '/Proyectos/05 - HHS.gif',
    projectName: 'HHS',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'HHS - Project showcase',
  },
  // Row 2 - Mix in squares
  {
    id: '07-xinca',
    src: '/Proyectos/07 - Xinca.gif',
    projectName: 'Xinca',
    type: 'gif',
    aspectRatio: 'square',
    alt: 'Xinca - Project showcase',
  },
  {
    id: '04-mutisia',
    src: '/Proyectos/04 - Mutisia.png',
    projectName: 'Mutisia',
    type: 'png',
    aspectRatio: 'landscape',
    alt: 'Mutisia - Project showcase',
  },
  {
    id: '06-wesley',
    src: '/Proyectos/06 - Wesley.gif',
    projectName: 'Wesley',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'Wesley - Project showcase',
  },
  {
    id: '14-rana',
    src: '/Proyectos/14 - Raña.gif',
    projectName: 'Raña',
    type: 'gif',
    aspectRatio: 'square',
    alt: 'Raña - Project showcase',
  },
  // Row 3 - Continue balancing
  {
    id: '09-modoprevia',
    src: '/Proyectos/09 - ModoPrevia.gif',
    projectName: 'ModoPrevia',
    type: 'gif',
    aspectRatio: 'landscape',
    alt: 'ModoPrevia - Project showcase',
  },
  {
    id: '08-merli',
    src: '/Proyectos/08 - Merlí.gif',
    projectName: 'Merlí',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'Merlí - Project showcase',
  },
  {
    id: '16-mutisia-2',
    src: '/Proyectos/16 - Mutisia.gif',
    projectName: 'Mutisia',
    type: 'gif',
    aspectRatio: 'square',
    alt: 'Mutisia - Project showcase',
  },
  {
    id: '10-confluencia',
    src: '/Proyectos/10 - Confluencia de Cervezas.gif',
    projectName: 'Confluencia de Cervezas',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'Confluencia de Cervezas - Project showcase',
  },
  // Row 4 - Mix remaining
  {
    id: '15-confluencia-2',
    src: '/Proyectos/15 - Confluencia de Cervezas.gif',
    projectName: 'Confluencia de Cervezas',
    type: 'gif',
    aspectRatio: 'landscape',
    alt: 'Confluencia de Cervezas - Project showcase',
  },
  {
    id: '11-mutisia-fotos',
    src: '/Proyectos/11 - Mutisia fotos.gif',
    projectName: 'Mutisia fotos',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'Mutisia fotos - Project showcase',
  },
  {
    id: '19-kalevala',
    src: '/Proyectos/19 - Kalevala.png',
    projectName: 'Kalevala',
    type: 'png',
    aspectRatio: 'square',
    alt: 'Kalevala - Project showcase',
  },
  {
    id: '12-greenheads',
    src: '/Proyectos/12 - GIF Greenheads.gif',
    projectName: 'Greenheads',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'Greenheads - Project showcase',
  },
  // Row 5 - Final items
  {
    id: '17-iki',
    src: '/Proyectos/17 - IKi.gif',
    projectName: 'IKi',
    type: 'gif',
    aspectRatio: 'landscape',
    alt: 'IKi - Project showcase',
  },
  {
    id: '13-oh-my-veggie',
    src: '/Proyectos/13 - Oh My Veggie.gif',
    projectName: 'Oh My Veggie',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'Oh My Veggie - Project showcase',
  },
  {
    id: '18-zigzag',
    src: '/Proyectos/18 - ZigZag.gif',
    projectName: 'ZigZag',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'ZigZag - Project showcase',
  },
  {
    id: '20-keni',
    src: '/Proyectos/20 - Keñi.png',
    projectName: 'Keñi',
    type: 'png',
    aspectRatio: 'portrait',
    alt: 'Keñi - Project showcase',
  },
  {
    id: '21-rana-fotos',
    src: '/Proyectos/21 - Raña fotos.gif',
    projectName: 'Raña fotos',
    type: 'gif',
    aspectRatio: 'portrait',
    alt: 'Raña fotos - Project showcase',
  },
];
