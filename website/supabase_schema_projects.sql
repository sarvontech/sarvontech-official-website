-- Drop table if it exists (optional, be careful in production)
-- DROP TABLE IF EXISTS public.projects;

-- Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  industry text NOT NULL,
  summary text NOT NULL,
  live_url text,
  image text NOT NULL,
  challenge text,
  approach text,
  solution text,
  features text[] DEFAULT '{}'::text[],
  is_featured boolean DEFAULT true,
  is_real_project boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on projects"
  ON public.projects
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated admins to insert/update/delete
CREATE POLICY "Allow authenticated users to insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert the static data into the database
INSERT INTO public.projects (name, slug, category, industry, summary, live_url, image, challenge, approach, solution, features, is_featured, is_real_project)
VALUES 
(
  'School & Educational ERP Management System',
  'school-erp-system',
  'Education',
  'Education & ERP',
  'An end-to-end School ERP management platform unifying student admissions, fee collection, attendance, timetable scheduling, report cards, and parent communication.',
  null,
  '/assets/images/projects/custom-business-systems.webp',
  'Educational institutions struggle with fragmented administrative tasks across paper registers, fee tracking spreadsheets, and manual report card generation.',
  'Sarvon Tech engineered a centralized School ERP platform connecting administrators, teachers, students, and parents into a single synchronized portal.',
  'A complete web & mobile school management system automating fee collection, student attendance, online gradebooks, and instant parent notifications.',
  ARRAY['Student Information & Admission Management', 'Automated Fee Collection & E-Receipt Generation', 'Digital Attendance & Absentee Parent WhatsApp Alerts', 'Exam Management, Marks Entry & Report Card Generator', 'Teacher Timetable & Class Routine Management'],
  true,
  true
),
(
  'Revora Cinematic',
  'revora-cinematic',
  'Custom Digital Solution',
  'Automotive Videography Management',
  'Premium automotive videography management platform designed for car, bike, EV, and luxury vehicle showrooms.',
  'https://www.revoracinematic.com/',
  '/assets/images/projects/revora-cenematic.jpeg',
  'Automotive showrooms struggle to organize high-quality video production shoots, manage crew assignments, and track project delivery timelines efficiently.',
  'Sarvon Tech created a unified videography management platform connecting showrooms with professional cinematographers to streamline shoot bookings, assignments, and project management.',
  'An end-to-end management platform enabling businesses to manage the complete journey from booking a cinematic shoot to receiving the final edited video.',
  ARRAY['Connects Showrooms with Professional Cinematographers', 'Streamlined Shoot Bookings & Assignment Workflows', 'Complete Journey Management from Booking to Final Video', 'Built to Help Production Teams Scale Operations', 'Premium Customer Experience & Video Delivery'],
  true,
  true
),
(
  'Revora Cinematic Academy',
  'revora-cinematic-academy',
  'Websites',
  'Creative Education & Media',
  'Premium creative education platform featuring practical, career-focused learning with an engaging course showcase built for student conversion.',
  null,
  '/assets/images/projects/revora-course.jpeg',
  'Creative film & videography academies need high-converting, engaging platforms that present practical course curriculums clearly to prospective students.',
  'Sarvon Tech architected a modern creative education platform featuring practical course showcases, career path breakdowns, and streamlined student enrollment workflows.',
  'A career-focused education portal designed to guide aspiring creative professionals from course discovery to student enrollment.',
  ARRAY['Premium Creative Education Platform Architecture', 'Practical & Career-Focused Learning Curriculums', 'Engaging Course Showcase & Module Demos', 'Built for Student Conversion & Enrollment Growth', 'Mobile-Optimized Learning Portal & Student Journey'],
  true,
  true
),
(
  'Spiritual Organization Digital Platform',
  'spiritual-organization-platform',
  'Spiritual & Community',
  'Spiritual & Community',
  'A representative digital platform concept engineered for spiritual organizations, trusts, temples, and community institutions to manage event programs, announcements, and online donations.',
  null,
  '/assets/images/projects/spiritual-organization.webp',
  'Spiritual trusts and community organizations need simple, transparent digital communication channels for festival schedules, devotee updates, and online contribution receipts.',
  'Sarvon Tech architected a high-trust digital platform blueprint featuring event calendars, news feeds, online donation receipts, and multi-language support capabilities.',
  'A clean, peaceful, mobile-friendly institutional portal concept designed specifically for community engagement and transparent trust management.',
  ARRAY['Trust & Organization Information Showcase', 'Interactive Event & Festival Schedule Calendar', 'Transparent Online Donation & E-Receipt Module', 'Community Announcements & Video Media Feed', 'Multi-Language Accessibility (English, Hindi, Regional)'],
  true,
  false
),
(
  'Healthcare Clinic Smart Booking System',
  'smart-appointment-engine',
  'Healthcare',
  'Healthcare',
  'A multi-provider online appointment booking system for medical clinics and healthcare consultants featuring real-time slot synchronization and automated WhatsApp patient reminders.',
  null,
  '/assets/images/projects/healthcare-platform.webp',
  'Medical clinics experience high appointment no-show rates and front-desk bottlenecks due to manual phone booking management.',
  'Sarvon Tech engineered a 24/7 web and WhatsApp booking system allowing patients to search doctor availability, book open slots instantly, and receive automated reminder alerts.',
  'A frictionless scheduling engine synchronized in real-time across clinic rosters with 24h and 2h automated WhatsApp notification loops.',
  ARRAY['Doctor & Specialty Search with Real-Time Slot Availability', 'Instant Patient Booking & Deposit Collection', 'Automated WhatsApp & SMS Reminder Loop (24h & 2h prior)', 'Doctor Roster & Multi-Branch Schedule Control', 'Post-Consultation Review & Follow-Up Automation'],
  true,
  true
),
(
  'Multi-Store E-Commerce & Stock Control Platform',
  'multi-store-inventory',
  'E-commerce',
  'Retail & E-Commerce',
  'Centralized inventory management software that synchronizes stock levels across website storefronts, physical retail outlets, and online marketplaces in real time.',
  null,
  '/assets/images/projects/ecommerce-system.webp',
  'Retailers selling across physical stores and web platforms frequently oversell out-of-stock items, leading to customer complaints and manual refund processing.',
  'Sarvon Tech created a real-time stock control engine that deducts inventory instantly upon any order event and triggers low-stock alerts before stockouts occur.',
  'A unified inventory and order management dashboard with automated purchase order generation and item profit margin reporting.',
  ARRAY['Real-Time Multi-Store Inventory Synchronization', 'Instant Stock Deduction Across Web & Counter POS', 'Automated Low-Stock Safety Threshold Alerts', 'Supplier Purchase Order Dispatch Logs', 'Product Margin & Dead-Stock Financial Analytics'],
  true,
  true
),
(
  'Enterprise Business Operations Portal',
  'custom-business-systems',
  'Business Systems',
  'Business Systems',
  'Custom operational software consolidating team workflows, client communications, task tracking, and executive performance metrics into a single unified platform.',
  null,
  '/assets/images/projects/custom-business-systems.webp',
  'Growing companies suffer from fragmented operations when teams use disconnected spreadsheets, chat groups, and third-party tools.',
  'Sarvon Tech designed a modular business management portal with role-based access, automated task assignments, and centralized client records.',
  'A scalable internal software platform that replaces manual double-entry with real-time operational visibility.',
  ARRAY['Role-Based Access Control (Admins, Managers, Executives)', 'Centralized Client & Lead Management Database', 'Automated Task Workflow & Milestone Reminders', 'Real-Time Operational Analytics & Exportable Reports', 'Encrypted Document & Contract Storage'],
  true,
  true
),
(
  'Custom Website & Data Management Platform',
  'custom-website-real-time-data',
  'Websites',
  'Custom Digital Solution',
  'Your website, your data, your control. Update content and information anytime without waiting for a developer.',
  null,
  '/assets/images/projects/custom-website-real-time-data.webp',
  'Businesses waste money and time waiting for web developers to make minor content updates, schedule changes, or price revisions.',
  'Sarvon Tech engineered a custom website with an intuitive data management panel, giving business teams direct control to update website content and operational information instantly.',
  'A custom website with a built-in data management system that gives businesses direct control over their website content and information. Teams can update relevant data themselves without depending on a developer for every change.',
  ARRAY['Independent Content & Data Management Panel', 'Instant Website Updates Without Modifying Source Code', 'Self-Service Roster, Schedule & Pricing Revisions', 'Role-Based Team Administrative Access Controls', 'Zero Developer Dependency for Routine Content Maintenance'],
  true,
  false
)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  industry = EXCLUDED.industry,
  summary = EXCLUDED.summary,
  live_url = EXCLUDED.live_url,
  image = EXCLUDED.image,
  challenge = EXCLUDED.challenge,
  approach = EXCLUDED.approach,
  solution = EXCLUDED.solution,
  features = EXCLUDED.features,
  is_featured = EXCLUDED.is_featured,
  is_real_project = EXCLUDED.is_real_project;
