
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

        {/* Category Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-background/50 backdrop-blur-sm">
            <currentCategoryData.icon className={`h-5 w-5 ${currentCategoryData.color}`} />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-foreground/90">
            {currentCategoryData.title}
          </h3>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-primary/70 animate-pulse" />
            <Star className="h-4 w-4 text-yellow-400/70 fill-current animate-pulse" />
          </div>
        </div>

        {/* Scrolling Items */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="flex animate-[scroll-left_120s_linear_infinite] space-x-4 whitespace-nowrap py-3">
            {/* Duplicate items for seamless loop */}
            {[...currentItems, ...currentItems, ...currentItems].map((item, index) => (
              <div
                key={`${currentCategory}-${index}`}
                className="inline-flex flex-col items-start px-4 py-3 bg-background/30 backdrop-blur-sm rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300 hover:bg-background/50 cursor-pointer group min-w-[260px]"
              >
                {currentCategory === 0 ? (
                  // Movie format with title and description
                  <>
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {typeof item === 'object' && 'title' in item ? item.title : typeof item === 'string' ? item : ''}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">
                      {typeof item === 'object' && 'description' in item ? item.description : ''}
                    </span>
                  </>
                ) : (
                  // Regular format for other categories
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {typeof item === 'object' && 'title' in item ? item.title : typeof item === 'string' ? item : ''}
                  </span>
                )}
                <Zap className="h-3 w-3 ml-auto mt-1 text-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
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
