import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Film, Bot, Gem, Youtube, Newspaper, Smartphone, ShoppingBag, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNewsData } from "@/hooks/useNewsData";
import { useGadgetData } from "@/hooks/useGadgetData";

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
  
  // Get data counts for segments
  const getSegmentData = (dataKey: string) => {
    switch (dataKey) {
      case 'news': return { count: news.length, loading: newsLoading };
      case 'gadgets': return { count: gadgets.length, loading: gadgetsLoading };
      case 'movies': return { count: 150, loading: false }; // Placeholder
      case 'ai': return { count: 25, loading: false }; // Placeholder
      case 'gems': return { count: 8, loading: false }; // Placeholder
      case 'youtube': return { count: 12, loading: false }; // Placeholder
      case 'products': return { count: 6, loading: false }; // Placeholder
      case 'services': return { count: 4, loading: false }; // Placeholder
      default: return { count: 0, loading: false };
    }
  };
  
  const centerX = 200;
  const centerY = 200;
  const outerRadius = 160;
  const innerRadius = 80;
  const segmentAngle = 360 / navItems.length;
  const gap = 1; // Minimal gap between segments

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[400px] flex items-center justify-center">
      {/* Clean Main SVG Circle */}
      <svg
        width={centerX * 2}
        height={centerY * 2}
        className={cn(
          "transition-all duration-500",
          isSpinning && "animate-spin"
        )}
        style={{ 
          animationDuration: isSpinning ? "60s" : "0s"
        }}
        onMouseEnter={() => setIsSpinning(false)}
        onMouseLeave={() => setIsSpinning(true)}
      >
        <defs>
          {/* Segment gradients */}
          {navItems.map((_, index) => {
            const colors = [
              'hsl(220, 70%, 50%)', // Blue
              'hsl(280, 70%, 55%)', // Purple
              'hsl(320, 70%, 50%)', // Pink
              'hsl(200, 70%, 45%)', // Cyan
              'hsl(260, 70%, 60%)', // Violet
              'hsl(340, 70%, 55%)', // Rose
              'hsl(180, 70%, 50%)', // Teal
              'hsl(240, 70%, 55%)', // Indigo
            ];
            const baseColor = colors[index % colors.length];
            
            return (
              <linearGradient key={index} id={`segmentGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={baseColor} stopOpacity={0.8} />
                <stop offset="100%" stopColor={baseColor} stopOpacity={0.4} />
              </linearGradient>
            );
          })}
        </defs>

        {navItems.map((item, index) => {
          const startAngle = index * segmentAngle + gap / 2;
          const endAngle = (index + 1) * segmentAngle - gap / 2;
          const isHovered = hoveredSegment === item.name;
          const midAngle = (startAngle + endAngle) / 2;
          const iconRadius = outerRadius * 0.7;
          const iconPos = polarToCartesian(centerX, centerY, iconRadius, midAngle);
          const labelRadius = outerRadius * 0.85;
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
                
                {/* Icon */}
                <foreignObject 
                  x={iconPos.x - 12} 
                  y={iconPos.y - 12} 
                  width="24" 
                  height="24"
                  className="pointer-events-none"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <item.Icon 
                      className={cn(
                        "w-5 h-5 transition-all duration-300",
                        isHovered ? "text-white" : "text-foreground"
                      )}
                    />
                  </div>
                </foreignObject>
                
                {/* Label */}
                <text
                  x={labelPos.x}
                  y={labelPos.y - 5}
                  className={cn(
                    "text-xs font-medium transition-all duration-300 pointer-events-none",
                    isHovered ? "fill-white" : "fill-foreground"
                  )}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {item.name}
                </text>
                
                {/* Data count */}
                <text
                  x={labelPos.x}
                  y={labelPos.y + 8}
                  className={cn(
                    "text-xs transition-all duration-300 pointer-events-none",
                    isHovered ? "fill-white/80" : "fill-muted-foreground"
                  )}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {segmentData.loading ? '...' : segmentData.count}
                </text>
              </Link>
            </g>
          );
        })}
      </svg>

      {/* Clean Central Hub */}
      <div 
        className="absolute rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
        style={{ 
          width: innerRadius * 2, 
          height: innerRadius * 2,
          background: "hsl(var(--background) / 0.9)",
          border: "2px solid hsl(var(--border))",
          boxShadow: "0 0 20px hsl(var(--primary) / 0.1)"
        }}
      >
        <div className="text-center">
          <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
            dKloud
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Universe
          </div>
        </div>
      </div>
    </div>
  );
}