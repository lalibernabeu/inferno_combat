import {
  GymSettings,
  Teacher,
  Discipline,
  TeacherDiscipline,
  Group,
  Schedule,
  GalleryItem,
  ScheduleWithDetails,
  TeacherWithDisciplines,
} from './types';

export const mockGymSettings: GymSettings = {
  id: 'settings-singleton-01',
  name: 'APEX COMBAT CLUB',
  slogan: 'Forja tu carácter. Domina el combate.',
  short_description:
    'Centro de alto rendimiento en deportes de combate y artes marciales. Entrenamiento integral para todos los niveles: desde recreativo y defensa personal hasta competición profesional.',
  about_text:
    'En APEX COMBAT CLUB combinamos la disciplina tradicional de las artes marciales con la metodología más avanzada de preparación física de combate. Nuestro gimnasio está equipado con ring reglamentario, jaula de MMA, tatami olímpico de alta absorción de impacto y zona de sacos pesados. Contamos con un cuerpo docente de atletas de élite liderado por un Campeón Mundial, asegurando una enseñanza técnica, segura y basada en valores de respeto, constancia y superación personal.',
  address: 'Av. Corrientes 4520, Almagro',
  city: 'Ciudad Autónoma de Buenos Aires',
  phone: '+54 9 11 5555-8899',
  whatsapp_number: '5491155558899',
  whatsapp_message:
    '¡Hola! Quisiera consultar por las clases de combate y reservar una clase de prueba gratuita.',
  instagram_url: 'https://instagram.com/apexcombatclub',
  facebook_url: 'https://facebook.com/apexcombatclub',
  google_maps_embed_url:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9926685002597!2d-58.428751523471015!3d-34.60434865753177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca62d4715555%3A0x6739956488730b65!2sAv.%20Corrientes%204520%2C%20C1195AAS%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar',
  google_maps_link: 'https://maps.google.com/?q=Av.+Corrientes+4520,+Buenos+Aires',
  logo_url: '/images/logo.png',
  hero_bg_url:
    'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=2000&q=80',
  seo_title: 'APEX Combat Club | Kickboxing, Boxeo, BJJ, Muay Thai y MMA',
  seo_description:
    'Gimnasio de deportes de combate en Buenos Aires. Clases de Kickboxing, Boxeo, BJJ, Muay Thai y MMA con profesores de élite y Campeón Mundial.',
};

export const mockTeachers: Teacher[] = [
  {
    id: 'teacher-01',
    name: 'Marcos "El Gladiador" Silva',
    nickname: 'El Gladiador',
    bio: 'Pionero del Kickboxing y K-1 en la región con más de 45 peleas profesionales internacionales. Entrenador certificado WAKO y formador de decenas de competidores nacionales.',
    experience_years: '18 años de experiencia',
    photo_url:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
    is_world_champion: true,
    champion_title_details:
      'Campeón Mundial WAKO Pro - Categoría 75kg (2021) & Bicampeón Sudamericano K-1',
    is_active: true,
    display_order: 1,
  },
  {
    id: 'teacher-02',
    name: 'Lucía Méndez',
    nickname: 'La Cobra',
    bio: 'Faixa Preta (Cinturón Negro) 2º Dan en Brazilian Jiu-Jitsu bajo la confederación CBJJ/IBJJF. Múltiple medallista en torneos Open internacionales y especialista en defensa personal.',
    experience_years: '12 años de experiencia',
    photo_url:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    is_world_champion: false,
    is_active: true,
    display_order: 2,
  },
  {
    id: 'teacher-03',
    name: 'Diego Romero',
    nickname: 'Martillo',
    bio: 'Ex boxeador profesional categoría Super Mediano (FAB). Especialista en biomecánica del golpeo, footwork, esquives y preparación física de alto rendimiento para deportes de contacto.',
    experience_years: '15 años de experiencia',
    photo_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    is_world_champion: false,
    is_active: true,
    display_order: 3,
  },
  {
    id: 'teacher-04',
    name: 'Facundo Morales',
    nickname: 'El Tigre',
    bio: 'Entrenador certificado en Bangkok, Tailandia (Campamento Fairtex). Experto en clinch, rodillas, codos y técnicas tradicionales de Muay Thai estilo Muay Femur.',
    experience_years: '10 años de experiencia',
    photo_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    is_world_champion: false,
    is_active: true,
    display_order: 4,
  },
];

export const mockDisciplines: Discipline[] = [
  {
    id: 'disc-01',
    name: 'Kickboxing & K-1',
    slug: 'kickboxing-k1',
    short_description:
      'Combate de pie dinámico y explosivo que combina puños de boxeo con patadas directas y circulares de máxima potencia.',
    full_description:
      'El Kickboxing y la modalidad K-1 desarrollan resistencia cardiovascular inigualable, velocidad de reacción, agilidad y fuerza explosiva. Dictado bajo la supervisión directa de nuestro Campeón Mundial, desde la base técnica para principiantes hasta la preparación táctica de competición.',
    target_audience: 'Recreativo, Niños, Jóvenes y Adultos',
    level_info: 'Principiante a Profesional',
    image_url:
      'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 1,
  },
  {
    id: 'disc-02',
    name: 'Boxeo Tradicional',
    slug: 'boxeo',
    short_description:
      'El arte de la precisión, el ritmo, los desplazamientos (footwork) y la defensa impenetrable sobre el cuadrilátero.',
    full_description:
      'Entrenamiento clásico de boxeo con enfoque en la técnica depurada, trabajo de manoplas, sombra, bolsa pesada y sparring controlado. Ideal para quemar calorías, tonificar y dominar el arte del golpeo.',
    target_audience: 'Hombres, Mujeres y Jóvenes',
    level_info: 'Todos los niveles',
    image_url:
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 2,
  },
  {
    id: 'disc-03',
    name: 'Brazilian Jiu-Jitsu (BJJ)',
    slug: 'brazilian-jiu-jitsu',
    short_description:
      'El arte suave del combate en el suelo: palancas articulares, estrangulaciones y control técnico absoluto.',
    full_description:
      'El BJJ permite a una persona de menor tamaño defenderse eficazmente contra oponentes más grandes mediante la física, el apalancamiento y la estrategia posicional. Modalidades Gi (con quimono) y No-Gi (grappling sin quimono).',
    target_audience: 'Niños, Jóvenes y Adultos (Mixto)',
    level_info: 'Cinturones Blancos a Avanzados',
    image_url:
      'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 3,
  },
  {
    id: 'disc-04',
    name: 'Muay Thai (Boxeo Tailandés)',
    slug: 'muay-thai',
    short_description:
      'El "Arte de las 8 Extremidades": puños, codos, rodillas y canillas combinados con técnicas de agarre y derribo en clinch.',
    full_description:
      'Disciplina milenaria tailandesa con un acondicionamiento físico extremo y un arsenal de golpeo completo y contundente. Clases técnicas con pads tailandeses y paos de impacto.',
    target_audience: 'Jóvenes y Adultos',
    level_info: 'Iniciación a Avanzado',
    image_url:
      'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 4,
  },
  {
    id: 'disc-05',
    name: 'MMA (Artes Marciales Mixtas)',
    slug: 'mma',
    short_description:
      'La integración definitiva del combate de pie, transiciones contra la reja y dominio de sumisión en el suelo.',
    full_description:
      'Combina las mejores herramientas del Kickboxing, Lucha Olímpica (Wrestling), Boxeo y BJJ en la jaula octogonal. Enfoque riguroso en estrategia, resistencia cardiovascular y adaptabilidad.',
    target_audience: 'Jóvenes y Adultos con base previa',
    level_info: 'Intermedio a Competición',
    image_url:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 5,
  },
  {
    id: 'disc-06',
    name: 'Combat Fitness & Funcional',
    slug: 'combat-fitness',
    short_description:
      'Acondicionamiento físico de alto impacto inspirado en los campamentos de entrenamiento de atletas de combate.',
    full_description:
      'Circuito metabólico sin contacto físico: trabajo con kettlebells, battle ropes, golpeo a bolsas pesadas, slam balls y ejercicios pliométricos para quemar grasa y tonificar al máximo.',
    target_audience: 'Para todos (Sin contacto)',
    level_info: 'Apto para cualquier condición física',
    image_url:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    is_active: true,
    display_order: 6,
  },
];

export const mockTeacherDisciplines: TeacherDiscipline[] = [
  { teacher_id: 'teacher-01', discipline_id: 'disc-01' }, // Marcos -> Kickboxing
  { teacher_id: 'teacher-01', discipline_id: 'disc-05' }, // Marcos -> MMA
  { teacher_id: 'teacher-02', discipline_id: 'disc-03' }, // Lucía -> BJJ
  { teacher_id: 'teacher-02', discipline_id: 'disc-05' }, // Lucía -> MMA (Grappling)
  { teacher_id: 'teacher-03', discipline_id: 'disc-02' }, // Diego -> Boxeo
  { teacher_id: 'teacher-03', discipline_id: 'disc-06' }, // Diego -> Combat Fitness
  { teacher_id: 'teacher-04', discipline_id: 'disc-04' }, // Facundo -> Muay Thai
  { teacher_id: 'teacher-04', discipline_id: 'disc-01' }, // Facundo -> Kickboxing
];

export const mockGroups: Group[] = [
  {
    id: 'group-01',
    name: 'Infantil / Kids',
    description:
      'Desarrollo psicomotriz, disciplina, respeto, autoconfianza y prevención del acoso escolar (anti-bullying) en un entorno seguro y divertido.',
    age_range: '6 a 12 años',
    level: 'Inicial / Formativo',
    is_active: true,
    display_order: 1,
  },
  {
    id: 'group-02',
    name: 'Jóvenes y Adultos - Recreativo',
    description:
      'Aprende técnicas reales, ponte en tu mejor forma física y libera el estrés del día a día sin necesidad de recibir golpes de impacto fuerte.',
    age_range: '13 años en adelante',
    level: 'Principiante e Intermedio',
    is_active: true,
    display_order: 2,
  },
  {
    id: 'group-03',
    name: 'Nivel Avanzado y Sparring Técnico',
    description:
      'Perfeccionamiento táctico, timing, combinaciones complejas y rondas de sparring con equipamiento de protección completo.',
    age_range: '16 años en adelante',
    level: 'Intermedio y Avanzado',
    is_active: true,
    display_order: 3,
  },
  {
    id: 'group-04',
    name: 'Equipo de Competición (Team APEX)',
    description:
      'Entrenamiento de élite para deportistas federados y competidores amateurs y profesionales con planificación deportiva integral.',
    age_range: 'Con evaluación previa',
    level: 'Competición Federada',
    is_active: true,
    display_order: 4,
  },
];

export const mockSchedules: Schedule[] = [
  // LUNES (1)
  {
    id: 'sch-101',
    day_of_week: 1,
    start_time: '08:00',
    end_time: '09:15',
    discipline_id: 'disc-06',
    group_id: 'group-02',
    teacher_id: 'teacher-03',
    notes: 'Circuito metabólico matutino',
    is_active: true,
  },
  {
    id: 'sch-102',
    day_of_week: 1,
    start_time: '18:00',
    end_time: '19:00',
    discipline_id: 'disc-01',
    group_id: 'group-01',
    teacher_id: 'teacher-01',
    notes: 'Clase especial Kickboxing Kids',
    is_active: true,
  },
  {
    id: 'sch-103',
    day_of_week: 1,
    start_time: '19:00',
    end_time: '20:15',
    discipline_id: 'disc-01',
    group_id: 'group-02',
    teacher_id: 'teacher-01',
    notes: 'Técnica fundamental y combinaciones',
    is_active: true,
  },
  {
    id: 'sch-104',
    day_of_week: 1,
    start_time: '20:30',
    end_time: '21:45',
    discipline_id: 'disc-03',
    group_id: 'group-02',
    teacher_id: 'teacher-02',
    notes: 'BJJ Gi (Quimono) - Fundamentos',
    is_active: true,
  },

  // MARTES (2)
  {
    id: 'sch-201',
    day_of_week: 2,
    start_time: '09:00',
    end_time: '10:15',
    discipline_id: 'disc-02',
    group_id: 'group-02',
    teacher_id: 'teacher-03',
    notes: 'Boxeo matutino: Técnica y bolsa',
    is_active: true,
  },
  {
    id: 'sch-202',
    day_of_week: 2,
    start_time: '18:30',
    end_time: '19:45',
    discipline_id: 'disc-04',
    group_id: 'group-02',
    teacher_id: 'teacher-04',
    notes: 'Muay Thai: Paos y clinch',
    is_active: true,
  },
  {
    id: 'sch-203',
    day_of_week: 2,
    start_time: '20:00',
    end_time: '21:15',
    discipline_id: 'disc-02',
    group_id: 'group-02',
    teacher_id: 'teacher-03',
    notes: 'Boxeo: Manoplas y footwork',
    is_active: true,
  },
  {
    id: 'sch-204',
    day_of_week: 2,
    start_time: '21:15',
    end_time: '22:30',
    discipline_id: 'disc-05',
    group_id: 'group-04',
    teacher_id: 'teacher-01',
    notes: 'MMA Team: Enjaulamiento y transiciones',
    is_active: true,
  },

  // MIÉRCOLES (3)
  {
    id: 'sch-301',
    day_of_week: 3,
    start_time: '08:00',
    end_time: '09:15',
    discipline_id: 'disc-06',
    group_id: 'group-02',
    teacher_id: 'teacher-03',
    notes: 'Combat Fitness & Fuerza',
    is_active: true,
  },
  {
    id: 'sch-302',
    day_of_week: 3,
    start_time: '18:00',
    end_time: '19:00',
    discipline_id: 'disc-03',
    group_id: 'group-01',
    teacher_id: 'teacher-02',
    notes: 'BJJ Kids: Juegos psicomotrices y suelo',
    is_active: true,
  },
  {
    id: 'sch-303',
    day_of_week: 3,
    start_time: '19:00',
    end_time: '20:15',
    discipline_id: 'disc-01',
    group_id: 'group-02',
    teacher_id: 'teacher-01',
    notes: 'Kickboxing: Bloqueos y contraataques',
    is_active: true,
  },
  {
    id: 'sch-304',
    day_of_week: 3,
    start_time: '20:30',
    end_time: '21:45',
    discipline_id: 'disc-03',
    group_id: 'group-03',
    teacher_id: 'teacher-02',
    notes: 'BJJ No-Gi (Grappling avanzado)',
    is_active: true,
  },

  // JUEVES (4)
  {
    id: 'sch-401',
    day_of_week: 4,
    start_time: '09:00',
    end_time: '10:15',
    discipline_id: 'disc-02',
    group_id: 'group-02',
    teacher_id: 'teacher-03',
    notes: 'Boxeo: Esquives y cintura',
    is_active: true,
  },
  {
    id: 'sch-402',
    day_of_week: 4,
    start_time: '18:30',
    end_time: '19:45',
    discipline_id: 'disc-04',
    group_id: 'group-02',
    teacher_id: 'teacher-04',
    notes: 'Muay Thai: Codos y rodillas al pao',
    is_active: true,
  },
  {
    id: 'sch-403',
    day_of_week: 4,
    start_time: '20:00',
    end_time: '21:15',
    discipline_id: 'disc-02',
    group_id: 'group-03',
    teacher_id: 'teacher-03',
    notes: 'Boxeo: Sparring condicionado',
    is_active: true,
  },
  {
    id: 'sch-404',
    day_of_week: 4,
    start_time: '21:15',
    end_time: '22:30',
    discipline_id: 'disc-01',
    group_id: 'group-04',
    teacher_id: 'teacher-01',
    notes: 'K-1 Competición: Ritmo de pelea',
    is_active: true,
  },

  // VIERNES (5)
  {
    id: 'sch-501',
    day_of_week: 5,
    start_time: '08:00',
    end_time: '09:15',
    discipline_id: 'disc-06',
    group_id: 'group-02',
    teacher_id: 'teacher-03',
    notes: 'Combat Conditioning de fin de semana',
    is_active: true,
  },
  {
    id: 'sch-502',
    day_of_week: 5,
    start_time: '18:00',
    end_time: '19:15',
    discipline_id: 'disc-01',
    group_id: 'group-02',
    teacher_id: 'teacher-01',
    notes: 'Kickboxing: Repaso técnico y drills',
    is_active: true,
  },
  {
    id: 'sch-503',
    day_of_week: 5,
    start_time: '19:30',
    end_time: '20:45',
    discipline_id: 'disc-03',
    group_id: 'group-02',
    teacher_id: 'teacher-02',
    notes: 'BJJ Open Mat & Pasajes de guardia',
    is_active: true,
  },
  {
    id: 'sch-504',
    day_of_week: 5,
    start_time: '21:00',
    end_time: '22:30',
    discipline_id: 'disc-05',
    group_id: 'group-03',
    teacher_id: 'teacher-01',
    notes: 'Sparring Interdisciplinario Integrado',
    is_active: true,
  },

  // SÁBADO (6)
  {
    id: 'sch-601',
    day_of_week: 6,
    start_time: '10:00',
    end_time: '11:15',
    discipline_id: 'disc-01',
    group_id: 'group-01',
    teacher_id: 'teacher-01',
    notes: 'Kids All-Levels: Juegos y defensa',
    is_active: true,
  },
  {
    id: 'sch-602',
    day_of_week: 6,
    start_time: '11:30',
    end_time: '13:00',
    discipline_id: 'disc-03',
    group_id: 'group-03',
    teacher_id: 'teacher-02',
    notes: 'Masterclass BJJ & Open Mat Sabatino',
    is_active: true,
  },
  {
    id: 'sch-603',
    day_of_week: 6,
    start_time: '14:00',
    end_time: '16:00',
    discipline_id: 'disc-01',
    group_id: 'group-04',
    teacher_id: 'teacher-01',
    notes: 'Equipo Competitivo: Campamento de pelea',
    is_active: true,
  },
];

export const mockGallery: GalleryItem[] = [
  {
    id: 'gal-01',
    image_url:
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Ring de boxeo profesional iluminado con luces de combate',
    caption: 'Ring profesional reglamentario para sparrings y preparación competitiva',
    display_order: 1,
    is_active: true,
  },
  {
    id: 'gal-02',
    image_url:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Atleta preparándose con vendas de boxeo',
    caption: 'Concentración y vendaje técnico antes del combate',
    display_order: 2,
    is_active: true,
  },
  {
    id: 'gal-03',
    image_url:
      'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Clase grupal de Kickboxing con sacos pesados',
    caption: 'Zona de bolsas pesadas con alta intensidad cardiovascular',
    display_order: 3,
    is_active: true,
  },
  {
    id: 'gal-04',
    image_url:
      'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Práctica de Brazilian Jiu-Jitsu en tatami olímpico',
    caption: 'Tatami de 150m² de alta densidad para máxima seguridad articular',
    display_order: 4,
    is_active: true,
  },
  {
    id: 'gal-05',
    image_url:
      'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Entrenamiento de patadas al pao de Muay Thai',
    caption: 'Trabajo dinámico de potencia y técnica tailandesa con paos',
    display_order: 5,
    is_active: true,
  },
  {
    id: 'gal-06',
    image_url:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
    alt_text: 'Entrenamiento de lucha y acondicionamiento físico',
    caption: 'Acondicionamiento físico específico para atletas de combate',
    display_order: 6,
    is_active: true,
  },
];

// Helper Functions
export function getGymSettings(): GymSettings {
  return mockGymSettings;
}

export function getDisciplines(): Discipline[] {
  return mockDisciplines.filter((d) => d.is_active).sort((a, b) => a.display_order - b.display_order);
}

export function getTeachers(): TeacherWithDisciplines[] {
  return mockTeachers
    .filter((t) => t.is_active)
    .sort((a, b) => a.display_order - b.display_order)
    .map((teacher) => {
      const disciplineIds = mockTeacherDisciplines
        .filter((td) => td.teacher_id === teacher.id)
        .map((td) => td.discipline_id);

      const disciplines = mockDisciplines.filter((d) => disciplineIds.includes(d.id));
      return { ...teacher, disciplines };
    });
}

export function getChampionTeacher(): TeacherWithDisciplines | undefined {
  const teachers = getTeachers();
  return teachers.find((t) => t.is_world_champion);
}

export function getGroups(): Group[] {
  return mockGroups.filter((g) => g.is_active).sort((a, b) => a.display_order - b.display_order);
}

export function getSchedulesWithDetails(dayOfWeek?: number): ScheduleWithDetails[] {
  let activeSchedules = mockSchedules.filter((s) => s.is_active);

  if (dayOfWeek !== undefined) {
    activeSchedules = activeSchedules.filter((s) => s.day_of_week === dayOfWeek);
  }

  return activeSchedules
    .map((sch) => {
      const discipline = mockDisciplines.find((d) => d.id === sch.discipline_id) || mockDisciplines[0];
      const group = mockGroups.find((g) => g.id === sch.group_id) || mockGroups[0];
      const teacher = mockTeachers.find((t) => t.id === sch.teacher_id) || mockTeachers[0];

      return {
        ...sch,
        discipline,
        group,
        teacher,
      };
    })
    .sort((a, b) => a.start_time.localeCompare(b.start_time));
}

export function getGallery(): GalleryItem[] {
  return mockGallery.filter((g) => g.is_active).sort((a, b) => a.display_order - b.display_order);
}

export function getWhatsAppUrl(customMessage?: string): string {
  const settings = mockGymSettings;
  const message = encodeURIComponent(customMessage || settings.whatsapp_message);
  return `https://wa.me/${settings.whatsapp_number}?text=${message}`;
}
