'use client';

import React from 'react';
import { MessageCircle, MapPin, Calendar } from 'lucide-react';
import { GymSettings } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/mock-data';

interface MobileStickyBarProps {
  settings: GymSettings;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ settings }) => {
  const whatsAppUrl = getWhatsAppUrl();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-surface/95 backdrop-blur-lg border-t border-surface-border p-3 px-4 shadow-[0_-10px_25px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3">
        {/* Quick Location / Map Link */}
        <a
          href={settings.google_maps_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-surface-light border border-surface-border text-white text-xs font-bold transition-colors active:scale-95"
        >
          <MapPin className="w-4 h-4 text-combat-red" />
          <span>Cómo Llegar</span>
        </a>

        {/* Quick WhatsApp CTA Button */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-combat-red text-white text-xs font-extrabold tracking-wide transition-all shadow-md shadow-combat-red/30 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Clase de Prueba</span>
        </a>
      </div>
    </div>
  );
};
