'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { BullLogo } from './BullLogo';
import { GymSettings, Discipline } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/mock-data';

interface FooterProps {
  settings: GymSettings;
  disciplines: Discipline[];
}

export const Footer: React.FC<FooterProps> = ({ settings, disciplines }) => {
  const whatsAppUrl = getWhatsAppUrl();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-card border-t border-surface-border pt-16 pb-24 sm:pb-12 text-combat-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-surface-border/60">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-combat-red flex items-center justify-center shadow-lg shadow-combat-red/30 group-hover:scale-105 transition-transform">
                <BullLogo className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white uppercase">
                {settings.name}
              </span>
            </Link>

            <p className="text-sm text-combat-slate-400 leading-relaxed max-w-sm">
              {settings.short_description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center text-combat-slate-300 hover:text-white hover:border-pink-500 hover:bg-pink-500/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center text-combat-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center text-combat-slate-300 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Navegación
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#disciplinas" className="hover:text-white transition-colors">
                  Disciplinas
                </Link>
              </li>
              <li>
                <Link href="/#campeon" className="hover:text-white transition-colors">
                  Campeón Mundial
                </Link>
              </li>
              <li>
                <Link href="/#horarios" className="hover:text-white transition-colors">
                  Horarios
                </Link>
              </li>
              <li>
                <Link href="/#nosotros" className="hover:text-white transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/#profesores" className="hover:text-white transition-colors">
                  Profesores
                </Link>
              </li>
              <li>
                <Link href="/#ubicacion" className="hover:text-white transition-colors">
                  Ubicación & Mapa
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1.5">
                  <span>Tienda Oficial</span>
                  <span className="text-[9px] bg-amber-500/20 border border-amber-500/30 px-1 py-0.2 rounded font-bold uppercase">
                    Pronto
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Disciplines Column */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Disciplinas
            </div>
            <ul className="space-y-2.5 text-sm">
              {disciplines.map((disc) => (
                <li key={disc.id}>
                  <Link href="/#disciplinas" className="hover:text-white transition-colors">
                    {disc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact Summary */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Contacto Directo
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-combat-red shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-combat-gold shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp: {settings.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-combat-slate-500">
            © {new Date().getFullYear()} {settings.name}. Todos los derechos reservados. Pagina creada por Lali Bernabeu
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-combat-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-surface-light"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-4 h-4 text-combat-red" />
          </button>
        </div>
      </div>
    </footer>
  );
};
