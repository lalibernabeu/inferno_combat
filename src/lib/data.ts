import { createClient } from './supabase/server';
import {
  GymSettings,
  Discipline,
  TeacherWithDisciplines,
  Group,
  ScheduleWithDetails,
  GalleryItem,
} from './types';
import * as mockData from './mock-data';

const isSupabaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

export async function getGymSettings(): Promise<GymSettings> {
  if (!isSupabaseConfigured()) {
    return mockData.getGymSettings();
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('gym_settings')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      console.warn('Fallback to mock GymSettings:', error?.message);
      return mockData.getGymSettings();
    }

    return data as GymSettings;
  } catch (err) {
    console.error('Error fetching gym_settings:', err);
    return mockData.getGymSettings();
  }
}

export async function getDisciplines(includeInactive = false): Promise<Discipline[]> {
  if (!isSupabaseConfigured()) {
    return includeInactive ? mockData.mockDisciplines : mockData.getDisciplines();
  }

  try {
    const supabase = createClient();
    let query = supabase.from('disciplines').select('*').order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return includeInactive ? mockData.mockDisciplines : mockData.getDisciplines();
    }

    return data as Discipline[];
  } catch {
    return includeInactive ? mockData.mockDisciplines : mockData.getDisciplines();
  }
}

export async function getTeachers(includeInactive = false): Promise<TeacherWithDisciplines[]> {
  if (!isSupabaseConfigured()) {
    return mockData.getTeachers();
  }

  try {
    const supabase = createClient();
    let query = supabase.from('teachers').select('*').order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data: teachersData, error: teachersError } = await query;
    if (teachersError || !teachersData || teachersData.length === 0) {
      return mockData.getTeachers();
    }

    // Fetch teacher_disciplines
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
  } catch {
    return mockData.getTeachers();
  }
}

export async function getChampionTeacher(): Promise<TeacherWithDisciplines | undefined> {
  const teachers = await getTeachers();
  return teachers.find((t) => t.is_world_champion);
}

export async function getGroups(includeInactive = false): Promise<Group[]> {
  if (!isSupabaseConfigured()) {
    return includeInactive ? mockData.mockGroups : mockData.getGroups();
  }

  try {
    const supabase = createClient();
    let query = supabase.from('groups').select('*').order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return includeInactive ? mockData.mockGroups : mockData.getGroups();
    }

    return data as Group[];
  } catch {
    return includeInactive ? mockData.mockGroups : mockData.getGroups();
  }
}

export async function getSchedulesWithDetails(
  dayOfWeek?: number,
  includeInactive = false
): Promise<ScheduleWithDetails[]> {
  if (!isSupabaseConfigured()) {
    return mockData.getSchedulesWithDetails(dayOfWeek);
  }

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
    if (error || !data || data.length === 0) {
      return mockData.getSchedulesWithDetails(dayOfWeek);
    }

    return data as ScheduleWithDetails[];
  } catch {
    return mockData.getSchedulesWithDetails(dayOfWeek);
  }
}

export async function getGallery(includeInactive = false): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) {
    return includeInactive ? mockData.mockGallery : mockData.getGallery();
  }

  try {
    const supabase = createClient();
    let query = supabase.from('gallery').select('*').order('display_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return includeInactive ? mockData.mockGallery : mockData.getGallery();
    }

    return data as GalleryItem[];
  } catch {
    return includeInactive ? mockData.mockGallery : mockData.getGallery();
  }
}
