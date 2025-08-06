import { useState, useEffect } from 'react';

export interface YouTubeLearningResource {
  Name: string;
  URL: string;
  Category: string;
  Description: string;
  Type: string; // "YouTube Channel" or "Website"
  Tags: string;
  Rating: number;
  Subscribers?: string;
  Featured: string;
}

export function useYouTubeLearningResources() {
  const [resources, setResources] = useState<YouTubeLearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://api.sheetbest.com/sheets/c66a0da1-d347-44f8-adc7-dc02c8627799'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch learning resources');
      }
      
      const data = await response.json();
      setResources(data || []);
    } catch (err) {
      console.error('Error fetching learning resources:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch learning resources');
      // Fallback to empty array
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Separate YouTube channels and websites
  const getYouTubeChannels = () => {
    return resources.filter(resource => 
      resource.Type?.toLowerCase().includes('youtube') || 
      resource.URL?.includes('youtube.com')
    );
  };

  const getLearningWebsites = () => {
    return resources.filter(resource => 
      resource.Type?.toLowerCase().includes('website') || 
      !resource.URL?.includes('youtube.com')
    );
  };

  return {
    resources,
    loading,
    error,
    refetch: fetchResources,
    count: resources.length,
    getYouTubeChannels,
    getLearningWebsites
  };
}