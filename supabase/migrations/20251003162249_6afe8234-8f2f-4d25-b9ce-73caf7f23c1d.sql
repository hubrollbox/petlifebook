-- Add foreign keys for data integrity
ALTER TABLE public.memories
ADD CONSTRAINT fk_memories_pet_id 
FOREIGN KEY (pet_id) REFERENCES public.pets(id) ON DELETE CASCADE;

ALTER TABLE public.memories
ADD CONSTRAINT fk_memories_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Drop the insecure policy
DROP POLICY IF EXISTS "Users can insert memories for their own pets" ON public.memories;

-- Create a security definer function to check pet ownership
CREATE OR REPLACE FUNCTION public.is_pet_owner(_pet_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.pets
    WHERE id = _pet_id
      AND owner_id = _user_id
  )
$$;

-- Create secure policy for inserting memories
CREATE POLICY "Users can insert memories only for their own pets"
ON public.memories
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND 
  public.is_pet_owner(pet_id, auth.uid())
);

-- Add essential indexes for performance
CREATE INDEX IF NOT EXISTS idx_pets_owner_id ON public.pets(owner_id);
CREATE INDEX IF NOT EXISTS idx_pets_is_deceased ON public.pets(is_deceased);
CREATE INDEX IF NOT EXISTS idx_memories_pet_id ON public.memories(pet_id);
CREATE INDEX IF NOT EXISTS idx_memories_user_id ON public.memories(user_id);
CREATE INDEX IF NOT EXISTS idx_memories_memory_date ON public.memories(memory_date DESC);

-- Add validation constraint for birth_date
ALTER TABLE public.pets
ADD CONSTRAINT check_birth_date_not_future 
CHECK (birth_date IS NULL OR birth_date <= CURRENT_DATE);

-- Add validation constraint for death_date
ALTER TABLE public.pets
ADD CONSTRAINT check_death_after_birth 
CHECK (death_date IS NULL OR birth_date IS NULL OR death_date >= birth_date);