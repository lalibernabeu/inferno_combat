'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Eye, EyeOff, Save, X, Loader2 } from 'lucide-react';
import { GalleryItem } from '@/lib/types';
import { saveGalleryItem, deleteGalleryItem } from '@/lib/actions/gallery-actions';
import { createClient } from '@/lib/supabase/client';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('display_order', { ascending: true });
        if (data && !error) {
          setGallery(data as GalleryItem[]);
        }
      } catch (e) {
        console.error('Error loading gallery from Supabase:', e);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setIsCreating(false);
    setStatus(null);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsCreating(true);
    setStatus(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta foto?')) return;

    const res = await deleteGalleryItem(id);
    if (res?.error) {
      setStatus({ error: res.error });
    } else {
      setGallery((prev) => prev.filter((g) => g.id !== id));
      setStatus({ success: 'Foto eliminada con éxito.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveGalleryItem(null, formData);

    if (res?.error) {
      setStatus({ error: res.error });
    } else if (res?.success) {
      setStatus({ success: res.success });
      const updatedId = res.id || (formData.get('id') as string);
      
      // Reload gallery from Supabase to ensure fresh storage URLs
      try {
        const supabase = createClient();
        const { data } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
        if (data) {
          setGallery(data as GalleryItem[]);
        }
      } catch {}

      setIsCreating(false);
      setEditingItem(null);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 text-combat-red animate-spin" />
        <p className="text-sm text-combat-slate-400">Cargando fotos de la galería...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Galería Fotográfica
          </h2>
          <p className="text-xs text-combat-slate-400 mt-1">
            Administra las fotos de las instalaciones, sparrings y entrenamientos.
          </p>
        </div>
        {!isCreating && !editingItem && (
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-combat-red/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Foto</span>
          </button>
        )}
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

      {/* Create / Edit Form */}
      {(isCreating || editingItem) && (
        <div className="p-6 rounded-2xl bg-surface-card border border-combat-red/40 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border/60">
            <h3 className="font-display font-bold text-lg text-white uppercase flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-combat-red" />
              <span>{editingItem ? 'Editar Foto' : 'Agregar Nueva Foto a la Galería'}</span>
            </h3>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-combat-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            key={editingItem ? editingItem.id : 'new'}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-5"
          >
            <input type="hidden" name="id" defaultValue={editingItem?.id || ''} />

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Foto / Archivo de Imagen
              </label>

              {editingItem?.image_url && (
                <div className="mb-4 relative w-full h-48 rounded-xl overflow-hidden bg-surface-light border border-surface-border">
                  <Image
                    src={editingItem.image_url}
                    alt={editingItem.alt_text}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <input
                type="hidden"
                name="existing_image_url"
                value={editingItem?.image_url || ''}
              />

              <input
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/webp,image/gif"
                required={!editingItem}
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-combat-red file:text-white file:font-bold file:text-xs file:cursor-pointer"
              />

              <p className="mt-2 text-[11px] text-combat-slate-400">
                JPG, PNG, WEBP o GIF. Máximo 10 MB.
                {editingItem && ' Si no seleccionás una nueva imagen, se conserva la actual.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Texto Alternativo (Alt Text para SEO)
                </label>
                <input
                  type="text"
                  name="alt_text"
                  defaultValue={editingItem?.alt_text || ''}
                  required
                  placeholder="Ej: Ring de boxeo reglamentario con iluminación"
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Pie de Foto / Caption (Opcional)
                </label>
                <input
                  type="text"
                  name="caption"
                  defaultValue={editingItem?.caption || ''}
                  placeholder="Ej: Zona de bolsas pesadas con alta intensidad"
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Orden de Visualización
                </label>
                <input
                  type="number"
                  name="display_order"
                  defaultValue={editingItem?.display_order || 1}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="gallery_is_active"
                  name="is_active"
                  defaultChecked={editingItem ? editingItem.is_active : true}
                  className="w-4 h-4 rounded text-combat-red focus:ring-combat-red"
                />
                <label htmlFor="gallery_is_active" className="text-sm font-semibold text-white cursor-pointer">
                  Visible en la galería pública
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-surface-border/60">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl bg-surface-light hover:bg-surface-hover text-combat-slate-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-combat-red/20 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Guardando...' : 'Guardar Foto'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid Display */}
      {gallery.length === 0 ? (
        <div className="rounded-2xl bg-surface-card border border-surface-border p-16 text-center shadow-xl">
          <ImageIcon className="w-12 h-12 text-combat-slate-500 mx-auto mb-3" />
          <p className="text-base text-white font-bold">No hay fotos en la galería todavía</p>
          <p className="text-xs text-combat-slate-400 mt-1">
            Haz clic en "Nueva Foto" para subir imágenes de tus clases e instalaciones.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden flex flex-col group hover:border-combat-red/50 transition-all duration-300 shadow-xl"
            >
              <div className="relative h-48 w-full bg-surface-light overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.alt_text}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {item.is_active ? (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/80 backdrop-blur-sm text-white text-[10px] font-bold">
                      Activa
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-combat-slate-300 text-[10px] font-bold">
                      Oculta
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold">
                    #{item.display_order}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <p className="text-xs font-bold text-white line-clamp-1">{item.alt_text}</p>
                  {item.caption && (
                    <p className="text-[11px] text-combat-slate-400 italic line-clamp-2 mt-1">
                      "{item.caption}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-border/60">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg bg-surface-light text-combat-slate-300 hover:text-white hover:bg-combat-red/20 transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-surface-light text-combat-red hover:bg-combat-red/20 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
