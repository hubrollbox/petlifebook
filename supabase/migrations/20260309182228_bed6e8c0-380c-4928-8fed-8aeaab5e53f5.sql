
-- Drop the security definer view
DROP VIEW IF EXISTS public.public_profiles;

-- Create a SECURITY DEFINER function that returns only safe profile columns
CREATE OR REPLACE FUNCTION public.get_public_profiles()
RETURNS TABLE (
  id uuid,
  display_name text,
  avatar_url text,
  user_type text,
  business_name text,
  website text,
  location text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, display_name, avatar_url, user_type, business_name, website, location
  FROM public.profiles;
$$;

-- Also create a single-profile version
CREATE OR REPLACE FUNCTION public.get_public_profile(_profile_id uuid)
RETURNS TABLE (
  id uuid,
  display_name text,
  avatar_url text,
  user_type text,
  business_name text,
  website text,
  location text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, display_name, avatar_url, user_type, business_name, website, location
  FROM public.profiles
  WHERE id = _profile_id;
$$;
