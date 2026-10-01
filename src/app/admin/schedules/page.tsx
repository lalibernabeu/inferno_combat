'use client';

import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Clock, Eye, EyeOff, Save, X, Loader2 } from 'lucide-react';
import { ScheduleWithDetails, Discipline, Teacher, Group } from '@/lib/types';
import { saveSchedule, deleteSchedule } from '@/lib/actions/schedules-actions';
import { createClient } from '@/lib/supabase/client';

const DAYS = [
  { id: 1, name: 'Lunes' },
  { id: 2, name: 'Martes' },
  { id: 3, name: 'Miércoles' },
  { id: 4, name: 'Jueves' },
  { id: 5, name: 'Viernes' },
  { id: 6, name: 'Sábado' },
];

export default function AdminSchedulesPage() {
  const [schedules, setSchedules] = useState<ScheduleWithDetails[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [editingItem, setEditingItem] = useState<ScheduleWithDetails | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const [
          { data: schedulesData },
          { data: disciplinesData },
          { data: teachersData },
          { data: groupsData },
        ] = await Promise.all([
          supabase
            .from('schedules')
            .select('*, discipline:disciplines(*), group:groups(*), teacher:teachers(*)')
            .order('start_time', { ascending: true }),
          supabase.from('disciplines').select('*').order('display_order', { ascending: true }),
          supabase.from('teachers').select('*').order('display_order', { ascending: true }),
          supabase.from('groups').select('*').order('display_order', { ascending: true }),
        ]);

        if (disciplinesData) {
          setDisciplines(disciplinesData as Discipline[]);
        }
        if (teachersData) {
          setTeachers(teachersData as Teacher[]);
        }
        if (groupsData) {
          setGroups(groupsData as Group[]);
        }
        if (schedulesData) {
          setSchedules(schedulesData as ScheduleWithDetails[]);
        }
      } catch (e) {
        console.error('Error loading schedules data from Supabase:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const currentDaySchedules = schedules.filter((s) => s.day_of_week === selectedDay);

  const handleEdit = (sch: ScheduleWithDetails) => {
    setEditingItem(sch);
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
    if (!confirm('¿Estás seguro de eliminar este horario?')) return;

    const res = await deleteSchedule(id);
    if (res?.error) {
      setStatus({ error: res.error });
    } else {
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      setStatus({ success: 'Horario eliminado con éxito.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const res = await saveSchedule(null, formData);

    if (res?.error) {
      setStatus({ error: res.error });
    } else if (res?.success) {
      setStatus({ success: res.success });
      const updatedId = (res as any)?.id || (formData.get('id') as string);
      const discId = formData.get('discipline_id') as string;
      const tId = formData.get('teacher_id') as string;
      const gId = formData.get('group_id') as string;

      const newItem: ScheduleWithDetails = {
        id: updatedId || `sched-${Date.now()}`,
        day_of_week: parseInt((formData.get('day_of_week') as string) || '1', 10),
        start_time: formData.get('start_time') as string,
        end_time: formData.get('end_time') as string,
        discipline_id: discId,
        teacher_id: tId,
        group_id: gId,
        notes: (formData.get('notes') as string) || undefined,
        is_active: formData.get('is_active') === 'on',
        display_order: parseInt((formData.get('display_order') as string) || '0', 10),
        discipline: disciplines.find((d) => d.id === discId) as Discipline,
        teacher: teachers.find((t) => t.id === tId) as Teacher,
        group: groups.find((g) => g.id === gId) as Group,
      };

      if (updatedId && schedules.some((s) => s.id === updatedId)) {
        setSchedules(schedules.map((s) => (s.id === updatedId ? newItem : s)));
      } else {
        setSchedules([...schedules, newItem]);
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
        <p className="text-sm text-combat-slate-400">Cargando cronograma de horarios de la base de datos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Grilla y Horarios de Clases
          </h2>
          <p className="text-xs text-combat-slate-400 mt-1">
            Asigna días, horarios, disciplinas, profesores y grupos de entrenamiento.
          </p>
        </div>
        {!isCreating && !editingItem && (
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-combat-red/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Turno / Horario</span>
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
              <CalendarDays className="w-5 h-5 text-combat-red" />
              <span>{editingItem ? 'Editar Horario de Clase' : 'Crear Nuevo Turno en el Cronograma'}</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Día de la Semana
                </label>
                <select
                  name="day_of_week"
                  defaultValue={editingItem?.day_of_week || selectedDay}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                >
                  {DAYS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Hora de Inicio (HH:MM)
                </label>
                <input
                  type="time"
                  name="start_time"
                  defaultValue={editingItem?.start_time || '18:00'}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Hora de Finalización (HH:MM)
                </label>
                <input
                  type="time"
                  name="end_time"
                  defaultValue={editingItem?.end_time || '19:15'}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Disciplina
                </label>
                <select
                  name="discipline_id"
                  defaultValue={editingItem?.discipline_id || ''}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                >
                  <option value="" disabled>Selecciona una disciplina</option>
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Profesor a Cargo
                </label>
                <select
                  name="teacher_id"
                  defaultValue={editingItem?.teacher_id || ''}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                >
                  <option value="" disabled>Selecciona un profesor</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} {t.is_world_champion ? '🏆' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Grupo / Categoría
                </label>
                <select
                  name="group_id"
                  defaultValue={editingItem?.group_id || ''}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                >
                  <option value="" disabled>Selecciona un grupo</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} ({g.age_range})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Notas / Subtítulo del Turno (Opcional)
              </label>
              <input
                type="text"
                name="notes"
                defaultValue={editingItem?.notes || ''}
                placeholder="Ej: Técnica fundamental y combinaciones, Paos y clinch, Sparring suave"
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="schedule_is_active"
                name="is_active"
                defaultChecked={editingItem ? editingItem.is_active : true}
                className="w-4 h-4 rounded text-combat-red focus:ring-combat-red"
              />
              <label htmlFor="schedule_is_active" className="text-sm font-semibold text-white cursor-pointer">
                Clase activa en el cronograma semanal
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
                <span>{saving ? 'Guardando...' : 'Guardar Horario'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Day Selector Tabs */}
      <div className="flex items-center overflow-x-auto pb-2 gap-2">
        {DAYS.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDay(d.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedDay === d.id
                ? 'bg-combat-red text-white shadow-md shadow-combat-red/20 scale-105'
                : 'bg-surface-card border border-surface-border text-combat-slate-400 hover:text-white hover:bg-surface-light'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Schedules Table for Selected Day */}
      <div className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden shadow-xl">
        {currentDaySchedules.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Clock className="w-12 h-12 text-combat-slate-500 mx-auto mb-3" />
            <p className="text-base text-white font-bold">
              No hay turnos registrados para el día {DAYS.find((d) => d.id === selectedDay)?.name}
            </p>
            <p className="text-xs text-combat-slate-400 mt-1">
              Haz clic en "Nuevo Turno / Horario" para crear clases en este día.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-combat-slate-300">
              <thead className="bg-surface-light border-b border-surface-border text-xs font-bold uppercase tracking-wider text-combat-slate-400">
                <tr>
                  <th className="px-6 py-4">Horario</th>
                  <th className="px-6 py-4">Disciplina</th>
                  <th className="px-6 py-4">Profesor</th>
                  <th className="px-6 py-4">Grupo / Nivel</th>
                  <th className="px-6 py-4">Notas</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {currentDaySchedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-surface-light/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-white text-sm bg-surface-light px-3 py-1 rounded-lg border border-surface-border inline-block font-mono">
                        {sch.start_time} - {sch.end_time}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      {sch.discipline?.name || 'Disciplina'}
                    </td>
                    <td className="px-6 py-4 text-combat-gold font-semibold">
                      {sch.teacher?.name || 'Profesor'} {sch.teacher?.is_world_champion ? '🏆' : ''}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="bg-surface-light border border-surface-border px-2.5 py-1 rounded-md text-combat-slate-200">
                        {sch.group?.name || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-combat-slate-400 italic">
                      {sch.notes || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {sch.is_active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                          <Eye className="w-3 h-3" />
                          <span>Activo</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-combat-slate-700 text-combat-slate-400 text-xs font-semibold">
                          <EyeOff className="w-3 h-3" />
                          <span>Pausado</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(sch)}
                          className="p-2 rounded-lg bg-surface-light text-combat-slate-300 hover:text-white hover:bg-combat-red/20 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sch.id)}
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
