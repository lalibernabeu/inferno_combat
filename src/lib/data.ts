import { createClient } from './supabase/server';
import {
  GymSettings,
  Discipline,
  TeacherWithDisciplines,
  Group,
  ScheduleWithDetails,
  GalleryItem,
} from './types';

const defaultGymSettings: GymSettings = {
  id: 'settings-default',
  name: 'INFERNO COMBAT',
  slogan: 'Forja tu carácter. Domina el combate.',
  short_description:
    'Centro de alto rendimiento en deportes de combate y artes marciales.',
  about_text:
    'En INFERNO COMBAT combinamos la disciplina del entrenamiento de combate con la metodología más avanzada de preparación física.',
  address: 'Av. San Martín 1234',
  city: 'Mendoza',
  phone: '+54 9 261 707-8248',
  whatsapp_number: '5492617078248',
  whatsapp_message:
    '¡Hola! Quisiera consultar por las clases de combate en INFERNO COMBAT.',
  instagram_url: 'https://instagram.com/infernocombat',
  facebook_url: 'https://facebook.com/infernocombat',
  google_maps_embed_url:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.2!2d-68.8!3d-32.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ4JzAwLjAiUyA2OMKwNDgnMDAuMCJX!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar',
  google_maps_link: 'https://maps.google.com/?q=Mendoza,+Argentina',
  logo_url: '/images/logo.png',
  hero_bg_url:
    'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=2000&q=80',
  seo_title: 'INFERNO COMBAT | Kickboxing, Boxeo, K1 y Muay Thai',
  seo_description:
    'Gimnasio de deportes de combate en Mendoza. Clases de Kickboxing, Boxeo, K1 y Muay Thai con profesores experimentados.',
};

export async function getGymSettings(): Promise<GymSettings> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('gym_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return defaultGymSettings;
    }

    return data as GymSettings;
  } catch (err) {
    console.error('Error fetching gym_settings from Supabase:', err);
    return defaultGymSettings;
  }
}

export async function getDisciplines(includeInactive = false): Promise<Discipline[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from('disciplines')
      .select('*')
      .order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error || !data) {
      return [];
    }

    return data as Discipline[];
  } catch (err) {
    console.error('Error fetching disciplines from Supabase:', err);
    return [];
  }
}

export async function getTeachers(includeInactive = false): Promise<TeacherWithDisciplines[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from('teachers')
      .select('*')
      .order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data: teachersData, error: teachersError } = await query;
    if (teachersError || !teachersData || teachersData.length === 0) {
      return [];
    }

    // Fetch teacher_disciplines and active disciplines
    const { data: tdData } = await supabase.from('teacher_disciplines').select('*');
    const { data: allDisciplines } = await supabase.from('disciplines').select('*');

    return teachersData.map((t) => {
      const assignedIds = tdData
        ? tdData.filter((item) => item.teacher_id === t.id).map((item) => item.discipline_id)
        : [];
      const disciplines = allDisciplines
        ? (allDisciplines.filter((d) => assignedIds.includes(d.id)) as Discipline[])
        : [];

      return {
        ...t,
        disciplines,
      };
    });
  } catch (err) {
    console.error('Error fetching teachers from Supabase:', err);
    return [];
  }
}

export async function getChampionTeacher(): Promise<TeacherWithDisciplines | undefined> {
  const teachers = await getTeachers();
  return teachers.find((t) => t.is_world_champion && t.is_active);
}

export async function getGroups(includeInactive = false): Promise<Group[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from('groups')
      .select('*')
      .order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error || !data) {
      return [];
    }

    return data as Group[];
  } catch (err) {
    console.error('Error fetching groups from Supabase:', err);
    return [];
  }
}

export async function getSchedulesWithDetails(
  dayOfWeek?: number,
  includeInactive = false
): Promise<ScheduleWithDetails[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from('schedules')
      .select('*, discipline:disciplines(*), group:groups(*), teacher:teachers(*)')
      .order('start_time', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    if (dayOfWeek !== undefined) {
      query = query.eq('day_of_week', dayOfWeek);
    }

    const { data, error } = await query;
    if (error || !data) {
      return [];
    }

    return data as ScheduleWithDetails[];
  } catch (err) {
    console.error('Error fetching schedules from Supabase:', err);
    return [];
  }
}

export async function getGallery(includeInactive = false): Promise<GalleryItem[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from('gallery')
      .select('*')
      .order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error || !data) {
      return [];
    }

    return data as GalleryItem[];
  } catch (err) {
    console.error('Error fetching gallery from Supabase:', err);
    return [];
  }
}
