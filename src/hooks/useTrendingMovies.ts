import { useState, useEffect } from 'react';

export interface TrendingMovie {
  Name: string;
  Genre: string;
  Platform: string;
  DKcloudRating: number;
  Language: string;
  Awards: string;
  Achievements: string;
  "Why to Watch": string;
  Director: string;
  Year: number;
}

export function useTrendingMovies() {
  const [movies, setMovies] = useState<TrendingMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Updated to fetch from the correct trending subtab API
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwiNhiUq6yWcGQ5dUwMwclRYt_pTsz_8nNXSsYsZClcmdLJGFp3kZYZdSkfqW0LtGWd7A/exec'
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
      title: movie.Name,
      description: `Watch ${movie.Name} to ${movie["Why to Watch"]?.toLowerCase() || 'experience this amazing story'}`
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