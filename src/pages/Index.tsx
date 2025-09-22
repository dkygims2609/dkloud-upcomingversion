import { useState, useEffect } from "react";
import { Database, Zap, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentGrid } from "@/components/ContentGrid";
import { InfographicAnimation } from "@/components/InfographicAnimation";
import { EnhancedHeroSection } from "@/components/EnhancedHeroSection";
import { ModernExploreGrid } from "@/components/ModernExploreGrid";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { ScrollReveal, FloatingElement } from "@/components/ModernAnimations";
import TeamSection from "@/components/TeamSection";

const Index = () => {
  const [previewData, setPreviewData] = useState({
    movies: [],
    youtube: [],
    aitools: [],
    techcorner: [],
    smarttech: [],
    technews: []
  });

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        // Movies & TV
        const moviesResponse = await fetch("https://script.google.com/macros/s/AKfycbwiNhiUq6yWcGQ5dUwMwclRYt_pTsz_8nNXSsYsZClcmdLJGFp3kZYZdSkfqW0LtGWd7A/exec");
        const moviesData = await moviesResponse.json();
        
        // YouTube Channels
        const youtubeResponse = await fetch("https://api.sheetbest.com/sheets/c66a0da1-d347-44f8-adc7-dc02c8627799");
        const youtubeData = await youtubeResponse.json();
        
        // AI Tools
        const aitoolsResponse = await fetch("https://script.google.com/macros/s/AKfycbyQZiNTLogFsjujIKxhFs2pXoK_iaoLkFb4D3HJ_wQjQpD17RxsqHX0G1nuKbQN2x9u/exec");
        const aitoolsData = await aitoolsResponse.json();
        
        // Tech Corner
        const techcornerResponse = await fetch("https://script.google.com/macros/s/AKfycbw6hSBYLo33ze3aqiTzBszbfiTFVh2nHsrsop58d0DFWGOOwaOZIepb6kUjmqKwKcVr/exec");
        const techcornerData = await techcornerResponse.json();

        setPreviewData({
          movies: moviesData || [],
          youtube: youtubeData || [],
          aitools: aitoolsData || [],
          techcorner: techcornerData || [],
          smarttech: [],
          technews: []
        });
      } catch (error) {
        console.error("Error fetching preview data:", error);
        setPreviewData({
          movies: [],
          youtube: [],
          aitools: [],
          techcorner: [],
          smarttech: [],
          technews: []
        });
      }
    };

    fetchPreviewData();
  }, []);

  return (
    <div className="min-h-screen relative bg-background">
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* Modern Explore Grid */}
      <ModernExploreGrid />

      {/* About Section - Enhanced & Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/30" />
        
        {/* Floating elements */}
        {Array.from({ length: 5 }).map((_, i) => (
          <FloatingElement
            key={i}
            delay={i * 0.8}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
          </FloatingElement>
        ))}

        <div className="relative max-w-7xl mx-auto container-responsive">
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gradient-animated">
                About dKloud
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
                A comprehensive platform combining{" "}
                <span className="text-shimmer font-semibold text-primary">entertainment</span>,{" "}
                <span className="text-gradient-animated font-semibold">education</span>, and{" "}
                <span className="text-shimmer font-semibold text-accent">technology</span>. 
                All data is dynamically powered by{" "}
                <span className="text-gradient-animated font-semibold">Google Sheets APIs</span> for{" "}
                <span className="text-shimmer font-semibold text-primary">real-time updates</span>.
              </p>
            </div>
          </ScrollReveal>

          <div className="responsive-grid mb-12 sm:mb-16 lg:mb-20">
            {[
              {
                icon: Database,
                title: "Google Sheets",
                description: "Data stored and managed in organized spreadsheets",
                color: "text-primary",
                delay: 200
              },
              {
                icon: Zap,
                title: "Live APIs", 
                description: "Real-time data fetching via Google Apps Script",
                color: "text-accent",
                delay: 400
              },
              {
                icon: Sparkles,
                title: "Dynamic Site",
                description: "Always up-to-date content without manual updates", 
                color: "text-success",
                delay: 600
              }
            ].map((item, index) => (
              <ScrollReveal key={item.title} direction="up" delay={item.delay}>
                <Card className="glass-card hover-lift text-center h-full border-primary/20 hover:border-primary/40 transition-all duration-500 touch-manipulation">
                  <CardHeader className="pb-6 sm:pb-8">
                    <div className="relative mb-4 sm:mb-6">
                      <item.icon className={`h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 ${item.color} mx-auto animate-float`} style={{animationDelay: `${index}s`}} />
                      <div className={`absolute inset-0 ${item.color.replace('text-', 'bg-')}/20 rounded-full blur-xl animate-pulse-glow`} />
                    </div>
                    <CardTitle className={`text-lg sm:text-xl lg:text-2xl ${item.color} font-bold`}>
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base lg:text-lg text-muted-foreground px-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold slide-up neon-gradient-text">
                How dKloud Works
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const section = document.getElementById('how-dkloud-works');
                  if (section) {
                    const isHidden = section.style.display === 'none';
                    section.style.display = isHidden ? 'block' : 'none';
                  }
                }}
                className="border-primary/30 text-primary hover:bg-primary/10 touch-manipulation"
              >
                Show/Hide
              </Button>
            </div>
            
            <div id="how-dkloud-works">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                Experience the seamless flow of data from your interaction to real-time content delivery
              </p>
              
              <div className="mb-8 sm:mb-12">
                <InfographicAnimation />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-12 px-2">
                {[
                  { name: "React + TypeScript", color: "from-primary to-accent" },
                  { name: "Tailwind CSS + Shadcn UI", color: "from-secondary to-primary" }, 
                  { name: "Google Sheets + API", color: "from-green-500 to-emerald-500" },
                  { name: "GitHub Pages", color: "from-gray-500 to-slate-600" },
                  { name: "Supabase Backend", color: "from-accent to-secondary" }
                ].map((tech, index) => (
                  <div 
                    key={tech.name} 
                    className={`bg-gradient-to-r ${tech.color} text-white rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-medium bounce-in shadow-lg text-xs sm:text-sm transition-all duration-300 hover:scale-105 touch-manipulation`} 
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Index;
