-- Create storage bucket for trip images
insert into storage.buckets (id, name, public) values ('trip-images', 'trip-images', true);

-- Create policy to allow image uploads
create policy "Allow upload images" on storage.objects
  for insert with check (bucket_id = 'trip-images');

-- Create policy to allow public access to images
create policy "Allow public access" on storage.objects
  for select using (bucket_id = 'trip-images');
