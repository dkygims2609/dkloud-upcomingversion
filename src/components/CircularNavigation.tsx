import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Youtube, Brain, BookOpen, Zap, Package, Briefcase, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNewsData } from "@/hooks/useNewsData";
import { useGadgetData } from "@/hooks/useGadgetData";
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
  
  const { news } = useNewsData();
  const { gadgets } = useGadgetData();

  const radius = 220; // Increased from 180
  const centerSize = 160; // Increased from 140

  const navItems = [
    { name: "Movies & TV", href: "/movies", Icon: Clapperboard, color: "from-purple-500/20 to-blue-500/20", count: "500+" },
    { name: "AI Tools", href: "/aitools", Icon: Brain, color: "from-blue-500/20 to-cyan-500/20", count: "200+" },
    { name: "YouTube", href: "/youtubechannels", Icon: Youtube, color: "from-red-600/20 to-red-400/20", count: "100+" },
    { name: "Tech News", href: "/techcorner", Icon: BookOpen, color: "from-green-500/20 to-emerald-500/20", count: `${news.length}+` },
    { name: "SmartTech", href: "/smarttech", Icon: Zap, color: "from-yellow-500/20 to-orange-500/20", count: `${gadgets.length}+` },
    { name: "Products", href: "/digiproducts", Icon: Package, color: "from-purple-500/20 to-violet-500/20", count: "50+" },
    { name: "Services", href: "/services", Icon: Briefcase, color: "from-indigo-500/20 to-blue-500/20", count: "10+" },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] flex items-center justify-center"> {/* Increased container size */}
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
          isHovered ? "" : "animate-spin"
        )}
        style={{ 
          animationDuration: isHovered ? "0s" : "30s", // Pause rotation on hover
          animationIterationCount: "infinite",
          animationTimingFunction: "linear"
        }}
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
                "absolute w-28 h-28 rounded-full border-2 border-border bg-gradient-to-br backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 group hover:scale-140 hover:shadow-2xl",
                item.color,
                hoveredItem === item.name ? "border-primary shadow-2xl shadow-primary/30 scale-125 animate-pulse" : "hover:border-primary/50 hover:shadow-primary/20"
              )}
              style={{
                left: `calc(50% + ${x}px - 56px)`, // Adjusted for larger icons (28/2 = 14, 14*4 = 56)
                top: `calc(50% + ${y}px - 56px)`,
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
              <div className="relative text-center">
                <item.Icon className={cn(
                  "h-8 w-8 text-foreground group-hover:text-primary transition-all duration-300 mx-auto mb-1",
                  hoveredItem === item.name ? "animate-bounce scale-110" : ""
                )} />
                <div className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">{item.count}</div>
                <div className={cn(
                  "text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-all duration-300 mt-0.5",
                  hoveredItem === item.name ? "opacity-100" : "opacity-0"
                )}>
                  {item.name}
                </div>
                
                {/* Enhanced Tooltip */}
                <div className={cn(
                  "absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-popover/95 backdrop-blur-sm border border-primary/30 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 pointer-events-none shadow-lg",
                  hoveredItem === item.name ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
                )}>
                  {item.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary/30"></div>
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