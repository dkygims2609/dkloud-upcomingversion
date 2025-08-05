import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Youtube, Brain, BookOpen, Zap, Package, Briefcase, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

  const radius = 140;
  const centerSize = 120;

  return (
    <div className="relative w-full max-w-md mx-auto h-80 flex items-center justify-center">
      {/* Central Hub */}
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
        <div className="text-center">
          <div className="text-lg font-bold text-primary mb-1">dKloud</div>
          <div className="text-xs text-muted-foreground">Universe</div>
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
                "absolute w-16 h-16 rounded-full border-2 border-border bg-gradient-to-br backdrop-blur-sm flex items-center justify-center transition-all duration-300 group hover:scale-125 hover:shadow-lg",
                item.color,
                hoveredItem === item.name ? "border-primary shadow-lg shadow-primary/20 scale-110" : "hover:border-primary/50"
              )}
              style={{
                left: `calc(50% + ${x}px - 32px)`,
                top: `calc(50% + ${y}px - 32px)`,
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
              <div className="relative">
                <item.Icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                
                {/* Tooltip */}
                <div className={cn(
                  "absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover border border-border rounded text-xs whitespace-nowrap transition-all duration-200 pointer-events-none",
                  hoveredItem === item.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}>
                  {item.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-border"></div>
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