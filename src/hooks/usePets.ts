import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Pet } from '@/types/database';

interface UsePetsOptions {
  userId?: string;
  limit?: number;
  isDeceased?: boolean;
}

export const usePets = (options: UsePetsOptions = {}) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadPets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('pets').select('*');

      if (options.userId) {
        query = query.eq('owner_id', options.userId);
      }

      if (options.isDeceased !== undefined) {
        query = query.eq('is_deceased', options.isDeceased);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setPets(data || []);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast({
        title: 'Erro ao carregar pets',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [options.userId, options.limit, options.isDeceased, toast]);

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  const refetch = useCallback(() => {
    loadPets();
  }, [loadPets]);

  return {
    pets,
    loading,
    error,
    refetch,
  };
};
