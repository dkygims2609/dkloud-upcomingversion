import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Youtube, Brain, BookOpen, Zap, Package, Briefcase, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AudioPlayer } from "./AudioPlayer";

const navItems = [
  { name: "Movies & TV", href: "/movies", Icon: Clapperboard, color: "from-cyan-400/30 to-blue-400/30", techColor: "shadow-cyan-400/50" },
  { name: "AI Tools", href: "/aitools", Icon: Brain, color: "from-blue-400/30 to-indigo-400/30", techColor: "shadow-blue-400/50" },
  { name: "YouTube", href: "/youtubechannels", Icon: Youtube, color: "from-red-400/30 to-pink-400/30", techColor: "shadow-red-400/50" },
  { name: "Tech Corner", href: "/techcorner", Icon: BookOpen, color: "from-green-400/30 to-emerald-400/30", techColor: "shadow-green-400/50" },
  { name: "SmartTech", href: "/smarttech", Icon: Zap, color: "from-yellow-400/30 to-orange-400/30", techColor: "shadow-yellow-400/50" },
  { name: "Products", href: "/digiproducts", Icon: Package, color: "from-purple-400/30 to-violet-400/30", techColor: "shadow-purple-400/50" },
  { name: "Services", href: "/services", Icon: Briefcase, color: "from-indigo-400/30 to-blue-400/30", techColor: "shadow-indigo-400/50" },
];

export function CircularNavigation() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const radius = 220;
  const centerSize = 200;

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] flex items-center justify-center">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--primary)/0.1) 1px, transparent 1px),
            linear-gradient(0deg, hsl(var(--primary)/0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Scanning Lines */}
      <div className={cn(
        "absolute inset-0 rounded-full border-2 border-cyan-400/30 transition-all duration-1000",
        isHovered ? "animate-ping" : ""
      )} style={{ animationDuration: "3s" }}></div>
      
      {/* Energy Pulses */}
      <div className="absolute inset-8 rounded-full border border-blue-400/40 animate-pulse"></div>
      <div className="absolute inset-12 rounded-full border border-indigo-400/30 animate-pulse" style={{ animationDelay: "1s" }}></div>

      {/* Central Hub */}
      <div 
        className={cn(
          "absolute rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-500/20 border-2 border-cyan-400/50 flex items-center justify-center transition-all duration-500 z-10 backdrop-blur-md shadow-2xl",
          isHovered ? "scale-105 shadow-cyan-400/30" : "scale-100"
        )}
        style={{ 
          width: centerSize, 
          height: centerSize,
          boxShadow: `
            0 0 30px hsl(var(--primary)/0.3),
            inset 0 0 30px hsl(var(--primary)/0.1),
            0 0 60px hsl(196 100% 50% / 0.2)
          `
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hexagonal Pattern Overlay */}
        <div className="absolute inset-2 rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
        
        {/* Audio Player Container */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4">
          <div className="text-center mb-3">
            <div className="text-sm font-bold text-cyan-400 mb-1 tracking-wider">dKloud</div>
            <div className="text-xs text-cyan-300/80 font-medium">Universe</div>
          </div>
          <div className="w-full">
            <AudioPlayer 
              audioSrc="/dKloudaudio.wav" 
              title="What is dKloud?" 
              description="Listen to our introduction"
            />
          </div>
        </div>

        {/* Tech Ornaments */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20"></div>
        <div className="absolute inset-1 rounded-full border border-blue-400/20"></div>
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
                "absolute w-20 h-20 rounded-full border-2 backdrop-blur-md flex items-center justify-center transition-all duration-500 group relative overflow-hidden",
                "bg-gradient-to-br border-cyan-400/40 hover:border-cyan-400/80",
                item.color,
                hoveredItem === item.name 
                  ? `border-cyan-400 scale-125 ${item.techColor} shadow-2xl` 
                  : "hover:scale-110 hover:shadow-xl hover:shadow-cyan-400/20"
              )}
              style={{
                left: `calc(50% + ${x}px - 40px)`,
                top: `calc(50% + ${y}px - 40px)`,
                boxShadow: hoveredItem === item.name 
                  ? `0 0 30px hsl(196 100% 50% / 0.4), inset 0 0 20px hsl(196 100% 50% / 0.1)`
                  : `0 0 15px hsl(196 100% 50% / 0.2)`
              }}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                toast.success(`🚀 ${item.name} Activated`, { 
                  description: `Initializing ${item.name} interface...`,
                  duration: 2000 
                });
              }}
            >
              {/* Tech Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Scanning Ring */}
              <div className={cn(
                "absolute inset-0 rounded-full border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300",
                hoveredItem === item.name ? "animate-ping" : ""
              )}></div>

              <div className="relative z-10">
                <item.Icon className={cn(
                  "h-8 w-8 transition-all duration-300",
                  hoveredItem === item.name 
                    ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                    : "text-cyan-300 group-hover:text-cyan-400"
                )} />
                
                {/* Holographic Name Label */}
                <div className={cn(
                  "absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-900/90 border border-cyan-400/50 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300 pointer-events-none backdrop-blur-sm",
                  "shadow-lg shadow-cyan-400/20",
                  hoveredItem === item.name 
                    ? "opacity-100 translate-y-0 text-cyan-400 border-cyan-400 shadow-cyan-400/40" 
                    : "opacity-0 translate-y-2 text-cyan-300"
                )}>
                  {item.name}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-cyan-400/50"></div>
                  
                  {/* Tech Corner Decorations */}
                  <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-cyan-400/60"></div>
                  <div className="absolute top-0 right-0 w-1 h-1 border-r border-t border-cyan-400/60"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 border-l border-b border-cyan-400/60"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-cyan-400/60"></div>
                </div>
              </div>

              {/* Energy Connection Line to Center */}
              {hoveredItem === item.name && (
                <div 
                  className="absolute w-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent animate-pulse"
                  style={{
                    height: `${radius - 100}px`,
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'top center',
                    transform: `translateX(-50%) translateY(-50%) rotate(${angle + 180}deg)`
                  }}
                ></div>
              )}
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