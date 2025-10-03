-- Add essential indexes for performance
CREATE INDEX IF NOT EXISTS idx_pets_owner_id ON public.pets(owner_id);
CREATE INDEX IF NOT EXISTS idx_pets_is_deceased ON public.pets(is_deceased);
CREATE INDEX IF NOT EXISTS idx_memories_pet_id ON public.memories(pet_id);
CREATE INDEX IF NOT EXISTS idx_memories_user_id ON public.memories(user_id);
CREATE INDEX IF NOT EXISTS idx_memories_memory_date ON public.memories(memory_date DESC);

-- Add validation constraints
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_birth_date_not_future'
  ) THEN
    ALTER TABLE public.pets
    ADD CONSTRAINT check_birth_date_not_future 
    CHECK (birth_date IS NULL OR birth_date <= CURRENT_DATE);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_death_after_birth'
  ) THEN
    ALTER TABLE public.pets
    ADD CONSTRAINT check_death_after_birth 
    CHECK (death_date IS NULL OR birth_date IS NULL OR death_date >= birth_date);
  END IF;
END $$;