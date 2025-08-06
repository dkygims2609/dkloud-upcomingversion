import { useState, useEffect } from 'react';

export interface GemWebsiteAPI {
  Name: string;
  URL: string;
  Category: string;
  Description: string;
  Tags: string;
  Free: string;
  Rating: number;
  Featured: string;
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
        'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLifUENDi8XCInb3nG_UZyx7CklBFKO7E__wclRJ0awnzl2JWJpzuJEjGRfQlEwsgWCa86GyWUny1B3xZcjBcvOXCaHkjIDVgsOrqEr1xBBAkOoeuYPz-1G7QK6Q13NfNfxfyENxhyVpKGLNsDY9gLIH63e4vgfctdyr5aCYkL24r97skaORkRmv_8Ksi9LrNwP-QiZaYPN7bCmJ2JrWjNCOdfINDJGz_Tgb0m8Q8nsmUwSMUiDab8tTCRqIpw&lib=M6Ya1GTFZ7g4IDHsSoaF-TbONwxaIsT7L'
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