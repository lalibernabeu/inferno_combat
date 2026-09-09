'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveTeacher(prevState: any, formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string | null;

  const isWorldChampion =
    formData.get('is_world_champion') === 'on' ||
    formData.get('is_world_champion') === 'true';

  const teacherPayload = {
    name: formData.get('name') as string,
    nickname: (formData.get('nickname') as string) || null,
    bio: formData.get('bio') as string,
    experience_years: formData.get('experience_years') as string,
    photo_url: formData.get('photo_url') as string,
    is_world_champion: isWorldChampion,
    champion_title_details: isWorldChampion
      ? (formData.get('champion_title_details') as string)
      : null,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
    display_order: parseInt((formData.get('display_order') as string) || '0', 10),
  };

  const disciplineIds = formData.getAll('disciplines') as string[];

  if (!teacherPayload.name || !teacherPayload.bio) {
    return { error: 'Nombre y biografía son obligatorios.' };
  }

  let teacherId = id;

  if (id) {
    // Update teacher
    const { error: updateError } = await supabase
      .from('teachers')
      .update(teacherPayload)
      .eq('id', id);

    if (updateError) return { error: updateError.message };
  } else {
    // Insert teacher
    const { data: newTeacher, error: insertError } = await supabase
      .from('teachers')
      .insert(teacherPayload)
      .select('id')
      .single();

    if (insertError || !newTeacher) return { error: insertError?.message || 'Error al crear profesor' };
    teacherId = newTeacher.id;
  }

  // Update teacher_disciplines
  if (teacherId) {
    await supabase.from('teacher_disciplines').delete().eq('teacher_id', teacherId);

    if (disciplineIds.length > 0) {
      const tdRows = disciplineIds.map((discId) => ({
        teacher_id: teacherId as string,
        discipline_id: discId,
      }));
      await supabase.from('teacher_disciplines').insert(tdRows);
    }
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/teachers');
  return { success: 'Profesor guardado correctamente.', id: teacherId };
}

export async function deleteTeacher(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('teachers').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/teachers');
  return { success: true };
}
