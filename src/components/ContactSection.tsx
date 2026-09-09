'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, Instagram, MapPin, HelpCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { GymSettings } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/mock-data';

interface ContactSectionProps {
  settings: GymSettings;
}

const FAQS = [
  {
    question: '¿Necesito experiencia o preparación física previa para empezar?',
    answer:
      '¡Para nada! Todas nuestras disciplinas cuentan con grupos de iniciación y nivel recreativo. Los profesores adaptan la intensidad a tu ritmo para que aprendas técnica desde cero de manera segura y divertida.',
  },
  {
    question: '¿Qué indumentaria debo llevar a mi primera clase de prueba?',
    answer:
      'Para tu primera clase solo necesitas ropa deportiva cómoda (remera, short o calza) y una botella de agua. Nosotros te prestamos los guantes y elementos de protección básicos para la clase de prueba.',
  },
  {
    question: '¿Las clases son mixtas o hay horarios exclusivos?',
    answer:
      'La mayoría de las clases son mixtas y con un clima de mucho respeto y compañerismo. También disponemos de turnos infantiles especiales para niños de 6 a 12 años.',
  },
  {
    question: '¿El gimnasio cuenta con vestuarios?',
    answer:
      'Sí, disponemos de amplios vestuarios masculinos y femeninos totalmente equipados.',
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const whatsAppUrl = getWhatsAppUrl();

  return (
    <section id="contacto" className="py-20 relative bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-red/10 border border-combat-red/20 text-combat-red text-xs font-bold uppercase tracking-widest mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Atención Inmediata</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Comunícate con <span className="text-gradient-red">Nosotros</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-combat-slate-300">
            ¿Tienes dudas sobre aranceles, horarios o modalidades? Escríbenos directamente o consulta las preguntas frecuentes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Quick Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-surface-card border border-emerald-500/30 hover:border-emerald-500 transition-all duration-300 flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Respuesta Rápida
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    WhatsApp Oficial
                  </div>
                  <div className="text-xs text-combat-slate-400">
                    {settings.phone}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                Escribir
              </span>
            </a>

            {/* Instagram Card */}
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-pink-500/50 transition-all duration-300 flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                    Redes Sociales
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    @inferno_combat
                  </div>
                  <div className="text-xs text-combat-slate-400">
                    Fotos, videos y novedades diarias
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-3 py-1.5 rounded-lg border border-pink-500/30">
                Seguir
              </span>
            </a>

            {/* Direct Call Card */}
            <a
              href={`tel:${settings.whatsapp_number}`}
              className="p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-combat-red/50 transition-all duration-300 flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-combat-red/15 text-combat-red flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-combat-slate-400 uppercase tracking-wider">
                    Llamada Telefónica
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    Recepción y Secretaría
                  </div>
                  <div className="text-xs text-combat-slate-400">
                    {settings.phone}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-combat-red bg-combat-red/10 px-3 py-1.5 rounded-lg border border-combat-red/30">
                Llamar
              </span>
            </a>
          </div>

          {/* FAQs Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-bold text-combat-gold uppercase tracking-wider mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas Frecuentes</span>
            </div>

            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base text-white hover:text-combat-red transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-combat-red shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-combat-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-combat-slate-300 leading-relaxed border-t border-surface-border/50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
