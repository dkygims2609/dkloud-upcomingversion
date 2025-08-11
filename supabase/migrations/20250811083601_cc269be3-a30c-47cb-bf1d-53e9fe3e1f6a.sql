-- Enable Row Level Security for Movies and TvSeries tables
ALTER TABLE public."Movies" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."TvSeries" ENABLE ROW LEVEL SECURITY;

-- Create public read policies for Movies table
CREATE POLICY "Movies are publicly readable" 
ON public."Movies" 
FOR SELECT 
USING (true);

-- Create public read policies for TvSeries table  
CREATE POLICY "TvSeries are publicly readable" 
ON public."TvSeries" 
FOR SELECT 
USING (true);