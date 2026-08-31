'use client';

import React from 'react';
import { Shield, Target, Users, Zap, CheckCircle2, Flame, Award } from 'lucide-react';
import { GymSettings } from '@/lib/types';

interface AboutSectionProps {
  settings: GymSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  const pillars = [
    {
      icon: Shield,
      title: 'Técnica & Seguridad',
      description:
        'Aprende de manera progresiva con metodología probada. Cuidamos tu integridad física mediante equipamiento adecuado y control riguroso del sparring.',
    },
    {
      icon: Target,
      title: 'Alto Rendimiento y Recreativo',
      description:
        'Ya sea que busques ponerte en forma, aprender defensa personal real o competir en torneos oficiales, adaptamos la intensidad a tu objetivo.',
    },
    {
      icon: Users,
      title: 'Comunidad & Respeto',
      description:
        'Un ambiente fraterno donde todos nos ayudamos a mejorar. Los valores marciales de humildad, compañerismo y constancia son nuestra base.',
    },
    {
      icon: Flame,
      title: 'Instalaciones Profesionales',
      description:
        'Ring de boxeo reglamentario, jaula de MMA, 150m² de tatami olímpico antibacteriano y amplia zona de sacos de impacto y peso libre.',
    },
  ];

  return (
    <section id="nosotros" className="py-20 relative bg-background border-t border-surface-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-red/10 border border-combat-red/20 text-combat-red text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Quiénes Somos</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Nuestra Filosofía de <span className="text-gradient-red">Entrenamiento</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-combat-slate-300 leading-relaxed">
            {settings.about_text}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-surface-card border border-surface-border/70 hover:border-combat-red/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-combat-red/5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center text-combat-red mb-5 group-hover:bg-combat-red group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-combat-red transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-combat-slate-400 leading-relaxed">
                    {pillar.description}
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
