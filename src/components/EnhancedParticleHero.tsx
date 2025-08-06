
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ParticleSystem } from "./ParticleSystem";
import { ParallaxContainer, MagneticElement, MorphingText } from "./AdvancedScrollAnimations";
import { AudioPlayer } from "./AudioPlayer";
import { cn } from "@/lib/utils";

export function EnhancedParticleHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Particle System */}
      <ParticleSystem 
        count={80}
        colors={[
          "hsl(var(--primary))",
          "hsl(var(--secondary))",
          "hsl(var(--accent))",
          "hsl(var(--blue-purple))",
          "hsl(var(--royal-purple))"
        ]}
        speed={0.3}
      />

      {/* Parallax Background Elements */}
      <div className="absolute inset-0">
        {/* Layer 1 - Slowest */}
        <ParallaxContainer speed={0.1}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`bg-1-${i}`}
              className="absolute rounded-full blur-3xl opacity-20"
              style={{
                background: `linear-gradient(45deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.2))`,
                width: `${150 + Math.random() * 100}px`,
                height: `${150 + Math.random() * 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
          ))}
        </ParallaxContainer>

        {/* Layer 2 - Medium Speed */}
        <ParallaxContainer speed={0.2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`bg-2-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <div className="w-1 h-20 bg-gradient-to-t from-primary/20 to-transparent rotate-12 animate-pulse" />
            </div>
          ))}
        </ParallaxContainer>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Floating decorative elements */}
        <div className="absolute -top-10 left-1/4">
          <MagneticElement strength={0.5}>
            <Sparkles className="h-8 w-8 text-primary/60 animate-pulse" />
          </MagneticElement>
        </div>
        <div className="absolute -top-5 right-1/3">
          <MagneticElement strength={0.3}>
            <Zap className="h-6 w-6 text-secondary/60 animate-bounce" />
          </MagneticElement>
        </div>

        {/* Enhanced Title */}
        <div className="mb-6">
          <div 
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight leading-tight transition-all duration-1000",
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            )}
          >
            <MorphingText 
              text="Decoding Knowledge" 
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            />
          </div>
        </div>

        {/* Enhanced Subtitle */}
        <div 
          className={cn(
            "text-xl md:text-2xl lg:text-3xl font-semibold mb-8 transition-all duration-1000 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="bg-gradient-to-r from-muted-foreground via-primary/80 to-muted-foreground bg-clip-text text-transparent">
            Library Of Unique Discoveries
          </span>
        </div>

        {/* Enhanced Audio Player */}
        <div 
          className={cn(
            "mb-8 max-w-md mx-auto transition-all duration-1000 delay-500",
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          )}
        >
          <MagneticElement strength={0.2}>
            <div className="backdrop-blur-xl bg-card/30 border border-primary/20 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              <AudioPlayer 
                audioSrc="/dKloudaudio.wav"
                title="Listen: What is dKloud?"
                description=""
                compact={true}
              />
            </div>
          </MagneticElement>
        </div>

        {/* Enhanced Description */}
        <div 
          className={cn(
            "max-w-4xl mx-auto mb-10 transition-all duration-1000 delay-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            At dKloud, we're crafting a{" "}
            <span className="text-primary font-semibold animate-pulse">universe</span>{" "}
            where{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">creativity meets the cloud</span>,{" "}
            <span className="text-accent font-semibold animate-pulse">AI fuels curiosity</span>, and{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent font-semibold">learning becomes a shared adventure</span>.
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div 
          className={cn(
            "flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <MagneticElement strength={0.3}>
            <Button 
              asChild 
              size="lg" 
              className="group relative overflow-hidden text-base px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transform transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-primary/30 border-0"
            >
              <Link to="/aitools" className="flex items-center gap-2">
                <span className="relative z-10">Dive into dKloud Tech Universe</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </Button>
          </MagneticElement>

          <MagneticElement strength={0.3}>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="group relative overflow-hidden text-base px-8 py-4 rounded-full backdrop-blur-xl bg-transparent border-2 border-primary/50 hover:border-primary transition-all duration-500 hover:scale-105 hover:bg-primary/10"
            >
              <Link to="/portfolio" className="flex items-center gap-2">
                <span>View Portfolio</span>
                <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              </Link>
            </Button>
          </MagneticElement>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className={cn(
            "absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-primary/70 rounded-full mt-2 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      {/* Interactive Light Effect Following Mouse */}
      <div 
        className="absolute pointer-events-none z-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)/0.1), transparent 40%)`,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          transition: 'background 0.3s ease-out'
        }}
      />
    </section>
  );
}
