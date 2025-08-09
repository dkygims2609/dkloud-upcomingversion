import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GemWebsite {
  id: string;
  Website: string;
  Purpose: string;
  Category: string;
}

export function useGemWebsitesSupabase() {
  const [websites, setWebsites] = useState<GemWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchWebsites = async (categoryFilter?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Direct fallback to main query
      const directResult = await supabase.from('gem_websites').select('*');
      
      if (directResult.error) {
        throw directResult.error;
      }
        
      let filteredData = directResult.data || [];
      if (categoryFilter && categoryFilter !== 'all') {
        filteredData = filteredData.filter((item: any) => item.Category === categoryFilter);
      }
      
      const formattedData: GemWebsite[] = filteredData.map((item: any) => ({
        id: item.id,
        Website: item.Website,
        Purpose: item.Purpose,
        Category: item.Category
      }));
      
      setWebsites(formattedData);
    } catch (err) {
      console.error('Error fetching gem websites:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch gem websites');
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('gem_websites')
        .select('Category')
        .not('Category', 'is', null);
      
      if (fetchError) {
        throw fetchError;
      }
      
      const uniqueCategories = [...new Set((data || []).map((item: any) => item.Category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchWebsites();
    fetchCategories();
  }, []);

  return {
    websites,
    loading,
    error,
    categories,
    refetch: fetchWebsites,
    count: websites.length
  };
}