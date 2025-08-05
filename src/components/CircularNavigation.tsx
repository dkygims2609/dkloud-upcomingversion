import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, Youtube, Brain, BookOpen, Zap, Package, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AudioPlayer } from "./AudioPlayer";

const navItems = [
  { name: "Movies & TV", href: "/movies", Icon: Clapperboard, color: "hsl(280, 80%, 65%)" },
  { name: "AI Tools", href: "/aitools", Icon: Brain, color: "hsl(260, 85%, 70%)" },
  { name: "YouTube", href: "/youtubechannels", Icon: Youtube, color: "hsl(240, 90%, 75%)" },
  { name: "Tech Corner", href: "/techcorner", Icon: BookOpen, color: "hsl(220, 85%, 70%)" },
  { name: "SmartTech", href: "/smarttech", Icon: Zap, color: "hsl(200, 80%, 65%)" },
  { name: "Products", href: "/digiproducts", Icon: Package, color: "hsl(300, 85%, 60%)" },
  { name: "Services", href: "/services", Icon: Briefcase, color: "hsl(320, 80%, 65%)" },
];

// Helper function to create SVG path for pie segment
const createSegmentPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  return [
    "M", centerX, centerY,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

// Helper function to get icon position
const getIconPosition = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
  const midAngle = (startAngle + endAngle) / 2;
  const iconRadius = radius * 0.75; // Position icons at 75% of segment radius
  return polarToCartesian(centerX, centerY, iconRadius, midAngle);
};

export function CircularNavigation() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  
  const centerX = 250;
  const centerY = 250;
  const outerRadius = 180;
  const innerRadius = 100;
  const segmentAngle = 360 / navItems.length;
  const gap = 3; // Gap between segments in degrees

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] flex items-center justify-center">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-indigo-500/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(280 80% 65% / 0.1) 1px, transparent 1px),
            linear-gradient(0deg, hsl(280 80% 65% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-pulse" style={{ animationDuration: "3s" }}></div>
      <div className="absolute inset-8 rounded-full border border-violet-400/15 animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }}></div>

      {/* Main SVG Circle */}
      <svg
        width={centerX * 2}
        height={centerY * 2}
        className="absolute inset-0 transition-transform duration-700 hover:scale-105"
        style={{ filter: "drop-shadow(0 0 20px hsl(280 80% 65% / 0.3))" }}
      >
        {navItems.map((item, index) => {
          const startAngle = index * segmentAngle + gap / 2;
          const endAngle = (index + 1) * segmentAngle - gap / 2;
          const isHovered = hoveredSegment === item.name;
          
          // Create outer and inner paths for the segment
          const outerPath = createSegmentPath(centerX, centerY, outerRadius, startAngle, endAngle);
          const innerPath = createSegmentPath(centerX, centerY, innerRadius, startAngle, endAngle);
          
          return (
            <g key={item.name}>
              {/* Segment Background */}
              <path
                d={outerPath}
                fill={item.color}
                opacity={isHovered ? 0.9 : 0.7}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  filter: isHovered ? `drop-shadow(0 0 15px ${item.color})` : "none"
                }}
                onMouseEnter={() => setHoveredSegment(item.name)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              
              {/* Inner cutout */}
              <path
                d={innerPath}
                fill="transparent"
              />
              
              {/* Hover effect overlay */}
              {isHovered && (
                <path
                  d={outerPath}
                  fill="url(#glowGradient)"
                  opacity={0.3}
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })}
        
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity={0.8} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>

      {/* Navigation Icons and Links */}
      {navItems.map((item, index) => {
        const startAngle = index * segmentAngle + gap / 2;
        const endAngle = (index + 1) * segmentAngle - gap / 2;
        const iconPos = getIconPosition(centerX, centerY, outerRadius, startAngle, endAngle);
        const isHovered = hoveredSegment === item.name;
        
        return (
          <Link
            key={`icon-${item.name}`}
            to={item.href}
            className="absolute transition-all duration-300 group"
            style={{
              left: iconPos.x - 20,
              top: iconPos.y - 20,
              transform: isHovered ? "scale(1.2)" : "scale(1)"
            }}
            onMouseEnter={() => setHoveredSegment(item.name)}
            onMouseLeave={() => setHoveredSegment(null)}
            onClick={() => {
              toast.success(`🚀 ${item.name} Activated`, { 
                description: `Navigating to ${item.name}...`,
                duration: 2000 
              });
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              <item.Icon 
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isHovered ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "text-white/80"
                )} 
              />
            </div>
            
            {/* Tooltip */}
            <div className={cn(
              "absolute top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-900/90 border border-purple-400/50 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300 pointer-events-none backdrop-blur-sm text-white",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}>
              {item.name}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-purple-400/50"></div>
            </div>
          </Link>
        );
      })}

      {/* Central Hub with Audio Player */}
      <div 
        className="absolute rounded-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border-2 border-purple-400/50 flex items-center justify-center z-20 backdrop-blur-md shadow-2xl transition-all duration-500 hover:scale-105"
        style={{ 
          width: innerRadius * 2, 
          height: innerRadius * 2,
          boxShadow: `
            0 0 30px hsl(280 80% 65% / 0.4),
            inset 0 0 30px hsl(280 80% 65% / 0.1)
          `
        }}
      >
        {/* Inner decorative rings */}
        <div className="absolute inset-2 rounded-full border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
        <div className="absolute inset-4 rounded-full border border-violet-400/20"></div>
        
        {/* Audio Player Container */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4 w-full">
          <div className="text-center mb-3">
            <div className="text-sm font-bold text-purple-400 mb-1 tracking-wider">dKloud</div>
            <div className="text-xs text-purple-300/80 font-medium">Universe</div>
          </div>
          <div className="w-full">
            <AudioPlayer 
              audioSrc="/dKloudaudio.wav" 
              title="What is dKloud?" 
              description="Listen to our introduction"
            />
          </div>
        </div>
      </div>

      {/* Outer decorative border */}
      <div 
        className="absolute rounded-full border-2 border-purple-400/20 pointer-events-none"
        style={{ 
          width: (outerRadius + 20) * 2, 
          height: (outerRadius + 20) * 2,
          left: centerX - outerRadius - 20,
          top: centerY - outerRadius - 20
        }}
      ></div>
    </div>
  );
}