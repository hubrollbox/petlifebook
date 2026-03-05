
DROP VIEW IF EXISTS public.pet_stats;
CREATE OR REPLACE VIEW public.pet_stats WITH (security_invoker = true) AS
SELECT
  owner_id,
  COUNT(*) AS total_pets,
  COUNT(*) FILTER (WHERE is_deceased) AS deceased_pets,
  COUNT(*) FILTER (WHERE NOT is_deceased) AS living_pets
FROM public.pets
GROUP BY owner_id;
