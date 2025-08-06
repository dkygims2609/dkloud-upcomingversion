import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Scroll-triggered animations hook
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Magnetic button effect
export const MagneticButton = ({ 
  children, 
  className = "", 
  onClick,
  ...props 
}: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxDistance = 25;
    
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    
    setPosition({
      x: Math.max(-maxDistance, Math.min(maxDistance, deltaX)),
      y: Math.max(-maxDistance, Math.min(maxDistance, deltaY))
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <button
      ref={ref}
      className={cn(
        "transition-all duration-300 ease-out magnetic-hover",
        "hover:animate-pulse-glow transform-3d will-change-transform",
        className
      )}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) ${isHovered ? 'scale(1.05) rotateX(5deg)' : 'scale(1) rotateX(0deg)'}`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Floating animation component
export const FloatingElement = ({ 
  children, 
  className = "",
  delay = 0,
  style
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div 
      className={cn("animate-float", className)}
      style={{ animationDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
};

// Tilt card effect
export const TiltCard = ({ 
  children, 
  className = "",
  maxTilt = 10 
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = ((e.clientY - centerY) / rect.height) * maxTilt;
    const rotateY = ((centerX - e.clientX) / rect.width) * maxTilt;
    
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };
  
  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out transform-gpu", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// Scroll reveal component
export const ScrollReveal = ({ 
  children, 
  className = "",
  direction = "up",
  delay = 0 
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollAnimation();
  
  const getAnimationClass = () => {
    const base = "transition-all duration-700 ease-out";
    if (!isVisible) {
      switch (direction) {
        case "up": return `${base} translate-y-16 opacity-0`;
        case "down": return `${base} -translate-y-16 opacity-0`;
        case "left": return `${base} translate-x-16 opacity-0`;
        case "right": return `${base} -translate-x-16 opacity-0`;
        case "scale": return `${base} scale-95 opacity-0`;
        default: return `${base} translate-y-16 opacity-0`;
      }
    }
    return `${base} translate-x-0 translate-y-0 scale-100 opacity-100`;
  };
  
  return (
    <div 
      ref={ref}
      className={cn(getAnimationClass(), className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Glitch text effect
export const GlitchText = ({ 
  text, 
  className = "" 
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div 
      className={cn("relative inline-block glitch-text text-[#dc2626]", className)} 
      data-text={text}
      style={{
        color: '#dc2626',
        textShadow: '0 0 10px rgba(220, 38, 38, 0.3)',
        filter: 'drop-shadow(0 0 5px rgba(220, 38, 38, 0.2))'
      }}
    >
      {text}
    </div>
  );
};

// Pulse animation component
export const PulseGlow = ({ 
  children, 
  className = "",
  color = "primary" 
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) => {
  return (
    <div className={cn("relative pulse-glow", className, `pulse-${color}`)}>
      {children}
    </div>
  );
};