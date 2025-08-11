import { useState, useEffect } from 'react';

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

const SUPABASE_URL = "https://bzgbkswhgyfhvhtzysuk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Z2Jrc3doZ3lmaHZodHp5c3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTQ2ODQsImV4cCI6MjA2NzQ5MDY4NH0.rRD0KAOH5zHBrXB8N8lto21MkFU951seB6R_FhgV1ek";

export function useMoviesSupabase() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/Movies`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const moviesData = await response.json();
      setMovies(moviesData as Movie[]);
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