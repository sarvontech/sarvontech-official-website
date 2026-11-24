-- Create the navigation_links table
CREATE TABLE IF NOT EXISTS public.navigation_links (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  url text NOT NULL,
  parent_id uuid REFERENCES public.navigation_links(id) ON DELETE CASCADE,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.navigation_links ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on navigation_links"
  ON public.navigation_links
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated admins to insert/update/delete
CREATE POLICY "Allow authenticated users to insert navigation_links"
  ON public.navigation_links
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update navigation_links"
  ON public.navigation_links
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete navigation_links"
  ON public.navigation_links
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert initial static links so the user doesn't lose navigation completely
INSERT INTO public.navigation_links (id, label, url, order_index, is_active)
VALUES 
(gen_random_uuid(), 'Home', '/', 0, true),
(gen_random_uuid(), 'Solutions', '/solutions', 1, true),
(gen_random_uuid(), 'Services', '/services', 2, true),
(gen_random_uuid(), 'Products', '/products', 3, true),
(gen_random_uuid(), 'Industries', '/industries', 4, true),
(gen_random_uuid(), 'Projects', '/projects', 5, true),
(gen_random_uuid(), 'Careers', '/careers', 6, true),
(gen_random_uuid(), 'About', '/about', 7, true);
