export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  client: string;
  year: string;
  location: string;
  thumbnail: string;
  heroImage: string;
  challenge: string;
  process: string;
  solution: string;
  results: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: 'ecosfera-urbana',
    title: 'Ecosfera urbana',
    subtitle: 'Campaña creativa para promover prácticas sostenibles',
    description: 'Campaña creativa para promover prácticas sostenibles en ciudades latinoamericanas.',
    category: 'Branding & Campaña',
    client: 'Red Latinoamericana de Ciudades Sostenibles',
    year: '2023',
    location: 'Buenos Aires, Argentina / Santiago, Chile',
    thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
    heroImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600',
    challenge: 'Crear una campaña que inspire a las comunidades urbanas a adoptar prácticas sostenibles sin parecer punitiva o moralista. El reto era comunicar urgencia sin generar eco-ansiedad.',
    process: 'Realizamos investigación etnográfica en 5 ciudades latinoamericanas para entender los principales obstáculos a la adopción de prácticas sostenibles. Co-diseñamos soluciones con comunidades locales y desarrollamos una identidad visual que celebra lo urbano y lo natural.',
    solution: 'Creamos una campaña multiplataforma con identidad visual vibrante que conecta naturaleza y ciudad. Desarrollamos contenido educativo gamificado y una plataforma digital para compartir acciones sostenibles. La narrativa se enfocó en pequeños cambios con gran impacto.',
    results: 'La campaña alcanzó 2.5M de personas en 6 meses, generó 15K compromisos de acción documentados, y fue adoptada por 12 gobiernos locales como parte de sus programas ambientales.',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1600',
    ],
  },
  {
    id: 'conexion-aula',
    title: 'Conexión aula',
    subtitle: 'Plataforma educativa que humaniza el aprendizaje digital',
    description: 'Plataforma educativa que humaniza el aprendizaje digital para comunidades vulnerables.',
    category: 'UX/UI & Producto Digital',
    client: 'Fundación Educación para Todos',
    year: '2024',
    location: 'Neuquén, Argentina / Perú / Bolivia',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
    challenge: 'Diseñar una plataforma educativa accesible para comunidades con conectividad limitada y diversos niveles de alfabetización digital. El desafío era crear una experiencia inclusiva que no discrimine por capacidades técnicas.',
    process: 'Trabajamos directamente con 200 estudiantes y 40 educadores de comunidades vulnerables durante 6 meses. Realizamos talleres de co-diseño, pruebas de usabilidad en condiciones reales y desarrollamos prototipos iterativos basados en feedback continuo.',
    solution: 'Creamos una plataforma progressive web app que funciona offline, con interfaz intuitiva basada en íconos universales. Implementamos un sistema de navegación por voz, contenido adaptativo según ancho de banda, y recursos descargables. La experiencia prioriza la conexión humana sobre la tecnología.',
    results: 'Adoptada por 45 escuelas en 3 países, con 8,500 estudiantes activos. 94% de satisfacción entre docentes. Reducción del 67% en abandono escolar digital. Ganadora del premio UNESCO a la Innovación Educativa 2024.',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600',
    ],
  },
  {
    id: 'raices-del-futuro',
    title: 'Raíces del futuro',
    subtitle: 'Identidad visual y storytelling para reforestación comunitaria',
    description: 'Identidad visual y storytelling para una organización enfocada en reforestación comunitaria.',
    category: 'Branding & Estrategia',
    client: 'Organización Comunitaria Bosques Vivos',
    year: '2022-2023',
    location: 'Patagonia Argentina / Chile',
    thumbnail: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    heroImage: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600',
    challenge: 'Posicionar una organización de reforestación comunitaria en un mercado saturado de iniciativas ambientales. Necesitaban diferenciarse comunicando su enfoque único: empoderar comunidades locales como guardianes de sus ecosistemas.',
    process: 'Inmersión de 3 semanas en comunidades participantes para entender sus historias y conexión con la tierra. Desarrollamos workshops de construcción de narrativa colectiva. Creamos un sistema de identidad visual inspirado en la diversidad de especies nativas.',
    solution: 'Diseñamos una identidad visual orgánica y modular que crece como un bosque: cada proyecto comunitario aporta un elemento visual único. Desarrollamos una estrategia de storytelling donde las comunidades son protagonistas, no beneficiarias. Creamos materiales de comunicación en 4 idiomas (español, quechua, guaraní, mapudungun).',
    results: 'La organización triplicó su financiamiento en 18 meses. 25 comunidades nuevas se sumaron al programa. El modelo de branding participativo ganó el León de Oro en Cannes Lions. 500,000 árboles plantados y monitoreados por las propias comunidades.',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600',
      'https://images.unsplash.com/photo-1511497584788-876760111969?w=1600',
      'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=1600',
    ],
  },
];
