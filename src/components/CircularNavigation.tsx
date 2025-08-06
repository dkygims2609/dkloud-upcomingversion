import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Youtube, Brain, BookOpen, Zap, Package, Briefcase, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEnhancedNewsData } from "@/hooks/useEnhancedNewsData";
import { useLatestGadgets } from "@/hooks/useLatestGadgets";
import { useGemWebsites } from "@/hooks/useGemWebsites";
import { AudioPlayer } from "./AudioPlayer";

const navItems = [
  { name: "Movies & TV", href: "/movies", Icon: Clapperboard, color: "from-red-500/20 to-pink-500/20" },
  { name: "AI Tools", href: "/aitools", Icon: Brain, color: "from-blue-500/20 to-cyan-500/20" },
  { name: "YouTube", href: "/youtubechannels", Icon: Youtube, color: "from-red-600/20 to-red-400/20" },
  { name: "Tech Corner", href: "/techcorner", Icon: BookOpen, color: "from-green-500/20 to-emerald-500/20" },
  { name: "SmartTech", href: "/smarttech", Icon: Zap, color: "from-yellow-500/20 to-orange-500/20" },
  { name: "Products", href: "/digiproducts", Icon: Package, color: "from-purple-500/20 to-violet-500/20" },
  { name: "Services", href: "/services", Icon: Briefcase, color: "from-indigo-500/20 to-blue-500/20" },
];

export function CircularNavigation() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const { news } = useEnhancedNewsData();
  const { gadgets } = useLatestGadgets();
  const { websites } = useGemWebsites();

  const radius = 220; // Increased for better spacing
  const centerSize = 150;

  const navItems = [
    { name: "Movies & TV", href: "/movies", Icon: Clapperboard, color: "from-purple-500/20 to-blue-500/20", count: "500+" },
    { name: "AI Tools", href: "/aitools", Icon: Brain, color: "from-blue-500/20 to-cyan-500/20", count: "200+" },
    { name: "Gem Websites", href: "/gem-websites", Icon: Youtube, color: "from-red-600/20 to-red-400/20", count: `${websites.length}+` },
    { name: "Tech Corner", href: "/techcorner", Icon: BookOpen, color: "from-green-500/20 to-emerald-500/20", count: `${news.length}+` },
    { name: "SmartTech", href: "/smarttech", Icon: Zap, color: "from-yellow-500/20 to-orange-500/20", count: `${gadgets.length}+` },
    { name: "Products", href: "/digiproducts", Icon: Package, color: "from-purple-500/20 to-violet-500/20", count: "50+" },
    { name: "Services", href: "/services", Icon: Briefcase, color: "from-indigo-500/20 to-blue-500/20", count: "10+" },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto h-96 flex items-center justify-center">
      {/* Central Hub with Audio */}
      <div 
        className={cn(
          "absolute rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 flex items-center justify-center transition-all duration-500 z-10 backdrop-blur-sm",
          isHovered ? "scale-110 shadow-2xl shadow-primary/20" : "scale-100"
        )}
        style={{ 
          width: centerSize, 
          height: centerSize 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center p-2">
          <div className="text-sm font-bold text-primary mb-1">dKloud</div>
          <div className="text-xs text-muted-foreground mb-2">Universe</div>
          <AudioPlayer 
            audioSrc="/dKloudaudio.wav" 
            title=""
            compact={true}
          />
        </div>
      </div>

      {/* Rotating Container */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-1000 ease-in-out",
          isHovered ? "animate-spin" : ""
        )}
        style={{ 
          animationDuration: isHovered ? "20s" : "0s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          '--rotation-angle': isHovered ? '360deg' : '0deg'
        } as React.CSSProperties}
      >
        {navItems.map((item, index) => {
          const angle = (index * 360) / navItems.length;
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "absolute w-28 h-28 rounded-full border-2 border-border bg-gradient-to-br backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 group hover:scale-125 hover:shadow-xl hover:shadow-primary/30",
                item.color,
                hoveredItem === item.name ? "border-primary shadow-xl shadow-primary/30 scale-115" : "hover:border-primary/50"
              )}
              style={{
                left: `calc(50% + ${x}px - 56px)`, // Adjusted for larger size (28px radius)
                top: `calc(50% + ${y}px - 56px)`, // Adjusted for larger size (28px radius)
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
              <div 
                className="relative text-center"
                style={{
                  transform: isHovered ? 'rotate(calc(-1 * var(--rotation-angle, 0deg)))' : 'rotate(0deg)',
                  transition: 'transform 1000ms ease-in-out'
                }}
              >
                <item.Icon className="h-8 w-8 text-foreground group-hover:text-primary transition-colors mx-auto mb-1" />
                <div className="text-xs font-medium text-muted-foreground group-hover:text-primary">{item.count}</div>
                
                {/* Enhanced YouTube-style Tooltip */}
                <div className={cn(
                  "absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 px-4 py-3 bg-background/95 backdrop-blur-md border border-border rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 pointer-events-none shadow-2xl z-50",
                  hoveredItem === item.name ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-90"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-gradient-to-br", item.color)}>
                      <item.Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="text-left">
                      <div className="text-foreground font-bold">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.count} items</div>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-background/95"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Orbital Lines */}
      <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 opacity-50"></div>
      <div className="absolute inset-4 rounded-full border border-dotted border-secondary/20 opacity-30"></div>
    </div>
  );
}