'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ImageUploadInputProps {
  name: string;
  defaultValue?: string;
  label: string;
  folder?: 'teachers' | 'disciplines' | 'gallery' | 'settings' | 'general';
  required?: boolean;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'banner';
  helperText?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  name,
  defaultValue = '',
  label,
  folder = 'general',
  required = false,
  aspectRatio = 'landscape',
  helperText,
}) => {
  const [url, setUrl] = useState<string>(defaultValue);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl(defaultValue);
  }, [defaultValue]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('El archivo es demasiado grande. El tamaño máximo permitido es 8MB.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .toLowerCase();
      const fileName = `${folder}/${Date.now()}-${cleanName}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('gym-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        throw new Error(
          error.message === 'Bucket not found'
            ? "El bucket 'gym-media' no existe en Supabase Storage. Créalo desde el panel de Supabase en Storage > New Bucket con acceso público."
            : `Error al subir imagen: ${error.message}`
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from('gym-media')
        .getPublicUrl(fileName);

      const finalUrl = publicUrlData.publicUrl;
      setUrl(finalUrl);
      setUploadSuccess(true);
    } catch (err: any) {
      setUploadError(err.message || 'Error al procesar y subir el archivo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setUploadError(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const aspectClasses = {
    portrait: 'aspect-[3/4] max-w-[180px]',
    landscape: 'aspect-[16/9] max-w-sm',
    square: 'aspect-square max-w-[200px]',
    banner: 'aspect-[21/9] w-full',
  }[aspectRatio];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-combat-slate-300">
          {label} {required && <span className="text-combat-red">*</span>}
        </label>
        <div className="flex items-center gap-1 bg-surface rounded-lg p-0.5 border border-surface-border">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              mode === 'upload'
                ? 'bg-combat-red text-white shadow-sm'
                : 'text-combat-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Subir Archivo</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              mode === 'url'
                ? 'bg-combat-red text-white shadow-sm'
                : 'text-combat-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Pegar URL</span>
          </button>
        </div>
      </div>

      {/* Hidden input to submit with the form */}
      <input type="hidden" name={name} value={url} required={required} />

      {/* Mode: Upload File Dropzone */}
      {mode === 'upload' && (
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              isUploading
                ? 'border-combat-gold/60 bg-combat-gold/5 opacity-80'
                : 'border-surface-border hover:border-combat-red/60 bg-surface-light/40 hover:bg-surface-light/80'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
              onChange={handleFileUpload}
              className="hidden"
            />

            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="w-8 h-8 text-combat-gold animate-spin" />
                <span className="text-xs font-bold text-combat-gold">Subiendo a Supabase Storage...</span>
                <span className="text-[11px] text-combat-slate-400">Por favor espera un momento</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-2">
                <div className="w-10 h-10 rounded-xl bg-combat-red/10 border border-combat-red/30 flex items-center justify-center text-combat-red">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">
                    Haz clic para seleccionar o arrastra una imagen aquí
                  </p>
                  <p className="text-[11px] text-combat-slate-400">
                    PNG, JPG, WEBP o SVG (Máximo 8MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode: Manual URL Input */}
      {mode === 'url' && (
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setUploadError(null);
            }}
            placeholder="/images/profesores/foto.jpg o https://..."
            className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-white text-sm focus:outline-none focus:border-combat-red"
          />
        </div>
      )}

      {/* Upload Error Alert */}
      {uploadError && (
        <div className="p-3 rounded-xl bg-combat-red/10 border border-combat-red/30 flex items-start gap-2.5 text-combat-red text-xs animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{uploadError}</span>
        </div>
      )}

      {/* Upload Success Alert */}
      {uploadSuccess && (
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>¡Imagen subida y lista para guardar!</span>
        </div>
      )}

      {/* Image Preview Card */}
      {url && (
        <div className="p-3 rounded-xl bg-surface border border-surface-border flex items-center gap-4 animate-in fade-in">
          <div className={`relative ${aspectClasses} rounded-lg overflow-hidden bg-surface-light border border-surface-border shrink-0`}>
            <Image
              src={url}
              alt="Vista previa"
              fill
              className="object-cover"
              sizes="200px"
              unoptimized={url.startsWith('data:') || url.startsWith('blob:')}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-xs font-bold text-white flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-combat-gold" />
              <span>Imagen cargada</span>
            </p>
            <p className="text-[11px] text-combat-slate-400 truncate font-mono">
              {url}
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-combat-red hover:underline"
              >
                <X className="w-3 h-3" />
                <span>Quitar imagen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {helperText && !url && (
        <p className="text-[11px] text-combat-slate-400 italic">
          💡 {helperText}
        </p>
      )}
    </div>
  );
};
