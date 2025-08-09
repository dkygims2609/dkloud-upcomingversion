import { ExternalLink, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GemWebsiteListCardProps {
  website: {
    id?: string;
    Website: string;
    Purpose?: string;
    Category?: string;
  };
  categoryColor: string;
}

export function GemWebsiteListCard({ website, categoryColor }: GemWebsiteListCardProps) {
  const websiteUrl = website.Website?.startsWith('http') ? website.Website : `https://${website.Website}`;
  const websiteName = website.Website?.replace(/^https?:\/\//, '').replace(/^www\./, '');

  return (
    <div 
      className={cn(
        "group relative bg-card border border-border rounded-lg p-4 transition-all duration-300",
        "hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5",
        "flex items-center justify-between gap-4 min-h-[80px]"
      )}
      style={{ borderLeftColor: categoryColor, borderLeftWidth: '4px' }}
    >
      {/* Website Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Favicon/Icon */}
        <div className="flex-shrink-0">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: categoryColor }}
          >
            <Globe className="w-5 h-5" />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {websiteName}
            </h3>
            {website.Category && (
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
              >
                {website.Category}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {website.Purpose || 'No description available'}
          </p>
        </div>
      </div>

      {/* Visit Button */}
      <div className="flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        >
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-1" />
            Visit
          </a>
        </Button>
      </div>

      {/* Hover Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg pointer-events-none"
        style={{ backgroundColor: categoryColor }}
      />
    </div>
  );
}