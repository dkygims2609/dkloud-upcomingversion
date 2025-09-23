
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTrendingSupabase } from "@/hooks/useTrendingSupabase";

export function RunningBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { trending, loading, error } = useTrendingSupabase();

  // Auto-hide banner after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // Create banner text from trending movies/series titles
  const getBannerText = () => {
    if (loading) {
      return "Loading trending content... 🎬 Stay tuned for the latest movies and series! 🍿";
    }
    
    if (error || trending.length === 0) {
      return "dKloud - Your entertainment hub! 🎬 Movies • 📺 TV Series • 🎵 Music • 🤖 AI Tools • Join our tech community! 🌟";
    }
    
    // Create a scrolling text with trending titles
    const titles = trending.map(item => `🎬 ${item.Title}`).join(" • ");
    return `Trending Now: ${titles} • 🍿 Discover more on dKloud! • 🌟 Latest Entertainment Updates •`;
  };

  const bannerText = getBannerText();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 running-banner">
      <div className="banner-text">
        {bannerText}
      </div>
      
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className={cn(
          "absolute right-2 top-1/2 transform -translate-y-1/2",
          "bg-white/20 hover:bg-white/30 rounded-full p-1",
          "transition-colors duration-200 z-10"
        )}
        aria-label="Close banner"
      >
        <X className="h-3 w-3 text-white" />
      </button>
    </div>
  );
}
