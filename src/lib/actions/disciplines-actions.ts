'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveDiscipline(prevState: any, formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    short_description: formData.get('short_description') as string,
    full_description: formData.get('full_description') as string,
    target_audience: formData.get('target_audience') as string,
    level_info: formData.get('level_info') as string,
    image_url: formData.get('image_url') as string,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
    display_order: parseInt((formData.get('display_order') as string) || '0', 10),
  };

  if (!payload.name || !payload.slug) {
    return { error: 'El nombre y el slug son obligatorios.' };
  }

  let error;
  if (id) {
    // Update
    const res = await supabase.from('disciplines').update(payload).eq('id', id);
    error = res.error;
  } else {
    // Insert
    const res = await supabase.from('disciplines').insert(payload);
    error = res.error;
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/disciplines');
  return { success: 'Disciplina guardada con éxito.' };
}

export async function deleteDiscipline(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('disciplines').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/disciplines');
  return { success: true };
}
