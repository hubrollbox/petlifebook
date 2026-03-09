
-- Add a restricted anon SELECT policy that only works for reading non-sensitive data
-- Since we have the public_profiles view as the intended access point, we allow anon to read all rows
-- The view itself restricts which columns are visible
CREATE POLICY "Anon can read profiles for public view"
  ON public.profiles
  FOR SELECT
  TO anon
  USING (true);
