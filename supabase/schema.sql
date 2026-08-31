-- ====================================================================
-- ESQUEMA DE BASE DE DATOS PARA GIMNASIO DE DEPORTES DE COMBATE (SUPABASE)
-- ====================================================================

-- Habilitar extensión para UUIDs
create extension if not exists "pgcrypto";

-- 1. TABLA DE CONTROL DE ADMINISTRADORES (Seguridad RLS)
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);

alter table public.admin_users enable row level security;

create policy "Users can read own admin status" on public.admin_users
  for select to authenticated
  using (user_id = auth.uid());

-- 2. TABLA CONFIGURACIÓN DEL GIMNASIO (Singleton)
create table if not exists public.gym_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slogan text not null,
  short_description text not null,
  about_text text not null,
  address text not null,
  city text not null,
  phone text not null,
  whatsapp_number text not null,
  whatsapp_message text not null,
  instagram_url text not null,
  facebook_url text,
  google_maps_embed_url text not null,
  google_maps_link text not null,
  logo_url text not null default '/images/logo.png',
  hero_bg_url text not null,
  seo_title text not null,
  seo_description text not null,
  updated_at timestamp with time zone default now()
);

alter table public.gym_settings enable row level security;

create policy "Public Read Settings" on public.gym_settings
  for select using (true);

create policy "Admin Full Access Settings" on public.gym_settings
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- 3. TABLA PROFESORES / INSTRUCTORES
create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  nickname text,
  bio text not null,
  experience_years text not null,
  photo_url text not null,
  is_world_champion boolean not null default false,
  champion_title_details text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamp with time zone default now()
);

alter table public.teachers enable row level security;

create policy "Public Read Active Teachers" on public.teachers
  for select using (is_active = true);

create policy "Admin Full Access Teachers" on public.teachers
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- 4. TABLA DISCIPLINAS
create table if not exists public.disciplines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text not null,
  full_description text not null,
  target_audience text not null,
  level_info text not null,
  image_url text not null,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamp with time zone default now()
);

alter table public.disciplines enable row level security;

create policy "Public Read Active Disciplines" on public.disciplines
  for select using (is_active = true);

create policy "Admin Full Access Disciplines" on public.disciplines
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- 5. TABLA INTERMEDIA PROFESORES - DISCIPLINAS
create table if not exists public.teacher_disciplines (
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  discipline_id uuid not null references public.disciplines(id) on delete cascade,
  primary key (teacher_id, discipline_id)
);

alter table public.teacher_disciplines enable row level security;

create policy "Public Read Teacher Disciplines" on public.teacher_disciplines
  for select using (true);

create policy "Admin Full Access Teacher Disciplines" on public.teacher_disciplines
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- 6. TABLA GRUPOS / NIVELES
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  age_range text not null,
  level text not null,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamp with time zone default now()
);

alter table public.groups enable row level security;

create policy "Public Read Active Groups" on public.groups
  for select using (is_active = true);

create policy "Admin Full Access Groups" on public.groups
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- 7. TABLA HORARIOS
create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null check (day_of_week between 1 and 7),
  start_time text not null, -- Formato "HH:MM"
  end_time text not null,   -- Formato "HH:MM"
  discipline_id uuid not null references public.disciplines(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  notes text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamp with time zone default now()
);

alter table public.schedules enable row level security;

create policy "Public Read Active Schedules" on public.schedules
  for select using (is_active = true);

create policy "Admin Full Access Schedules" on public.schedules
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- 8. TABLA GALERÍA
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text not null,
  caption text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamp with time zone default now()
);

alter table public.gallery enable row level security;

create policy "Public Read Active Gallery" on public.gallery
  for select using (is_active = true);

create policy "Admin Full Access Gallery" on public.gallery
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- 9. STORAGE BUCKET PARA FOTOS
insert into storage.buckets (id, name, public)
values ('gym-media', 'gym-media', true)
on conflict (id) do nothing;

create policy "Public Read Storage Gym Media" on storage.objects
  for select using (bucket_id = 'gym-media');

create policy "Admin Full Access Storage Gym Media" on storage.objects
  for all to authenticated
  using (
    bucket_id = 'gym-media'
    and exists (select 1 from public.admin_users where user_id = auth.uid())
  )
  with check (
    bucket_id = 'gym-media'
    and exists (select 1 from public.admin_users where user_id = auth.uid())
  );
