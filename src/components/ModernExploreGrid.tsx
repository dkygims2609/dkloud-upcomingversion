import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { ScrollReveal, MagneticButton } from "./ModernAnimations";
import { CircularNavigation } from "./CircularNavigation";
import { cn } from "@/lib/utils";

export function ModernExploreGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-gradient-animated">
              Explore Our Universe
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover a curated collection of entertainment, education, and cutting-edge technology.
            </p>
          </div>
        </ScrollReveal>

        {/* Circular Navigation */}
        <ScrollReveal direction="scale" delay={400}>
          <div className="mb-12">
            <CircularNavigation />
          </div>
        </ScrollReveal>

        {/* Featured Stats */}
        <ScrollReveal direction="up" delay={800}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { label: "Content", value: "1000+", icon: "📚" },
              { label: "AI Tools", value: "200+", icon: "🤖" },
              { label: "Tech Resources", value: "500+", icon: "⚡" },
              { label: "Daily Updates", value: "24/7", icon: "🔄" }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={cn(
                  "text-center p-4 rounded-xl glass-card hover-glow transition-all duration-500",
                  "transform hover:scale-105"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl mb-1 animate-bounce-subtle" style={{ animationDelay: `${index * 200}ms` }}>
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal direction="up" delay={1000}>
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-8">
              Ready to dive deeper into the dKloud universe?
            </p>
            <MagneticButton>
              <Link
                to="/aitools"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              >
                Start Exploring
                <Zap className="ml-2 h-5 w-5" />
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}