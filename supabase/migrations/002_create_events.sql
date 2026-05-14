-- Events table
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  host text not null,
  date date not null,
  time text not null,
  venue text not null,
  description text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null
);

-- Event images table (multiple images per event)
create table if not exists public.event_images (
  id uuid default gen_random_uuid() primary key,
  event_id uuid not null references public.events(id) on delete cascade,
  url text not null,
  r2_key text not null,
  display_order integer default 0 not null,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.events enable row level security;
alter table public.event_images enable row level security;

-- Public can read all active events
create policy "Public read events"
  on public.events for select
  using (true);

create policy "Public read event images"
  on public.event_images for select
  using (true);

-- Service role has full access
create policy "Service role manage events"
  on public.events for all
  to service_role
  using (true)
  with check (true);

create policy "Service role manage event images"
  on public.event_images for all
  to service_role
  using (true)
  with check (true);
