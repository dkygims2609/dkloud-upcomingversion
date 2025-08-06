import { useState, useEffect } from "react";
import { Search, Filter, Star, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGemWebsitesAPI } from "@/hooks/useGemWebsitesAPI";

export default function GemWebsites() {
  const { websites, loading, error } = useGemWebsitesAPI();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWebsites, setFilteredWebsites] = useState(websites);

  useEffect(() => {
    if (searchTerm) {
      setFilteredWebsites(
        websites.filter(
          (website) =>
            website.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            website.Category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            website.Description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredWebsites(websites);
    }
  }, [websites, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gem websites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Gem Websites</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover curated collection of amazing websites and tools that can enhance your productivity and creativity.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search websites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWebsites.map((website, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {website.Name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {website.Description}
                    </CardDescription>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{website.Category}</Badge>
                    {website.Free === "Yes" && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Free
                      </Badge>
                    )}
                  </div>
                  
                  {website.Rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{website.Rating}/5</span>
                    </div>
                  )}

                  <Button 
                    asChild 
                    className="w-full mt-4"
                    variant="outline"
                  >
                    <a 
                      href={website.URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWebsites.length === 0 && (
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No websites found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all websites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}