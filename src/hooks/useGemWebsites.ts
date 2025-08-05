import { useState, useEffect } from 'react';

export interface GemWebsite {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  tags?: string[];
}

export interface UseGemWebsitesResult {
  websites: GemWebsite[];
  loading: boolean;
  error: string | null;
  refreshWebsites: () => Promise<void>;
}

const GEM_WEBSITES_API_URL = 'https://script.google.com/macros/s/AKfycbw3UoCftJ2T8owRapg38hF7aecRWEnreLS-cN6KDaFYzRkUaUbj5s0tfWtj5XqvEKc/exec';

export function useGemWebsites(): UseGemWebsitesResult {
  const [websites, setWebsites] = useState<GemWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(GEM_WEBSITES_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform the data to match our interface
      const transformedWebsites: GemWebsite[] = Array.isArray(data) 
        ? data.map((item: any, index: number) => ({
            id: item.id || `gem-${index}`,
            title: item.title || item.name || 'Gem Website',
            url: item.url || item.link || '#',
            description: item.description || 'A curated gem website',
            category: item.category || 'General',
            tags: item.tags || []
          }))
        : [];

      setWebsites(transformedWebsites);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gem websites');
      console.error('Error fetching gem websites:', err);
      
      // Fallback data
      setWebsites([
        {
          id: 'gem-1',
          title: 'Design Inspiration',
          url: '#',
          description: 'Curated design resources',
          category: 'Design',
          tags: ['design', 'inspiration']
        },
        {
          id: 'gem-2',
          title: 'Tech Tools',
          url: '#',
          description: 'Useful development tools',
          category: 'Development',
          tags: ['tools', 'development']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const refreshWebsites = async () => {
    await fetchWebsites();
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return {
    websites,
    loading,
    error,
    refreshWebsites
  };
}