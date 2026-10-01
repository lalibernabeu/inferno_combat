'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % gallery.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <section id="galeria" className="py-20 relative bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-combat-red/10 border border-combat-red/20 text-combat-red text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Instalaciones y Entrenamientos</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Galería del <span className="text-gradient-red">Club</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-combat-slate-300">
            Conoce nuestro espacio, el equipamiento de primer nivel y la energía de cada sesión de entrenamiento.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-surface-light border border-surface-border hover:border-combat-red/60 transition-all duration-300 shadow-lg"
            >
              <Image
                src={item.image_url}
                alt={item.alt_text}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between text-white">
                  <p className="text-xs font-medium line-clamp-2 pr-2">
                    {item.caption || item.alt_text}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-combat-red flex items-center justify-center shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-surface-light/80 text-white hover:bg-combat-red transition-colors z-50"
            aria-label="Cerrar visor"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={showPrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-surface-light/80 text-white hover:bg-combat-red transition-colors z-50"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={showNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-surface-light/80 text-white hover:bg-combat-red transition-colors z-50"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden">
              <Image
                src={gallery[activeImageIndex].image_url}
                alt={gallery[activeImageIndex].alt_text}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {gallery[activeImageIndex].caption && (
              <p className="mt-4 text-center text-sm sm:text-base text-combat-slate-200 font-medium px-4">
                {gallery[activeImageIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
