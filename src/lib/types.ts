/**
 * Modelo de Datos TypeScript para el Gimnasio de Deportes de Combate
 * Estructurado en concordancia con el esquema PostgreSQL / Supabase
 */

export interface GymSettings {
  id: string;
  name: string;
  slogan: string;
  short_description: string;
  about_text: string;
  address: string;
  city: string;
  phone: string;
  whatsapp_number: string;
  whatsapp_message: string;
  instagram_url: string;
  facebook_url?: string;
  google_maps_embed_url: string;
  google_maps_link: string;
  logo_url: string;
  hero_bg_url: string;
  seo_title: string;
  seo_description: string;
  updated_at?: string;
}

export interface Teacher {
  id: string;
  name: string;
  nickname?: string;
  bio: string;
  experience_years: string;
  photo_url: string;
  is_world_champion: boolean;
  champion_title_details?: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export interface Discipline {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  target_audience: string;
  level_info: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export interface TeacherDiscipline {
  teacher_id: string;
  discipline_id: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  age_range: string;
  level: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export interface Schedule {
  id: string;
  day_of_week: number; // 1: Lunes, 2: Martes, 3: Miércoles, 4: Jueves, 5: Viernes, 6: Sábado, 7: Domingo
  start_time: string;  // Formato "HH:MM"
  end_time: string;    // Formato "HH:MM"
  discipline_id: string;
  group_id: string;
  teacher_id: string;
  notes?: string;
  is_active: boolean;
  display_order?: number;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  alt_text: string;
  caption?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface AdminUser {
  user_id: string;
  created_at?: string;
}

// Tipos enriquecidos para renderizado en componentes
export interface TeacherWithDisciplines extends Teacher {
  disciplines: Discipline[];
}

export interface DisciplineWithTeachers extends Discipline {
  teachers: Teacher[];
}

export interface ScheduleWithDetails extends Schedule {
  discipline: Discipline;
  group: Group;
  teacher: Teacher;
}
