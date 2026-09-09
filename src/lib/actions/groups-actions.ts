'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveGroup(prevState: any, formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    age_range: formData.get('age_range') as string,
    level: formData.get('level') as string,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
    display_order: parseInt((formData.get('display_order') as string) || '0', 10),
  };

  if (!payload.name || !payload.age_range) {
    return { error: 'Nombre y rango de edad son obligatorios.' };
  }

  let error;
  let savedId = id;

  if (id && !id.startsWith('group-')) {
    const res = await supabase.from('groups').update(payload).eq('id', id).select('id').maybeSingle();
    error = res.error;
    if (res.data) savedId = res.data.id;
  } else {
    const res = await supabase.from('groups').insert(payload).select('id').maybeSingle();
    error = res.error;
    if (res.data) savedId = res.data.id;
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/groups');
  return { success: 'Grupo guardado con éxito.', id: savedId };
}

export async function deleteGroup(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('groups').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/groups');
  return { success: true };
}
