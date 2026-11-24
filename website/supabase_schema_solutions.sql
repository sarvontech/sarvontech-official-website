-- Create the solutions table
CREATE TABLE IF NOT EXISTS public.solutions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  "shortTitle" text NOT NULL,
  tagline text,
  headline text NOT NULL,
  "desc" text NOT NULL,
  icon text,
  points text[],
  "detailedProblem" text,
  "whoItIsFor" text,
  "whatWeBuild" text[],
  "actionText" text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on solutions"
  ON public.solutions
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated admins to insert/update/delete
CREATE POLICY "Allow authenticated users to insert solutions"
  ON public.solutions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update solutions"
  ON public.solutions
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete solutions"
  ON public.solutions
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert the static data into the database
INSERT INTO public.solutions (slug, title, "shortTitle", tagline, headline, "desc", icon, points, "detailedProblem", "whoItIsFor", "whatWeBuild", "actionText")
VALUES 
('websites', 'Digital Presence & Websites', 'DIGITAL PRESENCE', 'Websites that help your business get discovered and trusted', 'High-Converting Business Websites & Portals', 'From corporate flagships to institutional web portals and modern e-commerce stores. We build fast, mobile-friendly sites that convert visitors into real business enquiries.', 'Globe', ARRAY['Sub-1.2s instant page load speed', 'Designed for clarity on all mobile screens', 'Easy content updates without technical help', 'Built-in search engine optimization'], 'Most business websites look outdated, load slowly on mobile phones, or fail to convert visitors into actual customer enquiries.', 'Small businesses, corporate firms, educational institutions, healthcare clinics, and organizations wanting a credible online presence.', ARRAY['Corporate & Institutional Web Portals', 'High-Converting Landing Page Systems', 'E-Commerce & Storefront Web Applications', 'Dynamic Content Management Systems'], 'Explore Digital Presence'),
('business-software', 'Custom Business Software', 'BUSINESS SYSTEMS', 'Software built around the way your business works', 'School ERP, Operational & Management Systems', 'Stop wrestling with generic tools or spreadsheets. We build School ERP management platforms, custom software, and booking engines engineered around your operational workflow.', 'Database', ARRAY['Consolidate fragmented spreadsheets into one place', 'Automated student admissions & fee collection', 'Multi-provider appointment & schedule management', 'Real-time business inventory & order tracking'], 'Off-the-shelf software forces your organization into rigid templates, while spreadsheets become messy as your team grows.', 'Schools & educational institutions, growing companies, multi-branch service providers, and factories needing custom operational tools.', ARRAY['School & Educational ERP Systems', 'Appointment & Scheduling Engines', 'Inventory & Order Control Systems', 'Internal Team Dashboards & Portals'], 'Explore Business Systems'),
('ai-automation', 'AI & Workflow Automation', 'AI & AUTOMATION', 'Automate the work that slows you down', '24/7 AI Assistants & Automated Workflows', 'Let AI handle repetitive customer inquiries, lead qualification, and routine notifications so your team can focus on closing deals and serving clients.', 'Cpu', ARRAY['24/7 instant response to website & WhatsApp queries', 'Auto-qualify high-intent prospects before sales calls', 'Automated SMS/WhatsApp appointment reminders', 'Eliminate manual copy-pasting across systems'], 'Employees waste 15+ hours weekly on manual data entry, customer follow-up calls, and copying info across apps.', 'Businesses receiving high volumes of inquiries, ad leads, appointment requests, or routine customer support questions.', ARRAY['24/7 AI Inquiry & Sales Bots', 'Automated Lead Qualification Engines', 'WhatsApp & SMS Notification Reminders', 'Custom Workflow Automation Integrations'], 'Explore AI & Automation'),
('spiritual-organizations', 'Spiritual & Community Organizations', 'SPIRITUAL & COMMUNITY', 'Digital tools for modern congregations', 'Donation & Community Management Systems', 'We build platforms that help spiritual and community organizations manage members, accept donations securely, and organize events without technical headaches.', 'Users', ARRAY['Secure online donation & recurring giving portals', 'Member directory & communication tools', 'Event registration & volunteering schedules', 'Digital resource & sermon libraries'], 'Community leaders struggle to manage member data, collect donations transparently, and communicate effectively using fragmented tools.', 'Churches, temples, mosques, non-profits, and community centers looking to modernize their administration.', ARRAY['Custom Donation Processing Portals', 'Member & Volunteer Management Dashboards', 'Event & Schedule Booking Systems', 'Digital Content Distribution Platforms'], 'Explore Community Solutions')
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  "shortTitle" = EXCLUDED."shortTitle",
  tagline = EXCLUDED.tagline,
  headline = EXCLUDED.headline,
  "desc" = EXCLUDED."desc",
  icon = EXCLUDED.icon,
  points = EXCLUDED.points,
  "detailedProblem" = EXCLUDED."detailedProblem",
  "whoItIsFor" = EXCLUDED."whoItIsFor",
  "whatWeBuild" = EXCLUDED."whatWeBuild",
  "actionText" = EXCLUDED."actionText";
