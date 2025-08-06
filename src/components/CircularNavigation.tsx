import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Globe, Brain, BookOpen, Zap, Package, Briefcase, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEnhancedNewsData } from "@/hooks/useEnhancedNewsData";
import { useLatestGadgets } from "@/hooks/useLatestGadgets";
import { useGemWebsitesAPI } from "@/hooks/useGemWebsitesAPI";
import { useTrendingMovies } from "@/hooks/useTrendingMovies";
import { AudioPlayer } from "./AudioPlayer";


export function CircularNavigation() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const { news } = useEnhancedNewsData();
  const { gadgets } = useLatestGadgets();
  const { websites } = useGemWebsitesAPI();
  const { movies } = useTrendingMovies();

  const radius = 160; // Proper radius for better alignment
  const centerSize = 120; // Larger center for better visibility

  const navItems = [
    { name: "Movies & TV", href: "/movies", Icon: Clapperboard, color: "from-purple-500/20 to-blue-500/20", count: `${movies.length || 500}+` },
    { name: "AI Tools", href: "/aitools", Icon: Brain, color: "from-blue-500/20 to-cyan-500/20", count: "200+" },
    { name: "Gem Websites", href: "/gem-websites", Icon: Globe, color: "from-emerald-500/20 to-teal-500/20", count: `${websites.length || 0}+` },
    { name: "Tech Corner", href: "/techcorner", Icon: BookOpen, color: "from-green-500/20 to-emerald-500/20", count: `${news.length || 0}+` },
    { name: "SmartTech", href: "/smarttech", Icon: Zap, color: "from-yellow-500/20 to-orange-500/20", count: `${gadgets.length || 0}+` },
    { name: "Products", href: "/digiproducts", Icon: Package, color: "from-purple-500/20 to-violet-500/20", count: "50+" },
    { name: "Services", href: "/services", Icon: Briefcase, color: "from-indigo-500/20 to-blue-500/20", count: "10+" },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[450px] flex items-center justify-center">
      {/* Enhanced Central Hub */}
      <div 
        className={cn(
          "absolute rounded-full bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 border-3 border-primary/60 flex items-center justify-center transition-all duration-500 z-10 backdrop-blur-lg shadow-2xl",
          isHovered ? "scale-110 shadow-3xl shadow-primary/50 border-primary/80" : "scale-100"
        )}
        style={{ 
          width: centerSize, 
          height: centerSize 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center p-4">
          <div className="text-lg font-bold text-primary mb-1">dKloud</div>
          <div className="text-sm text-muted-foreground">Universe</div>
        </div>
      </div>

      {/* Navigation Items - No Rotation */}
      <div className="absolute inset-0">
        {navItems.map((item, index) => {
          const angle = (index * 360) / navItems.length;
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          const isHovering = hoveredItem === item.name;

          return (
            <div key={item.name} className="absolute">
              <Link
                to={item.href}
                className={cn(
                  "absolute w-16 h-16 rounded-full border-2 border-border/50 bg-gradient-to-br backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 group shadow-lg",
                  item.color,
                  isHovering ? "scale-150 border-primary/80 shadow-2xl shadow-primary/40 z-50" : "scale-100 hover:scale-125 hover:border-primary/60 hover:shadow-xl"
                )}
                style={{
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 32px)`,
                  zIndex: isHovering ? 50 : 10
                }}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  toast.success(`${item.name} activated`, { 
                    description: `Navigating to ${item.name.toLowerCase()}...`,
                    duration: 2000 
                  });
                }}
              >
                <div className="relative text-center w-full h-full flex flex-col items-center justify-center">
                  <item.Icon className={cn(
                    "transition-all duration-300 mx-auto mb-1",
                    isHovering ? "h-7 w-7 text-primary" : "h-5 w-5 text-foreground group-hover:text-primary"
                  )} />
                  <div className={cn(
                    "text-[9px] font-medium transition-all duration-300 px-1 py-0.5 bg-background/80 rounded-md",
                    isHovering ? "text-primary font-bold" : "text-muted-foreground group-hover:text-primary"
                  )}>
                    {item.count}
                  </div>
                </div>
              </Link>
              
              {/* Enhanced Tooltip */}
              <div className={cn(
                "absolute left-1/2 transform -translate-x-1/2 px-4 py-3 bg-background/95 backdrop-blur-md border border-border/80 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 pointer-events-none shadow-2xl",
                isHovering ? "opacity-100 translate-y-0 scale-100 visible z-[60]" : "opacity-0 translate-y-3 scale-90 invisible"
              )}
               style={{
                left: `calc(50% + ${x}px - 32px)`,
                top: `calc(50% + ${y}px - 100px)`, // Position above the icon
                zIndex: isHovering ? 60 : 0
              }}>
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg bg-gradient-to-br", item.color)}>
                    <item.Icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="text-foreground font-bold text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.count} items</div>
                  </div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-background/95"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbital Lines */}
      <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 opacity-50"></div>
      <div className="absolute inset-4 rounded-full border border-dotted border-secondary/20 opacity-30"></div>
    </div>
  );
}