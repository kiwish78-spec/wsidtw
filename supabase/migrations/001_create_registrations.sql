-- Create registrations table
create table if not exists public.registrations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  instagram_id text not null,
  email text not null,
  phone text not null,
  why_invite text not null,
  created_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.registrations enable row level security;

-- Allow anyone to INSERT (public form submission)
create policy "Allow public inserts"
  on public.registrations
  for insert
  to anon
  with check (true);

-- Only service role (admin API) can SELECT
create policy "Allow service role to select"
  on public.registrations
  for select
  to service_role
  using (true);

-- Unique constraints to prevent duplicate submissions
create unique index if not exists registrations_email_unique on public.registrations (lower(email));
create unique index if not exists registrations_instagram_unique on public.registrations (lower(instagram_id));
