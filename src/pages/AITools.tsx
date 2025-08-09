import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, ExternalLink, Brain, ChevronLeft, ChevronRight, Globe, Zap, Target, DollarSign, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ModernLoader, SkeletonCard } from "@/components/ui/modern-loader";
import { supabase } from "@/integrations/supabase/client";

interface AITool {
  id?: string;
  Toolname: string;
  Category: string;
  Purpose?: string | null;
  Pricingmodel?: string | null;
  "EstimatedCost/Permonth"?: string | null;
  ToolsLink?: string | null;
}

const AITools = () => {
  const [data, setData] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  
  const toolsPerPage = 6; // 3 columns x 2 rows

  const fetchData = async (retryCount = 0) => {
    try {
      console.log("Fetching AI Tools data from Supabase...", { retryCount });
      setLoading(true);
      setError(null);
      
      const { data: aiToolsData, error: supabaseError } = await supabase
        .from('ai_tools')
        .select('*')
        .order('Toolname', { ascending: true });
      
      if (supabaseError) {
        throw new Error(`Supabase error: ${supabaseError.message}`);
      }
      
      console.log("AI Tools Supabase response:", aiToolsData);
      console.log("First item structure:", aiToolsData?.[0]);
      console.log("All available keys in first item:", aiToolsData?.[0] ? Object.keys(aiToolsData[0]) : "No data");
      
      if (!Array.isArray(aiToolsData)) {
        throw new Error("Invalid data format received from Supabase");
      }
      
      setData(aiToolsData as any || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching AI Tools data:", error);
      setError(error instanceof Error ? error.message : "Failed to load AI tools");
      
      if (retryCount < 2) {
        console.log(`Retrying... attempt ${retryCount + 1}`);
        setTimeout(() => fetchData(retryCount + 1), 2000);
        return;
      }
      
      toast.error("Failed to load AI tools. Please try again later.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to get tool name from Supabase column
  const getToolName = (tool: AITool): string => {
    return tool.Toolname || "Unknown Tool";
  };

  const getUniqueValues = (key: keyof AITool) => {
    return [...new Set(data.map(tool => tool[key]).filter(Boolean))].sort();
  };

  const filteredTools = data.filter(tool => {
    const toolName = getToolName(tool);
    const searchMatch = toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (tool.Category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (tool.Purpose?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                        (tool.Pricingmodel?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const categoryMatch = selectedCategory === "all" || tool.Category === selectedCategory;
    const pricingMatch = selectedPricing === "all" || tool.Pricingmodel === selectedPricing;

    return searchMatch && categoryMatch && pricingMatch;
  });

  const currentItems = filteredTools.slice(currentPage * toolsPerPage, (currentPage + 1) * toolsPerPage);

  const nextSlide = () => {
    if (currentPage < Math.ceil(filteredTools.length / toolsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPricing("all");
  };

  const renderAIToolCard = (tool: AITool) => {
    const toolName = getToolName(tool);
    
    return (
      <Card 
        key={toolName} 
        className="group relative overflow-hidden bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 aspect-[4/3] flex flex-col"
      >
        {/* Bright gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-green-400/10 via-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
        
        <CardHeader className="pb-3 relative z-10 flex-shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-bold text-foreground line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                {toolName}
              </CardTitle>
              {tool.Category && (
                <Badge variant="outline" className="text-xs mt-2 bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 text-blue-700 group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-purple-200">
                  {tool.Category}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 relative z-10 flex-1 flex flex-col space-y-3">
          {/* Purpose */}
          <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1 group-hover:text-foreground transition-colors duration-300">
            {tool.Purpose}
          </CardDescription>

          {/* Pricing and Cost */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {tool.Pricingmodel && (
                <Badge 
                  variant={tool.Pricingmodel.toLowerCase().includes('free') ? 'default' : 'secondary'} 
                  className={`text-xs transition-all duration-300 ${
                    tool.Pricingmodel.toLowerCase().includes('free') 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700' 
                      : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
                  }`}
                >
                  {tool.Pricingmodel}
                </Badge>
              )}
              {tool["EstimatedCost/Permonth"] && (
                <Badge variant="outline" className="text-xs bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 text-yellow-700">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {tool["EstimatedCost/Permonth"]}
                </Badge>
              )}
            </div>

            {/* Visit Button */}
            {tool.ToolsLink && (
              <Button 
                asChild 
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <a href={tool.ToolsLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Tool
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            AI Tools
          </h1>
        </div>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
          Explore a curated selection of AI tools to enhance your productivity and creativity.
        </p>
      </div>

      {/* Top Navigation */}
      {filteredTools.length > toolsPerPage && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentPage === 0}
            className="rounded-full hover:bg-primary/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {Math.ceil(filteredTools.length / toolsPerPage)}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentPage >= Math.ceil(filteredTools.length / toolsPerPage) - 1}
            className="rounded-full hover:bg-primary/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Enhanced Filters */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search AI tools..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {getUniqueValues('Category').map(category => (
                <SelectItem key={String(category)} value={String(category)}>
                  {String(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPricing} onValueChange={setSelectedPricing}>
            <SelectTrigger>
              <SelectValue placeholder="Pricing Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pricing</SelectItem>
              {getUniqueValues('Pricingmodel').map(pricing => (
                <SelectItem key={String(pricing)} value={String(pricing)}>
                  {String(pricing)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {currentItems.length} of {filteredTools.length} AI tools
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
            {error && (
              <Button variant="outline" size="sm" onClick={() => fetchData()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
          <ModernLoader 
            text="Loading AI Tools..." 
            variant="gradient" 
            size="lg"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
            {[...Array(10)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-2 text-destructive">Failed to Load AI Tools</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => fetchData()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      ) : filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentItems.map((tool, index) => (
            <div 
              key={getToolName(tool)} 
              className="animate-[fadeInStagger_0.5s_ease-out_forwards]"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {renderAIToolCard(tool)}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-2">No AI tools found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AITools;