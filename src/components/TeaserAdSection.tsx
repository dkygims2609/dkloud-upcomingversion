import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Play } from "lucide-react";
import { useTrendingMovies } from "@/hooks/useTrendingMovies";

interface TrendingItem {
  title: string;
  description: string;
  summary: string;
  category: string;
}

export function TeaserAdSection() {
  const [currentItems, setCurrentItems] = useState<TrendingItem[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const { movies, loading } = useTrendingMovies();

  const categories = [
    {
      title: "Trending Movies & Series",
      items: movies.map(movie => ({
        title: movie.title,
        description: movie.description,
        summary: movie.summary,
        category: movie.category
      })),
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  // Update items when movies data changes
  useEffect(() => {
    if (movies.length > 0) {
      const shuffled = [...movies].sort(() => Math.random() - 0.5);
      setCurrentItems(shuffled.slice(0, 8).map(movie => ({
        title: movie.title,
        description: movie.description,
        summary: movie.summary,
        category: movie.category
      })));
    }
  }, [movies]);

  // Shuffle items every 5 seconds
  useEffect(() => {
    if (movies.length === 0) return;
    
    const itemInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        const shuffled = [...movies].sort(() => Math.random() - 0.5);
        setCurrentItems(shuffled.slice(0, 8).map(movie => ({
          title: movie.title,
          description: movie.description,
          summary: movie.summary,
          category: movie.category
        })));
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(itemInterval);
  }, [movies]);

  const currentCategoryData = categories[0]; // Always use trending movies

  if (loading) {
    return (
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5 border-t border-b border-border/50" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5 border-t border-b border-border/50" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <currentCategoryData.icon className={`h-6 w-6 bg-gradient-to-r ${currentCategoryData.gradient} bg-clip-text text-transparent`} />
            <h2 className={`text-2xl font-bold bg-gradient-to-r ${currentCategoryData.gradient} bg-clip-text text-transparent`}>
              {currentCategoryData.title}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Discover trending movies and series with contextual descriptions from our live content
          </p>
        </div>

        {/* Scrolling Content */}
        <div className="relative">
          <div className="flex gap-4 animate-scroll overflow-hidden">
            {/* Duplicate items for seamless loop */}
            {[...currentItems, ...currentItems].map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className={`flex-none w-72 p-4 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-lg hover:scale-105 transition-all duration-300 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${(index % currentItems.length) * 100}ms`
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentCategoryData.gradient} group-hover:scale-110 transition-transform flex-shrink-0 mt-1`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-sm truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors mb-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground/70 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30">
            <Play className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary font-medium">Live Trending Content</span>
          </div>
        </div>
      </div>
    </section>
  );
}