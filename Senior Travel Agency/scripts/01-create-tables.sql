-- Create signups table for email newsletter
create table signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamp default now()
);

-- Enable RLS
alter table signups enable row level security;

-- Create policy to allow inserts
create policy "Allow insert" on signups
  for insert using (true);

-- Create messages table for contact form
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp default now()
);

-- Enable RLS
alter table messages enable row level security;

-- Create policy to allow inserts
create policy "Allow insert" on messages
  for insert using (true);

-- Create trips table for travel itineraries
create table trips (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  itinerary text,
  price numeric,
  image_url text,
  created_at timestamp default now()
);

-- Enable RLS
alter table trips enable row level security;

-- Create policy to allow reads
create policy "Allow read" on trips
  for select using (true);
