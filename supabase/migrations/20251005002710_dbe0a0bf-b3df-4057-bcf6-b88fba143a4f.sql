-- Fix security definer view issue
-- Drop and recreate view without security definer
DROP VIEW IF EXISTS public.pet_stats;

-- Recreate view as a regular view (not security definer)
-- This view only aggregates public data, no security concerns
CREATE VIEW public.pet_stats 
WITH (security_invoker = true)
AS
SELECT 
  COUNT(*) as total_pets,
  COUNT(*) FILTER (WHERE is_deceased = true) as deceased_pets,
  COUNT(*) FILTER (WHERE is_deceased = false) as living_pets,
  COUNT(*) FILTER (WHERE is_premium = true) as premium_pets,
  COUNT(DISTINCT owner_id) as total_users,
  MAX(created_at) as latest_pet_created
FROM public.pets;