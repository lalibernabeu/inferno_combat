'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateGymSettings(prevState: any, formData: FormData) {
  const supabase = createClient();

  const name = formData.get('name') as string;
  const slogan = formData.get('slogan') as string;
  const short_description = formData.get('short_description') as string;
  const about_text = formData.get('about_text') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const phone = formData.get('phone') as string;
  const whatsapp_number = formData.get('whatsapp_number') as string;
  const whatsapp_message = formData.get('whatsapp_message') as string;
  const instagram_url = formData.get('instagram_url') as string;
  const facebook_url = formData.get('facebook_url') as string;
  const google_maps_embed_url = formData.get('google_maps_embed_url') as string;
  const google_maps_link = formData.get('google_maps_link') as string;
  const hero_bg_url = formData.get('hero_bg_url') as string;
  const seo_title = formData.get('seo_title') as string;
  const seo_description = formData.get('seo_description') as string;

  const payload = {
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
    facebook_url: facebook_url || null,
    google_maps_embed_url,
    google_maps_link,
    hero_bg_url,
    seo_title,
    seo_description,
    updated_at: new Date().toISOString(),
  };

  // Buscar registro existente para actualizarlo o insertarlo si no existe
  const { data: existing } = await supabase
    .from('gym_settings')
    .select('id')
    .limit(1)
    .maybeSingle();

  let error;
  if (existing?.id) {
    const res = await supabase.from('gym_settings').update(payload).eq('id', existing.id);
    error = res.error;
  } else {
    const res = await supabase.from('gym_settings').insert(payload);
    error = res.error;
  }

  if (error) {
    return { error: `Error al guardar los cambios: ${error.message}` };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
  return { success: 'Configuración actualizada correctamente.' };
}
