'use client';

import React from 'react';
import Image from 'next/image';
import { Trophy, Award, MessageCircle, ShieldCheck, Flame } from 'lucide-react';
import { TeacherWithDisciplines } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/utils';

interface ChampionBannerProps {
  champion?: TeacherWithDisciplines;
}

export const ChampionBanner: React.FC<ChampionBannerProps> = ({ champion }) => {
  if (!champion) return null;

  const whatsAppUrl = getWhatsAppUrl(
    '5492617078248',
    `¡Hola! Me gustaría consultar por los entrenamientos y clases dictadas por el profesor ${champion.name}.`
  );

  return (
    <section id="campeon" className="py-20 relative overflow-hidden bg-surface-card/60">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-combat-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-combat-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-combat-gold/40 bg-gradient-to-br from-surface to-surface-card p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle background badge */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <Trophy className="w-96 h-96 text-combat-gold" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-combat-gold via-amber-500 to-combat-red rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-72 h-96 sm:w-80 sm:h-[440px] rounded-2xl overflow-hidden bg-surface-light border border-combat-gold/50 shadow-2xl">
                  {champion.photo_url ? (
                    <Image
                      src={champion.photo_url}
                      alt={champion.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-light text-combat-gold">
                      <Trophy className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

                  {/* Floating badge over photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-surface/90 backdrop-blur-md border border-combat-gold/30 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-combat-gold/20 flex items-center justify-center shrink-0">
                      <Trophy className="w-5 h-5 text-combat-gold" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-combat-gold uppercase tracking-wider">
                        Dirección Técnica
                      </div>
                      <div className="text-xs text-white font-semibold line-clamp-1">
                        {champion.champion_title_details || 'Campeón Internacional'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-gold/15 border border-combat-gold/40 text-combat-gold text-xs font-bold uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>Dirección Técnica & Atleta de Élite</span>
              </div>

              <div>
                <div className="text-sm font-semibold text-combat-gold uppercase tracking-wider mb-1">
                  Profesor Principal
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
                  {champion.name}
                </h2>
                {champion.nickname && (
                  <p className="text-lg font-bold text-combat-red mt-1">
                    "{champion.nickname}"
                  </p>
                )}
              </div>

              {/* Champion Title Details */}
              {champion.champion_title_details && (
                <div className="p-4 rounded-xl bg-combat-gold/10 border border-combat-gold/30">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-6 h-6 text-combat-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white uppercase tracking-wide">
                        TÍTULOS Y LOGROS
                      </div>
                      <p className="text-sm text-combat-slate-200 mt-0.5 font-medium">
                        {champion.champion_title_details}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bio */}
              <p className="text-base text-combat-slate-300 leading-relaxed">
                {champion.bio}
              </p>

              {/* Experience and Disciplines pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {champion.experience_years && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-surface-border text-xs font-semibold text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-combat-gold" />
                    {champion.experience_years}
                  </span>
                )}

                {champion.disciplines?.map((disc) => (
                  <span
                    key={disc.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-surface-border text-xs font-semibold text-combat-slate-300"
                  >
                    <Flame className="w-3.5 h-3.5 text-combat-red" />
                    {disc.name}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-combat-gold hover:bg-combat-gold-dark text-surface font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-combat-gold/20 hover:shadow-combat-gold/40 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 text-surface fill-current" />
                  <span>Entrenar con el Campeón</span>
                </a>

                <a
                  href="#horarios"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-light hover:bg-surface-hover text-white text-sm font-semibold border border-surface-border transition-colors"
                >
                  <span>Ver Horarios de Clases</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
