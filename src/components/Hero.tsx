'use client';

import React from 'react';
import { MessageCircle, Calendar, Trophy, Zap, Shield, ArrowRight, Star } from 'lucide-react';
import { GymSettings } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/mock-data';

interface HeroProps {
  settings: GymSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const whatsAppUrl = getWhatsAppUrl(
    settings.whatsapp_message ||
      `¡Hola! Quiero solicitar mi primera clase de prueba gratuita en ${settings.name || 'INFERNO COMBAT'}.`
  );

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Background Image with Dark Contrast Gradients */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('${settings.hero_bg_url}')`,
          }}
        />
        {/* Layered overlays for maximum legibility and dark mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-background/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Gold Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-combat-gold/10 border border-combat-gold/30 text-combat-gold text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md animate-in fade-in duration-500">
          <Trophy className="w-4 h-4 text-combat-gold" />
          <span>Sede Oficial & Dirección Técnica de Campeón Mundial</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-combat-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-combat-gold"></span>
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-[1.08] mb-6">
          Forja tu carácter. <br />
          <span className="text-gradient-red">Domina el combate.</span>
        </h1>

        {/* Subtitle / Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-combat-slate-300 font-normal leading-relaxed mb-9">
          Kickboxing, Boxeo, K1 y Muay Thai en un entorno de alto nivel. Aprende defensa
          personal real, mejora tu condición física extrema o prepárate para competir con los
          mejores.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white text-base font-bold tracking-wide transition-all duration-300 shadow-xl shadow-combat-red/25 hover:shadow-combat-red/40 hover:-translate-y-0.5 group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Clase de Prueba Gratis</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#horarios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-surface-card hover:bg-surface-hover text-combat-slate-200 hover:text-white text-base font-semibold border border-surface-border transition-all duration-200 hover:border-combat-slate-500"
          >
            <Calendar className="w-5 h-5 text-combat-red" />
            <span>Ver Grilla de Horarios</span>
          </a>
        </div>

        {/* Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-surface-border/60">
          <div className="flex flex-col items-center p-3 rounded-lg bg-surface/40 backdrop-blur-sm border border-surface-border/40">
            <span className="font-display font-extrabold text-2xl text-white">18+</span>
            <span className="text-xs text-combat-slate-400 font-medium">Años de Trayectoria</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-lg bg-surface/40 backdrop-blur-sm border border-surface-border/40">
            <span className="font-display font-extrabold text-2xl text-combat-gold">100%</span>
            <span className="text-xs text-combat-slate-400 font-medium">Atletas Certificados</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-lg bg-surface/40 backdrop-blur-sm border border-surface-border/40">
            <span className="font-display font-extrabold text-2xl text-white">6</span>
            <span className="text-xs text-combat-slate-400 font-medium">Disciplinas de Élite</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-lg bg-surface/40 backdrop-blur-sm border border-surface-border/40">
            <span className="font-display font-extrabold text-2xl text-combat-red">Ring & Tatami</span>
            <span className="text-xs text-combat-slate-400 font-medium">Instalaciones Pro</span>
          </div>
        </div>
      </div>
    </section>
  );
};
