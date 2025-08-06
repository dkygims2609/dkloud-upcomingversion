
import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Ripple effect button
export const RippleButton = ({ 
  children, 
  className = "",
  onClick,
  ...props 
}: {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { id, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);

    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      className={cn("relative overflow-hidden", className)}
      onClick={createRipple}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ping bg-white/30"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '600ms'
          }}
        />
      ))}
    </button>
  );
};

// Shimmer loading effect
export const ShimmerLoader = ({ 
  className = "",
  width = "100%",
  height = "1rem" 
}: {
  className?: string;
  width?: string;
  height?: string;
}) => (
  <div 
    className={cn("relative overflow-hidden bg-muted rounded", className)}
    style={{ width, height }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
    <div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"
      style={{ animationDelay: '0.5s' }}
    />
  </div>
);

// Cursor follower effect
export const CursorFollower = ({ children }: { children: ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative"
    >
      {children}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/50 transition-all duration-300"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            transform: 'scale(1.5)'
          }}
        />
      )}
    </div>
  );
};

// Floating action button with micro-interactions
export const FloatingMicroButton = ({ 
  icon: Icon,
  label,
  onClick,
  className = ""
}: {
  icon: any;
  label: string;
  onClick: () => void;
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn("fixed bottom-6 right-6 z-50", className)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <RippleButton
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 px-4 py-4 bg-primary text-primary-foreground rounded-full shadow-2xl",
          "hover:shadow-primary/30 transition-all duration-300 hover:scale-110",
          "backdrop-blur-xl border border-primary/20"
        )}
      >
        <Icon className="h-6 w-6" />
        <span 
          className={cn(
            "overflow-hidden transition-all duration-300 whitespace-nowrap",
            isExpanded ? "max-w-32 opacity-100" : "max-w-0 opacity-0"
          )}
        >
          {label}
        </span>
      </RippleButton>
    </div>
  );
};

// Enhanced card with micro-interactions
export const InteractiveCard = ({ 
  children,
  className = "",
  onClick
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300",
        "hover:scale-105 hover:shadow-2xl hover:shadow-primary/20",
        "transform-gpu backface-visibility-hidden",
        isPressed ? "scale-95" : "",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      {children}
      
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)), transparent 40%)`
        }}
      />
    </div>
  );
};
