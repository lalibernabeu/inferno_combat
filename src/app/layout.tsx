import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import '../styles/globals.css';
import { getGymSettings } from '@/lib/mock-data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const settings = getGymSettings();

export const metadata: Metadata = {
  title: settings.seo_title,
  description: settings.seo_description,
  keywords: [
    'Kickboxing',
    'Boxeo',
    'BJJ',
    'Brazilian Jiu Jitsu',
    'Muay Thai',
    'MMA',
    'Gimnasio de Combate',
    'Artes Marciales',
    'Defensa Personal',
    'Buenos Aires',
  ],
  authors: [{ name: settings.name }],
  openGraph: {
    title: settings.seo_title,
    description: settings.seo_description,
    siteName: settings.name,
    locale: 'es_AR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#090D16',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-background text-combat-slate-100 antialiased min-h-screen selection:bg-combat-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
