import { Link } from "react-router-dom";
import { Clapperboard, Youtube, Brain, BookOpen, Zap, Package, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNewsData } from "@/hooks/useNewsData";
import { useGadgetData } from "@/hooks/useGadgetData";

const navItems = [
  { name: "Movies & TV", href: "/movies", Icon: Clapperboard, count: "500+", rotation: -15 },
  { name: "AI Tools", href: "/aitools", Icon: Brain, count: "200+", rotation: -8 },
  { name: "YouTube", href: "/youtubechannels", Icon: Youtube, count: "100+", rotation: 5 },
  { name: "Tech News", href: "/techcorner", Icon: BookOpen, count: "Dynamic", rotation: 12 },
  { name: "SmartTech", href: "/smarttech", Icon: Zap, count: "Dynamic", rotation: -6 },
  { name: "Products", href: "/digiproducts", Icon: Package, count: "50+", rotation: 10 },
  { name: "Services", href: "/services", Icon: Briefcase, count: "10+", rotation: -12 },
];

export function GlassCardNavigation() {
  const { news } = useNewsData();
  const { gadgets } = useGadgetData();

  const getCount = (item: typeof navItems[0]) => {
    if (item.name === "Tech News") return `${news.length}+`;
    if (item.name === "SmartTech") return `${gadgets.length}+`;
    return item.count;
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Navigate Our Universe
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of digital resources, tools, and entertainment content
          </p>
        </div>
        
        <div className="glass-container flex justify-center items-center flex-wrap gap-4 lg:gap-0">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              className="glass-card group"
              style={{ '--r': item.rotation } as React.CSSProperties}
              data-text={item.name}
              onClick={() => {
                toast.success(`${item.name} activated`, { 
                  description: `Navigating to ${item.name.toLowerCase()}...`,
                  duration: 2000 
                });
              }}
            >
              <div className="flex flex-col items-center justify-center h-full relative z-10">
                <item.Icon className="h-12 w-12 text-white mb-3 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                <div className="text-white/80 text-sm font-medium mb-1">{getCount(item)}</div>
                <div className="text-white/60 text-xs text-center px-2">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}