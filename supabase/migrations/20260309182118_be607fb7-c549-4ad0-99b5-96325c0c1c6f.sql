
-- Recreate the view with SECURITY INVOKER to respect underlying RLS
CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = true) AS
SELECT
  id,
  display_name,
  avatar_url,
  user_type,
  business_name,
  website,
  location
FROM public.profiles;
