-- Enable Row Level Security for Trending table
ALTER TABLE public."Trending" ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to Trending table
CREATE POLICY "Trending content is publicly readable" 
ON public."Trending" 
FOR SELECT 
USING (true);

-- Enable Row Level Security for Ultimate list table
ALTER TABLE public."Ultimate list" ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to Ultimate list table
CREATE POLICY "Ultimate list is publicly readable" 
ON public."Ultimate list" 
FOR SELECT 
USING (true);