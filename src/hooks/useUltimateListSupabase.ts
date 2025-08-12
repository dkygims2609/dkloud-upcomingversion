import { useState, useEffect } from 'react';

export interface UltimateItem {
  id: number;
  Title: string;
  Type?: string;
  Genre?: string;
  Platform?: string;
  "Why to watch"?: string;
  PosterURL?: string;
}

const SUPABASE_URL = "https://bzgbkswhgyfhvhtzysuk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Z2Jrc3doZ3lmaHZodHp5c3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTQ2ODQsImV4cCI6MjA2NzQ5MDY4NH0.rRD0KAOH5zHBrXB8N8lto21MkFU951seB6R_FhgV1ek";

export function useUltimateListSupabase() {
  const [ultimateList, setUltimateList] = useState<UltimateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUltimateList = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/Ultimate%20list`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch ultimate list');
      }
      
      const ultimateData = await response.json();
      setUltimateList(ultimateData as UltimateItem[]);
    } catch (err) {
      console.error('Error fetching ultimate list:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch ultimate list');
      setUltimateList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUltimateList();
  }, []);

  return {
    ultimateList,
    loading,
    error,
    refetch: fetchUltimateList,
    count: ultimateList.length
  };
}