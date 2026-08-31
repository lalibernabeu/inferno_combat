'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Clock, User, MessageCircle, Filter, Trophy, Sparkles } from 'lucide-react';
import { ScheduleWithDetails, Discipline } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/mock-data';

interface ScheduleSectionProps {
  schedules: ScheduleWithDetails[];
  disciplines: Discipline[];
}

const DAYS = [
  { id: 1, name: 'Lunes', short: 'Lun' },
  { id: 2, name: 'Martes', short: 'Mar' },
  { id: 3, name: 'Miércoles', short: 'Mié' },
  { id: 4, name: 'Jueves', short: 'Jue' },
  { id: 5, name: 'Viernes', short: 'Vie' },
  { id: 6, name: 'Sábado', short: 'Sáb' },
];

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ schedules, disciplines }) => {
  // Default to today's day (1..6), or 1 (Lunes) if Sunday
  const todayDay = new Date().getDay();
  const initialDay = todayDay >= 1 && todayDay <= 6 ? todayDay : 1;

  const [selectedDay, setSelectedDay] = useState<number>(initialDay);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');

  const filteredSchedules = useMemo(() => {
    return schedules
      .filter((s) => s.day_of_week === selectedDay)
      .filter((s) => (selectedDiscipline === 'all' ? true : s.discipline_id === selectedDiscipline))
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
  }, [schedules, selectedDay, selectedDiscipline]);

  return (
    <section id="horarios" className="py-20 relative bg-background border-t border-surface-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-red/10 border border-combat-red/20 text-combat-red text-xs font-bold uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Cronograma Semanal</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Grilla de <span className="text-gradient-red">Horarios</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-combat-slate-300">
            Selecciona el día para ver todas las clases disponibles. Consulta o reserva tu cupo por WhatsApp.
          </p>
        </div>

        {/* Day Selector Tabs (Mobile-First scrollable / grid) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 pt-1 gap-2 sm:gap-3 no-scrollbar mb-8">
          {DAYS.map((day) => {
            const isSelected = selectedDay === day.id;
            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`px-5 py-3 rounded-xl font-bold text-sm sm:text-base whitespace-nowrap transition-all duration-200 shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-combat-red text-white shadow-lg shadow-combat-red/30 scale-105 border-transparent'
                    : 'bg-surface-card text-combat-slate-300 hover:text-white hover:bg-surface-hover border border-surface-border'
                }`}
              >
                <span>{day.name}</span>
              </button>
            );
          })}
        </div>

        {/* Optional Discipline Filter Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar mb-10">
          <button
            onClick={() => setSelectedDiscipline('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedDiscipline === 'all'
                ? 'bg-surface-light text-white border border-combat-slate-400'
                : 'text-combat-slate-400 hover:text-combat-slate-200 bg-surface-card/60 border border-surface-border'
            }`}
          >
            Todas las disciplinas
          </button>
          {disciplines.map((disc) => (
            <button
              key={disc.id}
              onClick={() => setSelectedDiscipline(disc.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDiscipline === disc.id
                  ? 'bg-combat-red/20 text-combat-red border border-combat-red/60'
                  : 'text-combat-slate-400 hover:text-combat-slate-200 bg-surface-card/60 border border-surface-border'
              }`}
            >
              {disc.name}
            </button>
          ))}
        </div>

        {/* Schedules Grid / Vertical Cards */}
        {filteredSchedules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchedules.map((item) => {
              const currentDayName = DAYS.find((d) => d.id === selectedDay)?.name;
              const slotWhatsAppUrl = getWhatsAppUrl(
                `¡Hola! Quiero consultar por la clase de ${item.discipline.name} (${item.group.name}) los días ${currentDayName} de ${item.start_time} a ${item.end_time}hs con el profesor ${item.teacher.name}.`
              );

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl p-6 bg-surface-card border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                    item.teacher.is_world_champion
                      ? 'border-combat-gold/40 hover:border-combat-gold shadow-md shadow-combat-gold/5'
                      : 'border-surface-border hover:border-combat-red/50 hover:shadow-combat-red/5'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top: Time Badge & Group */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-surface-border text-white text-sm font-extrabold tracking-wide">
                        <Clock className="w-4 h-4 text-combat-red" />
                        <span>
                          {item.start_time} - {item.end_time}
                        </span>
                      </div>

                      <span className="text-[11px] font-semibold text-combat-gold bg-combat-gold/10 px-2.5 py-1 rounded-md border border-combat-gold/20">
                        {item.group.name}
                      </span>
                    </div>

                    {/* Discipline Name */}
                    <div>
                      <h3 className="font-display font-black text-xl text-white uppercase tracking-wide">
                        {item.discipline.name}
                      </h3>
                      {item.notes && (
                        <p className="text-xs text-combat-slate-400 mt-1 font-medium italic">
                          "{item.notes}"
                        </p>
                      )}
                    </div>

                    {/* Teacher Info */}
                    <div className="pt-2 border-t border-surface-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-surface-light border border-surface-border flex items-center justify-center text-combat-slate-300 overflow-hidden shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1">
                            {item.teacher.name}
                            {item.teacher.is_world_champion && (
                              <Trophy className="w-3 h-3 text-combat-gold" />
                            )}
                          </div>
                          <div className="text-[10px] text-combat-slate-400">
                            {item.teacher.is_world_champion
                              ? 'Campeón Mundial'
                              : 'Instructor Titular'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reserve Slot Button */}
                  <div className="pt-5">
                    <a
                      href={slotWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-light hover:bg-combat-red text-combat-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors border border-surface-border hover:border-combat-red"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Consultar Horario</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-card rounded-2xl border border-surface-border">
            <Calendar className="w-12 h-12 text-combat-slate-500 mx-auto mb-3" />
            <p className="text-base text-combat-slate-300 font-semibold">
              No hay clases programadas con el filtro seleccionado para este día.
            </p>
            <button
              onClick={() => setSelectedDiscipline('all')}
              className="mt-4 px-4 py-2 rounded-lg bg-combat-red text-white text-xs font-bold uppercase tracking-wide hover:bg-combat-red-hover transition-colors"
            >
              Ver todas las clases
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
