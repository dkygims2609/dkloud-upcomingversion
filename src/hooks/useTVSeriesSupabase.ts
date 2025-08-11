import { useState, useEffect } from 'react';

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

const SUPABASE_URL = "https://bzgbkswhgyfhvhtzysuk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Z2Jrc3doZ3lmaHZodHp5c3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTQ2ODQsImV4cCI6MjA2NzQ5MDY4NH0.rRD0KAOH5zHBrXB8N8lto21MkFU951seB6R_FhgV1ek";

export function useTVSeriesSupabase() {
  const [tvSeries, setTvSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTVSeries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/TvSeries`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch TV series');
      }
      
      const tvSeriesData = await response.json();
      setTvSeries(tvSeriesData as TVSeries[]);
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