'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, AlertCircle, Phone, MessageCircle, MapPin, Globe, Sparkles } from 'lucide-react';
import { updateGymSettings } from '@/lib/actions/settings-actions';
import { mockGymSettings } from '@/lib/mock-data';
import { createClient } from '@/lib/supabase/client';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(mockGymSettings);
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('gym_settings').select('*').limit(1).maybeSingle();
        if (data && !error) {
          setSettings(data as any);
        }
      } catch (e) {
        console.error('Error loading settings from Supabase:', e);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const res = await updateGymSettings(null, formData);

    if (res?.error) {
      setStatus({ error: res.error });
    } else if (res?.success) {
      setStatus({ success: res.success });
      setSettings((prev) => ({
        ...prev,
        name: (formData.get('name') as string) || prev.name,
        slogan: (formData.get('slogan') as string) || prev.slogan,
        short_description: (formData.get('short_description') as string) || prev.short_description,
        about_text: (formData.get('about_text') as string) || prev.about_text,
        address: (formData.get('address') as string) || prev.address,
        city: (formData.get('city') as string) || prev.city,
        phone: (formData.get('phone') as string) || prev.phone,
        whatsapp_number: (formData.get('whatsapp_number') as string) || prev.whatsapp_number,
        whatsapp_message: (formData.get('whatsapp_message') as string) || prev.whatsapp_message,
        instagram_url: (formData.get('instagram_url') as string) || prev.instagram_url,
        facebook_url: (formData.get('facebook_url') as string) || prev.facebook_url,
        google_maps_embed_url: (formData.get('google_maps_embed_url') as string) || prev.google_maps_embed_url,
        google_maps_link: (formData.get('google_maps_link') as string) || prev.google_maps_link,
        hero_bg_url: (formData.get('hero_bg_url') as string) || prev.hero_bg_url,
        seo_title: (formData.get('seo_title') as string) || prev.seo_title,
        seo_description: (formData.get('seo_description') as string) || prev.seo_description,
      }));
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-surface-card rounded-xl" />
        <div className="h-64 bg-surface-card rounded-2xl border border-surface-border" />
        <div className="h-64 bg-surface-card rounded-2xl border border-surface-border" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Configuración General del Gimnasio
          </h2>
          <p className="text-xs text-combat-slate-400 mt-1">
            Modifica los datos institucionales, teléfonos, WhatsApp, enlaces y textos SEO.
          </p>
        </div>
      </div>

      {status?.success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{status.success}</span>
        </div>
      )}

      {status?.error && (
        <div className="p-4 rounded-xl bg-combat-red/10 border border-combat-red/30 flex items-center gap-3 text-combat-red text-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{status.error}</span>
        </div>
      )}

      <form key={settings.id || 'settings-form'} onSubmit={handleSubmit} className="space-y-8">
        <input type="hidden" name="id" value={settings.id} />

        {/* 1. Identidad del Gimnasio */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border/60">
            <Sparkles className="w-5 h-5 text-combat-red" />
            <h3 className="font-display font-bold text-base text-white uppercase">
              Identidad de Marca
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Nombre del Gimnasio
              </label>
              <input
                type="text"
                name="name"
                defaultValue={settings.name}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Lema / Slogan
              </label>
              <input
                type="text"
                name="slogan"
                defaultValue={settings.slogan}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              Descripción Corta (Hero y Footer)
            </label>
            <textarea
              name="short_description"
              defaultValue={settings.short_description}
              rows={2}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              Texto "Quiénes Somos" / Filosofía de Entrenamiento
            </label>
            <textarea
              name="about_text"
              defaultValue={settings.about_text}
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              URL Imagen de Fondo del Hero
            </label>
            <input
              type="url"
              name="hero_bg_url"
              defaultValue={settings.hero_bg_url}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>
        </div>

        {/* 2. Contacto & WhatsApp */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border/60">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-bold text-base text-white uppercase">
              WhatsApp y Canales de Atención
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Número de WhatsApp (con código de país sin +)
              </label>
              <input
                type="text"
                name="whatsapp_number"
                defaultValue={settings.whatsapp_number}
                placeholder="5491155558899"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Teléfono Fijo / Recepción (Formato visual)
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={settings.phone}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram_url"
                defaultValue={settings.instagram_url}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              Mensaje Predefinido de WhatsApp
            </label>
            <input
              type="text"
              name="whatsapp_message"
              defaultValue={settings.whatsapp_message}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              Facebook URL (Opcional)
            </label>
            <input
              type="url"
              name="facebook_url"
              defaultValue={settings.facebook_url || ''}
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>
        </div>

        {/* 3. Ubicación y Mapas */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border/60">
            <MapPin className="w-5 h-5 text-combat-gold" />
            <h3 className="font-display font-bold text-base text-white uppercase">
              Ubicación & Google Maps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Dirección Física
              </label>
              <input
                type="text"
                name="address"
                defaultValue={settings.address}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Ciudad / Localidad
              </label>
              <input
                type="text"
                name="city"
                defaultValue={settings.city}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              URL para Abrir en Google Maps ("Cómo Llegar")
            </label>
            <input
              type="url"
              name="google_maps_link"
              defaultValue={settings.google_maps_link}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              URL Embed de Google Maps (src del iframe)
            </label>
            <input
              type="text"
              name="google_maps_embed_url"
              defaultValue={settings.google_maps_embed_url}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>
        </div>

        {/* 4. SEO & Metadatos */}
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-border/60">
            <Globe className="w-5 h-5 text-purple-400" />
            <h3 className="font-display font-bold text-base text-white uppercase">
              Posicionamiento en Google (SEO)
            </h3>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              Título SEO (Etiqueta Title)
            </label>
            <input
              type="text"
              name="seo_title"
              defaultValue={settings.seo_title}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
              Descripción SEO (Meta Description)
            </label>
            <textarea
              name="seo_description"
              defaultValue={settings.seo_description}
              rows={2}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-combat-red/25 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Guardando cambios...' : 'Guardar Toda la Configuración'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
