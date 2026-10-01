'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Users, Activity, MessageCircle } from 'lucide-react';
import { Discipline } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/utils';

interface DisciplinesSectionProps {
  disciplines: Discipline[];
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({ disciplines }) => {
  if (!disciplines || disciplines.length === 0) {
    return null;
  }

  return (
    <section id="disciplinas" className="py-20 relative bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-red/10 border border-combat-red/20 text-combat-red text-xs font-bold uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Nuestras Clases</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Disciplinas de <span className="text-gradient-red">Combate</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-combat-slate-300">
            Entrena las disciplinas más efectivas del mundo con profesores experimentados y
            metodología adaptada a tus metas.
          </p>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disciplines.map((discipline) => {
            const whatsAppUrl = getWhatsAppUrl(
              '5492617078248',
              `¡Hola! Quisiera recibir más información y horarios sobre la disciplina de ${discipline.name}.`
            );

            return (
              <div
                key={discipline.id}
                className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden hover:border-combat-red/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-combat-red/10 flex flex-col group"
              >
                {/* Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-surface-light">
                  {discipline.image_url ? (
                    <Image
                      src={discipline.image_url}
                      alt={discipline.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-light text-combat-slate-500">
                      <Flame className="w-12 h-12 text-combat-red/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/40 to-transparent" />

                  {/* Discipline Title Floating over image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-wide drop-shadow-md">
                      {discipline.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <p className="text-sm text-combat-slate-300 leading-relaxed font-normal">
                      {discipline.short_description}
                    </p>

                    {/* Metadata Badges */}
                    <div className="space-y-2 pt-2 border-t border-surface-border/60">
                      <div className="flex items-center gap-2 text-xs text-combat-slate-300">
                        <Users className="w-4 h-4 text-combat-red shrink-0" />
                        <span className="font-semibold text-white">Público:</span>
                        <span>{discipline.target_audience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-combat-slate-300">
                        <Activity className="w-4 h-4 text-combat-gold shrink-0" />
                        <span className="font-semibold text-white">Nivel:</span>
                        <span>{discipline.level_info}</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Inquiry Button */}
                  <div className="pt-2">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-light hover:bg-combat-red text-combat-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-surface-border group-hover:border-combat-red"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Consultar por {discipline.name}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
