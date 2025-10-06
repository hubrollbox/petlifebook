-- RLS Policies para restrições de plano gratuito

-- Função para verificar se o utilizador é premium
CREATE OR REPLACE FUNCTION public.is_premium_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.subscriptions
    WHERE user_id = _user_id
      AND plan_type = 'premium'
      AND status = 'active'
  )
$$;

-- Função para contar pets do utilizador
CREATE OR REPLACE FUNCTION public.count_user_pets(_user_id uuid)
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM public.pets
  WHERE owner_id = _user_id
$$;

-- Remover política antiga de insert
DROP POLICY IF EXISTS "Users can insert their own pets" ON public.pets;

-- Nova política de insert com restrições de plano
CREATE POLICY "Users can insert pets based on plan"
ON public.pets
FOR INSERT
WITH CHECK (
  auth.uid() = owner_id
  AND (
    -- Premium users: sem restrições
    is_premium_user(auth.uid())
    OR
    -- Free users: apenas pets falecidos E máximo 3 pets
    (is_deceased = true AND count_user_pets(auth.uid()) < 3)
  )
);

-- Política de update: apenas premium pode marcar pet como vivo
DROP POLICY IF EXISTS "Users can update their own pets" ON public.pets;

CREATE POLICY "Users can update pets based on plan"
ON public.pets
FOR UPDATE
USING (auth.uid() = owner_id)
WITH CHECK (
  auth.uid() = owner_id
  AND (
    -- Premium: sem restrições
    is_premium_user(auth.uid())
    OR
    -- Free: não pode marcar como vivo
    is_deceased = true
  )
);