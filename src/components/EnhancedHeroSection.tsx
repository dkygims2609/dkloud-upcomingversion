import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AudioPlayer } from "./AudioPlayer";
import { TeaserAdSection } from "./TeaserAdSection";
import { DecodingAnimation } from "./DecodingAnimation";

export function EnhancedHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden theme-adaptive-hero-bg px-2 sm:px-4 py-8 sm:py-16">
      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
        
        {/* Main Tagline - Decoding Knowledge */}
        <div className="mb-4">
          <h1 className="decoding-knowledge animate-tagline">
            <DecodingAnimation text="Decoding Knowledge" />
          </h1>
        </div>

        {/* Subtitle - Library of Unique Discoveries */}
        <div className="mb-4">
          <h2 className="library-subtitle-small animate-tagline" style={{ animationDelay: '0.2s' }}>
            Library Of Unique Discoveries
          </h2>
        </div>

        {/* Powered by dKloud Tech */}
        <div className="mb-8">
          <p className="powered-by-text animate-tagline" style={{ animationDelay: '0.4s' }}>
            Powered by dKloud Tech
          </p>
        </div>

        {/* Audio Player with modern styling */}
          <div className="mb-4 sm:mb-6 mx-auto animate-tagline w-full max-w-md" style={{ animationDelay: '0.6s' }}>
            <AudioPlayer 
              audioSrc="/dKloudaudio.wav"
              title="Listen: What is dKloud?"
              compact
            />
          </div>

        {/* Description - Responsive */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 animate-tagline px-2" style={{ animationDelay: '0.8s' }}>
          <p className="description text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose">
            At dKloud, we're crafting a{" "}
            <span className="text-primary font-semibold">universe</span>{" "}
            where{" "}
            <span className="font-semibold">creativity meets the cloud</span>,{" "}
            <span className="text-accent font-semibold">AI fuels curiosity</span>, and{" "}
            <span className="font-semibold">learning becomes a shared adventure</span>.
          </p>
        </div>

        {/* CTA Buttons - Responsive */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 animate-tagline px-2" style={{ animationDelay: '1s' }}>
          <Button 
            asChild 
            size="lg" 
            className="cta-button w-full sm:w-auto touch-manipulation"
          >
            <Link to="/aitools" className="flex items-center justify-center gap-2 min-h-[48px]">
              <span className="text-sm sm:text-base">Dive into dKloud Tech Universe</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:bg-primary/10 border border-primary/30 hover:border-primary/50 w-full sm:w-auto touch-manipulation min-h-[48px]"
          >
            <Link to="/portfolio" className="flex items-center justify-center gap-2">
              <span>View Portfolio</span>
            </Link>
          </Button>
        </div>

        {/* Teaser Ad Section */}
        <div className="mb-12 animate-tagline" style={{ animationDelay: '1.2s' }}>
          <TeaserAdSection />
        </div>
      </div>
    </section>
  );
}
