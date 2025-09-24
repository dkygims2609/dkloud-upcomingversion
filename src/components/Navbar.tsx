
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Clapperboard, Youtube, Brain, Zap, Package, Briefcase, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { 
    name: "Home", 
    href: "/", 
    icon: Home 
  },
  { 
    name: "Movies & TV", 
    href: "/movies-tv", 
    icon: Clapperboard, 
    color: "from-purple-500 to-pink-500",
    dropdownItems: [
      { name: "Movies", href: "/movies-tv?tab=movies" },
      { name: "TV Series", href: "/movies-tv?tab=tv" },
      { name: "Ultimate List", href: "/movies-tv?tab=ultimate" },
      { name: "Trending", href: "/movies-tv?tab=trending" }
    ]
  },
  { 
    name: "AI Tools", 
    href: "/aitools", 
    icon: Brain, 
    color: "from-blue-500 to-cyan-500",
    dropdownItems: [
      { name: "Latest Tools", href: "/aitools?filter=latest" },
      { name: "Reviews", href: "/aitools?filter=reviews" },
      { name: "Comparisons", href: "/aitools?filter=comparisons" },
      { name: "Free Tools", href: "/aitools?filter=free" }
    ]
  },
  { 
    name: "Gem Websites", 
    href: "/gem-websites", 
    icon: Youtube, 
    color: "from-red-500 to-orange-500",
    dropdownItems: [
      { name: "Developer Tools", href: "/gem-websites?category=dev-tools" },
      { name: "Design Resources", href: "/gem-websites?category=design" },
      { name: "Learning Platforms", href: "/gem-websites?category=learning" },
      { name: "Productivity", href: "/gem-websites?category=productivity" }
    ]
  },
  { 
    name: "SmartTech", 
    href: "/smarttech", 
    icon: Zap, 
    color: "from-yellow-500 to-amber-500",
    dropdownItems: [
      { name: "Gadgets", href: "/smarttech?category=gadgets" },
      { name: "Reviews", href: "/smarttech?category=reviews" },
      { name: "Buying Guides", href: "/smarttech?category=guides" },
      { name: "Smart Home", href: "/smarttech?category=smarthome" }
    ]
  },
  { 
    name: "Digi Products", 
    href: "/digi-products", 
    icon: Package, 
    color: "from-orange-500 to-red-500",
    dropdownItems: [
      { name: "Smart Tools", href: "/digi-products?category=tools" },
      { name: "AI Agents", href: "/digi-products?category=ai" },
      { name: "Digital Solutions", href: "/digi-products?category=solutions" },
      { name: "Micro Courses - Coming Soon!", href: "/digi-products?category=courses" }
    ]
  },
  { 
    name: "Knowledge Hub", 
    href: "/services", 
    icon: Settings, 
    color: "from-pink-500 to-rose-500",
    dropdownItems: [
      { name: "Micro-Courses", href: "/services?service=courses" },
      { name: "Knowledge Store", href: "/services?service=knowledge" }
    ]
  },
  { 
    name: "Portfolio", 
    href: "/portfolio", 
    icon: Briefcase, 
    color: "from-teal-500 to-green-500"
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleDropdownClick = (item: any) => {
    if (item.external) {
      window.open(item.href, '_blank');
    }
  };

  return (
    <nav className="fixed top-16 w-full z-40 navbar-backdrop">
      <div className="w-full mx-auto px-2 sm:px-3 lg:px-4 xl:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="relative">
              {/* Dark theme logo */}
              <img 
                src="/lovable-uploads/4381e2bd-8639-4d6d-a9ed-f7edd39f22d9.png" 
                alt="dKloud Logo" 
                className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 dark:block hidden"
              />
              {/* Light theme logo */}
              <img 
                src="/lovable-uploads/108e6b6e-0af2-40ea-830a-23c86caa44d5.png" 
                alt="dKloud Logo" 
                className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 dark:hidden block"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-xl opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-700 animate-pulse" style={{animationDuration: "4s"}}></div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                dKloud
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                .in
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Modern Minimalistic */}
          <div className="hidden md:flex items-center flex-1 justify-center mx-2 xl:mx-4">
            <div className="flex items-center space-x-1 xl:space-x-2 bg-background/70 backdrop-blur-md border border-border/30 rounded-2xl p-1.5 xl:p-2 shadow-lg overflow-x-auto scrollbar-hide min-w-0 max-w-full">
              {navigation.map((item) => (
                <div key={item.name} className="relative flex-shrink-0 min-w-fit">
                  {item.dropdownItems ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[32px] min-w-fit nav-tab-gradient",
                            location.pathname === item.href
                              ? "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white shadow-md active-tab-glow"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="hidden lg:inline text-sm font-medium">{item.name}</span>
                          <span className="lg:hidden text-sm font-medium">
                            {item.name.split(' ')[0]}
                          </span>
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-background/95 backdrop-blur-lg border border-border/50 shadow-2xl min-w-[220px] z-[100]">
                        <DropdownMenuLabel className="text-sm font-semibold text-foreground bg-gradient-to-r from-primary/10 to-secondary/10 rounded-md mx-1 px-2 py-1">
                          {item.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border/30" />
                        {item.dropdownItems.map((dropItem) => (
                          <DropdownMenuItem 
                            key={dropItem.name} 
                            asChild={!(dropItem as any).external}
                            className="focus:bg-primary/10 focus:text-primary"
                            onClick={() => (dropItem as any).external && handleDropdownClick(dropItem)}
                          >
                            {(dropItem as any).external ? (
                              <button 
                                className="flex items-center px-3 py-2 text-sm hover:bg-muted/50 transition-colors duration-200 rounded-md mx-1 w-full text-left"
                              >
                                {dropItem.name.includes("Coming Soon") ? (
                                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold">
                                    {dropItem.name}
                                  </span>
                                ) : (
                                  dropItem.name
                                )}
                              </button>
                            ) : (
                              <Link 
                                to={dropItem.href}
                                className="flex items-center px-3 py-2 text-sm hover:bg-muted/50 transition-colors duration-200 rounded-md mx-1"
                              >
                                {dropItem.name.includes("Coming Soon") ? (
                                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold">
                                    {dropItem.name}
                                  </span>
                                ) : (
                                  dropItem.name
                                )}
                              </Link>
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      to={item.href}
                       className={cn(
                         "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[32px] min-w-fit nav-tab-gradient",
                         location.pathname === item.href
                           ? "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white shadow-md active-tab-glow"
                           : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                       )}
                     >
                      <item.icon className="h-4 w-4" />
                      <span className="hidden lg:inline text-sm font-medium">{item.name}</span>
                      <span className="lg:hidden text-sm font-medium">
                        {item.name.split(' ')[0]}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-10 w-10 p-0 touch-manipulation"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name} className="space-y-1">
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-colors nav-tab-gradient touch-manipulation min-h-[48px]",
                      location.pathname === item.href
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white shadow-lg active-tab-glow"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                  {item.dropdownItems && (
                    <div className="ml-6 space-y-1">
                      {item.dropdownItems.map((dropItem) => (
                        (dropItem as any).external ? (
                          <button
                            key={dropItem.name}
                            onClick={() => {
                              handleDropdownClick(dropItem);
                              setIsOpen(false);
                            }}
                            className="block px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                          >
                            {dropItem.name}
                          </button>
                        ) : (
                          <Link
                            key={dropItem.name}
                            to={dropItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {dropItem.name}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
