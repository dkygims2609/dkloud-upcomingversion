import { ReactNode, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TiltCard, MagneticButton } from "./ModernAnimations";

interface ModernCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  category?: 'movies' | 'aitools' | 'tech' | 'youtube' | 'default';
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  onClick?: () => void;
  href?: string;
  gradient?: string;
  icon?: ReactNode;
  flipContent?: ReactNode;
  glowColor?: string;
}

const categoryStyles = {
  movies: "border-violet-500/20 hover:border-violet-400/40 bg-gradient-to-br from-violet-500/5 to-purple-600/10",
  aitools: "border-cyan-500/20 hover:border-cyan-400/40 bg-gradient-to-br from-cyan-500/5 to-blue-600/10", 
  tech: "border-emerald-500/20 hover:border-emerald-400/40 bg-gradient-to-br from-emerald-500/5 to-green-600/10",
  youtube: "border-red-500/20 hover:border-red-400/40 bg-gradient-to-br from-red-500/5 to-rose-600/10",
  default: "border-primary/20 hover:border-primary/40 bg-gradient-to-br from-primary/5 to-secondary/10"
};

const glowColors = {
  movies: "shadow-violet-500/25",
  aitools: "shadow-cyan-500/25",
  tech: "shadow-emerald-500/25", 
  youtube: "shadow-red-500/25",
  default: "shadow-primary/25"
};

export function ModernCard({
  title,
  description,
  children,
  category = 'default',
  badge,
  badgeVariant = 'default',
  className,
  onClick,
  href,
  gradient,
  icon,
  flipContent,
  glowColor
}: ModernCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    if (href) window.open(href, '_blank');
  };

  const cardContent = (
    <div className="relative w-full h-full">
      {/* Front side */}
      <div className={cn(
        "transition-all duration-500 transform-gpu backface-hidden",
        isFlipped ? "rotate-y-180 opacity-0" : "rotate-y-0 opacity-100"
      )}>
        {badge && (
          <div className="absolute top-4 right-4 z-10">
            <Badge 
              variant={badgeVariant} 
              className="shadow-lg backdrop-blur-sm bg-background/80 border border-border/50"
            >
              {badge}
            </Badge>
          </div>
        )}
        
        <CardHeader className={cn(
          "pb-4 relative", 
          className?.includes('minimal-card') && "p-2 pb-1"
        )}>
          <div className="flex items-start gap-2">
            {icon && (
              <div className={cn(
                "p-2 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20",
                className?.includes('minimal-card') && "p-1 rounded-lg"
              )}>
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className={cn(
                "font-semibold leading-tight group-hover:text-primary transition-colors duration-300",
                className?.includes('minimal-card') ? "text-sm truncate" : "text-lg"
              )}>
                {title}
              </CardTitle>
              {description && !className?.includes('minimal-card') && (
                <CardDescription className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 mt-1 text-sm">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {children}
          
          {href && (
            <MagneticButton
              className="mt-4 w-full group/btn relative overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300"
              onClick={handleClick}
            >
              <div className="flex items-center justify-center gap-2 py-2">
                <span className="text-sm font-medium">Explore</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            </MagneticButton>
          )}
        </CardContent>
      </div>

      {/* Back side (if flipContent provided) */}
      {flipContent && (
        <div className={cn(
          "absolute inset-0 transition-all duration-500 transform-gpu backface-hidden rotate-y-180",
          isFlipped ? "rotate-y-0 opacity-100" : "rotate-y-180 opacity-0"
        )}>
          <CardContent className="p-6 h-full flex items-center justify-center">
            {flipContent}
          </CardContent>
        </div>
      )}
    </div>
  );

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-200",
        "border border-border/50 backdrop-blur-sm",
        className?.includes('minimal-card') 
          ? "bg-card/80 hover:bg-card/90 hover:shadow-md hover:-translate-y-0.5"
          : "glass-card animate-float hover-lift perspective-1000 transform-3d will-change-transform",
        !className?.includes('minimal-card') && categoryStyles[category],
        !className?.includes('minimal-card') && "hover:shadow-2xl hover:shadow-primary/10",
        !className?.includes('minimal-card') && glowColors[category],
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={() => flipContent && setIsFlipped(!isFlipped)}
    >
      {!className?.includes('minimal-card') && (
        <>
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Glow effect */}
          <div className={cn(
            "absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-sm -z-10",
            gradient || "from-primary/20 via-secondary/20 to-accent/20"
          )} />
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </>
      )}
      
      {cardContent}
    </Card>
  );
}