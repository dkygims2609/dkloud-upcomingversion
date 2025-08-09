import { useState, useEffect, useMemo } from "react";
import { Search, Filter, ChevronDown, ChevronUp, Globe, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { GemWebsiteListCard } from "@/components/GemWebsiteListCard";
import { useGemWebsitesSupabase } from "@/hooks/useGemWebsitesSupabase";

// Category color mapping
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Design Resources': '#9333ea', // Purple
    'Developer Tools': '#2563eb', // Blue
    'Learning Platforms': '#059669', // Green
    'Productivity': '#ea580c', // Orange
    'Gem Websites': '#dc2626', // Red
    'Tools': '#7c3aed', // Violet
    'AI Tools': '#0891b2', // Cyan
    'default': '#6b7280' // Gray
  };
  
  return colors[category] || colors.default;
};

export default function GemWebsites() {
  const { websites, loading, error, categories, refetch } = useGemWebsitesSupabase();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Group websites by category and filter
  const { groupedWebsites, filteredWebsites, totalCount } = useMemo(() => {
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
    
    // Group by category
    const grouped = filtered.reduce((acc, website) => {
      const category = website.Category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(website);
      return acc;
    }, {} as Record<string, typeof websites>);
    
    return {
      groupedWebsites: grouped,
      filteredWebsites: filtered,
      totalCount: filtered.length
    };
  }, [websites, searchTerm, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      refetch();
    } else {
      refetch(category);
    }
  };

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const toggleAllCategories = () => {
    if (collapsedCategories.size === Object.keys(groupedWebsites).length) {
      setCollapsedCategories(new Set());
    } else {
      setCollapsedCategories(new Set(Object.keys(groupedWebsites)));
    }
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
        <div className="max-w-6xl mx-auto mb-8">
          <div className="space-y-4">
            {/* Search and Category Filter */}
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

            {/* Quick Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.slice(0, 6).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className="text-xs"
                  style={selectedCategory === category ? { backgroundColor: getCategoryColor(category) } : {}}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {category}
                </Button>
              ))}
              {selectedCategory !== "all" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCategoryChange("all")}
                  className="text-xs"
                >
                  Clear Filter
                </Button>
              )}
            </div>

            {/* Results Info and Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {totalCount} {totalCount === 1 ? 'website' : 'websites'} found
                </Badge>
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" style={{ backgroundColor: `${getCategoryColor(selectedCategory)}20`, color: getCategoryColor(selectedCategory) }}>
                    {selectedCategory}
                  </Badge>
                )}
              </div>
              {Object.keys(groupedWebsites).length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAllCategories}
                  className="text-xs"
                >
                  {collapsedCategories.size === Object.keys(groupedWebsites).length ? 'Expand All' : 'Collapse All'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Category-wise Website Lists */}
        <div className="max-w-6xl mx-auto space-y-6">
          {Object.entries(groupedWebsites).map(([category, categoryWebsites]) => (
            <Collapsible
              key={category}
              open={!collapsedCategories.has(category)}
              onOpenChange={() => toggleCategory(category)}
            >
              <div className="space-y-4">
                {/* Category Header */}
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto hover:bg-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: getCategoryColor(category) }}
                      />
                      <div className="text-left">
                        <h2 className="text-xl font-semibold text-foreground">{category}</h2>
                        <p className="text-sm text-muted-foreground">
                          {categoryWebsites.length} {categoryWebsites.length === 1 ? 'website' : 'websites'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary"
                        style={{ backgroundColor: `${getCategoryColor(category)}20`, color: getCategoryColor(category) }}
                      >
                        {categoryWebsites.length}
                      </Badge>
                      {collapsedCategories.has(category) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronUp className="h-4 w-4" />
                      )}
                    </div>
                  </Button>
                </CollapsibleTrigger>

                {/* Category Content */}
                <CollapsibleContent className="space-y-3">
                  <div className="grid gap-3">
                    {categoryWebsites.map((website, index) => (
                      <GemWebsiteListCard
                        key={website.id || `${category}-${index}`}
                        website={website}
                        categoryColor={getCategoryColor(category)}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>

        {totalCount === 0 && (
          <div className="text-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No websites found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search terms or filter criteria." 
                : "No websites available at the moment."}
            </p>
            {(searchTerm || selectedCategory !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}