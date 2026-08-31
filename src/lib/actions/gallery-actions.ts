'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveGalleryItem(prevState: any, formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    image_url: formData.get('image_url') as string,
    alt_text: formData.get('alt_text') as string,
    caption: (formData.get('caption') as string) || null,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
    display_order: parseInt((formData.get('display_order') as string) || '0', 10),
  };

  if (!payload.image_url || !payload.alt_text) {
    return { error: 'La URL de la imagen y el texto alternativo son obligatorios.' };
  }

  let error;
  if (id) {
    const res = await supabase.from('gallery').update(payload).eq('id', id);
    error = res.error;
  } else {
    const res = await supabase.from('gallery').insert(payload);
    error = res.error;
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/gallery');
  return { success: 'Foto de galería guardada con éxito.' };
}

export async function deleteGalleryItem(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('gallery').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/gallery');
  return { success: true };
}
