-- ==============================================================================
-- GDG ON CAMPUS – RIT HASSAN
-- Complete Supabase PostgreSQL Database Schema with Row Level Security (RLS)
-- ==============================================================================

-- 1. Enable Required Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 2. Profiles Table (Extends Supabase auth.users)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  usn text,
  department text,
  semester text,
  role text not null default 'student' check (role in ('student', 'admin', 'coordinator')),
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================================================================
-- 3. Security Helper Functions
-- ==============================================================================
-- Check if requesting user has admin privileges
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'coordinator')
  );
$$;

-- Automatically create profile on new user registration in auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger for auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ==============================================================================
-- 4. Events Table
-- ==============================================================================
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text,
  category text not null,
  description text not null,
  date text not null,
  time text not null,
  venue text not null,
  mode text default 'In-Person',
  capacity text default '100 Attendees',
  color text default '#4285F4',
  badge text default 'Upcoming Event',
  prerequisites text,
  is_published boolean default true,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================================================================
-- 5. Workshops Table
-- ==============================================================================
create table if not exists public.workshops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  track text not null,
  level text not null default 'Beginner',
  duration text not null,
  date_range text not null,
  instructor_role text not null,
  summary text not null,
  syllabus jsonb default '[]'::jsonb,
  prerequisites text,
  color text default '#4285F4',
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================================================================
-- 6. Registrations Table (Events, Workshops, & Memberships)
-- ==============================================================================
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_id uuid references public.events(id) on delete set null,
  workshop_id uuid references public.workshops(id) on delete set null,
  type text not null default 'event' check (type in ('event', 'workshop', 'membership')),
  full_name text not null,
  email text not null,
  usn text not null,
  department text not null,
  semester text not null,
  interests text[] default array[]::text[],
  notes text,
  ticket_id text unique not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'pending', 'cancelled')),
  created_at timestamptz default now()
);

-- ==============================================================================
-- 7. Projects Table (Student Showcase & Submissions)
-- ==============================================================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  student_name text not null,
  usn text not null,
  department text not null,
  category text not null default 'Web Development',
  tech_stack text[] default array[]::text[],
  github_url text,
  demo_url text,
  image_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  feedback text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================================================================
-- 8. Announcements Table (Home Notification Bar)
-- ==============================================================================
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  badge text default 'Notice',
  link_url text,
  is_active boolean default true,
  priority integer default 0,
  created_at timestamptz default now()
);

-- ==============================================================================
-- 9. Team Members Table
-- ==============================================================================
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  category text not null check (category in ('Faculty Coordinators', 'Club Coordinators', 'Core Team', 'Volunteers')),
  department text not null,
  designation text,
  bio text,
  avatar_url text,
  avatar_placeholder text default 'GL',
  social_github text,
  social_linkedin text,
  is_placeholder boolean default false,
  order_index integer default 0,
  created_at timestamptz default now()
);

-- ==============================================================================
-- 10. Attendance Table (QR Check-in & Event Logs)
-- ==============================================================================
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  registration_id uuid references public.registrations(id) on delete set null,
  ticket_id text not null,
  usn text not null,
  attendee_name text not null,
  check_in_method text default 'qr' check (check_in_method in ('qr', 'manual')),
  checked_in_at timestamptz default now(),
  verified_by text,
  unique (event_id, ticket_id)
);

-- ==============================================================================
-- 11. Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.workshops enable row level security;
alter table public.registrations enable row level security;
alter table public.projects enable row level security;
alter table public.announcements enable row level security;
alter table public.team_members enable row level security;
alter table public.attendance enable row level security;

-- PROFILES Policies
create policy "Allow public to read basic profiles" on public.profiles
  for select using (true);

create policy "Allow users to update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Allow admins to update any profile" on public.profiles
  for update using (public.is_admin());

-- EVENTS Policies
create policy "Allow public to view published events" on public.events
  for select using (is_published = true or public.is_admin());

create policy "Allow admins full access to events" on public.events
  for all using (public.is_admin());

-- WORKSHOPS Policies
create policy "Allow public to view published workshops" on public.workshops
  for select using (is_published = true or public.is_admin());

create policy "Allow admins full access to workshops" on public.workshops
  for all using (public.is_admin());

-- REGISTRATIONS Policies
create policy "Allow anyone to submit registration" on public.registrations
  for insert with check (true);

create policy "Allow users to view their own registrations" on public.registrations
  for select using (auth.uid() = user_id or public.is_admin());

create policy "Allow admins full management of registrations" on public.registrations
  for all using (public.is_admin());

-- PROJECTS Policies
create policy "Allow public to view approved projects" on public.projects
  for select using (status = 'approved' or public.is_admin());

create policy "Allow anyone to submit projects for review" on public.projects
  for insert with check (true);

create policy "Allow admins full management of projects" on public.projects
  for all using (public.is_admin());

-- ANNOUNCEMENTS Policies
create policy "Allow public to view active announcements" on public.announcements
  for select using (is_active = true or public.is_admin());

create policy "Allow admins full management of announcements" on public.announcements
  for all using (public.is_admin());

-- TEAM_MEMBERS Policies
create policy "Allow public to view team members" on public.team_members
  for select using (true);

create policy "Allow admins full management of team members" on public.team_members
  for all using (public.is_admin());

-- ATTENDANCE Policies
create policy "Allow admins full access to attendance" on public.attendance
  for all using (public.is_admin());

-- ==============================================================================
-- 12. Storage Buckets (Execute via Supabase Dashboard / SQL)
-- ==============================================================================
insert into storage.buckets (id, name, public)
values 
  ('gallery', 'gallery', true),
  ('projects', 'projects', true),
  ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage RLS Policies
create policy "Public Access to Gallery Bucket" on storage.objects
  for select using (bucket_id in ('gallery', 'projects', 'avatars'));

create policy "Admins can upload to Storage" on storage.objects
  for insert with check (
    bucket_id in ('gallery', 'projects', 'avatars')
    and (public.is_admin() or bucket_id = 'projects')
  );

create policy "Admins can delete from Storage" on storage.objects
  for delete using (
    bucket_id in ('gallery', 'projects', 'avatars')
    and public.is_admin()
  );
