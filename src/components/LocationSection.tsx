'use client';

import React from 'react';
import { MapPin, Navigation, Clock, Phone, Bus, Train, ShieldCheck } from 'lucide-react';
import { GymSettings } from '@/lib/types';

interface LocationSectionProps {
  settings: GymSettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ settings }) => {
  return (
    <section id="ubicacion" className="py-20 relative bg-background border-t border-surface-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-red/10 border border-combat-red/20 text-combat-red text-xs font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sede Principal</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Dónde <span className="text-gradient-red">Encontrarnos</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-combat-slate-300">
            Ubicación estratégica y de fácil acceso en Buenos Aires, con múltiples opciones de transporte público.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card */}
          <div className="lg:col-span-5 rounded-3xl bg-surface-card border border-surface-border p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-combat-red/15 border border-combat-red/30 flex items-center justify-center text-combat-red shrink-0 mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-combat-slate-400 uppercase tracking-wider">
                    Dirección
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {settings.address}
                  </h3>
                  <p className="text-sm text-combat-slate-300">
                    {settings.city}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-combat-gold/15 border border-combat-gold/30 flex items-center justify-center text-combat-gold shrink-0 mt-1">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-combat-slate-400 uppercase tracking-wider">
                    Horarios de Atención y Clases
                  </div>
                  <p className="text-sm font-semibold text-white mt-1">
                    Lunes a Viernes: 08:00 a 22:30 hs
                  </p>
                  <p className="text-sm font-semibold text-combat-slate-300">
                    Sábados: 10:00 a 16:00 hs
                  </p>
                  <p className="text-xs text-combat-slate-400 mt-1">
                    Domingos: Cerrado
                  </p>
                </div>
              </div>

              {/* Transport tips */}
              <div className="p-4 rounded-xl bg-surface-light border border-surface-border/70 space-y-2.5">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Train className="w-4 h-4 text-combat-red" />
                  <span>Cómo llegar:</span>
                </div>
                <p className="text-xs text-combat-slate-300 leading-relaxed">
                  🚌 <strong>Colectivos:</strong> Líneas 530,531, 532, 533, 534, 645, 120, 234, 235
                </p>
              </div>
            </div>

            {/* How to get there CTA */}
            <div className="pt-2">
              <a
                href={settings.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-combat-red hover:bg-combat-red-hover text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-combat-red/20 hover:shadow-combat-red/35"
              >
                <Navigation className="w-5 h-5" />
                <span>Abrir en Google Maps / Cómo llegar</span>
              </a>
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-surface-border bg-surface-light min-h-[380px] shadow-xl relative">
            <iframe
              src={settings.google_maps_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de APEX Combat Club"
              className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
