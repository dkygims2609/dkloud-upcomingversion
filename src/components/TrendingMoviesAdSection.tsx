import { useState, useEffect } from 'react';
import { Clapperboard, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTrendingMovies } from '@/hooks/useTrendingMovies';
import { ScrollReveal } from '@/components/ModernAnimations';

export function TrendingMoviesAdSection() {
  const { movies, loading, error } = useTrendingMovies();
  const [visibleItems, setVisibleItems] = useState(8);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= Math.max(movies.length - visibleItems + 1, 1) ? 0 : nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [movies.length, visibleItems]);

  // Update visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1536) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-96 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || movies.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollReveal direction="up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clapperboard className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-animated">
                Trending Movies & Series
              </h2>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <p className="text-muted-foreground">
              {error ? 'Unable to load trending content' : 'No trending content available'}
            </p>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  const displayedMovies = movies.slice(currentIndex, currentIndex + visibleItems);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clapperboard className="h-8 w-8 text-primary animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-animated">
                Trending Movies & Series
              </h2>
              <TrendingUp className="h-8 w-8 text-accent animate-bounce" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the latest trending movies and series handpicked for you
            </p>
          </div>
        </ScrollReveal>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="z-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(movies.length / visibleItems) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * visibleItems)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / visibleItems) === i 
                    ? 'bg-primary w-8' 
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentIndex(Math.min(movies.length - visibleItems, currentIndex + 1))}
            disabled={currentIndex >= movies.length - visibleItems}
            className="z-10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Movies grid with smooth transition */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${(currentIndex % visibleItems) * (100 / visibleItems)}%)`,
            }}
          >
            {movies.map((movie, index) => (
              <div 
                key={`${movie.Title}-${index}`}
                className={`flex-shrink-0 w-full ${
                  visibleItems === 1 ? 'sm:w-full' :
                  visibleItems === 2 ? 'sm:w-1/2' :
                  visibleItems === 3 ? 'lg:w-1/3' :
                  'xl:w-1/4'
                }`}
              >
                <ScrollReveal direction="up" delay={index * 100}>
                  <Card className="h-full bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
                        {movie.Title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                        {movie.Summary || 'Discover this amazing content and dive into an incredible story.'}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-1 flex-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-20"></div>
                        <span className="text-xs text-primary font-medium">Trending</span>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        {/* View More button */}
        <div className="text-center mt-8">
          <ScrollReveal direction="up" delay={600}>
            <Button 
              asChild
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <a href="/movies-tv">
                View All Movies & Series
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}