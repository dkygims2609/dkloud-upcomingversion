import { useState, useEffect } from "react";
import { Search, Filter, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModernCard } from "@/components/ModernCard";
import { useGemWebsitesSupabase } from "@/hooks/useGemWebsitesSupabase";

export default function GemWebsites() {
  const { websites, loading, error, categories, refetch } = useGemWebsitesSupabase();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredWebsites, setFilteredWebsites] = useState(websites);

  useEffect(() => {
    let filtered = websites;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(website => website.Category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (website) =>
          website.Website?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          website.Purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          website.Category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredWebsites(filtered);
  }, [websites, searchTerm, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      refetch();
    } else {
      refetch(category);
    }
  };

  const getCategoryForCard = (category: string): 'movies' | 'aitools' | 'tech' | 'youtube' | 'default' => {
    if (category?.toLowerCase().includes('ai') || category?.toLowerCase().includes('tool')) return 'aitools';
    if (category?.toLowerCase().includes('tech')) return 'tech';
    if (category?.toLowerCase().includes('youtube') || category?.toLowerCase().includes('video')) return 'youtube';
    if (category?.toLowerCase().includes('movie') || category?.toLowerCase().includes('film')) return 'movies';
    return 'default';
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

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search websites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWebsites.map((website, index) => (
            <ModernCard
              key={website.id || index}
              title={website.Website || 'Unnamed Website'}
              description={website.Purpose || 'No purpose description available'}
              category={getCategoryForCard(website.Category)}
              badge={website.Category}
              href={website.Website?.startsWith('http') ? website.Website : `https://${website.Website}`}
              className="h-full"
            />
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