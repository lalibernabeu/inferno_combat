'use client';

import React, { useState } from 'react';
import { CalendarDays, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Clock, Eye, EyeOff, Save, X } from 'lucide-react';
import { ScheduleWithDetails, Discipline, Teacher, Group } from '@/lib/types';
import { mockSchedules, mockDisciplines, mockTeachers, mockGroups, getSchedulesWithDetails } from '@/lib/mock-data';
import { saveSchedule, deleteSchedule } from '@/lib/actions/schedules-actions';

const DAYS = [
  { id: 1, name: 'Lunes' },
  { id: 2, name: 'Martes' },
  { id: 3, name: 'Miércoles' },
  { id: 4, name: 'Jueves' },
  { id: 5, name: 'Viernes' },
  { id: 6, name: 'Sábado' },
];

export default function AdminSchedulesPage() {
  const [schedules, setSchedules] = useState<ScheduleWithDetails[]>(getSchedulesWithDetails());
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [editingItem, setEditingItem] = useState<ScheduleWithDetails | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [saving, setSaving] = useState(false);

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
      setSchedules(schedules.filter((s) => s.id !== id));
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
      const updatedId = formData.get('id') as string;
      const disciplineId = formData.get('discipline_id') as string;
      const teacherId = formData.get('teacher_id') as string;
      const groupId = formData.get('group_id') as string;

      const discipline = mockDisciplines.find((d) => d.id === disciplineId) || mockDisciplines[0];
      const teacher = mockTeachers.find((t) => t.id === teacherId) || mockTeachers[0];
      const group = mockGroups.find((g) => g.id === groupId) || mockGroups[0];

      const newItem: ScheduleWithDetails = {
        id: updatedId || `sch-${Date.now()}`,
        day_of_week: parseInt(formData.get('day_of_week') as string, 10),
        start_time: formData.get('start_time') as string,
        end_time: formData.get('end_time') as string,
        discipline_id: disciplineId,
        teacher_id: teacherId,
        group_id: groupId,
        notes: (formData.get('notes') as string) || undefined,
        is_active: formData.get('is_active') === 'on',
        discipline,
        teacher,
        group,
      };

      if (updatedId) {
        setSchedules(schedules.map((s) => (s.id === updatedId ? newItem : s)));
      } else {
        setSchedules([...schedules, newItem]);
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
            Gestión de Horarios Semanales
          </h2>
          <p className="text-xs text-combat-slate-400 mt-1">
            Configura las clases por día, horarios de inicio/fin, profesor y categoría.
          </p>
        </div>
        {!isCreating && !editingItem && (
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-combat-red/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Horario</span>
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
              <span>{editingItem ? 'Editar Turno / Horario' : 'Crear Nuevo Turno de Clase'}</span>
            </h3>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-combat-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {editingItem && <input type="hidden" name="id" value={editingItem.id} />}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Día de la Semana
                </label>
                <select
                  name="day_of_week"
                  defaultValue={editingItem ? editingItem.day_of_week : selectedDay}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                >
                  {DAYS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-surface text-white">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                  Disciplina
                </label>
                <select
                  name="discipline_id"
                  defaultValue={editingItem?.discipline_id || mockDisciplines[0].id}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                >
                  {mockDisciplines.map((disc) => (
                    <option key={disc.id} value={disc.id} className="bg-surface text-white">
                      {disc.name}
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
                  defaultValue={editingItem?.teacher_id || mockTeachers[0].id}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                >
                  {mockTeachers.map((t) => (
                    <option key={t.id} value={t.id} className="bg-surface text-white">
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
                  defaultValue={editingItem?.group_id || mockGroups[0].id}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
                >
                  {mockGroups.map((g) => (
                    <option key={g.id} value={g.id} className="bg-surface text-white">
                      {g.name} ({g.age_range})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300 mb-2">
                Notas / Enfoque Especial (Opcional)
              </label>
              <input
                type="text"
                name="notes"
                defaultValue={editingItem?.notes || ''}
                placeholder="Ej: Sparring condicionado, paos y clinch, técnica fundamental"
                className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="is_active_schedule"
                name="is_active"
                defaultChecked={editingItem ? editingItem.is_active : true}
                className="w-4 h-4 rounded text-combat-red focus:ring-combat-red"
              />
              <label htmlFor="is_active_schedule" className="text-sm font-semibold text-white cursor-pointer">
                Clase activa y visible en el cronograma semanal
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

      {/* Day Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {DAYS.map((day) => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
              selectedDay === day.id
                ? 'bg-combat-red text-white shadow-md shadow-combat-red/20'
                : 'bg-surface-card text-combat-slate-400 hover:text-white border border-surface-border'
            }`}
          >
            {day.name}
          </button>
        ))}
      </div>

      {/* Schedules Table */}
      <div className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden shadow-xl">
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
              {currentDaySchedules.length > 0 ? (
                currentDaySchedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-surface-light/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-combat-red" />
                        <span>
                          {sch.start_time} - {sch.end_time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{sch.discipline?.name}</td>
                    <td className="px-6 py-4 text-combat-slate-200">
                      {sch.teacher?.name} {sch.teacher?.is_world_champion ? '🏆' : ''}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-combat-gold">
                      {sch.group?.name}
                    </td>
                    <td className="px-6 py-4 text-xs text-combat-slate-400 italic">
                      {sch.notes || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {sch.is_active ? (
                        <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> Activo
                        </span>
                      ) : (
                        <span className="text-combat-slate-400 text-xs flex items-center gap-1">
                          <EyeOff className="w-3.5 h-3.5" /> Oculto
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
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-combat-slate-400">
                    No hay clases programadas para este día. Haz clic en "Nuevo Horario" para crear una.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
