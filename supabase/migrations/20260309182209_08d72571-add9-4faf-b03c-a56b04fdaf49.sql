
-- Remove the overly broad anon policy we just created
DROP POLICY IF EXISTS "Anon can read profiles for public view" ON public.profiles;

-- Revoke direct SELECT on profiles from anon
REVOKE SELECT ON public.profiles FROM anon;

-- Recreate view as SECURITY DEFINER (owned by postgres) so it can read profiles
-- but only exposes safe columns
DROP VIEW IF EXISTS public.public_profiles;
CREATE VIEW public.public_profiles
WITH (security_barrier = true) AS
SELECT
  id,
  display_name,
  avatar_url,
  user_type,
  business_name,
  website,
  location
FROM public.profiles;

-- Grant SELECT on the view only
GRANT SELECT ON public.public_profiles TO anon;
GRANT SELECT ON public.public_profiles TO authenticated;
