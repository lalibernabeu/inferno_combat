'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Eye, EyeOff, Save, X, Loader2 } from 'lucide-react';
import { Group } from '@/lib/types';
import { saveGroup, deleteGroup } from '@/lib/actions/groups-actions';
import { createClient } from '@/lib/supabase/client';

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [editingItem, setEditingItem] = useState<Group | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGroups() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('groups')
          .select('*')
          .order('display_order', { ascending: true });
        if (data && !error) {
          setGroups(data as Group[]);
        }
      } catch (e) {
        console.error('Error loading groups from Supabase:', e);
      } finally {
        setLoading(false);
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
      setGroups((prev) => prev.filter((g) => g.id !== id));
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 text-combat-red animate-spin" />
        <p className="text-sm text-combat-slate-400">Cargando grupos de la base de datos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Grupos por Edad y Nivel
          </h2>
          <p className="text-xs text-combat-slate-400 mt-1">
            Define las categorías de entrenamiento (Kids, Recreativo, Sparring, Competición).
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
              <span>{editingItem ? `Editar: ${editingItem.name}` : 'Crear Nuevo Grupo de Entrenamiento'}</span>
            </h3>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-combat-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="id" defaultValue={editingItem?.id || ''} />

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Nombre del Grupo / Nivel
              </label>
              <input
                type="text"
                name="name"
                defaultValue={editingItem?.name || ''}
                required
                placeholder="Ej: Infantil / Kids o Jóvenes y Adultos"
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Rango de Edad
                </label>
                <input
                  type="text"
                  name="age_range"
                  defaultValue={editingItem?.age_range || '13 años en adelante'}
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
                  defaultValue={editingItem?.level || 'Principiante a Intermedio'}
                  required
                  placeholder="Ej: Inicial, Todos o Competición"
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>

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
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Descripción del Enfoque Pedagógico
              </label>
              <textarea
                name="description"
                defaultValue={editingItem?.description || ''}
                rows={3}
                required
                placeholder="Explica qué se enseña en este grupo y cuál es la intensidad de la clase..."
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="group_is_active"
                name="is_active"
                defaultChecked={editingItem ? editingItem.is_active : true}
                className="w-4 h-4 rounded text-combat-red focus:ring-combat-red"
              />
              <label htmlFor="group_is_active" className="text-sm font-semibold text-white cursor-pointer">
                Visible en la página web pública
              </label>
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

      {/* Groups Table */}
      <div className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden shadow-xl">
        {groups.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Layers className="w-12 h-12 text-combat-slate-500 mx-auto mb-3" />
            <p className="text-base text-white font-bold">No hay grupos registrados en la base de datos</p>
            <p className="text-xs text-combat-slate-400 mt-1">
              Haz clic en "Nuevo Grupo" para crear las categorías de alumnos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-combat-slate-300">
              <thead className="bg-surface-light border-b border-surface-border text-xs font-bold uppercase tracking-wider text-combat-slate-400">
                <tr>
                  <th className="px-6 py-4">Grupo</th>
                  <th className="px-6 py-4">Edad / Nivel</th>
                  <th className="px-6 py-4">Descripción</th>
                  <th className="px-6 py-4">Orden</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {groups.map((g) => (
                  <tr key={g.id} className="hover:bg-surface-light/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-base">{g.name}</div>
                    </td>
                    <td className="px-6 py-4 text-xs space-y-1">
                      <div>🎂 {g.age_range}</div>
                      <div className="text-combat-gold font-semibold">⚡ {g.level}</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-combat-slate-300 max-w-sm">
                      <p className="line-clamp-2">{g.description}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{g.display_order}</td>
                    <td className="px-6 py-4">
                      {g.is_active ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                          <Eye className="w-3 h-3" />
                          <span>Activo</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-combat-slate-700 text-combat-slate-400 text-xs font-semibold">
                          <EyeOff className="w-3 h-3" />
                          <span>Oculto</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(g)}
                          className="p-2 rounded-lg bg-surface-light text-combat-slate-300 hover:text-white hover:bg-combat-red/20 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(g.id)}
                          className="p-2 rounded-lg bg-surface-light text-combat-red hover:bg-combat-red/20 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
