
import { useState, useEffect } from "react";
import { Clapperboard, Brain, Briefcase, Star, Zap, TrendingUp } from "lucide-react";
import { useTrendingMovies } from "@/hooks/useTrendingMovies";

interface MovieItem {
  title: string;
  description: string;
}

const teaserContent = {
  movies: [
    { title: "Saiyarra", description: "Watch Saiyarra to feel mythological magic with epic battles and divine power" },
    { title: "Narasimha", description: "Watch Narasimha to witness the divine avatar's legendary quest for justice" },
    { title: "RRR", description: "Watch RRR to experience high-octane action and friendship in pre-independence India" },
    { title: "Bahubali 2", description: "Watch Bahubali 2 to witness the grand conclusion of royal revenge and honor" },
    { title: "KGF Chapter 2", description: "Watch KGF Chapter 2 to enter the dark underworld of gold mining and power" },
    { title: "Pushpa", description: "Watch Pushpa to follow the rise of a red sandalwood smuggler's empire" },
    { title: "Dune", description: "Watch Dune to explore epic sci-fi saga of desert planet and spice wars" },
    { title: "Avengers Endgame", description: "Watch Avengers Endgame to see the ultimate superhero battle against time and destiny" }
  ],
  aiTools: [
    "ChatGPT", "Midjourney", "Stable Diffusion", "GitHub Copilot", "Jasper AI",
    "Copy.ai", "Runway ML", "DeepL", "Grammarly", "Loom AI", "Notion AI",
    "Canva AI", "Adobe Firefly", "Figma AI", "Framer AI", "Claude AI"
  ],
  services: [
    "AI Consulting", "Cloud Solutions", "Web Development", "Mobile Apps",
    "Data Analytics", "Machine Learning", "DevOps", "UI/UX Design",
    "Digital Marketing", "Content Strategy", "Tech Training", "System Integration"
  ]
};

export function TeaserAdSection() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentItems, setCurrentItems] = useState<(string | MovieItem)[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const { getTrendingWithDescriptions, loading: moviesLoading, error: moviesError } = useTrendingMovies();

  const categories = [
    {
      title: "Trending Movies & Series",
      items: getTrendingWithDescriptions().length > 0 ? getTrendingWithDescriptions() : teaserContent.movies,
      icon: Clapperboard,
      color: "text-red-400"
    },
    {
      title: "Find Your Best Suited AI Tools",
      items: teaserContent.aiTools,
      icon: Brain,
      color: "text-blue-400"
    },
    {
      title: "Opt Our Premium Services",
      items: teaserContent.services,
      icon: Briefcase,
      color: "text-purple-400"
    }
  ];

  useEffect(() => {
    const categoryRotationInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentCategory((prev) => (prev + 1) % categories.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(categoryRotationInterval);
  }, []);

  useEffect(() => {
    const shuffleItems = () => {
      const category = categories[currentCategory];
      if (!category || !category.items || category.items.length === 0) return;
      
      const shuffled = [...category.items].sort(() => Math.random() - 0.5);
      setCurrentItems(shuffled.slice(0, 8));
    };

    shuffleItems();
    const shuffleInterval = setInterval(shuffleItems, 6000);

    return () => clearInterval(shuffleInterval);
  }, [currentCategory]);

  const currentCategoryData = categories[currentCategory];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {/* Loading State */}
        {moviesLoading && currentCategory === 0 && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-foreground text-sm font-medium">Loading trending content...</p>
          </div>
        )}
        
        {/* Error State */}
        {moviesError && currentCategory === 0 && (
          <div className="text-center py-4">
            <p className="text-red-400 text-sm">Using fallback content</p>
          </div>
        )}

        {/* Category Header - Clean Style */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-border/30">
            <currentCategoryData.icon className="h-5 w-5 text-blue-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {currentCategoryData.title}
          </h3>
        </div>

        {/* Scrolling Items - Clean Style */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-background/50 to-background/30 border border-border/20">
          <div className="flex animate-[scroll-left_80s_linear_infinite] space-x-3 py-4 px-2">
            {/* Duplicate items for seamless loop */}
            {[...currentItems, ...currentItems].map((item, index) => (
              <div
                key={`${currentCategory}-${index}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:bg-white/10 cursor-pointer group min-w-[220px] whitespace-nowrap"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"></div>
                <span className="text-sm font-medium text-foreground/90 group-hover:text-blue-400 transition-colors truncate">
                  {typeof item === 'object' && 'title' in item ? item.title : typeof item === 'string' ? item : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCategory(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentCategory 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-110'
              }`}
              aria-label={`Switch to ${categories[index].title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
