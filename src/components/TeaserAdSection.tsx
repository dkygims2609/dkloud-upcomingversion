import { useState, useEffect } from "react";
import { Clapperboard, Brain, Briefcase, Star, Zap, TrendingUp } from "lucide-react";

const teaserContent = {
  movies: [
    "The Godfather", "Pulp Fiction", "The Dark Knight", "Schindler's List", "12 Angry Men",
    "The Lord of the Rings", "Forrest Gump", "Fight Club", "Inception", "The Matrix",
    "Goodfellas", "The Empire Strikes Back", "One Flew Over the Cuckoo's Nest", "Se7en",
    "It's a Wonderful Life", "Seven Samurai", "The Silence of the Lambs", "Saving Private Ryan"
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
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const categories = [
    {
      title: "Curated Best Movies",
      items: teaserContent.movies,
      icon: Clapperboard,
      color: "from-red-500/20 to-pink-500/20",
      textColor: "text-red-400"
    },
    {
      title: "Find Your Best Suited AI Tools",
      items: teaserContent.aiTools,
      icon: Brain,
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-blue-400"
    },
    {
      title: "Opt Our Premium Services",
      items: teaserContent.services,
      icon: Briefcase,
      color: "from-purple-500/20 to-violet-500/20",
      textColor: "text-purple-400"
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
      const shuffled = [...category.items].sort(() => Math.random() - 0.5);
      setCurrentItems(shuffled.slice(0, 6)); // Show 6 items at a time
    };

    shuffleItems();
    const shuffleInterval = setInterval(shuffleItems, 3000);

    return () => clearInterval(shuffleInterval);
  }, [currentCategory]);

  const currentCategoryData = categories[currentCategory];

  return (
    <div className="w-full py-6 bg-gradient-to-r from-background/80 via-muted/20 to-background/80 backdrop-blur-sm border-y border-border/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          {/* Category Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`p-2 rounded-full bg-gradient-to-r ${currentCategoryData.color} backdrop-blur-sm`}>
              <currentCategoryData.icon className={`h-5 w-5 ${currentCategoryData.textColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {currentCategoryData.title}
            </h3>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              <Star className="h-4 w-4 text-primary fill-current" />
            </div>
          </div>

          {/* Scrolling Items */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left space-x-8 whitespace-nowrap">
              {/* Duplicate items for seamless loop */}
              {[...currentItems, ...currentItems, ...currentItems].map((item, index) => (
                <div
                  key={`${currentCategory}-${index}`}
                  className="inline-flex items-center px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {item}
                  </span>
                  <Zap className="h-3 w-3 ml-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Category Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {categories.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentCategory 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}