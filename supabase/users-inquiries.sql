-- ============================================================
--  Webspires — additional tables: users + inquiries
--  Run this once in the Supabase dashboard → SQL Editor.
--  (Site "Settings" reuse the existing `content` table as a single
--   row: type = 'settings', slug = 'global' — no table needed.)
-- ============================================================

create extension if not exists pgcrypto;

-- Reuse the shared updated_at trigger function from schema.sql. If you are
-- running this on a fresh project without schema.sql, uncomment this:
-- create or replace function public.set_updated_at()
-- returns trigger language plpgsql as $$
-- begin new.updated_at = now(); return new; end; $$;

-- ============================================================
--  users  (admin logins created from the backend)
--  Passwords are scrypt-hashed by the app (never stored in plain text).
-- ============================================================
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  username      text not null unique,
  name          text default '',
  role          text default 'admin' check (role in ('admin', 'editor')),
  password_hash text not null,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- ============================================================
--  inquiries  (contact-form submissions)
-- ============================================================
create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text default '',
  service     text default '',
  message     text not null,
  source      text default 'Website',
  status      text default 'new' check (status in ('new', 'read')),
  created_at  timestamptz default now()
);

create index if not exists inquiries_status_created_idx
  on public.inquiries (status, created_at desc);

-- ============================================================
--  Row Level Security
--  The app talks to these tables with the SERVICE ROLE key (RLS is
--  bypassed by that key). We enable RLS with no policies so the public
--  ANON key can never read/write them directly.
-- ============================================================
alter table public.users     enable row level security;
alter table public.inquiries enable row level security;
