'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle } from 'lucide-react';
import { BullLogo } from './BullLogo';
import { GymSettings } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/utils';

interface NavbarProps {
  settings: GymSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Disciplinas', href: '/#disciplinas' },
    { label: 'Campeón', href: '/#campeon' },
    { label: 'Horarios', href: '/#horarios' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Profesores', href: '/#profesores' },
    { label: 'Ubicación', href: '/#ubicacion' },
    { label: 'Contacto', href: '/#contacto' },
  ];

  const whatsAppUrl = getWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsapp_message
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-surface-border py-3 shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-combat-red flex items-center justify-center shadow-lg shadow-combat-red/30 group-hover:scale-105 transition-transform">
              <BullLogo className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-wider text-white uppercase group-hover:text-combat-red transition-colors">
                {settings.name}
              </span>
              <span className="text-[10px] text-combat-slate-400 uppercase tracking-widest -mt-1 font-semibold">
                Combat & Martial Arts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors relative py-1 text-combat-slate-300 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-combat-red hover:after:w-full after:transition-all after:duration-300"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-combat-red hover:bg-combat-red-hover text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-md shadow-combat-red/20 hover:shadow-combat-red/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Clase de Prueba</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-combat-slate-300 hover:text-white hover:bg-surface-light transition-colors"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-surface/98 backdrop-blur-xl border-b border-surface-border px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-medium text-combat-slate-200 hover:text-white hover:bg-surface-hover transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-combat-red hover:bg-combat-red-hover text-white font-bold text-base transition-colors shadow-lg shadow-combat-red/30"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Reservar Clase Gratis vía WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
