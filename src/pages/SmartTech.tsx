
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ShoppingCart, Heart, Filter, Loader2, Smartphone, Headphones, Home, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { ErrorState, EmptyState } from "@/components/ui/error-boundary";
import { RefreshButton } from "@/components/ui/refresh-button";
import { useToast } from "@/hooks/useToast";
import { BackgroundQuestions } from "@/components/BackgroundQuestions";

interface UniqueGadget {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  buy_link?: string;
  category?: string;
  brand?: string;
  price?: string;
  rating?: string;
  specifications?: string;
  availability?: string;
  [key: string]: any;
}

const tabData = [
  {
    id: 'gadgets',
    label: 'Gadgets',
    icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Latest tech gadgets'
  }
];

const SmartTech = () => {
  const [uniqueGadgets, setUniqueGadgets] = useState<UniqueGadget[]>([]);
  const [uniqueLoading, setUniqueLoading] = useState(false);
  const [uniqueError, setUniqueError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('gadgets');
  const { success: showSuccess } = useToast();

  // Fetch Unique Gadgets from Google Sheets API
  const fetchUniqueGadgets = async () => {
    setUniqueLoading(true);
    setUniqueError(null);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwZfjKJimT8xk8QOXuAoWs5zBN6XloA2KdwmftPGJaDE0MlKwhCF0rGWbKNLl6_xCVE/exec');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API data:', data); // Debug logging
      
      // Handle dynamic columns from the API
      const formattedData = data.map((item: any, index: number) => {
        console.log('Processing item:', item); // Debug logging for each item
        
        // Create a base object with common fields, handling various possible column names
        const gadget: UniqueGadget = {
          id: `unique-${index}`,
          name: item['Product Name'] || item['Name'] || item.name || item.title || 'Unknown Product',
          description: item['Description'] || item.description || item.summary || item.details || 'No description available',
          image_url: item['Image URL'] || item['Image'] || item['Photo'] || item.image_url || item.image || item.photo || '/placeholder.svg',
          buy_link: item.buyLink || item['Buy Link'] || item['Purchase Link'] || item['Product Link'] || item.buy_link || item.link || item.url || '#',
          category: item['Category'] || item.category || item.type || 'General',
          brand: item['Brand'] || item.brand || item.manufacturer || 'Unknown',
          price: item['Price'] || item.price || item.cost || 'N/A',
          rating: item['Rating'] || item.rating || item.score || '',
          specifications: item['Specifications'] || item['Specs'] || item.specifications || item.features || '',
          availability: item['Availability'] || item.availability || item.stock || item.status || ''
        };
        
        console.log('Processed gadget buy_link:', gadget.buy_link); // Debug buy_link specifically
        
        // Add any additional dynamic columns that weren't mapped above
        Object.keys(item).forEach(key => {
          const lowerKey = key.toLowerCase();
          if (!gadget.hasOwnProperty(lowerKey) && !['product name', 'name', 'description', 'image url', 'image', 'buy link', 'purchase link', 'category', 'brand', 'price', 'rating', 'specifications', 'specs', 'availability'].includes(lowerKey)) {
            gadget[key] = item[key];
          }
        });
        
        return gadget;
      }) as UniqueGadget[];
      
      console.log('Final formatted data:', formattedData); // Debug final data
      setUniqueGadgets(formattedData);
      showSuccess("Data loaded", "Unique gadgets loaded successfully");
    } catch (error) {
      console.error('Error fetching unique gadgets:', error);
      setUniqueError(error instanceof Error ? error.message : 'Failed to fetch unique gadgets');
      setUniqueGadgets([]);
    } finally {
      setUniqueLoading(false);
    }
  };

  useEffect(() => {
    fetchUniqueGadgets();
  }, []);

  const handleBuyClick = (buyLink: string, gadgetName: string) => {
    console.log('Buy button clicked for:', gadgetName, 'Link:', buyLink);
    if (buyLink && buyLink !== '#') {
      window.open(buyLink, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Invalid buy link for:', gadgetName);
    }
  };

  const renderTabContent = () => {
    return (
      <div className="space-y-8">
        {uniqueError && (
          <ErrorState 
            error={uniqueError}
            onRetry={fetchUniqueGadgets}
            title="Failed to load gadgets"
            description="We couldn't fetch the gadget data. Please try again."
          />
        )}

        {uniqueLoading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonLoader key={i} variant="card" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {uniqueGadgets.length === 0 ? (
              <EmptyState 
                title="No gadgets found"
                description="No gadgets available from the collection."
                className="col-span-full"
              />
            ) : (
              uniqueGadgets.map((gadget) => (
                <Card key={gadget.id} className="dkloud-card group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-purple-50/10 dark:to-purple-950/20 border-2 hover:border-purple-500/50 h-fit">
                  <div className="relative">
                    <img 
                      src={gadget.image_url || '/placeholder.svg'} 
                      alt={gadget.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute top-2 right-2 h-6 w-6 bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>

                  <CardHeader className="p-3 pb-2">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <Badge variant="secondary" className="shrink-0 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs px-2 py-0.5">
                        {gadget.category}
                      </Badge>
                      {gadget.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{gadget.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <CardTitle className="text-sm leading-tight group-hover:text-purple-600 transition-colors line-clamp-2">
                      {gadget.name}
                    </CardTitle>
                    
                    {gadget.brand && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">{gadget.brand}</span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="p-3 pt-0">
                    <div className="space-y-3">
                      <CardDescription className="text-xs line-clamp-2">
                        {gadget.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-purple-600">
                          {gadget.price}
                        </span>
                        {gadget.availability && (
                          <div className="text-xs font-medium text-green-600">
                            ✓ Available
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full h-8 text-xs bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                        onClick={() => handleBuyClick(gadget.buy_link || '', gadget.name)}
                        disabled={!gadget.buy_link || gadget.buy_link === '#'}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <BackgroundQuestions />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "#f59e0b" }}>⚡</span> 
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Smart</span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Tech</span> 
            <span style={{ color: "#8d61f3" }}>Gadgets</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Latest gadgets with <span style={{ color: "#10b981" }} className="font-medium">Indian market</span> availability and <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-medium">real-time pricing</span>
          </p>
        </div>

        {/* Modern Tab System */}
        <div className="mb-8">
          <div className="hidden md:flex bg-background/20 backdrop-blur-md border border-border/30 rounded-2xl p-2">
            {tabData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 flex-1 overflow-hidden ${
                    isActive
                      ? `bg-gradient-to-r ${tab.gradient} backdrop-blur-sm shadow-2xl border border-white/30 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)]`
                      : "hover:bg-background/40 hover:scale-105 hover:shadow-lg hover:border-primary/30 border border-transparent"
                  }`}
                >
                  <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm" 
                      : "bg-muted/50 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary group-hover:scale-110"
                  }`}>
                    <Icon className="h-5 w-5 transition-transform duration-300" />
                  </div>
                  
                  <div className="flex flex-col items-start">
                    <span className={`font-semibold text-sm transition-colors ${
                      isActive ? "text-white drop-shadow-sm" : "text-muted-foreground group-hover:text-primary"
                    }`}>
                      {tab.label}
                    </span>
                    <span className="text-xs text-muted-foreground opacity-70">
                      {tab.description}
                    </span>
                  </div>
                  
                  {isActive && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r rounded-full shadow-lg ${tab.gradient}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Tab Selector */}
          <div className="md:hidden">
            <div className="bg-background/20 backdrop-blur-md border border-border/30 rounded-xl p-3">
              <div className="grid grid-cols-2 gap-2">
                {tabData.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? `bg-gradient-to-r ${tab.gradient} shadow-lg border border-white/30 text-white`
                          : "hover:bg-background/40"
                      }`}
                    >
                      <div className={`p-1.5 rounded-md transition-all duration-200 ${
                        isActive 
                          ? "bg-white/20 text-white backdrop-blur-sm" 
                          : "bg-muted/50 text-muted-foreground"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className={`font-medium text-xs ${
                        isActive ? "text-white font-semibold" : "text-muted-foreground"
                      }`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">💎 {tabData.find(t => t.id === activeTab)?.label} Collection:</span>
            </div>
            <RefreshButton onRefresh={fetchUniqueGadgets} disabled={uniqueLoading} />
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SmartTech;
