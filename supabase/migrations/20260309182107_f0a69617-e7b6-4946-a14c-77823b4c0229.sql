
-- Drop the overly broad anon SELECT policy
DROP POLICY IF EXISTS "Public can read non-sensitive profile data" ON public.profiles;

-- Create a view exposing only non-sensitive columns
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT
  id,
  display_name,
  avatar_url,
  user_type,
  business_name,
  website,
  location
FROM public.profiles;

-- Grant anon and authenticated access to the view
GRANT SELECT ON public.public_profiles TO anon;
GRANT SELECT ON public.public_profiles TO authenticated;
