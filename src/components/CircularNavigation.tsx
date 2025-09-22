import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Globe, Brain, Zap, Package, Briefcase, Play, Pause } from "lucide-react";
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
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { news } = useEnhancedNewsData();
  const { gadgets } = useLatestGadgets();
  const { websites } = useGemWebsitesAPI();
  const { movies } = useTrendingMovies();

  // Responsive sizing based on screen size
  const radius = isMobile ? 120 : 200; // Smaller radius for mobile
  const centerSize = isMobile ? 80 : 120; // Smaller center for mobile
  const iconSize = isMobile ? 50 : 72; // Smaller icons for mobile

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { name: "Movies & TV", href: "/movies", Icon: Clapperboard, color: "nav-deep-blue", count: `${movies.length || 500}+` },
    { name: "AI Tools", href: "/aitools", Icon: Brain, color: "nav-purple", count: "200+" },
    { name: "Gem Websites", href: "/gem-websites", Icon: Globe, color: "nav-green", count: `${websites.length || 0}+` },
    { name: "SmartTech", href: "/smarttech", Icon: Zap, color: "nav-deep-purple", count: `${gadgets.length || 0}+` },
    { name: "Products", href: "/digiproducts", Icon: Package, color: "nav-violet", count: "50+" },
    { name: "Services", href: "/services", Icon: Briefcase, color: "nav-slate", count: "10+" },
  ];

  return (
    <div className={cn(
      "relative w-full mx-auto flex items-center justify-center px-4",
      isMobile ? "h-[350px] max-w-sm" : "h-[550px] max-w-3xl"
    )}>
      {/* Enhanced Central Hub */}
      <div 
        className={cn(
          "absolute rounded-full bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 border-3 border-primary/60 flex items-center justify-center transition-all duration-500 z-20 backdrop-blur-lg shadow-2xl",
          isHovered ? "scale-110 shadow-3xl shadow-primary/50 border-primary/80" : "scale-100"
        )}
        style={{ 
          width: centerSize, 
          height: centerSize,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          setIsOrbiting(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsOrbiting(false);
        }}
      >
        <div className={cn("text-center", isMobile ? "p-2" : "p-4")}>
          <div className={cn("font-bold text-primary mb-1", isMobile ? "text-sm" : "text-lg")}>
            dKloud
          </div>
          <div className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>
            Universe
          </div>
        </div>
      </div>

      {/* Navigation Items - Orbital Motion */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-1000",
        isOrbiting ? "animate-orbital-rotation" : ""
      )}>
        {navItems.map((item, index) => {
          // Start from top (-90 degrees) for better visual alignment
          const angle = -90 + (index * 360) / navItems.length;
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          const isHovering = hoveredItem === item.name;

          return (
            <div key={item.name} className="absolute">
              <Link
                to={item.href}
                className={cn(
                  "absolute rounded-full border-2 border-white/20 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 group shadow-lg",
                  isOrbiting ? "animate-counter-rotation" : "",
                  isHovering ? "animate-counter-rotation-paused" : "",
                  item.color,
                  isHovering ? "scale-150 border-white/40 shadow-2xl shadow-white/40 z-50" : "scale-100 hover:scale-125 hover:border-white/30 hover:shadow-xl"
                )}
                style={{
                  width: iconSize,
                  height: iconSize,
                  left: `calc(50% + ${x}px - ${iconSize/2}px)`,
                  top: `calc(50% + ${y}px - ${iconSize/2}px)`,
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
                    isHovering 
                      ? isMobile ? "h-5 w-5 text-white" : "h-8 w-8 text-white"
                      : isMobile ? "h-4 w-4 text-white group-hover:text-white" : "h-6 w-6 text-white group-hover:text-white"
                  )} />
                  <div className={cn(
                    "font-medium transition-all duration-300 px-1 py-0.5 bg-background/80 rounded-md",
                    isMobile ? "text-[8px]" : "text-[10px]",
                    isHovering ? "text-primary font-bold" : "text-muted-foreground group-hover:text-primary"
                  )}>
                    {item.count}
                  </div>
                </div>
              </Link>
              
              {/* Enhanced Tooltip - Hidden on mobile for better UX */}
              {!isMobile && (
                <div className={cn(
                  "absolute px-4 py-3 bg-background/95 backdrop-blur-md border border-border/80 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 pointer-events-none shadow-2xl",
                  isHovering ? "opacity-100 translate-y-0 scale-100 visible z-[60]" : "opacity-0 translate-y-3 scale-90 invisible"
                )}
                 style={{
                  left: `calc(50% + ${x}px - 60px)`,
                  top: `calc(50% + ${y}px - 120px)`,
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
              )}
            </div>
          );
        })}
      </div>

      {/* Orbital Lines - Properly Centered */}
      <div 
        className="absolute rounded-full border border-dashed border-primary/20 opacity-50"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      <div 
        className="absolute rounded-full border border-dotted border-secondary/20 opacity-30"
        style={{
          width: (radius - 20) * 2,
          height: (radius - 20) * 2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
    </div>
  );
}