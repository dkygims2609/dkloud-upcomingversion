import { useState, useEffect } from 'react';

export interface TrendingMovie {
  id: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  year?: string;
  rating?: number;
  genre?: string;
  image_url?: string;
  created_at: string;
}

const MOVIES_API_URL = "https://script.google.com/macros/s/AKfycbzO53FfgLV-2Kq5pP0fYF7yjFw1CQlZkZoc5TEIn3rDcPSxv8MB8koOasYlf6BuXXCQ/exec";

export function useTrendingMovies() {
  const [movies, setMovies] = useState<TrendingMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(MOVIES_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        data = data;
      } else if (data.data && Array.isArray(data.data)) {
        data = data.data;
      } else if (data.movies && Array.isArray(data.movies)) {
        data = data.movies;
      }

      // Transform and filter for trending movies with contextual descriptions
      const trendingMovies: TrendingMovie[] = data
        .slice(0, 20) // Get first 20 for trending
        .map((item: any, index: number) => ({
          id: item.id || `movie-${index}`,
          title: item.title || item.name || item.movie_title || 'Unknown Movie',
          description: generateContextualDescription(item.title || item.name || item.movie_title || 'Unknown Movie', item.genre || item.category),
          summary: item.summary || item.description || item.plot || generateMovieSummary(item.title || item.name),
          category: item.category || item.genre || item.type || 'Movie',
          year: item.year || item.release_year || item.release_date,
          rating: item.rating ? parseFloat(item.rating) : undefined,
          genre: item.genre || item.category || 'Drama',
          image_url: item.image_url || item.poster || item.thumbnail,
          created_at: item.created_at || new Date().toISOString()
        }));

      setMovies(trendingMovies);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch trending movies');
      
      // Fallback trending movies
      setMovies(getFallbackTrendingMovies());
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await fetchTrendingMovies();
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    fetchTrendingMovies,
    refresh
  };
}

function generateContextualDescription(title: string, genre?: string): string {
  const contextualPhrases = {
    mythological: ["to feel mythological magic", "and experience divine storytelling", "for epic spiritual journey"],
    action: ["for adrenaline-pumping thrills", "to experience heart-stopping action", "for edge-of-your-seat excitement"],
    romance: ["for heartwarming love stories", "to experience passionate romance", "for emotional connection"],
    horror: ["for spine-chilling scares", "to experience terrifying thrills", "for hair-raising horror"],
    comedy: ["for laugh-out-loud moments", "to brighten your day with humor", "for stress-relief comedy"],
    drama: ["for emotional depth", "to experience powerful storytelling", "for thought-provoking drama"],
    thriller: ["for suspenseful excitement", "to keep you on edge", "for mind-bending twists"],
    fantasy: ["for magical adventures", "to escape into fantasy worlds", "for enchanting storytelling"],
    scifi: ["for futuristic thrills", "to explore sci-fi wonders", "for mind-expanding concepts"]
  };

  const lowerGenre = (genre || '').toLowerCase();
  let contextPhrase = "for an amazing cinematic experience";

  // Match genre to contextual phrase
  Object.entries(contextualPhrases).forEach(([key, phrases]) => {
    if (lowerGenre.includes(key)) {
      contextPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    }
  });

  return `Watch ${title} ${contextPhrase}`;
}

function generateMovieSummary(title: string): string {
  const summaryTemplates = [
    `${title} delivers an unforgettable cinematic experience with powerful storytelling and memorable characters.`,
    `Experience the magic of ${title} through its compelling narrative and stunning visuals.`,
    `${title} takes you on an emotional journey filled with drama, action, and heart.`,
    `Discover why ${title} has captivated audiences with its unique story and brilliant execution.`,
    `${title} combines entertainment with substance, creating a must-watch experience.`
  ];

  return summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
}

function getFallbackTrendingMovies(): TrendingMovie[] {
  return [
    {
      id: 'trending-1',
      title: 'Narasimha',
      description: 'Watch Narasimha to feel mythological magic and experience divine storytelling',
      summary: 'Epic mythological tale of Lord Narasimha\'s avatar, showcasing divine power and protection of devotees.',
      category: 'Mythological',
      year: '2024',
      rating: 4.8,
      genre: 'Mythological',
      created_at: new Date().toISOString()
    },
    {
      id: 'trending-2',
      title: 'Kalki 2898 AD',
      description: 'Watch Kalki 2898 AD for futuristic thrills and mind-expanding sci-fi concepts',
      summary: 'Futuristic epic combining mythology with sci-fi, featuring stunning visuals and an all-star cast.',
      category: 'Sci-Fi',
      year: '2024',
      rating: 4.6,
      genre: 'Sci-Fi',
      created_at: new Date().toISOString()
    },
    {
      id: 'trending-3',
      title: 'Pushpa 2',
      description: 'Watch Pushpa 2 for adrenaline-pumping thrills and edge-of-your-seat action',
      summary: 'High-octane action sequel with intense performances and gripping storyline.',
      category: 'Action',
      year: '2024',
      rating: 4.7,
      genre: 'Action',
      created_at: new Date().toISOString()
    }
  ];
}