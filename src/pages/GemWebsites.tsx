
import { useState, useEffect } from "react";
import { Search, Filter, Star, ExternalLink, Globe, X, Code, Palette, Zap, Briefcase, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGemWebsitesAPI } from "@/hooks/useGemWebsitesAPI";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categoryIcons = {
  "Developer Tools": Code,
  "Design Resources": Palette,
  "Productivity": Zap,
  "Business": Briefcase,
  "Social": Users,
  "Utilities": Wrench,
};

const getCategoryIcon = (category: string) => {
  const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Globe;
  return IconComponent;
};

const getCategoryColor = (category: string) => {
  const colors = {
    "Developer Tools": "bg-blue-500/10 text-blue-600 border-blue-500/20",
    "Design Resources": "bg-purple-500/10 text-purple-600 border-purple-500/20", 
    "Productivity": "bg-green-500/10 text-green-600 border-green-500/20",
    "Business": "bg-orange-500/10 text-orange-600 border-orange-500/20",
    "Social": "bg-pink-500/10 text-pink-600 border-pink-500/20",
    "Utilities": "bg-gray-500/10 text-gray-600 border-gray-500/20",
  };
  return colors[category as keyof typeof colors] || "bg-primary/10 text-primary border-primary/20";
};

export default function GemWebsites() {
  const { websites, loading, error } = useGemWebsitesAPI();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredWebsites, setFilteredWebsites] = useState(websites);
  const [categories, setCategories] = useState<string[]>([]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = [...new Set(websites.map(website => website.Category).filter(Boolean))];
    setCategories(uniqueCategories.sort());
  }, [websites]);

  // Filter websites based on search and category
  useEffect(() => {
    let filtered = websites;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(website => website.Category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(website =>
        website.Website?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.Purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.Category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredWebsites(filtered);
  }, [websites, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

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

        {/* Search and Filter Controls */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search websites, purposes, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="min-w-[200px]">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories ({websites.length})</SelectItem>
                  {categories.map(category => {
                    const count = websites.filter(w => w.Category === category).length;
                    return (
                      <SelectItem key={category} value={category}>
                        {category} ({count})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategory !== "all") && (
              <Button variant="outline" onClick={clearFilters} size="icon">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Results Counter */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredWebsites.length} of {websites.length} websites
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWebsites.map((website, index) => {
            const IconComponent = getCategoryIcon(website.Category || "");
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      {website.Category && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(website.Category)}`}
                        >
                          {website.Category}
                        </Badge>
                      )}
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>

                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {website.Website || 'Unnamed Website'}
                  </CardTitle>
                  
                  <CardDescription className="text-sm line-clamp-4 leading-relaxed">
                    {website.Purpose || 'No purpose description available'}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button 
                    asChild 
                    className="w-full group/btn relative overflow-hidden"
                    variant="default"
                    disabled={!website.Website}
                  >
                    <a 
                      href={website.Website?.startsWith('http') ? website.Website : `https://${website.Website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredWebsites.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-6 rounded-2xl bg-muted/30 border-2 border-dashed border-muted-foreground/20">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No websites found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedCategory !== "all" 
                    ? "Try adjusting your search terms or category filter." 
                    : "No websites are currently available."}
                </p>
                {(searchTerm || selectedCategory !== "all") && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
