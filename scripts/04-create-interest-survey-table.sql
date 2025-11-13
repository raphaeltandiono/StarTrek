-- Create interest survey table for market research
create table interest_survey (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  destinations text,
  budget_range text,
  travel_style text,
  accessibility_needs text,
  additional_comments text,
  created_at timestamp default now()
);

-- Enable RLS
alter table interest_survey enable row level security;

-- Create policy to allow inserts
create policy "Allow insert" on interest_survey
  for insert using (true);
