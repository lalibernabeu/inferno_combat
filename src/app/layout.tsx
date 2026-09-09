import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import '../styles/globals.css';
import { getGymSettings } from '@/lib/data';

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGymSettings();
  const title = settings.seo_title || `${settings.name || 'INFERNO COMBAT'} | Kickboxing, Boxeo, K1 y Muay Thai`;
  const description = settings.seo_description || 'Centro de entrenamiento de deportes de combate y artes marciales en Mendoza.';

  return {
    title,
    description,
    keywords: [
      settings.name || 'INFERNO COMBAT',
      'Inferno Combat',
      'Kickboxing',
      'Boxeo',
      'K1',
      'K-1',
      'Muay Thai',
      'Gimnasio de Combate',
      'Artes Marciales',
      'Defensa Personal',
      'Mendoza',
    ],
    authors: [{ name: settings.name || 'INFERNO COMBAT' }],
    openGraph: {
      title,
      description,
      siteName: settings.name || 'INFERNO COMBAT',
      locale: 'es_AR',
      type: 'website',
    },
  };
}

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
