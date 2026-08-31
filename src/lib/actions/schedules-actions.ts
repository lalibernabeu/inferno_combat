'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveSchedule(prevState: any, formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    day_of_week: parseInt(formData.get('day_of_week') as string, 10),
    start_time: formData.get('start_time') as string,
    end_time: formData.get('end_time') as string,
    discipline_id: formData.get('discipline_id') as string,
    group_id: formData.get('group_id') as string,
    teacher_id: formData.get('teacher_id') as string,
    notes: (formData.get('notes') as string) || null,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
    display_order: parseInt((formData.get('display_order') as string) || '0', 10),
  };

  if (!payload.start_time || !payload.end_time || !payload.discipline_id || !payload.teacher_id || !payload.group_id) {
    return { error: 'Por favor completa todos los campos requeridos.' };
  }

  let error;
  if (id) {
    const res = await supabase.from('schedules').update(payload).eq('id', id);
    error = res.error;
  } else {
    const res = await supabase.from('schedules').insert(payload);
    error = res.error;
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/schedules');
  return { success: 'Horario guardado correctamente.' };
}

export async function deleteSchedule(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('schedules').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/schedules');
  return { success: true };
}
