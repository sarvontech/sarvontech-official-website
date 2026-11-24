-- Create the services table
CREATE TABLE IF NOT EXISTS public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  num text NOT NULL,
  category_id text NOT NULL UNIQUE,
  title text NOT NULL,
  category_label text NOT NULL,
  short_value text NOT NULL,
  image text NOT NULL,
  alt text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on services"
  ON public.services
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated admins to insert/update/delete
CREATE POLICY "Allow authenticated users to insert services"
  ON public.services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update services"
  ON public.services
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete services"
  ON public.services
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert the static data into the database
INSERT INTO public.services (num, category_id, title, category_label, short_value, image, alt)
VALUES 
('01', 'websites', 'Business Websites & Digital Presence', '01 ?? DIGITAL PRESENCE', 'High-performance websites designed to turn visitors into customers and strengthen your digital presence.', '/assets/images/projects/Business Websites & Digital Presence.png', 'ServonTech business website and digital presence platform'),
('02', 'custom-software', 'Custom Business Software', '02 ?? CUSTOM SOFTWARE', 'Business software built around your team''s actual workflows, data and operational needs.', '/assets/images/projects/Custom Business Software.png', 'ServonTech custom business software dashboard'),
('03', 'crm-lead-management', 'CRM & Lead Management', '03 ?? CRM & LEADS', 'Capture, organize and follow up with leads from every channel in one connected system.', '/assets/images/projects/CRM & Lead Management.png', 'ServonTech CRM and lead management platform'),
('04', 'appointment-booking', 'Appointment & Booking Platforms', '04 ?? APPOINTMENTS', 'Let customers discover availability, book appointments and receive automated reminders without phone calls.', '/assets/images/projects/Appointment & Booking Platforms.png', 'ServonTech appointment and booking platform'),
('05', 'ecommerce-inventory', 'E-Commerce & Inventory Systems', '05 ?? E-COMMERCE', 'Connect orders, inventory and operations so your business always knows what is happening.', '/assets/images/projects/E-Commerce & Inventory Systems.png', 'ServonTech e-commerce and multi-store inventory platform'),
('06', 'ai-automation', 'AI & Workflow Automation', '06 ?? AI & AUTOMATION', 'Automate repetitive work, customer interactions and workflows so your team can focus on growth.', '/assets/images/projects/AI & Workflow Automation.png', 'ServonTech AI and workflow automation engine')
ON CONFLICT (category_id) DO UPDATE SET 
  num = EXCLUDED.num,
  title = EXCLUDED.title,
  category_label = EXCLUDED.category_label,
  short_value = EXCLUDED.short_value,
  image = EXCLUDED.image,
  alt = EXCLUDED.alt;
