
-- Create storage bucket for pet images and memories
INSERT INTO storage.buckets (id, name, public) VALUES ('pet-media', 'pet-media', true);

-- RLS policies for pet-media bucket

-- Anyone can view files (public bucket)
CREATE POLICY "Public can view pet media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pet-media');

-- Authenticated users can upload to their own folder
CREATE POLICY "Users can upload pet media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'pet-media' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Users can update their own files
CREATE POLICY "Users can update own pet media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'pet-media' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Users can delete their own files
CREATE POLICY "Users can delete own pet media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'pet-media' AND (storage.foldername(name))[1] = auth.uid()::text);
