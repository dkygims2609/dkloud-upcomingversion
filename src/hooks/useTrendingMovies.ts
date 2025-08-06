import { useState, useEffect } from 'react';

export interface TrendingMovie {
  Title: string;
  Summary: string;
}

export function useTrendingMovies() {
  const [movies, setMovies] = useState<TrendingMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Updated to fetch from the correct API endpoint
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyCeRakH_SOeSQO3PGFMtphknTGIe3mzcFRZcCmjQdAEkOtiK8-3m2WSL1tJ8dOXy8/exec'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch trending movies');
      }
      
      const data = await response.json();
      setMovies(data || []);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch trending movies');
      // Fallback to empty array
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Get top trending movies with contextual descriptions
  const getTrendingWithDescriptions = () => {
    return movies.slice(0, 8).map(movie => ({
      title: movie.Title,
      description: movie.Summary || 'Discover this amazing content'
    }));
  };

  return {
    movies,
    loading,
    error,
    refetch: fetchMovies,
    count: movies.length,
    getTrendingWithDescriptions
  };
}