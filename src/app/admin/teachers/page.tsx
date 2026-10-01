'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users2, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Trophy, Eye, EyeOff, Save, X, Flame, Loader2 } from 'lucide-react';
import { TeacherWithDisciplines, Discipline } from '@/lib/types';
import { saveTeacher, deleteTeacher } from '@/lib/actions/teachers-actions';
import { createClient } from '@/lib/supabase/client';
import { ImageUploadInput } from '@/components/ImageUploadInput';

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<TeacherWithDisciplines[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [editingItem, setEditingItem] = useState<TeacherWithDisciplines | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isWorldChampion, setIsWorldChampion] = useState(false);
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const [{ data: teachersData }, { data: disciplinesData }, { data: tdData }] = await Promise.all([
          supabase.from('teachers').select('*').order('display_order', { ascending: true }),
          supabase.from('disciplines').select('*').order('display_order', { ascending: true }),
          supabase.from('teacher_disciplines').select('*'),
        ]);

        if (disciplinesData && !disciplinesData.length === false) {
          setDisciplines(disciplinesData as Discipline[]);
        }

        if (teachersData) {
          const formatted = teachersData.map((t) => {
            const assignedIds = tdData
              ? tdData.filter((td) => td.teacher_id === t.id).map((td) => td.discipline_id)
              : [];
            const discList = (disciplinesData || []).filter((d) => assignedIds.includes(d.id));
            return { ...t, disciplines: discList };
          });
          setTeachers(formatted as any);
        }
      } catch (e) {
        console.error('Error loading teachers from Supabase:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleEdit = (teacher: TeacherWithDisciplines) => {
    setEditingItem(teacher);
    setIsWorldChampion(teacher.is_world_champion);
    setIsCreating(false);
    setStatus(null);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsWorldChampion(false);
    setIsCreating(true);
    setStatus(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este profesor?')) return;

    const res = await deleteTeacher(id);
    if (res?.error) {
      setStatus({ error: res.error });
    } else {
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      setStatus({ success: 'Profesor eliminado correctamente.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveTeacher(null, formData);

    if (res?.error) {
      setStatus({ error: res.error });
    } else if (res?.success) {
      setStatus({ success: res.success });
      const updatedId = (res as any)?.id || (formData.get('id') as string);
      const selectedDiscIds = formData.getAll('disciplines') as string[];
      const assignedDisciplines = disciplines.filter((d) => selectedDiscIds.includes(d.id));

      const newItem: TeacherWithDisciplines = {
        id: updatedId || `teacher-${Date.now()}`,
        name: formData.get('name') as string,
        nickname: (formData.get('nickname') as string) || undefined,
        bio: formData.get('bio') as string,
        experience_years: formData.get('experience_years') as string,
        photo_url: formData.get('photo_url') as string,
        is_world_champion: formData.get('is_world_champion') === 'on',
        champion_title_details: (formData.get('champion_title_details') as string) || undefined,
        is_active: formData.get('is_active') === 'on',
        display_order: parseInt((formData.get('display_order') as string) || '0', 10),
        disciplines: assignedDisciplines,
      };

      if (updatedId && teachers.some((t) => t.id === updatedId)) {
        setTeachers(teachers.map((t) => (t.id === updatedId ? newItem : t)));
      } else {
        setTeachers([...teachers, newItem]);
      }
      setIsCreating(false);
      setEditingItem(null);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 text-combat-gold animate-spin" />
        <p className="text-sm text-combat-slate-400">Cargando profesores de la base de datos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Gestión de Profesores e Instructores
          </h2>
          <p className="text-xs text-combat-slate-400 mt-1">
            Administra el cuerpo docente, asigna disciplinas y destaca campeones mundiales.
          </p>
        </div>
        {!isCreating && !editingItem && (
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-combat-gold hover:bg-combat-gold-dark text-surface text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-combat-gold/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Profesor</span>
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
        <div className="p-6 rounded-2xl bg-surface-card border border-combat-gold/40 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border/60">
            <h3 className="font-display font-bold text-lg text-white uppercase flex items-center gap-2">
              <Users2 className="w-5 h-5 text-combat-gold" />
              <span>{editingItem ? `Editar: ${editingItem.name}` : 'Crear Nuevo Profesor'}</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem?.name || ''}
                  required
                  placeholder="Ej: Marcos Silva"
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Apodo / Nickname (Opcional)
                </label>
                <input
                  type="text"
                  name="nickname"
                  defaultValue={editingItem?.nickname || ''}
                  placeholder="Ej: El Gladiador"
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Años de Experiencia / Trayectoria
                </label>
                <input
                  type="text"
                  name="experience_years"
                  defaultValue={editingItem?.experience_years || '10 años de experiencia'}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-gold"
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
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Biografía / Resumen de Carrera
              </label>
              <textarea
                name="bio"
                defaultValue={editingItem?.bio || ''}
                rows={3}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-gold"
              />
            </div>

            {/* Subida o selección de imagen */}
            <ImageUploadInput
              name="photo_url"
              defaultValue={editingItem?.photo_url || ''}
              label="Foto de Perfil del Instructor"
              folder="teachers"
              aspectRatio="portrait"
              helperText="Podés subir una foto desde tu dispositivo o ingresar una URL de imagen."
              required
            />

            {/* Disciplines Checkboxes */}
            {disciplines.length > 0 && (
              <div className="p-4 rounded-xl bg-surface-light border border-surface-border space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-white">
                  Disciplinas que Dicta este Profesor:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {disciplines.map((disc) => {
                    const isChecked = editingItem
                      ? editingItem.disciplines?.some((d) => d.id === disc.id)
                      : false;

                    return (
                      <label
                        key={disc.id}
                        className="flex items-center gap-2 text-xs font-medium text-combat-slate-200 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="disciplines"
                          value={disc.id}
                          defaultChecked={isChecked}
                          className="w-4 h-4 rounded text-combat-red focus:ring-combat-red"
                        />
                        <span>{disc.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* World Champion Settings Block */}
            <div className="p-4 rounded-xl bg-combat-gold/10 border border-combat-gold/30 space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_world_champion"
                  name="is_world_champion"
                  checked={isWorldChampion}
                  onChange={(e) => setIsWorldChampion(e.target.checked)}
                  className="w-4 h-4 rounded text-combat-gold focus:ring-combat-gold"
                />
                <label htmlFor="is_world_champion" className="text-sm font-bold text-combat-gold cursor-pointer flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>¿Es Campeón Mundial o Director Técnico Principal?</span>
                </label>
              </div>

              {isWorldChampion && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                    Detalle del Título Mundial (Aparece en el Banner Dorado Principal)
                  </label>
                  <input
                    type="text"
                    name="champion_title_details"
                    defaultValue={editingItem?.champion_title_details || ''}
                    placeholder="Ej: Campeón Mundial WAKO Pro - Categoría 75kg (2021) & Bicampeón Sudamericano K-1"
                    className="w-full px-4 py-3 rounded-xl bg-surface-light border border-combat-gold text-white text-sm focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="teacher_is_active"
                name="is_active"
                defaultChecked={editingItem ? editingItem.is_active : true}
                className="w-4 h-4 rounded text-combat-red focus:ring-combat-red"
              />
              <label htmlFor="teacher_is_active" className="text-sm font-semibold text-white cursor-pointer">
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
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-combat-gold hover:bg-combat-gold-dark text-surface text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-combat-gold/20 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Guardando...' : 'Guardar Profesor'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teachers Table */}
      <div className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden shadow-xl">
        {teachers.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Users2 className="w-12 h-12 text-combat-slate-500 mx-auto mb-3" />
            <p className="text-base text-white font-bold">No hay profesores registrados en la base de datos</p>
            <p className="text-xs text-combat-slate-400 mt-1">
              Haz clic en "Nuevo Profesor" para registrar los instructores del gimnasio.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-combat-slate-300">
              <thead className="bg-surface-light border-b border-surface-border text-xs font-bold uppercase tracking-wider text-combat-slate-400">
                <tr>
                  <th className="px-6 py-4">Foto</th>
                  <th className="px-6 py-4">Profesor</th>
                  <th className="px-6 py-4">Disciplinas</th>
                  <th className="px-6 py-4">Distinción</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-surface-light/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-surface-light border border-surface-border">
                        {teacher.photo_url ? (
                          <Image
                            src={teacher.photo_url}
                            alt={teacher.name}
                            fill
                            className="object-cover object-top"
                            sizes="60px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-combat-slate-500">
                            <Users2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-base">{teacher.name}</div>
                      {teacher.nickname && (
                        <div className="text-xs text-combat-red font-semibold">"{teacher.nickname}"</div>
                      )}
                      <div className="text-xs text-combat-gold">{teacher.experience_years}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {teacher.disciplines?.map((d) => (
                          <span
                            key={d.id}
                            className="px-2 py-0.5 rounded bg-surface-light text-[10px] font-semibold text-combat-slate-200 border border-surface-border"
                          >
                            {d.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {teacher.is_world_champion ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-combat-gold/15 text-combat-gold border border-combat-gold/30 text-xs font-bold">
                          <Trophy className="w-3.5 h-3.5 fill-current" />
                          <span>Campeón Mundial</span>
                        </span>
                      ) : (
                        <span className="text-xs text-combat-slate-400">Instructor Regular</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {teacher.is_active ? (
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
                          onClick={() => handleEdit(teacher)}
                          className="p-2 rounded-lg bg-surface-light text-combat-slate-300 hover:text-white hover:bg-combat-gold/20 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
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
