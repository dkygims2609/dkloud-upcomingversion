
import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Enhanced scroll animation hook with intersection observer
export const useAdvancedScrollAnimation = (
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px"
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Calculate scroll progress within the element
          const updateScrollProgress = () => {
            if (ref.current) {
              const rect = ref.current.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              const progress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight + rect.height)
              ));
              setScrollProgress(progress);
            }
          };

          updateScrollProgress();
          window.addEventListener('scroll', updateScrollProgress);
          
          return () => {
            window.removeEventListener('scroll', updateScrollProgress);
          };
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible, scrollProgress };
};

// Parallax component with multiple layers
export const ParallaxContainer = ({ 
  children, 
  className = "",
  speed = 0.5 
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) => {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={ref}
      className={cn("relative", className)}
      style={{
        transform: `translateY(${scrollY * speed}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

// Stagger animation container
export const StaggerContainer = ({ 
  children, 
  className = "",
  delay = 100 
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const { ref, isVisible } = useAdvancedScrollAnimation();

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      {Array.isArray(children) ? 
        children.map((child, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-700 ease-out",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
            style={{
              transitionDelay: `${index * delay}ms`
            }}
          >
            {child}
          </div>
        )) : 
        <div
          className={cn(
            "transition-all duration-700 ease-out",
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          )}
        >
          {children}
        </div>
      }
    </div>
  );
};

// Magnetic hover effect
export const MagneticElement = ({ 
  children, 
  className = "",
  strength = 0.3 
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out", className)}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// Morphing text animation
export const MorphingText = ({ 
  text, 
  className = "",
  delay = 0 
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const { ref, isVisible } = useAdvancedScrollAnimation();
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isVisible) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    let iterations = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }

      iterations += 1;
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible, text]);

  return (
    <span 
      ref={ref}
      className={cn("font-mono transition-all duration-300", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {displayText}
    </span>
  );
};
