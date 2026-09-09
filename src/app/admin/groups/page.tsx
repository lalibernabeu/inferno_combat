'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Eye, EyeOff, Save, X } from 'lucide-react';
import { Group } from '@/lib/types';
import { mockGroups } from '@/lib/mock-data';
import { saveGroup, deleteGroup } from '@/lib/actions/groups-actions';
import { createClient } from '@/lib/supabase/client';

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [editingItem, setEditingItem] = useState<Group | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadGroups() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('groups').select('*').order('display_order', { ascending: true });
        if (data && !error && data.length > 0) {
          setGroups(data as Group[]);
        }
      } catch (e) {
        console.error('Error loading groups from Supabase:', e);
      }
    }
    loadGroups();
  }, []);

  const handleEdit = (g: Group) => {
    setEditingItem(g);
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
    if (!confirm('¿Estás seguro de eliminar este grupo?')) return;

    const res = await deleteGroup(id);
    if (res?.error) {
      setStatus({ error: res.error });
    } else {
      setGroups(groups.filter((g) => g.id !== id));
      setStatus({ success: 'Grupo eliminado con éxito.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveGroup(null, formData);

    if (res?.error) {
      setStatus({ error: res.error });
    } else if (res?.success) {
      setStatus({ success: res.success });
      const updatedId = (res as any)?.id || (formData.get('id') as string);
      const newItem: Group = {
        id: updatedId || `group-${Date.now()}`,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        age_range: formData.get('age_range') as string,
        level: formData.get('level') as string,
        is_active: formData.get('is_active') === 'on',
        display_order: parseInt((formData.get('display_order') as string) || '0', 10),
      };

      if (updatedId && groups.some((g) => g.id === updatedId)) {
        setGroups(groups.map((g) => (g.id === updatedId ? newItem : g)));
      } else {
        setGroups([...groups, newItem]);
      }
      setIsCreating(false);
      setEditingItem(null);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Grupos y Niveles de Entrenamiento
          </h2>
          <p className="text-xs text-combat-slate-400 mt-1">
            Administra las categorías de edades (Kids, Recreativo, Sparring y Competición).
          </p>
        </div>
        {!isCreating && !editingItem && (
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-combat-red/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Grupo</span>
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
              <Layers className="w-5 h-5 text-combat-red" />
              <span>{editingItem ? `Editar: ${editingItem.name}` : 'Crear Nueva Categoría / Grupo'}</span>
            </h3>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-combat-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form key={editingItem ? editingItem.id : 'new'} onSubmit={handleSubmit} className="space-y-5">
            {editingItem && <input type="hidden" name="id" value={editingItem.id} />}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Nombre del Grupo
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem?.name || ''}
                  required
                  placeholder="Ej: Infantil / Kids"
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Rango de Edades
                </label>
                <input
                  type="text"
                  name="age_range"
                  defaultValue={editingItem?.age_range || ''}
                  required
                  placeholder="Ej: 6 a 12 años"
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Nivel Requerido
                </label>
                <input
                  type="text"
                  name="level"
                  defaultValue={editingItem?.level || 'Principiante e Intermedio'}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Descripción y Enfoque Pedagógico
              </label>
              <textarea
                name="description"
                defaultValue={editingItem?.description || ''}
                rows={3}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
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
                  id="is_active_group"
                  name="is_active"
                  defaultChecked={editingItem ? editingItem.is_active : true}
                  className="w-4 h-4 rounded text-combat-red focus:ring-combat-red"
                />
                <label htmlFor="is_active_group" className="text-sm font-semibold text-white cursor-pointer">
                  Activo y visible en la sección de grupos
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
                <span>{saving ? 'Guardando...' : 'Guardar Grupo'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Groups List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {groups.map((group) => (
          <div
            key={group.id}
            className="rounded-2xl bg-surface-card border border-surface-border p-6 flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white">
                  {group.name}
                </h3>
                <span className="text-xs font-bold text-combat-gold bg-combat-gold/10 px-2.5 py-1 rounded-md border border-combat-gold/20">
                  {group.level}
                </span>
              </div>
              <div className="text-xs text-combat-slate-400 font-semibold mt-1">
                🎂 Rango de edad: <span className="text-white">{group.age_range}</span>
              </div>
              <p className="text-xs text-combat-slate-300 leading-relaxed mt-3">
                {group.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-surface-border/50">
              <span className="text-xs">
                {group.is_active ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Activo
                  </span>
                ) : (
                  <span className="text-combat-slate-400 flex items-center gap-1">
                    <EyeOff className="w-3.5 h-3.5" /> Oculto
                  </span>
                )}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(group)}
                  className="p-2 rounded-lg bg-surface-light text-combat-slate-300 hover:text-white hover:bg-combat-red/20 transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(group.id)}
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
    </div>
  );
}
