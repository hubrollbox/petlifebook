import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Memory } from '@/types/database';

interface UseMemoriesOptions {
  petId: string;
  limit?: number;
}

export const useMemories = ({ petId, limit }: UseMemoriesOptions) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadMemories = useCallback(async () => {
    if (!petId) return;

    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('memories')
        .select('*')
        .eq('pet_id', petId)
        .order('memory_date', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setMemories(data || []);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast({
        title: 'Erro ao carregar memórias',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [petId, limit, toast]);

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  const refetch = useCallback(() => {
    loadMemories();
  }, [loadMemories]);

  return {
    memories,
    loading,
    error,
    refetch,
  };
};
