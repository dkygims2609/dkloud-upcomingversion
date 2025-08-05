import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, Bot, Gem, Youtube, Newspaper, Smartphone, ShoppingBag, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


const navItems = [
  { name: "Movies & TV", href: "/movies", Icon: Film },
  { name: "AI Tools", href: "/ai-tools", Icon: Bot },
  { name: "Gem Websites", href: "#", Icon: Gem },
  { name: "Youtube Picks", href: "/youtube-channels", Icon: Youtube },
  { name: "Tech Corner", href: "/tech-corner", Icon: Newspaper },
  { name: "Smart Tech", href: "/smart-tech", Icon: Smartphone },
  { name: "dKloud Products", href: "/digi-products", Icon: ShoppingBag },
  { name: "Services", href: "/services", Icon: Settings },
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
  const iconRadius = radius * 0.78; // Position icons at 78% of segment radius
  return polarToCartesian(centerX, centerY, iconRadius, midAngle);
};

export function CircularNavigation() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  
  const centerX = 280;
  const centerY = 280;
  const outerRadius = 220;
  const innerRadius = 120;
  const segmentAngle = 360 / navItems.length;
  const gap = 2; // Gap between segments in degrees

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[560px] flex items-center justify-center">
      {/* Tech Grid Background with Iron Man aesthetics */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-blue-purple/20 to-secondary/25 rounded-full"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsl(var(--blue-purple) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, hsl(var(--accent) / 0.05) 0%, transparent 50%)
          `
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--primary) / 0.05) 1px, transparent 1px),
            linear-gradient(0deg, hsl(var(--primary) / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Holographic scanning lines */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-[slide-right_4s_ease-in-out_infinite]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent animate-[slide-down_6s_ease-in-out_infinite_reverse]"></div>
      </div>

      {/* Energy rings with pulsing effects */}
      <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-pulse" style={{ animationDuration: "2s" }}></div>
      <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-pulse" style={{ animationDuration: "3s", animationDelay: "1s" }}></div>
      <div className="absolute inset-8 rounded-full border border-primary/40 animate-pulse" style={{ animationDuration: "4s", animationDelay: "0.5s" }}></div>

      {/* Main SVG Circle with continuous rotation */}
      <svg
        width={centerX * 2}
        height={centerY * 2}
        className={cn(
          "absolute inset-0 transition-all duration-1000 hover:scale-105",
          isSpinning && "animate-spin"
        )}
        style={{ 
          filter: "drop-shadow(0 0 30px hsl(var(--primary) / 0.4)) drop-shadow(0 0 60px hsl(var(--blue-purple) / 0.2))",
          animationDuration: isSpinning ? "40s" : "0s"
        }}
        onMouseEnter={() => setIsSpinning(false)}
        onMouseLeave={() => setIsSpinning(true)}
      >
        {/* Energy glow gradient definition */}
        <defs>
          <radialGradient id="energyGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
            <stop offset="50%" stopColor="hsl(var(--blue-purple))" stopOpacity={0.4} />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>
        </defs>

        {navItems.map((item, index) => {
          const startAngle = index * segmentAngle + gap / 2;
          const endAngle = (index + 1) * segmentAngle - gap / 2;
          const isHovered = hoveredSegment === item.name;
          const midAngle = (startAngle + endAngle) / 2;
          const iconRadius = outerRadius * 0.75; // Position icons at 75% of segment radius
          const iconPos = polarToCartesian(centerX, centerY, iconRadius, midAngle);
          
          // Create gradient for each segment based on index
          const segmentColors = [
            'hsl(var(--primary))',
            'hsl(var(--blue-purple))',
            'hsl(var(--accent))',
            'hsl(var(--secondary))',
            'hsl(280, 70%, 60%)',
            'hsl(200, 70%, 60%)',
            'hsl(320, 70%, 60%)',
            'hsl(40, 70%, 60%)'
          ];
          
          const baseColor = segmentColors[index % segmentColors.length];
          
          // Create outer and inner paths for the segment
          const outerPath = createSegmentPath(centerX, centerY, outerRadius, startAngle, endAngle);
          const innerPath = createSegmentPath(centerX, centerY, innerRadius, startAngle, endAngle);
          
          return (
            <g key={item.name}>
              {/* Segment Background with gradient */}
              <defs>
                <radialGradient id={`segmentGradient${index}`} cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor={baseColor} stopOpacity={isHovered ? 0.9 : 0.6} />
                  <stop offset="70%" stopColor={baseColor} stopOpacity={isHovered ? 0.7 : 0.4} />
                  <stop offset="100%" stopColor={baseColor} stopOpacity={isHovered ? 0.5 : 0.2} />
                </radialGradient>
                <linearGradient id={`borderGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="white" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              
              <Link to={item.href} onClick={() => {
                toast.success(`🚀 ${item.name} Activated`, { 
                  description: `Navigating to ${item.name}...`,
                  duration: 2000 
                });
              }}>
                <path
                  d={outerPath}
                  fill={`url(#segmentGradient${index})`}
                  stroke={`url(#borderGradient${index})`}
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    filter: isHovered ? 
                      `drop-shadow(0 0 20px ${baseColor}) drop-shadow(0 0 40px ${baseColor})` : 
                      `drop-shadow(0 0 10px ${baseColor})`
                  }}
                  onMouseEnter={() => setHoveredSegment(item.name)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              </Link>
              
              {/* Inner cutout */}
              <path
                d={innerPath}
                fill="transparent"
              />
              
              {/* Icon positioned within SVG (rotates with circle) */}
              <g 
                transform={`translate(${iconPos.x}, ${iconPos.y})`}
                className="transition-all duration-500"
                style={{ 
                  transform: `translate(${iconPos.x}px, ${iconPos.y}px) scale(${isHovered ? 1.2 : 1})`,
                  filter: isHovered ? `drop-shadow(0 0 15px ${baseColor})` : 'none'
                }}
              >
                <foreignObject width="24" height="24" x="-12" y="-12">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <item.Icon 
                      className={cn(
                        "w-5 h-5 transition-all duration-500",
                        isHovered ? "text-white" : "text-muted-foreground"
                      )}
                    />
                  </div>
                </foreignObject>
              </g>
              
              {/* Segment Label */}
              <g 
                transform={`translate(${iconPos.x}, ${iconPos.y + 25})`}
                className="transition-all duration-500"
              >
                <text
                  className={cn(
                    "text-xs font-medium text-center transition-all duration-500 fill-current",
                    isHovered ? "text-white" : "text-muted-foreground"
                  )}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 10px white)' : 'none',
                    fontSize: '10px'
                  }}
                >
                  {item.name}
                </text>
              </g>
              
              {/* Energy pulse effect on hover */}
              {isHovered && (
                <>
                  <path
                    d={outerPath}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    opacity={0.8}
                    className="animate-pulse"
                    style={{ filter: "drop-shadow(0 0 15px hsl(var(--primary)))" }}
                  />
                  <path
                    d={outerPath}
                    fill="url(#energyGlow)"
                    opacity={0.3}
                    className="animate-pulse"
                    style={{ animationDuration: "1s" }}
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Central Hub with enhanced Iron Man aesthetics */}
      <div 
        className="absolute rounded-full flex items-center justify-center z-20 backdrop-blur-xl transition-all duration-700 hover:scale-105"
        style={{ 
          width: innerRadius * 2, 
          height: innerRadius * 2,
          background: `
            radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, hsl(var(--blue-purple) / 0.2) 0%, transparent 50%),
            linear-gradient(135deg, hsl(var(--background) / 0.95), hsl(var(--background) / 0.85))
          `,
          border: "2px solid hsl(var(--primary) / 0.4)",
          boxShadow: `
            0 0 40px hsl(var(--primary) / 0.4),
            0 0 80px hsl(var(--blue-purple) / 0.2),
            inset 0 0 40px hsl(var(--primary) / 0.1)
          `
        }}
      >
        {/* Inner decorative rings with energy effects */}
        <div className="absolute inset-3 rounded-full border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" style={{ animationDuration: "3s" }}></div>
        <div className="absolute inset-6 rounded-full border border-blue-purple/20 animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }}></div>
        <div className="absolute inset-9 rounded-full border border-accent/15 animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }}></div>
        
        {/* Clean Center Hub */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 tracking-wider">dKloud</div>
            <div className="text-sm text-muted-foreground font-medium">Universe</div>
          </div>
        </div>

        {/* Central energy core effect */}
        <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" style={{ animationDuration: "2s" }}>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/10 to-transparent animate-pulse" style={{ animationDuration: "1.5s", animationDelay: "0.5s" }}></div>
        </div>
      </div>

      {/* Outer holographic border */}
      <div 
        className="absolute rounded-full border-2 pointer-events-none animate-pulse"
        style={{ 
          width: (outerRadius + 30) * 2, 
          height: (outerRadius + 30) * 2,
          left: centerX - outerRadius - 30,
          top: centerY - outerRadius - 30,
          borderImage: "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--blue-purple)), hsl(var(--primary))) 1",
          animationDuration: "3s"
        }}
      ></div>
    </div>
  );
}