
-- 1. TABLES

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  avatar_url TEXT,
  user_type TEXT NOT NULL DEFAULT 'individual' CHECK (user_type IN ('individual', 'professional')),
  business_name TEXT,
  website TEXT,
  location TEXT,
  contact_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'premium')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.litters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  breeder_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sire_id UUID,
  dam_id UUID,
  birth_date DATE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT,
  breed TEXT,
  birth_date DATE,
  death_date DATE,
  location TEXT,
  description TEXT,
  story TEXT,
  profile_image_url TEXT,
  is_deceased BOOLEAN NOT NULL DEFAULT false,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'active',
  litter_id UUID REFERENCES public.litters(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  memory_date DATE NOT NULL DEFAULT CURRENT_DATE,
  media_url TEXT,
  media_type TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL DEFAULT 'treatment',
  record_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. INDEXES
CREATE INDEX idx_pets_owner ON public.pets(owner_id);
CREATE INDEX idx_pets_deceased ON public.pets(is_deceased) WHERE is_deceased = true;
CREATE INDEX idx_memories_pet ON public.memories(pet_id);
CREATE INDEX idx_memories_user ON public.memories(user_id);
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_health_records_pet ON public.health_records(pet_id);
CREATE INDEX idx_litters_breeder ON public.litters(breeder_id);

-- 3. SECURITY DEFINER FUNCTIONS

CREATE OR REPLACE FUNCTION public.is_premium_user(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = _user_id AND plan_type = 'premium' AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.count_user_pets(_user_id UUID)
RETURNS INTEGER
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(COUNT(*)::integer, 0) FROM public.pets WHERE owner_id = _user_id;
$$;

CREATE OR REPLACE FUNCTION public.is_pet_owner(_user_id UUID, _pet_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.pets WHERE id = _pet_id AND owner_id = _user_id
  );
$$;

-- 4. TRIGGER: auto-create profile on signup

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. RLS POLICIES

-- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Public can read non-sensitive profile data"
  ON public.profiles FOR SELECT TO anon
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- pets
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read deceased pets"
  ON public.pets FOR SELECT TO anon
  USING (is_deceased = true);

CREATE POLICY "Authenticated can read deceased or own pets"
  ON public.pets FOR SELECT TO authenticated
  USING (is_deceased = true OR owner_id = auth.uid());

CREATE POLICY "Owners can insert pets"
  ON public.pets FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update own pets"
  ON public.pets FOR UPDATE TO authenticated
  USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can delete own pets"
  ON public.pets FOR DELETE TO authenticated
  USING (owner_id = auth.uid());

-- memories
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read memories of deceased pets"
  ON public.memories FOR SELECT TO anon
  USING (EXISTS (SELECT 1 FROM public.pets WHERE pets.id = memories.pet_id AND pets.is_deceased = true));

CREATE POLICY "Authenticated can read own or deceased pet memories"
  ON public.memories FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.pets WHERE pets.id = memories.pet_id AND pets.is_deceased = true));

CREATE POLICY "Owners can insert memories"
  ON public.memories FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.is_pet_owner(auth.uid(), pet_id));

CREATE POLICY "Owners can update own memories"
  ON public.memories FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Owners can delete own memories"
  ON public.memories FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own subscriptions"
  ON public.subscriptions FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own subscriptions"
  ON public.subscriptions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own subscriptions"
  ON public.subscriptions FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- litters
ALTER TABLE public.litters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Breeders can read own litters"
  ON public.litters FOR SELECT TO authenticated
  USING (breeder_id = auth.uid());

CREATE POLICY "Breeders can insert litters"
  ON public.litters FOR INSERT TO authenticated
  WITH CHECK (breeder_id = auth.uid());

CREATE POLICY "Breeders can update own litters"
  ON public.litters FOR UPDATE TO authenticated
  USING (breeder_id = auth.uid()) WITH CHECK (breeder_id = auth.uid());

CREATE POLICY "Breeders can delete own litters"
  ON public.litters FOR DELETE TO authenticated
  USING (breeder_id = auth.uid());

-- health_records
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can read pet health records"
  ON public.health_records FOR SELECT TO authenticated
  USING (public.is_pet_owner(auth.uid(), pet_id));

CREATE POLICY "Owners can insert pet health records"
  ON public.health_records FOR INSERT TO authenticated
  WITH CHECK (public.is_pet_owner(auth.uid(), pet_id));

CREATE POLICY "Owners can update pet health records"
  ON public.health_records FOR UPDATE TO authenticated
  USING (public.is_pet_owner(auth.uid(), pet_id))
  WITH CHECK (public.is_pet_owner(auth.uid(), pet_id));

CREATE POLICY "Owners can delete pet health records"
  ON public.health_records FOR DELETE TO authenticated
  USING (public.is_pet_owner(auth.uid(), pet_id));

-- 6. VIEW
CREATE OR REPLACE VIEW public.pet_stats AS
SELECT
  owner_id,
  COUNT(*) AS total_pets,
  COUNT(*) FILTER (WHERE is_deceased) AS deceased_pets,
  COUNT(*) FILTER (WHERE NOT is_deceased) AS living_pets
FROM public.pets
GROUP BY owner_id;
