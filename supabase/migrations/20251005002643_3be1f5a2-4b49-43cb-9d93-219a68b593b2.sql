-- Performance and optimization improvements

-- Add composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_pets_owner_deceased 
ON public.pets(owner_id, is_deceased);

CREATE INDEX IF NOT EXISTS idx_pets_deceased_created 
ON public.pets(is_deceased, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_memories_pet_date 
ON public.memories(pet_id, memory_date DESC);

-- Add updated_at trigger for memories if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_memories_updated_at'
  ) THEN
    CREATE TRIGGER update_memories_updated_at
    BEFORE UPDATE ON public.memories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END
$$;

-- Improve storage policies for better validation
DO $$
BEGIN
  -- Drop existing policy if it exists to recreate it
  DROP POLICY IF EXISTS "Pet photos are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Users can upload pet photos" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their pet photos" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their pet photos" ON storage.objects;
END
$$;

-- Create improved storage policies with file type validation
CREATE POLICY "Pet photos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'pet-photos');

CREATE POLICY "Users can upload pet photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'pet-photos' 
  AND auth.uid() IS NOT NULL
  AND (storage.extension(name) IN ('jpg', 'jpeg', 'png', 'webp'))
);

CREATE POLICY "Users can update their pet photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'pet-photos' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can delete their pet photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'pet-photos' 
  AND auth.uid() IS NOT NULL
);

-- Add performance monitoring view
CREATE OR REPLACE VIEW public.pet_stats AS
SELECT 
  COUNT(*) as total_pets,
  COUNT(*) FILTER (WHERE is_deceased = true) as deceased_pets,
  COUNT(*) FILTER (WHERE is_deceased = false) as living_pets,
  COUNT(*) FILTER (WHERE is_premium = true) as premium_pets,
  COUNT(DISTINCT owner_id) as total_users,
  MAX(created_at) as latest_pet_created
FROM public.pets;