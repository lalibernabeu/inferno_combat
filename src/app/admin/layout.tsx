'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Swords,
  Users2,
  CalendarDays,
  Layers,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { BullLogo } from '@/components/BullLogo';
import { logout } from '@/lib/actions/auth-actions';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Configuración', href: '/admin/settings', icon: Settings },
  { name: 'Disciplinas', href: '/admin/disciplines', icon: Swords },
  { name: 'Profesores', href: '/admin/teachers', icon: Users2 },
  { name: 'Horarios', href: '/admin/schedules', icon: CalendarDays },
  { name: 'Grupos y Edades', href: '/admin/groups', icon: Layers },
  { name: 'Galería', href: '/admin/gallery', icon: ImageIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If we are on /admin/login, don't show the dashboard layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-combat-slate-100 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-card border-r border-surface-border flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5">
          {/* Brand */}
          <div className="flex items-center justify-between pb-6 border-b border-surface-border/60">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-combat-red flex items-center justify-center shadow-md shadow-combat-red/30">
                <BullLogo className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-black text-base text-white uppercase tracking-wider block">
                  APEX Admin
                </span>
                <span className="text-[10px] text-combat-slate-400 font-semibold uppercase tracking-widest block">
                  Panel de Control
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-combat-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-combat-red text-white shadow-md shadow-combat-red/20'
                      : 'text-combat-slate-300 hover:text-white hover:bg-surface-light'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-surface-border/60 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-combat-slate-300 hover:text-white hover:bg-surface-light transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-combat-gold" />
            <span>Ver Sitio Web</span>
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-combat-red hover:bg-combat-red/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-surface/80 backdrop-blur-md border-b border-surface-border py-4 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-combat-slate-300 hover:text-white hover:bg-surface-light"
              aria-label="Abrir barra lateral"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-display font-bold text-lg text-white capitalize">
              {navigation.find(
                (item) =>
                  item.href === pathname ||
                  (item.href !== '/admin' && pathname.startsWith(item.href))
              )?.name || 'Panel de Administración'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-light border border-surface-border text-xs font-semibold text-combat-slate-200 hover:text-white hover:border-combat-gold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-combat-gold" />
              <span>Ver Web</span>
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-background">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
