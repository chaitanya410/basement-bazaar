-- The Basements Social Forum — CMS schema
--
-- Run against the Supabase project with:
--   supabase db push
-- or paste into the Supabase SQL editor.
--
-- SECURITY MODEL
-- Every table has Row Level Security enabled. The anon key ships in the
-- browser bundle and is public by design, so RLS is the only real boundary.
-- Hiding admin UI is presentation, never protection.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

-- Touch updated_at on every update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles — admin identities, mirrors auth.users
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  role       text not null default 'viewer' check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now()
);

-- SECURITY DEFINER so policies can read profiles without recursing into
-- the profiles policies themselves. A plain subquery here would deadlock
-- the policy evaluation.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Create a profile automatically whenever an auth user is created.
-- First user to sign up becomes admin; everyone after is a viewer until
-- an admin promotes them.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  is_first boolean;
begin
  select count(*) = 0 into is_first from public.profiles;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    case when is_first then 'admin' else 'viewer' end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- events — past and upcoming
-- ---------------------------------------------------------------------------

create table if not exists public.events (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  description      text,
  status           text not null default 'past'
                     check (status in ('past', 'upcoming')),
  starts_on        date,
  ends_on          date,
  location         text,
  image_path       text,
  registration_url text,
  display_order    int not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists events_status_idx on public.events (status, display_order);

-- ---------------------------------------------------------------------------
-- team_members — core team, per year (leadership rotates annually)
-- ---------------------------------------------------------------------------

create table if not exists public.team_members (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  role          text not null,
  year          int not null,
  category      text not null default 'core'
                  check (category in ('founder', 'core')),
  image_path    text,
  bio           text,
  focus         text[] not null default '{}',
  display_order int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists team_members_year_idx on public.team_members (year, display_order);

-- ---------------------------------------------------------------------------
-- sportify_winners — results of the Sportify sports festival
-- ---------------------------------------------------------------------------

create table if not exists public.sportify_winners (
  id            uuid primary key default gen_random_uuid(),
  edition_year  int not null,
  sport         text not null,
  position      text not null default 'winner'
                  check (position in ('winner', 'runner_up', 'third', 'special')),
  team_name     text,
  player_names  text,
  award_title   text,
  image_path    text,
  notes         text,
  display_order int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists sportify_winners_edition_idx
  on public.sportify_winners (edition_year, sport, display_order);

-- ---------------------------------------------------------------------------
-- applications — volunteer applications submitted through the website
-- Contains PII.
-- ---------------------------------------------------------------------------

create table if not exists public.applications (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text not null,
  address    text,
  education  text,
  experience text,
  skills     text not null,
  motivation text not null,
  status     text not null default 'new'
               check (status in ('new', 'reviewing', 'accepted', 'rejected')),
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_status_idx on public.applications (status, created_at desc);

-- ---------------------------------------------------------------------------
-- members — registrations imported from the TBSF Google Form workbook
-- Mirrors the sheet columns so imports round-trip cleanly. Contains PII.
-- ---------------------------------------------------------------------------

create table if not exists public.members (
  id                  uuid primary key default gen_random_uuid(),
  submitted_at        timestamptz,
  email               text not null,
  full_name           text not null,
  contact_no          text,
  education           text,
  occupation          text,
  blood_group         text,
  dob                 text,
  photo_url           text,
  registration_fee_proof_url text,
  tshirt_fee_proof_url       text,
  needs_tshirt        boolean,
  tshirt_size         text,
  referred_by         text,
  hobbies             text,
  departments         text[] not null default '{}',
  message             text,
  ice_breaker         text,
  source_tab          text,
  status              text not null default 'active'
                        check (status in ('active', 'inactive', 'alumni')),
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (email, submitted_at)
);

create index if not exists members_email_idx on public.members (lower(email));
create index if not exists members_departments_idx on public.members using gin (departments);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------

do $$
declare t text;
begin
  foreach t in array array['events', 'team_members', 'sportify_winners', 'applications', 'members']
  loop
    execute format(
      'drop trigger if exists set_%1$s_updated_at on public.%1$s;
       create trigger set_%1$s_updated_at before update on public.%1$s
       for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles         enable row level security;
alter table public.events           enable row level security;
alter table public.team_members     enable row level security;
alter table public.sportify_winners enable row level security;
alter table public.applications     enable row level security;
alter table public.members          enable row level security;

-- profiles: users read their own row; admins read and manage all.
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Public content: world-readable, admin-writable.
drop policy if exists events_public_read on public.events;
create policy events_public_read on public.events
  for select to anon, authenticated using (true);

drop policy if exists events_admin_write on public.events;
create policy events_admin_write on public.events
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists team_public_read on public.team_members;
create policy team_public_read on public.team_members
  for select to anon, authenticated using (true);

drop policy if exists team_admin_write on public.team_members;
create policy team_admin_write on public.team_members
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists sportify_public_read on public.sportify_winners;
create policy sportify_public_read on public.sportify_winners
  for select to anon, authenticated using (true);

drop policy if exists sportify_admin_write on public.sportify_winners;
create policy sportify_admin_write on public.sportify_winners
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- applications: anyone may apply, ONLY admins may read.
-- Without the missing select policy for anon, the public anon key would
-- expose every applicant's name, email, phone and address.
drop policy if exists applications_public_insert on public.applications;
create policy applications_public_insert on public.applications
  for insert to anon, authenticated with check (true);

drop policy if exists applications_admin_read on public.applications;
create policy applications_admin_read on public.applications
  for select to authenticated using (public.is_admin());

drop policy if exists applications_admin_write on public.applications;
create policy applications_admin_write on public.applications
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists applications_admin_delete on public.applications;
create policy applications_admin_delete on public.applications
  for delete to authenticated using (public.is_admin());

-- members: admin-only in every direction. This table is imported PII and
-- must never be readable with the anon key.
drop policy if exists members_admin_all on public.members;
create policy members_admin_all on public.members
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
