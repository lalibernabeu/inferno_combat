'use client';

import React from 'react';
import Image from 'next/image';
import { Trophy, Award, User } from 'lucide-react';
import { TeacherWithDisciplines } from '@/lib/types';

interface TeachersSectionProps {
  teachers: TeacherWithDisciplines[];
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ teachers }) => {
  if (!teachers || teachers.length === 0) {
    return null;
  }

  return (
    <section id="profesores" className="py-20 relative bg-background border-t border-surface-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-red/10 border border-combat-red/20 text-combat-red text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Staff Técnico</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Nuestro Equipo de <span className="text-gradient-red">Instructores</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-combat-slate-300">
            Aprende con atletas consagrados, campeones y entrenadores certificados dedicados al 100% a tu evolución técnica y física.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => {
            return (
              <div
                key={teacher.id}
                className={`rounded-2xl bg-surface-card border transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden group ${
                  teacher.is_world_champion
                    ? 'border-combat-gold/50 shadow-lg shadow-combat-gold/10 hover:border-combat-gold'
                    : 'border-surface-border hover:border-combat-red/50 hover:shadow-xl hover:shadow-combat-red/5'
                }`}
              >
                {/* Photo */}
                <div className="relative h-64 w-full bg-surface-light overflow-hidden">
                  {teacher.photo_url ? (
                    <Image
                      src={teacher.photo_url}
                      alt={teacher.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-light text-combat-slate-500">
                      <User className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-90" />

                  {/* Champion Tag */}
                  {teacher.is_world_champion && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-combat-gold text-surface font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Trophy className="w-3 h-3 fill-current" />
                      <span>Campeón Mundial</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-combat-red transition-colors">
                      {teacher.name}
                    </h3>
                    {teacher.nickname && (
                      <p className="text-xs font-bold text-combat-red uppercase tracking-wider">
                        "{teacher.nickname}"
                      </p>
                    )}
                    {teacher.experience_years && (
                      <p className="text-xs text-combat-gold font-semibold mt-1">
                        {teacher.experience_years}
                      </p>
                    )}

                    <p className="text-xs text-combat-slate-300 leading-relaxed mt-3">
                      {teacher.bio}
                    </p>
                  </div>

                  {/* Disciplines Taught */}
                  {teacher.disciplines && teacher.disciplines.length > 0 && (
                    <div className="pt-3 border-t border-surface-border/60">
                      <span className="text-[11px] font-semibold text-combat-slate-400 uppercase tracking-wider block mb-2">
                        Disciplinas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {teacher.disciplines.map((disc) => (
                          <span
                            key={disc.id}
                            className="px-2 py-0.5 rounded bg-surface-light text-[11px] font-medium text-combat-slate-200 border border-surface-border"
                          >
                            {disc.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
