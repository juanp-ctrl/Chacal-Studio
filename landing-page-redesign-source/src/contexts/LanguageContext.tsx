import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Navigation
    'nav.method': 'El Método',
    'nav.impact': 'Nuestro Impacto',
    'nav.services': 'Servicios',
    'nav.plantBased': 'Plant Based Treaty',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.title': 'Comunicando lo humano',
    'hero.subtitle': 'Creamos estrategias de comunicación con propósito desde la Patagonia. Somos un estudio de comunicación y diseño que transforma marcas en agentes de cambio, respetando a todos los seres sintientes y el planeta.',
    'hero.cta': 'Descubrí nuestra propuesta',
    
    // Marquee
    'marquee.text': 'Creemos en marcas que entienden su entorno. Que comunican con responsabilidad. Que dejan huellas que regeneran, no que lastiman.',
    
    // Method
    'method.title': 'El método',
    'method.description': 'De una necesidad surge el análisis, en el análisis aparece el descubrimiento/entendimiento, para luego delimitar objetivos, encontrar estrategias, idear soluciones, obtener resultados y dejar huellas. Esas huellas son lo que nos permite ser reconocibles, recordables y diferenciarnos del resto, fortaleciendo valores a través de una comunicación sólida, humana y planificada.',
    'method.step1.title': 'Análisis',
    'method.step1.description': 'De una necesidad surge el análisis profundo',
    'method.step2.title': 'Descubrimiento',
    'method.step2.description': 'Entendimiento y comprensión del contexto',
    'method.step3.title': 'Objetivos',
    'method.step3.description': 'Delimitamos metas claras y estrategias',
    'method.step4.title': 'Resultados',
    'method.step4.description': 'Soluciones concretas que generan impacto',
    'method.step5.title': 'Huellas',
    'method.step5.description': 'Identidad recordable y diferenciada',
    
    // Future
    'future.title': 'El futuro que construimos',
    'future.p1': 'Creemos en que las marcas pueden convertirse en agentes de cambio y en generadoras de cambios positivos adoptando acciones concretas de triple impacto, donde la comunicación tiene un rol esencial, permitiendo informar, educar e inspirar a las personas a unirse a su visión y propósito.',
    'future.p2': 'Ser conscientes de nuestro paso por el planeta y de las huellas que dejamos, nos invita a reflexionar, a pensar más allá de los beneficios individuales y a trabajar en conjunto para crear un mundo mejor en lo social, lo ambiental y lo económico.',
    'future.p3': 'En el camino hacia un futuro más justo, creemos en la fuerza de la colaboración, en la importancia de cuidar nuestro entorno, en el valor de construir una sociedad más justa y en el poder de la participación activa de cada individuo.',
    'future.p4': 'De esta forma, nos inspira un enfoque ambientalista, donde la protección y preservación de nuestro planeta es una prioridad absoluta. Reconocemos la importancia de adoptar prácticas sostenibles en todos los aspectos de nuestras vidas y trabajos, abrazamos una perspectiva inclusiva que pone a todos los seres sintientes en el centro, y creemos en el valor de fomentar el respeto mutuo y de construir un mundo equitativo.',
    
    // Impact
    'impact.title': 'Nuestro impacto',
    'impact.subtitle': 'Nos comprometemos a ser una fuerza de bien en el mundo.',
    'impact.team.title': 'En el equipo',
    'impact.team.description': 'Fomentamos un espacio de trabajo seguro, inclusivo y equitativo, donde no hay lugar para la discriminación ni el acoso. Creemos en la flexibilidad y el trabajo remoto como parte de un balance real entre la vida profesional y personal. Buscamos que el crecimiento de cada colaborador esté alineado con su propósito, con remuneraciones justas y transparentes.',
    'impact.community.title': 'En la comunidad',
    'impact.community.description': 'Guiamos a otras organizaciones a adoptar prácticas de triple impacto. Apoyamos a proveedores locales y priorizamos a aquellos de grupos subrepresentados. Ofrecemos tarifas reducidas y servicios pro bono a ONGs y grupos en situación de vulnerabilidad, reservamos el derecho de no colaborar con clientes o proveedores cuya actividad sea incompatible con nuestros valores.',
    'impact.planet.title': 'En el planeta',
    'impact.planet.description': 'Medimos nuestro consumo de energía, agua y nuestras emisiones para entender y reducir nuestro impacto. Compartimos recursos con nuestro equipo para fomentar prácticas sostenibles en sus espacios de trabajo, como el uso eficiente de la energía y la eliminación segura de residuos electrónicos. Promovemos la digitalización y tenemos un compromiso de cero desechos a vertederos, separando nuestros residuos para reciclaje o compostaje.',
    
    // Services
    'services.title': 'Lo que hacemos',
    'services.consulting.title': 'Consultoría y estrategia',
    'services.consulting.description': 'Ayudamos a nuestrxs clientxs a alcanzar sus objetivos a través de la definición de su target y la determinación de metas, para luego desarrollar un plan de comunicación integral y personalizado para ellxs.',
    'services.advisory.title': 'Asesoría comunicacional',
    'services.advisory.description': 'Un espacio personalizado para entender, analizar y encontrar la estrategia adecuada según cada objetivo. Esto lo hacemos a través de un vínculo uno a uno, buscando comprender la situación actual y entender las necesidades.',
    'services.diagnostic.title': 'Diagnóstico comunicacional',
    'services.diagnostic.description': 'Investigamos, evaluamos y desarrollamos estrategias para ayudar a nuestrxs clientxs a entender cómo están comunicándose actualmente y a identificar oportunidades de mejora.',
    'services.management.title': 'Gestión de la comunicación',
    'services.management.description': 'Nos encargamos de la planificación y gestión de la comunicación interna y/o externa de las marcas, basándonos en estrategias y tácticas sólidas y prácticas.',
    'services.sustainability.title': 'Consultoría Sustentable',
    'services.sustainability.description': 'Cada tarea y cada proyecto es realizado con un foco socioambiental, donde realizamos inventarios de huella de carbono organizacional y de productos, diseño de estrategias de sustentabilidad, Análisis de Ciclo de Vida (ACV), elaboración y diseño de reportes de sustentabilidad, capacitaciones in company, etc.',
    
    // Plant Based
    'plantBased.title': 'Alianza con Plant Based Treaty',
    'plantBased.intro': 'Estamos orgullosxs de trabajar junto al Plant Based Treaty (Acuerdo Basado en Plantas), una iniciativa global de base que busca poner a los sistemas alimentarios en el centro del debate sobre la crisis climática.',
    'plantBased.mission': 'La misión del Acuerdo',
    'plantBased.missionText1': 'El Plant Based Treaty es una respuesta directa a la emergencia climática. Su misión es promover un cambio urgente hacia un sistema alimentario justo y basado en plantas, que nos permita vivir de forma segura dentro de nuestros límites planetarios y reforestar la Tierra.',
    'plantBased.missionText2': 'Siguiendo el modelo del Acuerdo de París, el tratado se basa en tres principios fundamentales (3R):',
    'plantBased.relinquish.title': 'Relinquish (Renunciar)',
    'plantBased.relinquish.description': 'Detener la degradación de los ecosistemas causada por la agricultura animal.',
    'plantBased.redirect.title': 'Redirect (Redirigir)',
    'plantBased.redirect.description': 'Reorientar políticas y subsidios hacia un sistema alimentario basado en plantas.',
    'plantBased.restore.title': 'Restore (Restaurar)',
    'plantBased.restore.description': 'Reforestar y restaurar ecosistemas clave dañados por la ganadería.',
    'plantBased.contribution.title': 'Nuestra contribución',
    'plantBased.contribution.text': 'Apoyamos activamente esta causa donando horas de consultoría y gestión estratégica pro bono para amplificar su mensaje, y donamos el 2% de nuestras ventas totales mensuales para financiar sus programas.',
    'plantBased.impact.title': 'El Impacto',
    'plantBased.impact.text': 'Esta iniciativa ya ha conseguido el apoyo de figuras culturales como Paul McCartney y la Dra. Jane Goodall, y ha sido adoptada por 34 ciudades en 10 países, incluyendo capitales y grandes centros urbanos como Los Ángeles, Ámsterdam, Edimburgo y Belfast.',
    'plantBased.join': 'Sumate al movimiento',
    'plantBased.signIndividual': 'Firmá como individuo',
    'plantBased.signOrg': 'Firmá como organización',
    'plantBased.signBusiness': 'Firmá como negocio',
    'plantBased.donate.title': 'Hacé tu donación',
    'plantBased.donate.text': 'Tu apoyo nos ayuda a amplificar el mensaje y trabajar por un futuro más sustentable',
    'plantBased.donate.cta': 'Donar ahora',
    'plantBased.learnMore': 'Conocé más sobre Plant Based Treaty',
    
    // SDG
    'sdg.title': 'Objetivos de Desarrollo Sostenible',
    'sdg.subtitle': 'Nuestras políticas y acciones de impacto contribuyen directamente a las metas de los ODS de las Naciones Unidas, enfocando nuestros esfuerzos en:',
    'sdg.5.title': 'Igualdad de Género',
    'sdg.5.description': 'Contribuimos a las metas 5.1 (eliminar la discriminación) y 5.5 (asegurar la participación plena) a través de nuestras políticas de no discriminación y la preferencia por proveedores de grupos subrepresentados, incluyendo empresas lideradas por mujeres.',
    'sdg.8.title': 'Trabajo Decente y Crecimiento Económico',
    'sdg.8.description': 'Impulsamos las metas 8.5 (empleo pleno y productivo con pago justo), 8.6 (empleo y capacitación para jóvenes) y 8.7 (erradicar el trabajo forzoso y el trabajo infantil) mediante nuestras políticas de remuneración equitativa, prohibición de trabajo infantil/forzoso y un entorno laboral flexible.',
    'sdg.11.title': 'Ciudades y Comunidades Sostenibles',
    'sdg.11.description': 'Aportamos a la meta 11.6 (reducir el impacto ambiental de las ciudades) gracias a nuestro plan de gestión ambiental, que incluye la correcta gestión y separación de residuos y la eliminación segura de residuos electrónicos.',
    'sdg.12.title': 'Producción y Consumo Responsables',
    'sdg.12.description': 'Trabajamos por la meta 12.5 (reducir la generación de desechos) promoviendo la digitalización para minimizar el uso de papel y fomentando la economía circular en nuestras operaciones.',
    'sdg.13.title': 'Acción por el Clima',
    'sdg.13.description': 'Contribuimos a las metas 13.2 (incorporar medidas de cambio climático en las políticas) y 13.3 (mejorar la educación y sensibilización) a través de la medición y compensación de nuestra huella de carbono y educando activamente a nuestros clientes en prácticas sostenibles.',
    
    // Partners
    'partners.title': 'Somos parte de',
    'partners.subtitle': 'Colaboramos con organizaciones que comparten nuestra visión de un mundo más justo y sustentable',
    'partners.animalSave.name': 'Animal Save Movement',
    'partners.animalSave.description': 'Nos alineamos con la misión de Animal Save Movement de crear un movimiento de justicia, compasión y veganismo a través de la sensibilización pública y la educación, buscando poner fin a la explotación y cosificación animal, y adoptando activamente una postura anti-especista en contra de todas las formas de discriminación y opresión.',
    'partners.cleanCreatives.name': 'Clean Creatives',
    'partners.cleanCreatives.description': 'Como estudio, nos comprometemos a rechazar contratos con la industria de los combustibles fósiles. Creemos que la industria creativa no debe usar su talento para lavar la imagen de las corporaciones que impulsan la crisis climática.',
    'partners.ati.name': 'ati (Agencias Triple Impacto)',
    'partners.ati.description': 'La primera comunidad latinoamericana que reúne a agencias de comunicación, publicidad y marketing con propósito. Fundada por done! y Bi, ati. busca capitalizar el talento creativo para contribuir a solucionar las problemáticas socioambientales más urgentes e impulsar la transición hacia un nuevo modelo social y económico.',
    'partners.redCreer.name': 'Red Creer',
    'partners.redCreer.description': 'Integramos la Red Creer, una red colaborativa de más de 160 organizaciones de los sectores público, privado y social en Argentina, la cual busca generar oportunidades de inclusión socioeconómica para personas que están o estuvieron privadas de su libertad, abordando el estigma y construyendo una sociedad con mayores oportunidades para todos.',
    'partners.learnMore': 'Conocer más',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Tenés un proyecto en mente? Hablemos sobre cómo podemos ayudarte',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Teléfono',
    'contact.form.organization': 'Organización',
    'contact.form.message': 'Mensaje',
    'contact.form.policies': 'Acepto las políticas de privacidad y el tratamiento de mis datos personales',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.form.placeholder.name': 'Tu nombre',
    'contact.form.placeholder.email': 'tu@email.com',
    'contact.form.placeholder.phone': '+54 9 11 1234-5678',
    'contact.form.placeholder.organization': 'Tu organización',
    'contact.form.placeholder.message': 'Contanos sobre tu proyecto (mínimo 20 caracteres)',
    'contact.form.error.policies': 'Debes aceptar las políticas de privacidad',
    'contact.form.error.messageLength': 'El mensaje debe tener al menos 20 caracteres',
    'contact.form.success': '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
    'contact.connect': 'Conectemos',
    'contact.connectText': 'Estamos aquí para ayudarte a comunicar tu propósito de manera efectiva y sustentable. Ya sea que busques una consultoría estratégica o quieras transformar tu comunicación con enfoque de triple impacto, queremos escucharte.',
    'contact.bCorp': 'Empresa B Certificada',
    'contact.bCorpText': 'Estamos certificados como Empresa B, comprometidos con estándares de desempeño social y ambiental, transparencia pública y responsabilidad legal.',
    
    // Footer
    'footer.tagline': 'Comunicación y diseño con propósito desde la Patagonia argentina.',
    'footer.links': 'Enlaces',
    'footer.follow': 'Seguinos',
    'footer.copyright': 'Chacal Estudio. Todos los derechos reservados.',
    'footer.privacy': 'Políticas de Privacidad',
    'footer.terms': 'Términos y Condiciones',
    
    // Cookie Banner
    'cookies.title': 'Uso de Cookies',
    'cookies.description': 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies esenciales son necesarias para el funcionamiento del sitio, mientras que las analíticas nos ayudan a entender cómo interactuás con nuestro contenido.',
    'cookies.shortDescription': 'Usamos cookies para mejorar tu experiencia.',
    'cookies.acceptAll': 'Aceptar todas',
    'cookies.accept': 'Aceptar',
    'cookies.rejectOptional': 'Rechazar opcionales',
    'cookies.reject': 'Rechazar',
    'cookies.customize': 'Personalizar',
    'cookies.preferences': 'Preferencias de Cookies',
    'cookies.essential': 'Cookies Esenciales',
    'cookies.essentialText': 'Necesarias para el funcionamiento básico del sitio',
    'cookies.analytics': 'Cookies Analíticas',
    'cookies.analyticsText': 'Nos ayudan a entender cómo usás el sitio',
    'cookies.marketing': 'Cookies de Marketing',
    'cookies.marketingText': 'Utilizadas para personalizar publicidad',
    'cookies.save': 'Guardar preferencias',
    'cookies.back': 'Volver',
    
    // Loader
    'loader.text': 'Comunicando lo humano, con un foco socio ambiental',
    
    // Projects
    'projects.title': 'Proyectos',
    'projects.subtitle': 'Casos seleccionados que reflejan nuestro compromiso con la comunicación con propósito y triple impacto.',
    'projects.viewAll': 'Ver todos los proyectos',
    'projects.backHome': 'Volver al inicio',
    'projects.allProjects': 'Nuestros Proyectos',
    'projects.allProjectsSubtitle': 'Cada proyecto es una oportunidad para generar impacto positivo. Descubre cómo el diseño y la comunicación pueden transformar realidades.',
    'projects.backToProjects': 'Volver a proyectos',
    'projects.detail.challenge': 'El desafío',
    'projects.detail.process': 'El proceso',
    'projects.detail.solution': 'La solución',
    'projects.detail.results': 'Resultados',
    'projects.detail.gallery': 'Galería',
    'projects.detail.nextProject': 'Siguiente proyecto',
  },
  en: {
    // Navigation
    'nav.method': 'The Method',
    'nav.impact': 'Our Impact',
    'nav.services': 'Services',
    'nav.plantBased': 'Plant Based Treaty',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Communicating the human',
    'hero.subtitle': 'We create purpose-driven communication strategies from Patagonia. We are a communication and design studio that transforms brands into agents of change, respecting all sentient beings and the planet.',
    'hero.cta': 'Discover our approach',
    
    // Marquee
    'marquee.text': 'We believe in brands that understand their environment. That communicate responsibly. That leave footprints that regenerate, not harm.',
    
    // Method
    'method.title': 'The method',
    'method.description': 'From a need arises analysis, in the analysis appears discovery/understanding, then we define objectives, find strategies, devise solutions, obtain results and leave footprints. Those footprints are what allow us to be recognizable, memorable and differentiate ourselves from the rest, strengthening values through solid, human and planned communication.',
    'method.step1.title': 'Analysis',
    'method.step1.description': 'From a need arises deep analysis',
    'method.step2.title': 'Discovery',
    'method.step2.description': 'Understanding and context comprehension',
    'method.step3.title': 'Objectives',
    'method.step3.description': 'We define clear goals and strategies',
    'method.step4.title': 'Results',
    'method.step4.description': 'Concrete solutions that generate impact',
    'method.step5.title': 'Footprints',
    'method.step5.description': 'Memorable and differentiated identity',
    
    // Future
    'future.title': 'The future we build',
    'future.p1': 'We believe that brands can become agents of change and generators of positive changes by adopting concrete triple impact actions, where communication plays an essential role, allowing us to inform, educate and inspire people to join their vision and purpose.',
    'future.p2': 'Being aware of our passage through the planet and the footprints we leave, invites us to reflect, to think beyond individual benefits and to work together to create a better world in social, environmental and economic terms.',
    'future.p3': 'On the path to a more just future, we believe in the strength of collaboration, in the importance of caring for our environment, in the value of building a more just society and in the power of active participation of each individual.',
    'future.p4': 'In this way, we are inspired by an environmentalist approach, where the protection and preservation of our planet is an absolute priority. We recognize the importance of adopting sustainable practices in all aspects of our lives and work, we embrace an inclusive perspective that puts all sentient beings at the center, and we believe in the value of fostering mutual respect and building an equitable world.',
    
    // Impact
    'impact.title': 'Our impact',
    'impact.subtitle': 'We commit to being a force for good in the world.',
    'impact.team.title': 'In the team',
    'impact.team.description': 'We foster a safe, inclusive and equitable work space, where there is no place for discrimination or harassment. We believe in flexibility and remote work as part of a real balance between professional and personal life. We seek for each collaborator\'s growth to be aligned with their purpose, with fair and transparent remuneration.',
    'impact.community.title': 'In the community',
    'impact.community.description': 'We guide other organizations to adopt triple impact practices. We support local suppliers and prioritize those from underrepresented groups. We offer reduced rates and pro bono services to NGOs and vulnerable groups, we reserve the right not to collaborate with clients or suppliers whose activity is incompatible with our values.',
    'impact.planet.title': 'On the planet',
    'impact.planet.description': 'We measure our energy and water consumption and our emissions to understand and reduce our impact. We share resources with our team to encourage sustainable practices in their workspaces, such as efficient use of energy and safe disposal of electronic waste. We promote digitization and have a zero waste to landfill commitment, separating our waste for recycling or composting.',
    
    // Services
    'services.title': 'What we do',
    'services.consulting.title': 'Consulting and strategy',
    'services.consulting.description': 'We help our clients achieve their goals through defining their target and determining goals, then developing a comprehensive and personalized communication plan for them.',
    'services.advisory.title': 'Communication advisory',
    'services.advisory.description': 'A personalized space to understand, analyze and find the right strategy according to each objective. We do this through a one-to-one relationship, seeking to understand the current situation and understand the needs.',
    'services.diagnostic.title': 'Communication diagnosis',
    'services.diagnostic.description': 'We research, evaluate and develop strategies to help our clients understand how they are currently communicating and identify opportunities for improvement.',
    'services.management.title': 'Communication management',
    'services.management.description': 'We take care of planning and managing the internal and/or external communication of brands, based on solid and practical strategies and tactics.',
    'services.sustainability.title': 'Sustainability Consulting',
    'services.sustainability.description': 'Every task and every project is carried out with a socio-environmental focus, where we carry out organizational and product carbon footprint inventories, design sustainability strategies, Life Cycle Analysis (LCA), preparation and design of sustainability reports, in-company training, etc.',
    
    // Plant Based
    'plantBased.title': 'Alliance with Plant Based Treaty',
    'plantBased.intro': 'We are proud to work alongside the Plant Based Treaty, a grassroots global initiative that seeks to put food systems at the center of the debate on the climate crisis.',
    'plantBased.mission': 'The mission of the Treaty',
    'plantBased.missionText1': 'The Plant Based Treaty is a direct response to the climate emergency. Its mission is to promote an urgent change towards a fair and plant-based food system, that allows us to live safely within our planetary boundaries and reforest the Earth.',
    'plantBased.missionText2': 'Following the Paris Agreement model, the treaty is based on three fundamental principles (3Rs):',
    'plantBased.relinquish.title': 'Relinquish',
    'plantBased.relinquish.description': 'Stop the degradation of ecosystems caused by animal agriculture.',
    'plantBased.redirect.title': 'Redirect',
    'plantBased.redirect.description': 'Redirect policies and subsidies towards a plant-based food system.',
    'plantBased.restore.title': 'Restore',
    'plantBased.restore.description': 'Reforest and restore key ecosystems damaged by livestock.',
    'plantBased.contribution.title': 'Our contribution',
    'plantBased.contribution.text': 'We actively support this cause by donating pro bono consulting and strategic management hours to amplify its message, and we donate 2% of our total monthly sales to fund its programs.',
    'plantBased.impact.title': 'The Impact',
    'plantBased.impact.text': 'This initiative has already gained the support of cultural figures such as Paul McCartney and Dr. Jane Goodall, and has been adopted by 34 cities in 10 countries, including capitals and major urban centers such as Los Angeles, Amsterdam, Edinburgh and Belfast.',
    'plantBased.join': 'Join the movement',
    'plantBased.signIndividual': 'Sign as an individual',
    'plantBased.signOrg': 'Sign as an organization',
    'plantBased.signBusiness': 'Sign as a business',
    'plantBased.donate.title': 'Make your donation',
    'plantBased.donate.text': 'Your support helps us amplify the message and work for a more sustainable future',
    'plantBased.donate.cta': 'Donate now',
    'plantBased.learnMore': 'Learn more about Plant Based Treaty',
    
    // SDG
    'sdg.title': 'Sustainable Development Goals',
    'sdg.subtitle': 'Our policies and impact actions directly contribute to the United Nations SDG goals, focusing our efforts on:',
    'sdg.5.title': 'Gender Equality',
    'sdg.5.description': 'We contribute to goals 5.1 (eliminate discrimination) and 5.5 (ensure full participation) through our non-discrimination policies and preference for suppliers from underrepresented groups, including women-led businesses.',
    'sdg.8.title': 'Decent Work and Economic Growth',
    'sdg.8.description': 'We promote goals 8.5 (full and productive employment with fair pay), 8.6 (employment and training for youth) and 8.7 (eradicate forced labor and child labor) through our equitable remuneration policies, prohibition of child/forced labor and a flexible work environment.',
    'sdg.11.title': 'Sustainable Cities and Communities',
    'sdg.11.description': 'We contribute to goal 11.6 (reduce the environmental impact of cities) thanks to our environmental management plan, which includes proper waste management and separation and safe disposal of electronic waste.',
    'sdg.12.title': 'Responsible Production and Consumption',
    'sdg.12.description': 'We work towards goal 12.5 (reduce waste generation) by promoting digitization to minimize paper use and encouraging the circular economy in our operations.',
    'sdg.13.title': 'Climate Action',
    'sdg.13.description': 'We contribute to goals 13.2 (incorporate climate change measures into policies) and 13.3 (improve education and awareness) through measuring and offsetting our carbon footprint and actively educating our clients in sustainable practices.',
    
    // Partners
    'partners.title': 'We are part of',
    'partners.subtitle': 'We collaborate with organizations that share our vision of a more just and sustainable world',
    'partners.animalSave.name': 'Animal Save Movement',
    'partners.animalSave.description': 'We align with Animal Save Movement\'s mission to create a movement of justice, compassion and veganism through public awareness and education, seeking to end animal exploitation and objectification, and actively adopting an anti-speciesist stance against all forms of discrimination and oppression.',
    'partners.cleanCreatives.name': 'Clean Creatives',
    'partners.cleanCreatives.description': 'As a studio, we commit to rejecting contracts with the fossil fuel industry. We believe that the creative industry should not use its talent to greenwash the image of corporations that drive the climate crisis.',
    'partners.ati.name': 'ati (Triple Impact Agencies)',
    'partners.ati.description': 'The first Latin American community that brings together communication, advertising and marketing agencies with purpose. Founded by done! and Bi, ati. seeks to capitalize creative talent to contribute to solving the most urgent socio-environmental problems and drive the transition to a new social and economic model.',
    'partners.redCreer.name': 'Red Creer',
    'partners.redCreer.description': 'We are part of Red Creer, a collaborative network of more than 160 organizations from the public, private and social sectors in Argentina, which seeks to generate socio-economic inclusion opportunities for people who are or were deprived of their liberty, addressing stigma and building a society with greater opportunities for all.',
    'partners.learnMore': 'Learn more',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Have a project in mind? Let\'s talk about how we can help you',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.organization': 'Organization',
    'contact.form.message': 'Message',
    'contact.form.policies': 'I accept the privacy policies and the processing of my personal data',
    'contact.form.submit': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.form.placeholder.name': 'Your name',
    'contact.form.placeholder.email': 'your@email.com',
    'contact.form.placeholder.phone': '+1 234 567-8900',
    'contact.form.placeholder.organization': 'Your organization',
    'contact.form.placeholder.message': 'Tell us about your project (minimum 20 characters)',
    'contact.form.error.policies': 'You must accept the privacy policies',
    'contact.form.error.messageLength': 'The message must be at least 20 characters',
    'contact.form.success': 'Message sent successfully! We will contact you soon.',
    'contact.connect': 'Let\'s connect',
    'contact.connectText': 'We are here to help you communicate your purpose effectively and sustainably. Whether you are looking for strategic consulting or want to transform your communication with a triple impact approach, we want to hear from you.',
    'contact.bCorp': 'Certified B Corporation',
    'contact.bCorpText': 'We are certified as a B Corporation, committed to standards of social and environmental performance, public transparency and legal accountability.',
    
    // Footer
    'footer.tagline': 'Communication and design with purpose from Argentine Patagonia.',
    'footer.links': 'Links',
    'footer.follow': 'Follow us',
    'footer.copyright': 'Chacal Estudio. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms and Conditions',
    
    // Cookie Banner
    'cookies.title': 'Cookie Usage',
    'cookies.description': 'We use cookies to improve your experience on our website. Essential cookies are necessary for the site to function, while analytics help us understand how you interact with our content.',
    'cookies.shortDescription': 'We use cookies to improve your experience.',
    'cookies.acceptAll': 'Accept all',
    'cookies.accept': 'Accept',
    'cookies.rejectOptional': 'Reject optional',
    'cookies.reject': 'Reject',
    'cookies.customize': 'Customize',
    'cookies.preferences': 'Cookie Preferences',
    'cookies.essential': 'Essential Cookies',
    'cookies.essentialText': 'Necessary for basic site functionality',
    'cookies.analytics': 'Analytics Cookies',
    'cookies.analyticsText': 'Help us understand how you use the site',
    'cookies.marketing': 'Marketing Cookies',
    'cookies.marketingText': 'Used to personalize advertising',
    'cookies.save': 'Save preferences',
    'cookies.back': 'Back',
    
    // Loader
    'loader.text': 'Communicating the human, with a socio-environmental focus',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Selected cases that reflect our commitment to purposeful communication and triple impact.',
    'projects.viewAll': 'View all projects',
    'projects.backHome': 'Back home',
    'projects.allProjects': 'Our Projects',
    'projects.allProjectsSubtitle': 'Each project is an opportunity to generate positive impact. Discover how design and communication can transform realities.',
    'projects.backToProjects': 'Back to projects',
    'projects.detail.challenge': 'The challenge',
    'projects.detail.process': 'The process',
    'projects.detail.solution': 'The solution',
    'projects.detail.results': 'Results',
    'projects.detail.gallery': 'Gallery',
    'projects.detail.nextProject': 'Next project',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}