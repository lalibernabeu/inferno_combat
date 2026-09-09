'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveGalleryItem(prevState: any, formData: FormData) {
  const supabase = createClient();

  const id = formData.get('id') as string | null;
  const imageFile = formData.get('image') as File | null;
  const existingImageUrl = formData.get('existing_image_url') as string | null;

  let imageUrl = existingImageUrl || '';

  // Si se seleccionó una nueva imagen, subirla a Supabase Storage
  if (imageFile && imageFile.size > 0) {
    // Validar tipo
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    if (!allowedTypes.includes(imageFile.type)) {
      return {
        error: 'Formato de imagen no válido. Usá JPG, PNG, WEBP o GIF.',
      };
    }

    // Límite de 10 MB
    if (imageFile.size > 10 * 1024 * 1024) {
      return {
        error: 'La imagen no puede superar los 10 MB.',
      };
    }

    // Generar nombre único
    const extension =
      imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const filePath = `gallery/${fileName}`;

    // Convertir File a ArrayBuffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, fileBuffer, {
        contentType: imageFile.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Error subiendo imagen:', uploadError);

      return {
        error: `Error al subir la imagen: ${uploadError.message}`,
      };
    }

    // Obtener URL pública
    const {
      data: { publicUrl },
    } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    imageUrl = publicUrl;
  }

  const payload = {
    image_url: imageUrl,
    alt_text: formData.get('alt_text') as string,
    caption: (formData.get('caption') as string) || null,
    is_active:
      formData.get('is_active') === 'on' ||
      formData.get('is_active') === 'true',
    display_order: parseInt(
      (formData.get('display_order') as string) || '0',
      10
    ),
  };

  if (!payload.image_url || !payload.alt_text) {
    return {
      error: 'La imagen y el texto alternativo son obligatorios.',
    };
  }

  let error;
  let savedId = id;

  if (id && !id.startsWith('gal-')) {
    const res = await supabase
      .from('gallery')
      .update(payload)
      .eq('id', id)
      .select('id')
      .maybeSingle();

    error = res.error;

    if (res.data) {
      savedId = res.data.id;
    }
  } else {
    const res = await supabase
      .from('gallery')
      .insert(payload)
      .select('id')
      .maybeSingle();

    error = res.error;

    if (res.data) {
      savedId = res.data.id;
    }
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/gallery');

  return {
    success: 'Foto de galería guardada con éxito.',
    id: savedId,
  };
}

export async function deleteGalleryItem(id: string) {
  const supabase = createClient();

  const { data: item, error: fetchError } = await supabase
    .from('gallery')
    .select('image_url')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) {
    return { error: fetchError.message };
  }

  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  // Intentar eliminar también la imagen de Storage
  if (item?.image_url) {
    try {
      const url = new URL(item.image_url);
      const marker = '/storage/v1/object/public/gallery/';

      const index = url.pathname.indexOf(marker);

      if (index !== -1) {
        const filePath = url.pathname.substring(
          index + marker.length
        );

        await supabase.storage
          .from('gallery')
          .remove([filePath]);
      }
    } catch (e) {
      console.error('No se pudo eliminar la imagen de Storage:', e);
    }
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/gallery');

  return { success: true };
}