import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Movie {
  id: number;
  Name: string;
  Genre?: string;
  Platform?: string;
  DKcloudRating?: string;
  Language?: string;
  Awards?: string;
  Achievements?: string;
  Why2Watch?: string;
  Director?: string;
  Year?: string;
}

export function useMoviesSupabase() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('Movies')
        .select('*')
        .order('Name', { ascending: true });
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
      setMovies(data || []);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    refetch: fetchMovies,
    count: movies.length
  };
}