'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BullLogo } from '@/components/BullLogo';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseUrl.includes('tu-proyecto')) {
      setIsConfigured(false);
    } else {
      setIsConfigured(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      setLoading(false);
      return;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseUrl.includes('tu-proyecto')) {
      setError('Aún no has creado el archivo .env.local con las claves de tu proyecto de Supabase.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // 1. Iniciar sesión con Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (authError || !data.user) {
        setError(authError?.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos. Verifica tus datos en Supabase Authentication.'
          : `Error al iniciar sesión: ${authError?.message || 'Usuario no encontrado'}`);
        setLoading(false);
        return;
      }

      // 2. Verificar si el usuario está en la tabla admin_users
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', data.user.id)
        .maybeSingle();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        setError('Acceso denegado: este usuario no está registrado en la tabla "admin_users" de Supabase.');
        setLoading(false);
        return;
      }

      // 3. Redireccionar al panel
      window.location.href = '/admin';
    } catch (err: any) {
      console.error('Login error:', err);
      setError(`Ocurrió un error inesperado: ${err.message || 'Error de conexión'}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-combat-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-combat-red flex items-center justify-center shadow-lg shadow-combat-red/30 group-hover:scale-105 transition-transform">
              <BullLogo className="w-7 h-7 text-white" />
            </div>
          </Link>
        </div>
        <h2 className="mt-4 text-center font-display font-black text-3xl text-white uppercase tracking-tight">
          Panel de <span className="text-gradient-red">Administración</span>
        </h2>
        <p className="mt-2 text-center text-sm text-combat-slate-400">
          Acceso exclusivo para el administrador del gimnasio
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-surface-card border border-surface-border py-8 px-6 sm:px-10 rounded-2xl shadow-2xl space-y-6">
          {/* Supabase Not Configured Warning */}
          {!isConfigured && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-xs">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-200">Supabase no conectado</p>
                <p className="text-combat-slate-300">
                  Crea el archivo <code className="text-white bg-black/40 px-1 py-0.5 rounded">.env.local</code> en la raíz del proyecto con tu URL y tu Anon Key para habilitar el login en vivo.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-combat-red/10 border border-combat-red/30 flex items-start gap-3 text-combat-red text-sm animate-in fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-combat-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@infernocombat.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-combat-slate-500 focus:outline-none focus:border-combat-red text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-combat-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white placeholder-combat-slate-500 focus:outline-none focus:border-combat-red text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-combat-red/25 disabled:opacity-50"
              >
                {loading ? (
                  <span>Verificando credenciales...</span>
                ) : (
                  <>
                    <span>Ingresar al Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-surface-border/60 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-combat-slate-400 hover:text-white transition-colors"
            >
              ← Volver al Sitio Web Público
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
