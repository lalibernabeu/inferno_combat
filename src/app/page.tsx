import {
  getGymSettings,
  getDisciplines,
  getTeachers,
  getChampionTeacher,
  getGroups,
  getSchedulesWithDetails,
  getGallery,
} from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { DisciplinesSection } from '@/components/DisciplinesSection';
import { ChampionBanner } from '@/components/ChampionBanner';
import { TeachersSection } from '@/components/TeachersSection';
import { GroupsSection } from '@/components/GroupsSection';
import { ScheduleSection } from '@/components/ScheduleSection';
import { GallerySection } from '@/components/GallerySection';
import { LocationSection } from '@/components/LocationSection';
import { ContactSection } from '@/components/ContactSection';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { Footer } from '@/components/Footer';

export const revalidate = 60; // Revalidación ISR cada 60 segundos o bajo demanda vía Server Actions

export default async function Home() {
  const [
    settings,
    disciplines,
    teachers,
    champion,
    groups,
    schedules,
    gallery,
  ] = await Promise.all([
    getGymSettings(),
    getDisciplines(),
    getTeachers(),
    getChampionTeacher(),
    getGroups(),
    getSchedulesWithDetails(),
    getGallery(),
  ]);

  return (
    <main className="min-h-screen bg-background text-combat-slate-100 relative">
      {/* Navigation Header */}
      <Navbar settings={settings} />

      {/* Hero Section */}
      <Hero settings={settings} />

      {/* Disciplines Section */}
      <DisciplinesSection disciplines={disciplines} />

      {/* World Champion Spotlight Section */}
      <ChampionBanner champion={champion} />

      {/* Interactive Schedule Grid (Mobile-First) */}
      <ScheduleSection schedules={schedules} disciplines={disciplines} />

      {/* About & Philosophy Section */}
      <AboutSection settings={settings} />

      {/* Coaches & Instructors Section */}
      <TeachersSection teachers={teachers} />

      {/* Groups & Age Levels Section */}
      <GroupsSection groups={groups} />

      {/* Photo Gallery with Modal Lightbox */}
      <GallerySection gallery={gallery} />

      {/* Location & Interactive Google Maps */}
      <LocationSection settings={settings} />

      {/* Quick Contact & FAQs */}
      <ContactSection settings={settings} />

      {/* Footer */}
      <Footer settings={settings} disciplines={disciplines} />

      {/* Fixed Bottom Action Bar for Mobile Devices */}
      <MobileStickyBar settings={settings} />
    </main>
  );
}
