-- Create AI Tools table
CREATE TABLE public.ai_tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  toolname TEXT NOT NULL,
  category TEXT NOT NULL,
  purpose TEXT,
  pricing_model TEXT,
  estimated_cost_per_month TEXT,
  tool_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Gem Websites table
CREATE TABLE public.gem_websites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_name TEXT NOT NULL,
  purpose TEXT,
  category TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gem_websites ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "AI tools are publicly readable" 
ON public.ai_tools 
FOR SELECT 
USING (true);

CREATE POLICY "Gem websites are publicly readable" 
ON public.gem_websites 
FOR SELECT 
USING (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_ai_tools_updated_at
BEFORE UPDATE ON public.ai_tools
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gem_websites_updated_at
BEFORE UPDATE ON public.gem_websites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();