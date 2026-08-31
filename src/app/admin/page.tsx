import React from 'react';
import Link from 'next/link';
import {
  Swords,
  Users2,
  CalendarDays,
  Image as ImageIcon,
  Layers,
  Settings,
  ArrowRight,
  Trophy,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  getGymSettings,
  getDisciplines,
  getTeachers,
  getSchedulesWithDetails,
  getGroups,
  getGallery,
} from '@/lib/data';

export default async function AdminDashboardPage() {
  const [settings, disciplines, teachers, schedules, groups, gallery] =
    await Promise.all([
      getGymSettings(),
      getDisciplines(true),
      getTeachers(true),
      getSchedulesWithDetails(undefined, true),
      getGroups(true),
      getGallery(true),
    ]);

  const champion = teachers.find((t) => t.is_world_champion);

  const stats = [
    {
      title: 'Disciplinas',
      count: disciplines.length,
      active: disciplines.filter((d) => d.is_active).length,
      icon: Swords,
      href: '/admin/disciplines',
      color: 'text-combat-red',
      bg: 'bg-combat-red/10',
    },
    {
      title: 'Instructores',
      count: teachers.length,
      active: teachers.filter((t) => t.is_active).length,
      icon: Users2,
      href: '/admin/teachers',
      color: 'text-combat-gold',
      bg: 'bg-combat-gold/10',
    },
    {
      title: 'Clases Semanales',
      count: schedules.length,
      active: schedules.filter((s) => s.is_active).length,
      icon: CalendarDays,
      href: '/admin/schedules',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Grupos & Niveles',
      count: groups.length,
      active: groups.filter((g) => g.is_active).length,
      icon: Layers,
      href: '/admin/groups',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Fotos en Galería',
      count: gallery.length,
      active: gallery.filter((g) => g.is_active).length,
      icon: ImageIcon,
      href: '/admin/gallery',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-surface-card via-surface to-surface-card border border-surface-border relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-combat-red/15 text-combat-red text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Sistema de Gestión en Vivo</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Bienvenido al Panel de {settings.name}
          </h2>
          <p className="text-sm text-combat-slate-300 max-w-2xl">
            Desde este centro de control puedes actualizar horarios semanales, profesores, disciplinas, fotos y datos de contacto de manera instantánea.
          </p>
        </div>
      </div>

      {/* World Champion Quick Status */}
      {champion && (
        <div className="p-5 rounded-2xl bg-combat-gold/10 border border-combat-gold/30 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-combat-gold/20 flex items-center justify-center text-combat-gold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-combat-gold uppercase tracking-wider">
                Campeón Mundial Destacado
              </div>
              <div className="text-sm font-bold text-white">
                {champion.name} {champion.nickname && `("${champion.nickname}")`}
              </div>
            </div>
          </div>
          <Link
            href="/admin/teachers"
            className="text-xs font-bold text-combat-gold hover:underline inline-flex items-center gap-1"
          >
            <span>Editar perfil del campeón</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-combat-red/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-combat-slate-400 uppercase tracking-wider">
                  {item.title}
                </span>
                <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4">
                <div className="font-display font-black text-3xl text-white">
                  {item.count}
                </div>
                <div className="text-xs text-combat-slate-400 mt-1">
                  <span className="text-emerald-400 font-semibold">{item.active} activas</span> en la web pública
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold text-combat-slate-300 group-hover:text-white">
                <span>Administrar</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}

        {/* Settings Shortcut Card */}
        <Link
          href="/admin/settings"
          className="p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-combat-gold/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-combat-slate-400 uppercase tracking-wider">
              Gimnasio & Contacto
            </span>
            <div className="w-10 h-10 rounded-xl bg-combat-gold/10 text-combat-gold flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <div className="font-display font-bold text-lg text-white">
              WhatsApp & Redes
            </div>
            <div className="text-xs text-combat-slate-400 mt-1">
              {settings.address}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold text-combat-slate-300 group-hover:text-white">
            <span>Editar información general</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
