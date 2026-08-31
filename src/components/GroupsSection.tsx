'use client';

import React from 'react';
import { Users, Smile, ShieldAlert, Zap, Trophy, CheckCircle } from 'lucide-react';
import { Group } from '@/lib/types';

interface GroupsSectionProps {
  groups: Group[];
}

export const GroupsSection: React.FC<GroupsSectionProps> = ({ groups }) => {
  const getGroupIcon = (index: number) => {
    switch (index) {
      case 0:
        return Smile;
      case 1:
        return Users;
      case 2:
        return Zap;
      case 3:
        return Trophy;
      default:
        return Users;
    }
  };

  return (
    <section className="py-20 relative bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-red/10 border border-combat-red/20 text-combat-red text-xs font-bold uppercase tracking-widest mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Niveles y Edades</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Un Grupo para Cada <span className="text-gradient-red">Objetivo</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-combat-slate-300">
            Adaptamos la exigencia y la pedagogía según tu edad y experiencia previa. No necesitas preparación física previa para empezar.
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, index) => {
            const Icon = getGroupIcon(index);
            const isCompetition = index === 3;

            return (
              <div
                key={group.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isCompetition
                    ? 'bg-gradient-to-b from-surface-card to-combat-red/10 border border-combat-red/40 shadow-lg shadow-combat-red/10'
                    : 'bg-surface-card border border-surface-border hover:border-surface-hover'
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      isCompetition
                        ? 'bg-combat-red text-white'
                        : 'bg-surface-light border border-surface-border text-combat-gold'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    {group.name}
                  </h3>

                  {/* Age & Level Badges */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="inline-block text-xs font-bold text-combat-slate-300 bg-surface-light px-2.5 py-1 rounded-md border border-surface-border/50">
                      🎂 <span className="text-white">{group.age_range}</span>
                    </span>
                    <span className="inline-block text-xs font-bold text-combat-gold bg-combat-gold/10 px-2.5 py-1 rounded-md border border-combat-gold/20">
                      ⚡ Nivel: {group.level}
                    </span>
                  </div>

                  <p className="text-sm text-combat-slate-300 leading-relaxed">
                    {group.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
