import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TVSeries {
  id: number;
  Name: string;
  Genre?: string;
  Platform?: string;
  DKcloudRating?: string;
  Language?: string;
  Awards?: string;
  Achievements?: string;
  Why2Watch?: string;
  Year?: string;
}

export function useTVSeriesSupabase() {
  const [tvSeries, setTvSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTVSeries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('TvSeries')
        .select('*')
        .order('Name', { ascending: true });
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
      setTvSeries(data || []);
    } catch (err) {
      console.error('Error fetching TV series:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch TV series');
      setTvSeries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTVSeries();
  }, []);

  return {
    tvSeries,
    loading,
    error,
    refetch: fetchTVSeries,
    count: tvSeries.length
  };
}