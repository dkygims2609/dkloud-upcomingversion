import { Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AnimatedHomeButton() {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Button
      onClick={() => navigate("/")}
      size="sm"
      className={cn(
        "fixed bottom-8 right-20 z-50 w-12 h-12 p-0 rounded-full shadow-xl",
        "bg-gradient-to-r from-primary via-secondary to-accent",
        "hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90",
        "transition-all duration-300 hover:scale-110 hover:shadow-2xl",
        "animate-pulse hover:animate-none",
        "border-2 border-white/20 hover:border-white/40"
      )}
      aria-label="Go to Home"
    >
      <Home className="h-5 w-5 text-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full animate-ping" />
    </Button>
  );
}