import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DecodingAnimation } from "./DecodingAnimation";
import { AudioPlayer } from "./AudioPlayer";
import { TeaserAdSection } from "./TeaserAdSection";

import { MagneticButton, ScrollReveal, GlitchText, FloatingElement } from "./ModernAnimations";

import { cn } from "@/lib/utils";

export function EnhancedHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden theme-adaptive-hero-bg px-4 py-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Floating orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingElement
            key={i}
            delay={i * 0.5}
            className={cn(
              "absolute rounded-full blur-xl",
              i % 2 === 0 
                ? "bg-gradient-to-r from-primary/20 to-secondary/20" 
                : "bg-gradient-to-r from-accent/20 to-primary/20"
            )}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Sparkle decorations */}
        <div className="absolute -top-10 left-1/4 text-primary/60 animate-pulse-glow">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="absolute -top-5 right-1/3 text-secondary/60 animate-bounce-subtle">
          <Zap className="h-6 w-6" />
        </div>

        {/* Main Title */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mb-6">
            <div className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 tracking-tight leading-tight">
              <DecodingAnimation 
                text="Decoding Knowledge" 
                className="text-gradient-animated transform-gpu"
                delay={1000}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Subtitle with glitch effect */}
        <ScrollReveal direction="up" delay={400}>
          <div className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-muted-foreground">
            <GlitchText text="Library Of Unique Discoveries" className="text-lg md:text-xl font-semibold text-foreground" />
          </div>
        </ScrollReveal>

        {/* Audio Player with modern styling - Enhanced */}
        <ScrollReveal direction="scale" delay={600}>
          <div className="mb-6 max-w-md mx-auto">
            <div className="glass-card p-4 rounded-xl border border-primary/20 hover-glow transition-all duration-300">
              <AudioPlayer 
                audioSrc="/dKloudaudio.wav"
                title="Listen: What is dKloud?"
                description=""
                compact={true}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal direction="up" delay={800}>
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              At dKloud, we're crafting a{" "}
              <span className="text-shimmer font-semibold text-primary">universe</span>{" "}
              where{" "}
              <span className="text-gradient-animated font-semibold">creativity meets the cloud</span>,{" "}
              <span className="text-shimmer font-semibold text-accent">AI fuels curiosity</span>, and{" "}
              <span className="text-gradient-animated font-semibold">learning becomes a shared adventure</span>.
            </p>
          </div>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal direction="up" delay={1200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <MagneticButton className="group">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/20"
              >
                <Link to="/aitools" className="flex items-center gap-2">
                  <span className="text-shimmer">Dive into dKloud Tech Universe</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton className="group">
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-base px-8 py-3 rounded-full glass-strong hover-glow transition-all duration-300 hover:bg-primary/10 border border-primary/30 hover:border-primary/50"
              >
                <Link to="/portfolio" className="flex items-center gap-2">
                  <span>View Portfolio</span>
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Teaser Ad Section - Positioned right below CTA buttons */}
        <ScrollReveal direction="up" delay={1400}>
          <div className="mb-12">
            <TeaserAdSection />
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal direction="up" delay={1600}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce-subtle">
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-primary/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
    </section>
  );
}
