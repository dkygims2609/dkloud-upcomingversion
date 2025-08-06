import { useState, useEffect } from 'react';

export interface GemWebsite {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rating: number;
  isFree: boolean;
  featured: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

const GEM_WEBSITES: GemWebsite[] = [
  {
    id: 'gem-1',
    name: 'Vercel',
    description: 'Platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.',
    url: 'https://vercel.com',
    category: 'Developer Tools',
    tags: ['Deployment', 'Frontend', 'Next.js', 'Static Sites'],
    rating: 4.9,
    isFree: true,
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-2',
    name: 'Figma',
    description: 'Collaborative interface design tool that helps teams create, test, and ship better designs from start to finish.',
    url: 'https://figma.com',
    category: 'Design Resources',
    tags: ['UI Design', 'Collaboration', 'Prototyping', 'Vector Graphics'],
    rating: 4.8,
    isFree: true,
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-3',
    name: 'Notion',
    description: 'All-in-one workspace where you can write, plan, collaborate and get organized. Perfect for teams and individuals.',
    url: 'https://notion.so',
    category: 'Productivity',
    tags: ['Note Taking', 'Project Management', 'Collaboration', 'Database'],
    rating: 4.7,
    isFree: true,
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1554177255-61502b352de3?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-4',
    name: 'GitHub',
    description: 'Development platform inspired by the way you work. Host and review code, manage projects, and build software.',
    url: 'https://github.com',
    category: 'Developer Tools',
    tags: ['Version Control', 'Code Hosting', 'Collaboration', 'Open Source'],
    rating: 4.9,
    isFree: true,
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-5',
    name: 'Framer',
    description: 'Interactive design tool for creating high-fidelity prototypes, websites, and apps with advanced animations.',
    url: 'https://framer.com',
    category: 'Design Resources',
    tags: ['Prototyping', 'Animation', 'Interactive Design', 'Web Design'],
    rating: 4.6,
    isFree: true,
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-6',
    name: 'Linear',
    description: 'Issue tracking tool designed for high-performance teams. Streamline issues, sprints, and product roadmaps.',
    url: 'https://linear.app',
    category: 'Productivity',
    tags: ['Issue Tracking', 'Project Management', 'Team Collaboration', 'Agile'],
    rating: 4.8,
    isFree: true,
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-7',
    name: 'Supabase',
    description: 'Open source Firebase alternative. Create a backend in less than 2 minutes with auto-generated APIs.',
    url: 'https://supabase.com',
    category: 'Developer Tools',
    tags: ['Backend', 'Database', 'Authentication', 'API', 'Real-time'],
    rating: 4.7,
    isFree: true,
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-8',
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework packed with classes that can be composed to build any design, directly in markup.',
    url: 'https://tailwindcss.com',
    category: 'Developer Tools',
    tags: ['CSS Framework', 'Utility-First', 'Responsive Design', 'Component Styling'],
    rating: 4.9,
    isFree: true,
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-9',
    name: 'Obsidian',
    description: 'Knowledge management app that works on top of a local folder of plain text Markdown files.',
    url: 'https://obsidian.md',
    category: 'Productivity',
    tags: ['Note Taking', 'Knowledge Management', 'Markdown', 'Local Storage'],
    rating: 4.6,
    isFree: true,
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gem-10',
    name: 'Coolors',
    description: 'Super fast color palette generator! Create, browse and save palettes on the go.',
    url: 'https://coolors.co',
    category: 'Design Resources',
    tags: ['Color Palettes', 'Design Tools', 'Color Theory', 'Branding'],
    rating: 4.5,
    isFree: true,
    featured: false,
    image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function useGemWebsites() {
  const [websites, setWebsites] = useState<GemWebsite[]>(GEM_WEBSITES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchWebsites = async (filters: any = {}) => {
    try {
      setLoading(true);
      setError(null);

      let filteredWebsites = [...GEM_WEBSITES];

      if (filters.category) {
        filteredWebsites = filteredWebsites.filter(website => 
          website.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      if (filters.featured) {
        filteredWebsites = filteredWebsites.filter(website => website.featured);
      }

      if (filters.isFree) {
        filteredWebsites = filteredWebsites.filter(website => website.isFree);
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setWebsites(filteredWebsites.slice(0, filters.limit || 20));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gem websites');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await fetchWebsites();
  };

  useEffect(() => {
    const uniqueCategories = [...new Set(GEM_WEBSITES.map(website => website.category))];
    setCategories(uniqueCategories);
    setWebsites(GEM_WEBSITES);
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