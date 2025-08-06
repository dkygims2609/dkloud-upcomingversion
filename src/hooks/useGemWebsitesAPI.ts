import { useState, useEffect } from 'react';

export interface GemWebsite {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  rating?: number;
  isFree: boolean;
  featured: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

const GEM_WEBSITES_API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLifUENDi8XCInb3nG_UZyx7CklBFKO7E__wclRJ0awnzl2JWJpzuJEjGRfQlEwsgWCa86GyWUny1B3xZcjBcvOXCaHkjIDVgsOrqEr1xBBAkOoeuYPz-1G7QK6Q13NfNfxfyENxhyVpKGLNsDY9gLIH63e4vgfctdyr5aCYkL24r97skaORkRmv_8Ksi9LrNwP-QiZaYPN7bCmJ2JrWjNCOdfINDJGz_Tgb0m8Q8nsmUwSMUiDab8tTCRqIpw&lib=M6Ya1GTFZ7g4IDHsSoaF-TbONwxaIsT7L";

export function useGemWebsitesAPI() {
  const [websites, setWebsites] = useState<GemWebsite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchWebsites = async (filters: any = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(GEM_WEBSITES_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        data = data;
      } else if (data.data && Array.isArray(data.data)) {
        data = data.data;
      } else if (data.websites && Array.isArray(data.websites)) {
        data = data.websites;
      } else {
        throw new Error('Invalid data format received from API');
      }

      // Transform data to match our interface
      const transformedWebsites: GemWebsite[] = data.map((item: any, index: number) => ({
        id: item.id || `gem-${index}`,
        name: item.name || item.title || item.website_name || 'Unknown Website',
        url: item.url || item.link || item.website_url || '#',
        category: item.category || item.type || 'General',
        description: item.description || item.desc || 'No description available',
        rating: item.rating ? parseFloat(item.rating) : undefined,
        isFree: item.isFree !== undefined ? Boolean(item.isFree) : item.free !== undefined ? Boolean(item.free) : true,
        featured: item.featured !== undefined ? Boolean(item.featured) : false,
        tags: item.tags ? (Array.isArray(item.tags) ? item.tags : item.tags.split(',').map((t: string) => t.trim())) : [],
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString()
      }));

      // Apply filters
      let filteredWebsites = transformedWebsites;

      if (filters.category) {
        filteredWebsites = filteredWebsites.filter(website => 
          website.category.toLowerCase().includes(filters.category.toLowerCase())
        );
      }

      if (filters.featured) {
        filteredWebsites = filteredWebsites.filter(website => website.featured);
      }

      if (filters.isFree !== undefined) {
        filteredWebsites = filteredWebsites.filter(website => website.isFree === filters.isFree);
      }

      if (filters.limit) {
        filteredWebsites = filteredWebsites.slice(0, filters.limit);
      }

      setWebsites(filteredWebsites);
      
      // Update categories
      const uniqueCategories = [...new Set(transformedWebsites.map(website => website.category))];
      setCategories(uniqueCategories);
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching gem websites:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch gem websites');
      
      // Fallback to empty array
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await fetchWebsites();
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return {
    websites,
    loading,
    error,
    categories,
    fetchWebsites,
    refresh,
    lastUpdated
  };
}