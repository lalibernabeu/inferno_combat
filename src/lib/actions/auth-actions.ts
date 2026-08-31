'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Por favor completa todos los campos.' };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('tu-proyecto')) {
    return {
      error:
        'Aún no has configurado tus credenciales de Supabase. Crea el archivo .env.local con NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return { error: 'Credenciales inválidas o usuario inexistente.' };
    }

    // Verificar si el usuario está en la tabla admin_users
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', data.user.id)
      .single();

    if (!adminData) {
      // Si no es admin, cerramos la sesión y rechazamos el acceso
      await supabase.auth.signOut();
      return {
        error:
          'Tu cuenta no tiene permisos de administrador en la tabla admin_users.',
      };
    }
  } catch (err: any) {
    return { error: `Error de conexión: ${err.message || 'Error desconocido'}` };
  }

  revalidatePath('/admin', 'layout');
  redirect('/admin');
}

export async function logout() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
  }
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}
