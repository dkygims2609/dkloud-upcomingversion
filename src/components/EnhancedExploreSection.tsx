
import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import { StaggerContainer, MagneticElement } from "./AdvancedScrollAnimations";
import { CircularNavigation } from "./CircularNavigation";
import { cn } from "@/lib/utils";

export function EnhancedExploreSection() {
  const stats = [
    { label: "Content", value: "1000+", icon: "📚", color: "from-blue-500 to-cyan-500" },
    { label: "AI Tools", value: "200+", icon: "🤖", color: "from-purple-500 to-pink-500" },
    { label: "Tech Resources", value: "500+", icon: "⚡", color: "from-green-500 to-emerald-500" },
    { label: "Daily Updates", value: "24/7", icon: "🔄", color: "from-orange-500 to-red-500" }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl animate-pulse"
            style={{
              background: `linear-gradient(45deg, hsl(var(--primary)/0.1), hsl(var(--secondary)/0.1))`,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Section Header */}
        <StaggerContainer>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Explore Our Universe
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover a curated collection of{" "}
              <span className="text-primary font-semibold">entertainment</span>,{" "}
              <span className="text-secondary font-semibold">education</span>, and{" "}
              <span className="text-accent font-semibold">cutting-edge technology</span>.
            </p>
          </div>
        </StaggerContainer>

        {/* Enhanced Circular Navigation */}
        <div className="mb-16">
          <MagneticElement strength={0.1}>
            <div className="backdrop-blur-xl bg-card/20 border border-primary/20 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              <CircularNavigation />
            </div>
          </MagneticElement>
        </div>

        {/* Enhanced Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <MagneticElement key={stat.label} strength={0.2}>
              <div className={cn(
                "group relative overflow-hidden text-center p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105",
                "bg-gradient-to-br from-card/40 to-card/20 border-primary/20 hover:border-primary/40",
                "hover:shadow-2xl hover:shadow-primary/20"
              )}>
                {/* Background Gradient */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                  `bg-gradient-to-br ${stat.color}`
                )} />
                
                <div className="relative z-10">
                  <div 
                    className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2 group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </MagneticElement>
          ))}
        </StaggerContainer>

        {/* Enhanced Call to Action */}
        <StaggerContainer>
          <div className="text-center">
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              Ready to dive deeper into the{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">
                dKloud universe
              </span>?
            </p>
            <MagneticElement strength={0.4}>
              <Link
                to="/aitools"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-110 relative overflow-hidden"
              >
                <span className="relative z-10">Start Exploring</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform relative z-10" />
                <Zap className="ml-2 h-5 w-5 animate-pulse relative z-10" />
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-full" />
              </Link>
            </MagneticElement>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
