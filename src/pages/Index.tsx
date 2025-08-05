
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

      {/* About Section - Enhanced */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
          </FloatingElement>
        ))}

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gradient-animated">
                About dKloud
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
                <Card className="glass-card hover-lift text-center h-full border-primary/20 hover:border-primary/40 transition-all duration-500">
                  <CardHeader className="pb-8">
                    <div className="relative mb-6">
                      <item.icon className={`h-16 w-16 ${item.color} mx-auto animate-float`} style={{animationDelay: `${index}s`}} />
                      <div className={`absolute inset-0 ${item.color.replace('text-', 'bg-')}/20 rounded-full blur-xl animate-pulse-glow`} />
                    </div>
                    <CardTitle className={`text-2xl ${item.color} font-bold`}>
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <h3 className="text-3xl md:text-4xl font-bold slide-up neon-gradient-text">How dKloud Works</h3>
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
                className="ml-4 border-primary/30 text-primary hover:bg-primary/10"
              >
                Show/Hide
              </Button>
            </div>
            
            <div id="how-dkloud-works">
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Experience the seamless flow of data from your interaction to real-time content delivery
              </p>
              
              <div className="mb-12">
                <InfographicAnimation />
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { name: "React + TypeScript", color: "from-primary to-accent" },
                  { name: "Tailwind CSS + Shadcn UI", color: "from-secondary to-primary" }, 
                  { name: "Google Sheets + API", color: "from-green-500 to-emerald-500" },
                  { name: "GitHub Pages", color: "from-gray-500 to-slate-600" },
                  { name: "Supabase Backend", color: "from-accent to-secondary" }
                ].map((tech, index) => (
                  <div key={tech.name} className={`bg-gradient-to-r ${tech.color} text-white rounded-full px-6 py-3 font-medium bounce-in shadow-lg`} style={{animationDelay: `${index * 0.1}s`}}>
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
