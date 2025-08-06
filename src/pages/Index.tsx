import { useState, useEffect } from "react";
import { Database, Zap, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentGrid } from "@/components/ContentGrid";
import { InfographicAnimation } from "@/components/InfographicAnimation";
import { EnhancedParticleHero } from "@/components/EnhancedParticleHero";
import { EnhancedExploreSection } from "@/components/EnhancedExploreSection";
import { StaggerContainer, MagneticElement } from "@/components/AdvancedScrollAnimations";
import { InteractiveCard } from "@/components/ModernMicroInteractions";
import TeamSection from "@/components/TeamSection";
import { TeaserAdSection } from "@/components/TeaserAdSection";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { cn } from "@/lib/utils";

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
      {/* Enhanced Particle Hero Section */}
      <EnhancedParticleHero />

      {/* Enhanced Modern Explore Section */}
      <EnhancedExploreSection />

      {/* Enhanced About Section with Stagger Animations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration with parallax */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/30" />
        
        {/* Floating background elements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-2xl" />
          </div>
        ))}

        <div className="relative max-w-7xl mx-auto">
          <StaggerContainer>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                About dKloud
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
                A comprehensive platform combining{" "}
                <span className="text-primary font-semibold animate-pulse">entertainment</span>,{" "}
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent font-semibold">education</span>, and{" "}
                <span className="text-accent font-semibold animate-pulse">technology</span>. 
                All data is dynamically powered by{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">Google Sheets APIs</span> for{" "}
                <span className="text-primary font-semibold animate-pulse">real-time updates</span>.
              </p>
            </div>
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: Database,
                title: "Google Sheets",
                description: "Data stored and managed in organized spreadsheets",
                color: "text-primary",
                bgColor: "from-primary/10 to-primary/5"
              },
              {
                icon: Zap,
                title: "Live APIs", 
                description: "Real-time data fetching via Google Apps Script",
                color: "text-accent",
                bgColor: "from-accent/10 to-accent/5"
              },
              {
                icon: Sparkles,
                title: "Dynamic Site",
                description: "Always up-to-date content without manual updates", 
                color: "text-secondary",
                bgColor: "from-secondary/10 to-secondary/5"
              }
            ].map((item, index) => (
              <MagneticElement key={item.title} strength={0.2}>
                <InteractiveCard className="h-full">
                  <Card className={cn(
                    "h-full text-center backdrop-blur-xl border-primary/20 hover:border-primary/40",
                    "bg-gradient-to-br from-card/40 to-card/20 transition-all duration-500"
                  )}>
                    <CardHeader className="pb-8">
                      <div className="relative mb-8">
                        <div className={cn(
                          "w-20 h-20 mx-auto rounded-2xl flex items-center justify-center",
                          `bg-gradient-to-br ${item.bgColor} backdrop-blur-xl border border-white/10`
                        )}>
                          <item.icon 
                            className={cn("h-10 w-10", item.color)} 
                            style={{
                              animationDelay: `${index * 0.5}s`,
                              filter: 'drop-shadow(0 0 20px currentColor)'
                            }} 
                          />
                        </div>
                        <div className={cn(
                          "absolute inset-0 rounded-2xl animate-pulse-glow opacity-50",
                          `bg-gradient-to-br ${item.bgColor}`
                        )} />
                      </div>
                      <CardTitle className={cn("text-2xl font-bold mb-4", item.color)}>
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-lg text-muted-foreground">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </InteractiveCard>
              </MagneticElement>
            ))}
          </StaggerContainer>

          {/* How dKloud Works Section - Enhanced */}
          <StaggerContainer>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-6 mb-10">
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  How dKloud Works
                </h3>
                <MagneticElement strength={0.3}>
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
                    className="border-primary/30 text-primary hover:bg-primary/10 backdrop-blur-xl"
                  >
                    Show/Hide
                  </Button>
                </MagneticElement>
              </div>
              
              <div id="how-dkloud-works">
                <p className="text-xl text-muted-foreground mb-10 max-w-4xl mx-auto">
                  Experience the seamless flow of data from your interaction to real-time content delivery
                </p>
                
                <div className="mb-16">
                  <InfographicAnimation />
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                  {[
                    { name: "React + TypeScript", color: "from-blue-500 to-cyan-500" },
                    { name: "Tailwind CSS + Shadcn UI", color: "from-purple-500 to-pink-500" }, 
                    { name: "Google Sheets + API", color: "from-green-500 to-emerald-500" },
                    { name: "GitHub Pages", color: "from-gray-500 to-slate-600" },
                    { name: "Supabase Backend", color: "from-orange-500 to-red-500" }
                  ].map((tech, index) => (
                    <MagneticElement key={tech.name} strength={0.2}>
                      <div 
                        className={cn(
                          `bg-gradient-to-r ${tech.color} text-white rounded-full px-6 py-3 font-medium`,
                          "shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
                          "backdrop-blur-xl border border-white/20"
                        )}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {tech.name}
                      </div>
                    </MagneticElement>
                  ))}
                </div>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <div className="relative">
        <TeamSection />
      </div>

      {/* Enhanced Teaser Ad Section */}
      <section className="relative z-10 bg-background">
        <TeaserAdSection />
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Index;
