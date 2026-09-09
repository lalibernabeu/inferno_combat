import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowLeft,
  MessageCircle,
  Clock,
  Shirt,
  Shield,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { getGymSettings, getDisciplines } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BullLogo } from '@/components/BullLogo';

export const metadata: Metadata = {
  title: 'Tienda Oficial | INFERNO COMBAT',
  description:
    'Equipamiento oficial, guantes, vendas, indumentaria de combate y accesorios técnicos en INFERNO COMBAT.',
};

export default async function TiendaPage() {
  const [settings, disciplines] = await Promise.all([
    getGymSettings(),
    getDisciplines(),
  ]);

  const whatsappMessage = encodeURIComponent(
    '¡Hola! Quería consultar por la indumentaria y equipamiento disponible de la Tienda de ' +
      settings.name +
      '.'
  );
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${whatsappMessage}`;

  const previewCategories = [
    {
      title: 'Guantes & Vendas',
      tagline: 'Protección y pegada profesional',
      icon: Flame,
      items: [
        'Guantes de Boxeo y Kickboxing (12, 14, 16 oz)',
        'Guantillas de MMA profesionales',
        'Vendas semi-elásticas de 4.5m',
        'Protectores bucales termoformables',
      ],
      badge: 'Próximamente',
    },
    {
      title: 'Indumentaria Oficial',
      tagline: 'Diseñada para alto rendimiento',
      icon: Shirt,
      items: [
        'Rashguards de compresión transpirables',
        'Shorts técnicos de Kickboxing y Muay Thai',
        'Remeras de entrenamiento Dry-Fit INFERNO',
        'Hoodies y buzos oficiales de combate',
      ],
      badge: 'Próximamente',
    },
    {
      title: 'Protecciones de Sparring',
      tagline: 'Seguridad para tus entrenamientos',
      icon: Shield,
      items: [
        'Tibiales de máxima absorción de impacto',
        'Cabezales anatómicos de protección',
        'Tobilleras reforzadas de sujeción',
        'Bolsos y mochilas deportivas de combate',
      ],
      badge: 'Próximamente',
    },
    {
      title: 'Nutrición & Suplementos',
      tagline: 'Recuperación y potencia muscular',
      icon: Zap,
      items: [
        'Proteína Whey Premium',
        'Creatina Monohidrato micronizada',
        'Bebidas isotónicas y sales de hidratación',
        'Shakers y botellas térmicas INFERNO',
      ],
      badge: 'Próximamente',
    },
  ];

  return (
    <main className="min-h-screen bg-background text-combat-slate-100 flex flex-col justify-between selection:bg-combat-red selection:text-white">
      {/* Navigation Bar */}
      <Navbar settings={settings} />

      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-combat-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-combat-red" />
            <span>Volver al Inicio</span>
          </Link>
        </div>

        {/* Hero Banner Coming Soon */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface-card via-surface to-surface-card border border-surface-border p-8 sm:p-12 lg:p-16 mb-16 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-combat-red/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Launch Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Lanzamiento Próximamente</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-combat-red flex items-center justify-center shadow-lg shadow-combat-red/30">
                <BullLogo className="w-7 h-7 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-combat-slate-300 uppercase tracking-widest">
                {settings.name} STORE
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.1] mb-6">
              Equipamiento & <span className="text-gradient-red">Indumentaria</span> Oficial
            </h1>

            <p className="text-base sm:text-lg text-combat-slate-300 leading-relaxed mb-8">
              Estamos preparando el catálogo completo con los mejores artículos técnicos para tus clases de combate. Muy pronto vas a poder pedir guantes, vendas, protecciones e indumentaria exclusiva con atención y asesoramiento directo por WhatsApp.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white text-base font-bold tracking-wide transition-all duration-200 shadow-xl shadow-combat-red/30 hover:shadow-combat-red/50 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-light hover:bg-surface-border text-white text-base font-semibold border border-surface-border transition-colors"
              >
                <span>Ver Horarios de Clases</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Categorías en <span className="text-gradient-red">Preparación</span>
              </h2>
              <p className="text-sm text-combat-slate-400 mt-1">
                Esto es parte del equipamiento que vas a encontrar disponible en el gimnasio y catálogo online
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewCategories.map((category) => {
              const IconComp = category.icon;
              return (
                <div
                  key={category.title}
                  className="rounded-2xl bg-surface-card border border-surface-border/80 p-6 flex flex-col justify-between hover:border-combat-red/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-black/20"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center text-combat-red group-hover:bg-combat-red group-hover:text-white transition-colors shadow-sm">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-surface-light text-amber-400 border border-amber-500/20">
                        {category.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wide mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs text-combat-slate-400 mb-4">
                      {category.tagline}
                    </p>

                    <ul className="space-y-2 border-t border-surface-border/50 pt-4">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-combat-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-combat-red shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-surface-border/50">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-light hover:bg-combat-red/20 text-combat-slate-300 hover:text-white text-xs font-semibold border border-surface-border transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-combat-red" />
                      <span>Consultar disponibilidad</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informative Callout Card */}
        <div className="rounded-2xl bg-surface-light/60 border border-surface-border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-combat-red/20 border border-combat-red/40 flex items-center justify-center shrink-0 text-combat-red">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                Asesoramiento Técnico Personalizado
              </h4>
              <p className="text-sm text-combat-slate-400 mt-1 max-w-xl">
                ¿No estás seguro de qué onzas de guantes o qué talle de tibiales necesitás para tu nivel y disciplina? Nuestros profesores y staff te asesoran en el gimnasio o por WhatsApp.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-card hover:bg-surface-light border border-surface-border text-white text-sm font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Hablar con un Asesor</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer settings={settings} disciplines={disciplines} />
    </main>
  );
}
