
-- Fix subscription privilege escalation:
-- 1. Restrict INSERT to free plan only (premium must come from server-side/Stripe)
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can insert own free subscriptions"
  ON public.subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND plan_type = 'free'
    AND status = 'active'
  );

-- 2. Remove UPDATE policy entirely (upgrades must happen server-side)
DROP POLICY IF EXISTS "Users can update own subscriptions" ON public.subscriptions;
