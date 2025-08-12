import { useState, useEffect } from 'react';

export interface TrendingItem {
  id: number;
  Title: string;
  Platform?: string;
  Type?: string;
  Genre?: string;
  "dKloud rating"?: string;
  Summary?: string;
  "poster url"?: string;
}

const SUPABASE_URL = "https://bzgbkswhgyfhvhtzysuk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Z2Jrc3doZ3lmaHZodHp5c3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTQ2ODQsImV4cCI6MjA2NzQ5MDY4NH0.rRD0KAOH5zHBrXB8N8lto21MkFU951seB6R_FhgV1ek";

export function useTrendingSupabase() {
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/Trending`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch trending content');
      }
      
      const trendingData = await response.json();
      setTrending(trendingData as TrendingItem[]);
    } catch (err) {
      console.error('Error fetching trending content:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch trending content');
      setTrending([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return {
    trending,
    loading,
    error,
    refetch: fetchTrending,
    count: trending.length
  };
}