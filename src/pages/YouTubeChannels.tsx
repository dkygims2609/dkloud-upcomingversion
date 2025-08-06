
import { useState, useEffect } from "react";
import { Search, ExternalLink, Users, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface YouTubeChannel {
  Name: string;
  Category: string;
  Description: string;
  YouTubeLink: string;
}

const YouTubeChannels = () => {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<YouTubeChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    filterChannels();
  }, [channels, searchTerm, selectedCategory]);

  const fetchChannels = async () => {
    try {
      const response = await fetch(
        "https://api.sheetbest.com/sheets/c66a0da1-d347-44f8-adc7-dc02c8627799"
      );
      const data = await response.json();
      // Ensure data is an array before setting channels
      setChannels(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching YouTube channels:", error);
      setChannels([]); // Set empty array on error
      setLoading(false);
    }
  };

  const filterChannels = () => {
    // Ensure channels is an array before filtering
    if (!Array.isArray(channels)) {
      setFilteredChannels([]);
      return;
    }
    
    let filtered = channels;
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((channel) =>
        channel.Category && channel.Category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((channel) =>
        (channel.Name && channel.Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (channel.Description && channel.Description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (channel.Category && channel.Category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredChannels(filtered);
  };

  // Get unique categories, filtering out undefined/null values
  const categories = ["All", ...Array.from(new Set(
    Array.isArray(channels) 
      ? channels
          .filter(channel => channel.Category) // Filter out channels without Category
          .map(channel => channel.Category)
      : []
  ))];

  const getCategoryColor = (category: string) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-violet-600", 
      "from-indigo-500 to-purple-600",
      "from-blue-600 to-purple-500",
      "from-violet-500 to-blue-600"
    ];
    const index = categories.indexOf(category) % colors.length;
    return colors[index];
  };

  const handleChannelClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            📹 YouTube Picks
          </h1>
          <p className="text-xl text-muted-foreground">
            Handpicked YouTube channels for learning, entertainment, and inspiration
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-card rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Filter by Category</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category 
                    ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg scale-105` 
                    : "hover:scale-105"
                }`}
              >
                {category}
                {category !== "All" && (
                        <span className="ml-2 text-xs bg-white/20 rounded-full px-2 py-0.5">
                          {Array.isArray(channels) ? channels.filter(c => c.Category === category).length : 0}
                        </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search channels, categories, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredChannels.length} of {Array.isArray(channels) ? channels.length : 0} channels
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel, index) => (
            <Card key={index} className="dkloud-card h-full cursor-pointer group" onClick={() => handleChannelClick(channel.YouTubeLink)}>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {channel.Name || "Untitled Channel"}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      {channel.Category && (
                        <Badge 
                          variant="secondary" 
                          className={`bg-gradient-to-r ${getCategoryColor(channel.Category)} text-white border-0 shadow-md`}
                        >
                          {channel.Category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {channel.Description || "No description available"}
                </CardDescription>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Play className="h-4 w-4" />
                    <span>YouTube Channel</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChannelClick(channel.YouTubeLink);
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChannels.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No channels found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeChannels;
