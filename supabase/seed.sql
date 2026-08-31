-- ====================================================================
-- DATOS INICIALES (SEED) PARA GIMNASIO DE DEPORTES DE COMBATE
-- ====================================================================

-- 1. CONFIGURACIÓN DEL GIMNASIO
insert into public.gym_settings (
  id,
  name,
  slogan,
  short_description,
  about_text,
  address,
  city,
  phone,
  whatsapp_number,
  whatsapp_message,
  instagram_url,
  facebook_url,
  google_maps_embed_url,
  google_maps_link,
  logo_url,
  hero_bg_url,
  seo_title,
  seo_description
) values (
  '00000000-0000-0000-0000-000000000001',
  'APEX COMBAT CLUB',
  'Forja tu carácter. Domina el combate.',
  'Centro de alto rendimiento en deportes de combate y artes marciales. Entrenamiento integral para todos los niveles: desde recreativo y defensa personal hasta competición profesional.',
  'En APEX COMBAT CLUB combinamos la disciplina tradicional de las artes marciales con la metodología más avanzada de preparación física de combate. Nuestro gimnasio está equipado con ring reglamentario, jaula de MMA, tatami olímpico de alta absorción de impacto y zona de sacos pesados. Contamos con un cuerpo docente de atletas de élite liderado por un Campeón Mundial, asegurando una enseñanza técnica, segura y basada en valores de respeto, constancia y superación personal.',
  'Av. Corrientes 4520, Almagro',
  'Ciudad Autónoma de Buenos Aires',
  '+54 9 11 5555-8899',
  '5491155558899',
  '¡Hola! Quisiera consultar por las clases de combate y reservar una clase de prueba gratuita.',
  'https://instagram.com/apexcombatclub',
  'https://facebook.com/apexcombatclub',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9926685002597!2d-58.428751523471015!3d-34.60434865753177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca62d4715555%3A0x6739956488730b65!2sAv.%20Corrientes%204520%2C%20C1195AAS%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar',
  'https://maps.google.com/?q=Av.+Corrientes+4520,+Buenos+Aires',
  '/images/logo.png',
  'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=2000&q=80',
  'APEX Combat Club | Kickboxing, Boxeo, BJJ, Muay Thai y MMA',
  'Gimnasio de deportes de combate en Buenos Aires. Clases de Kickboxing, Boxeo, BJJ, Muay Thai y MMA con profesores de élite y Campeón Mundial.'
) on conflict (id) do update set name = excluded.name;

-- 2. PROFESORES
insert into public.teachers (
  id,
  name,
  nickname,
  bio,
  experience_years,
  photo_url,
  is_world_champion,
  champion_title_details,
  is_active,
  display_order
) values
  (
    '11111111-1111-1111-1111-111111111101',
    'Marcos "El Gladiador" Silva',
    'El Gladiador',
    'Pionero del Kickboxing y K-1 en la región con más de 45 peleas profesionales internacionales. Entrenador certificado WAKO y formador de decenas de competidores nacionales.',
    '18 años de experiencia',
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
    true,
    'Campeón Mundial WAKO Pro - Categoría 75kg (2021) & Bicampeón Sudamericano K-1',
    true,
    1
  ),
  (
    '11111111-1111-1111-1111-111111111102',
    'Lucía Méndez',
    'La Cobra',
    'Faixa Preta (Cinturón Negro) 2º Dan en Brazilian Jiu-Jitsu bajo la confederación CBJJ/IBJJF. Múltiple medallista en torneos Open internacionales y especialista en defensa personal.',
    '12 años de experiencia',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    false,
    null,
    true,
    2
  ),
  (
    '11111111-1111-1111-1111-111111111103',
    'Diego Romero',
    'Martillo',
    'Ex boxeador profesional categoría Super Mediano (FAB). Especialista en biomecánica del golpeo, footwork, esquives y preparación física de alto rendimiento para deportes de contacto.',
    '15 años de experiencia',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    false,
    null,
    true,
    3
  ),
  (
    '11111111-1111-1111-1111-111111111104',
    'Facundo Morales',
    'El Tigre',
    'Entrenador certificado en Bangkok, Tailandia (Campamento Fairtex). Experto en clinch, rodillas, codos y técnicas tradicionales de Muay Thai estilo Muay Femur.',
    '10 años de experiencia',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    false,
    null,
    true,
    4
  )
on conflict (id) do nothing;

-- 3. DISCIPLINAS
insert into public.disciplines (
  id,
  name,
  slug,
  short_description,
  full_description,
  target_audience,
  level_info,
  image_url,
  is_active,
  display_order
) values
  (
    '22222222-2222-2222-2222-222222222201',
    'Kickboxing & K-1',
    'kickboxing-k1',
    'Combate de pie dinámico y explosivo que combina puños de boxeo con patadas directas y circulares de máxima potencia.',
    'El Kickboxing y la modalidad K-1 desarrollan resistencia cardiovascular inigualable, velocidad de reacción, agilidad y fuerza explosiva. Dictado bajo la supervisión directa de nuestro Campeón Mundial.',
    'Recreativo, Niños, Jóvenes y Adultos',
    'Principiante a Profesional',
    'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80',
    true,
    1
  ),
  (
    '22222222-2222-2222-2222-222222222202',
    'Boxeo Tradicional',
    'boxeo',
    'El arte de la precisión, el ritmo, los desplazamientos (footwork) y la defensa impenetrable sobre el cuadrilátero.',
    'Entrenamiento clásico de boxeo con enfoque en la técnica depurada, trabajo de manoplas, sombra, bolsa pesada y sparring controlado.',
    'Hombres, Mujeres y Jóvenes',
    'Todos los niveles',
    'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80',
    true,
    2
  ),
  (
    '22222222-2222-2222-2222-222222222203',
    'Brazilian Jiu-Jitsu (BJJ)',
    'brazilian-jiu-jitsu',
    'El arte suave del combate en el suelo: palancas articulares, estrangulaciones y control técnico absoluto.',
    'El BJJ permite a una persona de menor tamaño defenderse eficazmente contra oponentes más grandes mediante la física, el apalancamiento y la estrategia posicional.',
    'Niños, Jóvenes y Adultos (Mixto)',
    'Cinturones Blancos a Avanzados',
    'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=1200&q=80',
    true,
    3
  ),
  (
    '22222222-2222-2222-2222-222222222204',
    'Muay Thai (Boxeo Tailandés)',
    'muay-thai',
    'El "Arte de las 8 Extremidades": puños, codos, rodillas y canillas combinados con técnicas de agarre y derribo en clinch.',
    'Disciplina milenaria tailandesa con un acondicionamiento físico extremo y un arsenal de golpeo completo y contundente.',
    'Jóvenes y Adultos',
    'Iniciación a Avanzado',
    'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80',
    true,
    4
  ),
  (
    '22222222-2222-2222-2222-222222222205',
    'MMA (Artes Marciales Mixtas)',
    'mma',
    'La integración definitiva del combate de pie, transiciones contra la reja y dominio de sumisión en el suelo.',
    'Combina las mejores herramientas del Kickboxing, Lucha Olímpica (Wrestling), Boxeo y BJJ en la jaula octogonal.',
    'Jóvenes y Adultos con base previa',
    'Intermedio a Competición',
    'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
    true,
    5
  ),
  (
    '22222222-2222-2222-2222-222222222206',
    'Combat Fitness & Funcional',
    'combat-fitness',
    'Acondicionamiento físico de alto impacto inspirado en los campamentos de entrenamiento de atletas de combate.',
    'Circuito metabólico sin contacto físico: trabajo con kettlebells, battle ropes, golpeo a bolsas pesadas y ejercicios pliométricos.',
    'Para todos (Sin contacto)',
    'Apto para cualquier condición física',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    true,
    6
  )
on conflict (id) do nothing;

-- 4. RELACIÓN PROFESOR - DISCIPLINA
insert into public.teacher_disciplines (teacher_id, discipline_id) values
  ('11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222201'),
  ('11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222205'),
  ('11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222203'),
  ('11111111-1111-1111-1111-111111111102', '22222222-2222-2222-2222-222222222205'),
  ('11111111-1111-1111-1111-111111111103', '22222222-2222-2222-2222-222222222202'),
  ('11111111-1111-1111-1111-111111111103', '22222222-2222-2222-2222-222222222206'),
  ('11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222204'),
  ('11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222201')
on conflict do nothing;

-- 5. GRUPOS
insert into public.groups (
  id,
  name,
  description,
  age_range,
  level,
  is_active,
  display_order
) values
  (
    '33333333-3333-3333-3333-333333333301',
    'Infantil / Kids',
    'Desarrollo psicomotriz, disciplina, respeto, autoconfianza y prevención del acoso escolar en un entorno seguro y divertido.',
    '6 a 12 años',
    'Inicial / Formativo',
    true,
    1
  ),
  (
    '33333333-3333-3333-3333-333333333302',
    'Jóvenes y Adultos - Recreativo',
    'Aprende técnicas reales, ponte en tu mejor forma física y libera el estrés sin necesidad de recibir golpes de impacto fuerte.',
    '13 años en adelante',
    'Principiante e Intermedio',
    true,
    2
  ),
  (
    '33333333-3333-3333-3333-333333333303',
    'Nivel Avanzado y Sparring Técnico',
    'Perfeccionamiento táctico, timing, combinaciones complejas y rondas de sparring con equipamiento de protección completo.',
    '16 años en adelante',
    'Intermedio y Avanzado',
    true,
    3
  ),
  (
    '33333333-3333-3333-3333-333333333304',
    'Equipo de Competición (Team APEX)',
    'Entrenamiento de élite para deportistas federados y competidores amateurs y profesionales con planificación deportiva integral.',
    'Con evaluación previa',
    'Competición Federada',
    true,
    4
  )
on conflict (id) do nothing;

-- 6. HORARIOS
insert into public.schedules (
  id,
  day_of_week,
  start_time,
  end_time,
  discipline_id,
  group_id,
  teacher_id,
  notes,
  is_active,
  display_order
) values
  ('44444444-4444-4444-4444-444444444101', 1, '08:00', '09:15', '22222222-2222-2222-2222-222222222206', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111103', 'Circuito metabólico matutino', true, 1),
  ('44444444-4444-4444-4444-444444444102', 1, '18:00', '19:00', '22222222-2222-2222-2222-222222222201', '33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111101', 'Clase especial Kickboxing Kids', true, 2),
  ('44444444-4444-4444-4444-444444444103', 1, '19:00', '20:15', '22222222-2222-2222-2222-222222222201', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111101', 'Técnica fundamental y combinaciones', true, 3),
  ('44444444-4444-4444-4444-444444444104', 1, '20:30', '21:45', '22222222-2222-2222-2222-222222222203', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111102', 'BJJ Gi (Quimono) - Fundamentos', true, 4),
  ('44444444-4444-4444-4444-444444444201', 2, '09:00', '10:15', '22222222-2222-2222-2222-222222222202', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111103', 'Boxeo matutino: Técnica y bolsa', true, 1),
  ('44444444-4444-4444-4444-444444444202', 2, '18:30', '19:45', '22222222-2222-2222-2222-222222222204', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111104', 'Muay Thai: Paos y clinch', true, 2),
  ('44444444-4444-4444-4444-444444444203', 2, '20:00', '21:15', '22222222-2222-2222-2222-222222222202', '33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111103', 'Boxeo: Manoplas y footwork', true, 3),
  ('44444444-4444-4444-4444-444444444204', 2, '21:15', '22:30', '22222222-2222-2222-2222-222222222205', '33333333-3333-3333-3333-333333333304', '11111111-1111-1111-1111-111111111101', 'MMA Team: Enjaulamiento y transiciones', true, 4)
on conflict (id) do nothing;

-- 7. GALERÍA
insert into public.gallery (
  id,
  image_url,
  alt_text,
  caption,
  display_order,
  is_active
) values
  ('55555555-5555-5555-5555-555555555501', 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80', 'Ring de boxeo profesional iluminado', 'Ring profesional reglamentario para sparrings y preparación competitiva', 1, true),
  ('55555555-5555-5555-5555-555555555502', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80', 'Atleta preparándose con vendas de boxeo', 'Concentración y vendaje técnico antes del combate', 2, true),
  ('55555555-5555-5555-5555-555555555503', 'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80', 'Clase grupal de Kickboxing con sacos pesados', 'Zona de bolsas pesadas con alta intensidad cardiovascular', 3, true),
  ('55555555-5555-5555-5555-555555555504', 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=1200&q=80', 'Práctica de Brazilian Jiu-Jitsu en tatami olímpico', 'Tatami de 150m² de alta densidad para máxima seguridad articular', 4, true),
  ('55555555-5555-5555-5555-555555555505', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80', 'Entrenamiento de patadas al pao de Muay Thai', 'Trabajo dinámico de potencia y técnica tailandesa con paos', 5, true),
  ('55555555-5555-5555-5555-555555555506', 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80', 'Entrenamiento de lucha y acondicionamiento físico', 'Acondicionamiento físico específico para atletas de combate', 6, true)
on conflict (id) do nothing;
