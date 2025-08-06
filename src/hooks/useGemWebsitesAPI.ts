import { useState, useEffect } from 'react';

export interface GemWebsiteAPI {
  Website: string;
  Purpose: string;
  Category?: string;
}

export function useGemWebsitesAPI() {
  const [websites, setWebsites] = useState<GemWebsiteAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbym4wPrXWr_z7us8kQEopSOGwUv8yviSqP8OJhlL7Rv73bJ5Q-OulVVlJtAEjMtxunK/exec'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch gem websites');
      }
      
      const data = await response.json();
      setWebsites(data || []);
    } catch (err) {
      console.error('Error fetching gem websites:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch gem websites');
      // Fallback to empty array
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return {
    websites,
    loading,
    error,
    refetch: fetchWebsites,
    count: websites.length
  };
}
