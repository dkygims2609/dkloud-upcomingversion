import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Film, Bot, Gem, Youtube, Newspaper, Smartphone, ShoppingBag, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNewsData } from "@/hooks/useNewsData";
import { useGadgetData } from "@/hooks/useGadgetData";
import { useGemWebsites } from "@/hooks/useGemWebsites";
import { AudioPlayer } from "@/components/AudioPlayer";

const navItems = [
  { name: "Movies & TV", href: "/movies", Icon: Film, dataKey: 'movies' },
  { name: "AI Tools", href: "/ai-tools", Icon: Bot, dataKey: 'ai' },
  { name: "Gem Websites", href: "#", Icon: Gem, dataKey: 'gems' },
  { name: "Youtube Picks", href: "/youtube-channels", Icon: Youtube, dataKey: 'youtube' },
  { name: "Tech News", href: "/tech-news", Icon: Newspaper, dataKey: 'news' },
  { name: "Smart Tech", href: "/smart-tech", Icon: Smartphone, dataKey: 'gadgets' },
  { name: "dKloud Products", href: "/digi-products", Icon: ShoppingBag, dataKey: 'products' },
  { name: "Services", href: "/services", Icon: Settings, dataKey: 'services' },
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

export function CircularNavigation() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  
  // Backend data hooks
  const { news, loading: newsLoading } = useNewsData();
  const { gadgets, loading: gadgetsLoading } = useGadgetData();
  const { websites: gemWebsites, loading: gemWebsitesLoading } = useGemWebsites();
  
  // Get data counts for segments
  const getSegmentData = (dataKey: string) => {
    switch (dataKey) {
      case 'news': return { count: news.length, loading: newsLoading };
      case 'gadgets': return { count: gadgets.length, loading: gadgetsLoading };
      case 'gems': return { count: gemWebsites.length, loading: gemWebsitesLoading };
      case 'movies': return { count: 150, loading: false }; // Placeholder
      case 'ai': return { count: 25, loading: false }; // Placeholder
      case 'youtube': return { count: 12, loading: false }; // Placeholder
      case 'products': return { count: 6, loading: false }; // Placeholder
      case 'services': return { count: 4, loading: false }; // Placeholder
      default: return { count: 0, loading: false };
    }
  };
  
  const centerX = 250;
  const centerY = 250;
  const outerRadius = 200;
  const innerRadius = 100;
  const segmentAngle = 360 / navItems.length;
  const gap = 2; // Clean gap between segments

  // Enhanced segment colors using website theme
  const segmentColors = [
    'hsl(var(--secondary))', // Services - Purple
    'hsl(var(--primary))', // Movies & TV - Blue  
    'hsl(var(--blue-purple))', // AI Tools - Blue-purple
    'hsl(var(--accent))', // Gem Websites - Teal
    'hsl(220 100% 65%)', // YouTube Picks - Cyan
    'hsl(var(--royal-purple))', // Tech News - Royal purple
    'hsl(var(--orchid))', // Smart Tech - Pink
    'hsl(var(--blue-purple))', // dKloud Products - Blue-purple
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[500px] flex items-center justify-center">
      {/* Enhanced Main SVG Circle */}
      <svg
        width={centerX * 2}
        height={centerY * 2}
        className={cn(
          "transition-all duration-500 drop-shadow-lg",
          isSpinning && "animate-spin"
        )}
        style={{ 
          animationDuration: isSpinning ? "90s" : "0s"
        }}
        onMouseEnter={() => setIsSpinning(false)}
        onMouseLeave={() => setIsSpinning(true)}
      >
        <defs>
          {/* Enhanced segment gradients with theme colors */}
          {navItems.map((_, index) => {
            const baseColor = segmentColors[index % segmentColors.length];
            
            return (
              <linearGradient key={index} id={`segmentGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={baseColor} stopOpacity={0.9} />
                <stop offset="100%" stopColor={baseColor} stopOpacity={0.6} />
              </linearGradient>
            );
          })}
          
          {/* Center hub gradient */}
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity={0.95} />
            <stop offset="100%" stopColor="hsl(var(--card))" stopOpacity={0.98} />
          </linearGradient>
        </defs>

        {navItems.map((item, index) => {
          const startAngle = index * segmentAngle + gap / 2;
          const endAngle = (index + 1) * segmentAngle - gap / 2;
          const isHovered = hoveredSegment === item.name;
          const midAngle = (startAngle + endAngle) / 2;
          const iconRadius = outerRadius * 0.65;
          const iconPos = polarToCartesian(centerX, centerY, iconRadius, midAngle);
          const labelRadius = outerRadius * 0.88;
          const labelPos = polarToCartesian(centerX, centerY, labelRadius, midAngle);
          
          // Get segment data
          const segmentData = getSegmentData(item.dataKey);
          
          // Create segment path
          const segmentPath = createSegmentPath(centerX, centerY, outerRadius, startAngle, endAngle);
          const innerPath = createSegmentPath(centerX, centerY, innerRadius, startAngle, endAngle);
          
          return (
            <g key={item.name}>
              <Link to={item.href} onClick={() => {
                toast.success(`🚀 ${item.name}`, { 
                  description: `${segmentData.count} items available`,
                  duration: 2000 
                });
              }}>
                {/* Main segment */}
                <path
                  d={segmentPath}
                  fill={`url(#segmentGradient${index})`}
                  stroke="hsl(var(--border))"
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 15px hsl(var(--primary) / 0.5))' : 'none'
                  }}
                  onMouseEnter={() => setHoveredSegment(item.name)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
                
                {/* Inner cutout */}
                <path
                  d={innerPath}
                  fill="hsl(var(--background))"
                />
                
                {/* Enhanced Icon with better positioning */}
                <circle
                  cx={iconPos.x}
                  cy={iconPos.y}
                  r="16"
                  fill={isHovered ? "hsl(var(--background) / 0.8)" : "hsl(var(--background) / 0.6)"}
                  stroke={isHovered ? "hsl(var(--primary))" : "hsl(var(--border))"}
                  strokeWidth="1"
                  className="transition-all duration-300"
                />
                <foreignObject 
                  x={iconPos.x - 10} 
                  y={iconPos.y - 10} 
                  width="20" 
                  height="20"
                  className="pointer-events-none"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <item.Icon 
                      className={cn(
                        "w-4 h-4 transition-all duration-300",
                        isHovered ? "text-primary" : "text-foreground"
                      )}
                    />
                  </div>
                </foreignObject>
                
                {/* Enhanced Label with better contrast */}
                <text
                  x={labelPos.x}
                  y={labelPos.y - 6}
                  className={cn(
                    "text-sm font-semibold transition-all duration-300 pointer-events-none",
                    "drop-shadow-sm"
                  )}
                  fill={isHovered ? "white" : "hsl(var(--foreground))"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ 
                    textShadow: isHovered ? "0 1px 3px rgba(0,0,0,0.5)" : "0 1px 2px rgba(0,0,0,0.2)"
                  }}
                >
                  {item.name}
                </text>
                
                {/* Enhanced Data count */}
                <text
                  x={labelPos.x}
                  y={labelPos.y + 8}
                  className={cn(
                    "text-xs font-medium transition-all duration-300 pointer-events-none"
                  )}
                  fill={isHovered ? "white" : "hsl(var(--muted-foreground))"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ 
                    textShadow: isHovered ? "0 1px 2px rgba(0,0,0,0.5)" : "none"
                  }}
                >
                  {segmentData.loading ? '⟳' : segmentData.count}
                </text>
              </Link>
            </g>
          );
        })}
      </svg>

      {/* Enhanced Central Hub with Audio Player */}
      <div 
        className="absolute rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 overflow-hidden"
        style={{ 
          width: innerRadius * 2, 
          height: innerRadius * 2,
          background: "url(#centerGradient)",
          border: "3px solid hsl(var(--primary) / 0.3)",
          boxShadow: "0 0 30px hsl(var(--primary) / 0.2), inset 0 1px 0 hsl(var(--foreground) / 0.1)"
        }}
      >
        <div className="text-center p-4 w-full">
          <div className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            dKloud Universe
          </div>
          
          {/* Compact Audio Section */}
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">
              🎧 What is dKloud?
            </div>
            <div className="scale-75 -mt-2 -mb-2">
              <AudioPlayer 
                audioSrc="/dKloudaudio.wav"
                title="Listen"
                description=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}