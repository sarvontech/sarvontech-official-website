export const SOLUTIONS_CATEGORIES = [
  {
    id: "websites",
    slug: "websites",
    title: "Digital Presence & Websites",
    shortTitle: "DIGITAL PRESENCE",
    tagline: "Websites that help your business get discovered and trusted",
    headline: "High-Converting Business Websites & Portals",
    desc: "From corporate flagships to institutional web portals and modern e-commerce stores. We build fast, mobile-friendly sites that convert visitors into real business enquiries.",
    icon: "Globe",
    points: [
      "Sub-1.2s instant page load speed",
      "Designed for clarity on all mobile screens",
      "Easy content updates without technical help",
      "Built-in search engine optimization"
    ],
    detailedProblem: "Most business websites look outdated, load slowly on mobile phones, or fail to convert visitors into actual customer enquiries.",
    whoItIsFor: "Small businesses, corporate firms, educational institutions, healthcare clinics, and organizations wanting a credible online presence.",
    whatWeBuild: [
      "Corporate & Institutional Web Portals",
      "High-Converting Landing Page Systems",
      "E-Commerce & Storefront Web Applications",
      "Dynamic Content Management Systems"
    ],
    actionText: "Explore Digital Presence"
  },
  {
    id: "business-software",
    slug: "business-software",
    title: "Custom Business Software",
    shortTitle: "BUSINESS SYSTEMS",
    tagline: "Software built around the way your business works",
    headline: "School ERP, Operational & Management Systems",
    desc: "Stop wrestling with generic tools or spreadsheets. We build School ERP management platforms, custom software, and booking engines engineered around your operational workflow.",
    icon: "Database",
    points: [
      "Consolidate fragmented spreadsheets into one place",
      "Automated student admissions & fee collection",
      "Multi-provider appointment & schedule management",
      "Real-time business inventory & order tracking"
    ],
    detailedProblem: "Off-the-shelf software forces your organization into rigid templates, while spreadsheets become messy as your team grows.",
    whoItIsFor: "Schools & educational institutions, growing companies, multi-branch service providers, and factories needing custom operational tools.",
    whatWeBuild: [
      "School & Educational ERP Systems",
      "Appointment & Scheduling Engines",
      "Inventory & Order Control Systems",
      "Internal Team Dashboards & Portals"
    ],
    actionText: "Explore Business Systems"
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI & Workflow Automation",
    shortTitle: "AI & AUTOMATION",
    tagline: "Automate the work that slows you down",
    headline: "24/7 AI Assistants & Automated Workflows",
    desc: "Let AI handle repetitive customer inquiries, lead qualification, and routine notifications so your team can focus on closing deals and serving clients.",
    icon: "Cpu",
    points: [
      "24/7 instant response to website & WhatsApp queries",
      "Auto-qualify high-intent prospects before sales calls",
      "Automated SMS/WhatsApp appointment reminders",
      "Eliminate manual copy-pasting across systems"
    ],
    detailedProblem: "Employees waste 15+ hours weekly on manual data entry, customer follow-up calls, and copying info across apps.",
    whoItIsFor: "Businesses receiving high volumes of inquiries, ad leads, appointment requests, or routine customer support questions.",
    whatWeBuild: [
      "24/7 AI Inquiry & Sales Bots",
      "Automated Lead Qualification Engines",
      "WhatsApp & SMS Notification Reminders",
      "Custom Workflow Automation Integrations"
    ],
    actionText: "Explore AI & Automation"
  },
  {
    id: "spiritual-organizations",
    slug: "spiritual-organizations",
    title: "Spiritual & Community Organizations",
    shortTitle: "SPIRITUAL & COMMUNITY",
    tagline: "Digital platforms for spiritual organizations, trusts and community institutions",
    headline: "Spiritual Organization Digital Platforms",
    desc: "Digital solutions designed for spiritual organizations, trusts, ashrams, temples, and community institutions—including information portals, program schedules, online donations, announcements, and community engagement.",
    icon: "HeartHandshake",
    representativeImage: "/assets/images/projects/spiritual-organization.webp",
    representativeImageLarge: "/assets/images/projects/spiritual-organization-1200.webp",
    points: [
      "Trust & Organization Information Portals",
      "Event & Festival Program Management",
      "Transparent Online Donation Systems",
      "Community Announcements & Feeds"
    ],
    detailedProblem: "Spiritual organizations and community trusts struggle to keep devotees and donors updated with reliable event schedules, donation receipts, and announcements.",
    whoItIsFor: "Spiritual organizations, religious trusts, ashrams, temples, and community non-profit institutions.",
    whatWeBuild: [
      "Official Organization Web Portals",
      "Event & Celebration Management Hubs",
      "Online Donation & E-Receipt Systems",
      "Devotee Community News & Media Feeds"
    ],
    actionText: "Explore Spiritual Solution"
  }
];

export const PROJECTS_DATA = [
  // 1st Project: School & Educational ERP Management System (POSITION 1)
  {
    id: "school-erp-system",
    slug: "school-erp-system",
    name: "School & Educational ERP Management System",
    category: "Education",
    industry: "Education & ERP",
    isFeatured: true,
    isRealProject: true,
    isDemo: false,
    summary: "An end-to-end School ERP management platform unifying student admissions, fee collection, attendance, timetable scheduling, report cards, and parent communication.",
    image: "/assets/images/projects/custom-business-systems.webp",
    imageLarge: "/assets/images/projects/custom-business-systems-1200.webp",
    challenge: "Educational institutions struggle with fragmented administrative tasks across paper registers, fee tracking spreadsheets, and manual report card generation.",
    approach: "Sarvon Tech engineered a centralized School ERP platform connecting administrators, teachers, students, and parents into a single synchronized portal.",
    solution: "A complete web & mobile school management system automating fee collection, student attendance, online gradebooks, and instant parent notifications.",
    features: [
      "Student Information & Admission Management",
      "Automated Fee Collection & E-Receipt Generation",
      "Digital Attendance & Absentee Parent WhatsApp Alerts",
      "Exam Management, Marks Entry & Report Card Generator",
      "Teacher Timetable & Class Routine Management"
    ],
    technology: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "WhatsApp API"],
    outcome: "Streamlined school administration, reduced fee overdue rates, and enhanced parent-teacher transparency."
  },
  // 2nd Project: Revora Cinematic (POSITION 2)
  {
    id: "revora-cinematic",
    slug: "revora-cinematic",
    name: "Revora Cinematic",
    displayTitle: "Revora Cinematic",
    category: "Custom Digital Solution",
    industry: "Automotive Videography Management",
    isFeatured: true,
    isRealProject: true,
    isDemo: false,
    liveUrl: "https://www.revoracinematic.com/",
    summary: "Premium automotive videography management platform designed for car, bike, EV, and luxury vehicle showrooms.",
    image: "/assets/images/projects/revora-cenematic.jpeg",
    imageLarge: "/assets/images/projects/revora-cenematic.jpeg",
    challenge: "Automotive showrooms struggle to organize high-quality video production shoots, manage crew assignments, and track project delivery timelines efficiently.",
    approach: "Sarvon Tech created a unified videography management platform connecting showrooms with professional cinematographers to streamline shoot bookings, assignments, and project management.",
    solution: "An end-to-end management platform enabling businesses to manage the complete journey from booking a cinematic shoot to receiving the final edited video.",
    features: [
      "Connects Showrooms with Professional Cinematographers",
      "Streamlined Shoot Bookings & Assignment Workflows",
      "Complete Journey Management from Booking to Final Video",
      "Built to Help Production Teams Scale Operations",
      "Premium Customer Experience & Video Delivery"
    ],
    technology: ["React", "Node.js", "Express", "Tailwind CSS", "REST API"],
    outcome: "Helps cinematic production teams scale operations, manage multiple projects, and deliver a premium customer experience."
  },
  // 3rd Project: Revora Cinematic Academy (POSITION 3)
  {
    id: "revora-cinematic-academy",
    slug: "revora-cinematic-academy",
    name: "Revora Cinematic Academy",
    displayTitle: "Revora Cinematic Academy",
    category: "Websites",
    industry: "Creative Education & Media",
    isFeatured: true,
    isRealProject: true,
    isDemo: false,
    summary: "Premium creative education platform featuring practical, career-focused learning with an engaging course showcase built for student conversion.",
    image: "/assets/images/projects/revora-course.jpeg",
    imageLarge: "/assets/images/projects/revora-course.jpeg",
    challenge: "Creative film & videography academies need high-converting, engaging platforms that present practical course curriculums clearly to prospective students.",
    approach: "Sarvon Tech architected a modern creative education platform featuring practical course showcases, career path breakdowns, and streamlined student enrollment workflows.",
    solution: "A career-focused education portal designed to guide aspiring creative professionals from course discovery to student enrollment.",
    features: [
      "Premium Creative Education Platform Architecture",
      "Practical & Career-Focused Learning Curriculums",
      "Engaging Course Showcase & Module Demos",
      "Built for Student Conversion & Enrollment Growth",
      "Mobile-Optimized Learning Portal & Student Journey"
    ],
    technology: ["React", "Vite", "Node.js", "Tailwind CSS"],
    outcome: "Delivers an engaging learning showcase that drives student inquiry and enrollment growth for creative production courses."
  },
  // Spiritual Organization Digital Platform
  {
    id: "spiritual-organization-platform",
    slug: "spiritual-organization-platform",
    name: "Spiritual Organization Digital Platform",
    category: "Spiritual & Community",
    industry: "Spiritual & Community",
    isFeatured: true,
    isRealProject: false,
    isDemo: true,
    badge: "CONCEPT / DEMO",
    summary: "A representative digital platform concept engineered for spiritual organizations, trusts, temples, and community institutions to manage event programs, announcements, and online donations.",
    image: "/assets/images/projects/spiritual-organization.webp",
    imageLarge: "/assets/images/projects/spiritual-organization-1200.webp",
    challenge: "Spiritual trusts and community organizations need simple, transparent digital communication channels for festival schedules, devotee updates, and online contribution receipts.",
    approach: "Sarvon Tech architected a high-trust digital platform blueprint featuring event calendars, news feeds, online donation receipts, and multi-language support capabilities.",
    solution: "A clean, peaceful, mobile-friendly institutional portal concept designed specifically for community engagement and transparent trust management.",
    features: [
      "Trust & Organization Information Showcase",
      "Interactive Event & Festival Schedule Calendar",
      "Transparent Online Donation & E-Receipt Module",
      "Community Announcements & Video Media Feed",
      "Multi-Language Accessibility (English, Hindi, Regional)"
    ],
    technology: ["React", "Vite", "Node.js", "Tailwind CSS", "Payment API"],
    outcome: "Representative technology blueprint demonstrating Sarvon Tech's capacity to build platforms for spiritual institutions and community trusts."
  },
  // 6th Project: Healthcare Clinic Smart Booking System
  {
    id: "smart-appointment-engine",
    slug: "smart-appointment-engine",
    name: "Healthcare Clinic Smart Booking System",
    category: "Healthcare",
    industry: "Healthcare",
    isFeatured: true,
    isRealProject: true,
    isDemo: false,
    summary: "A multi-provider online appointment booking system for medical clinics and healthcare consultants featuring real-time slot synchronization and automated WhatsApp patient reminders.",
    image: "/assets/images/projects/healthcare-platform.webp",
    imageLarge: "/assets/images/projects/healthcare-platform-1200.webp",
    challenge: "Medical clinics experience high appointment no-show rates and front-desk bottlenecks due to manual phone booking management.",
    approach: "Sarvon Tech engineered a 24/7 web and WhatsApp booking system allowing patients to search doctor availability, book open slots instantly, and receive automated reminder alerts.",
    solution: "A frictionless scheduling engine synchronized in real-time across clinic rosters with 24h and 2h automated WhatsApp notification loops.",
    features: [
      "Doctor & Specialty Search with Real-Time Slot Availability",
      "Instant Patient Booking & Deposit Collection",
      "Automated WhatsApp & SMS Reminder Loop (24h & 2h prior)",
      "Doctor Roster & Multi-Branch Schedule Control",
      "Post-Consultation Review & Follow-Up Automation"
    ],
    technology: ["React", "Node.js", "Express", "Tailwind CSS", "WhatsApp API"],
    outcome: "Decreased appointment no-shows significantly and enabled 24/7 patient booking without expanding front-desk staff."
  },
  // 7th Project: Multi-Store E-Commerce & Stock Control Platform
  {
    id: "multi-store-inventory",
    slug: "multi-store-inventory",
    name: "Multi-Store E-Commerce & Stock Control Platform",
    category: "E-commerce",
    industry: "Retail & E-Commerce",
    isFeatured: true,
    isRealProject: true,
    isDemo: false,
    summary: "Centralized inventory management software that synchronizes stock levels across website storefronts, physical retail outlets, and online marketplaces in real time.",
    image: "/assets/images/projects/ecommerce-system.webp",
    imageLarge: "/assets/images/projects/ecommerce-system-1200.webp",
    challenge: "Retailers selling across physical stores and web platforms frequently oversell out-of-stock items, leading to customer complaints and manual refund processing.",
    approach: "Sarvon Tech created a real-time stock control engine that deducts inventory instantly upon any order event and triggers low-stock alerts before stockouts occur.",
    solution: "A unified inventory and order management dashboard with automated purchase order generation and item profit margin reporting.",
    features: [
      "Real-Time Multi-Store Inventory Synchronization",
      "Instant Stock Deduction Across Web & Counter POS",
      "Automated Low-Stock Safety Threshold Alerts",
      "Supplier Purchase Order Dispatch Logs",
      "Product Margin & Dead-Stock Financial Analytics"
    ],
    technology: ["React", "Node.js", "Redis", "Tailwind CSS", "REST API"],
    outcome: "Eliminated overselling incidents and reduced stockout occurrences across retail channels."
  },
  // 8th Project: Enterprise Business Operations Portal
  {
    id: "custom-business-systems",
    slug: "custom-business-systems",
    name: "Enterprise Business Operations Portal",
    category: "Business Systems",
    industry: "Business Systems",
    isFeatured: true,
    isRealProject: true,
    isDemo: false,
    summary: "Custom operational software consolidating team workflows, client communications, task tracking, and executive performance metrics into a single unified platform.",
    image: "/assets/images/projects/custom-business-systems.webp",
    imageLarge: "/assets/images/projects/custom-business-systems-1200.webp",
    challenge: "Growing companies suffer from fragmented operations when teams use disconnected spreadsheets, chat groups, and third-party tools.",
    approach: "Sarvon Tech designed a modular business management portal with role-based access, automated task assignments, and centralized client records.",
    solution: "A scalable internal software platform that replaces manual double-entry with real-time operational visibility.",
    features: [
      "Role-Based Access Control (Admins, Managers, Executives)",
      "Centralized Client & Lead Management Database",
      "Automated Task Workflow & Milestone Reminders",
      "Real-Time Operational Analytics & Exportable Reports",
      "Encrypted Document & Contract Storage"
    ],
    technology: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    outcome: "Consolidated operational workflows into one unified tool, improving team efficiency and data accuracy."
  },
  // 9th Project: Custom Website & Data Management Platform
  {
    id: "custom-website-real-time-data",
    slug: "custom-website-real-time-data",
    name: "Custom Website & Data Management Platform",
    category: "Websites",
    industry: "Custom Digital Solution",
    isFeatured: true,
    isRealProject: false,
    isDemo: true,
    badge: "CONCEPT / DEMO",
    summary: "Your website, your data, your control. Update content and information anytime without waiting for a developer.",
    image: "/assets/images/projects/custom-website-real-time-data.webp",
    imageLarge: "/assets/images/projects/custom-website-real-time-data-1200.webp",
    challenge: "Businesses waste money and time waiting for web developers to make minor content updates, schedule changes, or price revisions.",
    approach: "Sarvon Tech engineered a custom website with an intuitive data management panel, giving business teams direct control to update website content and operational information instantly.",
    solution: "A custom website with a built-in data management system that gives businesses direct control over their website content and information. Teams can update relevant data themselves without depending on a developer for every change.",
    features: [
      "Independent Content & Data Management Panel",
      "Instant Website Updates Without Modifying Source Code",
      "Self-Service Roster, Schedule & Pricing Revisions",
      "Role-Based Team Administrative Access Controls",
      "Zero Developer Dependency for Routine Content Maintenance"
    ],
    technology: ["React", "Node.js", "REST API", "Tailwind CSS"],
    outcome: "Empowers business teams to maintain up-to-date website information independently, significantly reducing ongoing developer maintenance costs."
  }
];

export const PRODUCTS_HUMANIZED = [
  {
    id: "school-erp-system",
    slug: "school-erp-system",
    name: "School ERP System",
    badge: "Sarvon Tech Product",
    tagline: "Unified school administration, admissions, fee collection & parent updates.",
    summary: "Bring student admissions, fee payments, attendance tracking, timetable scheduling, and report card generation into one seamless web and mobile platform.",
    problem: "School administration gets overwhelmed by manual paper registers, untracked fee overdues, and delayed parent communication.",
    solution: "A complete educational management system that automates fee receipts, digital attendance, gradebook reports, and instant WhatsApp alerts to parents.",
    benefit: "Reduces administrative overhead by 80%, speeds up fee collection, and improves parent-teacher transparency.",
    storySteps: [
      { step: "1", title: "Admissions", desc: "Digital student registration & document verification." },
      { step: "2", title: "Fee Collection", desc: "Automated fee reminders, online payments & e-receipts." },
      { step: "3", title: "Attendance", desc: "Instant teacher attendance log with automated parent WhatsApp alerts." },
      { step: "4", title: "Report Cards", desc: "Automated marks entry, grade calculation & digital report cards." },
      { step: "5", title: "Parent Portal", desc: "Parents track attendance, grades, and circulars in real time." }
    ],
    ctaText: "Explore Product"
  },
  {
    id: "appointment-platform",
    slug: "appointment-platform",
    name: "Smart Booking System",
    badge: "Sarvon Tech Product",
    tagline: "Make it easier for customers to book with you.",
    summary: "Frictionless online appointment booking for clinics, healthcare providers, and professional services with automated WhatsApp reminder loops.",
    problem: "Phone calls go unanswered after hours, and missed appointments waste valuable specialist time.",
    solution: "Clients choose available slots 24/7 on web or WhatsApp with instant calendar sync.",
    benefit: "Reduces appointment no-shows by up to 75% while freeing up front-desk staff.",
    storySteps: [
      { step: "1", title: "Select Service", desc: "Customer picks doctor, clinic branch, or consultation type." },
      { step: "2", title: "Pick Open Slot", desc: "Displays up-to-the-minute open calendar slots." },
      { step: "3", title: "Instant Confirm", desc: "Collects patient details and sends instant booking confirmation." },
      { step: "4", title: "WhatsApp Reminder", desc: "Sends automated reminder 24h and 2h before consultation." },
      { step: "5", title: "Feedback Loop", desc: "Collects post-consultation reviews and schedules follow-ups." }
    ],
    ctaText: "Explore Product"
  },
  {
    id: "inventory-suite",
    slug: "inventory-suite",
    name: "Inventory & Order Control",
    badge: "Sarvon Tech Product",
    tagline: "Real-time stock control across physical & web stores.",
    summary: "Centralized stock management that syncs inventory levels across your website store, online marketplaces, and retail outlets automatically.",
    problem: "Overselling out-of-stock items leads to customer complaints and manual refund headaches.",
    solution: "Instant multi-store inventory synchronization with automated low-stock reorder triggers.",
    benefit: "Zero overselling incidents and 45% reduction in stockouts.",
    storySteps: [
      { step: "1", title: "Order Placed", desc: "Customer buys on your website or retail counter." },
      { step: "2", title: "Instant Stock Deduct", desc: "Stock updates across all stores in under 1 second." },
      { step: "3", title: "Low Stock Alert", desc: "Triggers purchase order alert when safety stock is breached." },
      { step: "4", title: "Supplier Log", desc: "Tracks incoming warehouse shipments automatically." },
      { step: "5", title: "Margin Report", desc: "Shows item profitability and turnover rates in one click." }
    ],
    ctaText: "Explore Product"
  }
];

export const INDUSTRIES_HUMANIZED = [
  {
    id: "healthcare",
    slug: "healthcare",
    title: "Healthcare & Clinics",
    tagline: "24/7 patient booking, automated reminders, and clinic systems.",
    icon: "Stethoscope",
    description: "Appointment systems, clinic websites, automated patient notifications, and doctor roster management."
  },
  {
    id: "education",
    slug: "education",
    title: "Education & Academics",
    tagline: "Modern academic portals, student systems, and inquiry pipelines.",
    icon: "GraduationCap",
    description: "Institutional websites, admission inquiry workflows, student portals, and course directories."
  },
  {
    id: "retail",
    slug: "retail",
    title: "Retail & E-Commerce",
    tagline: "Fast online stores, inventory sync, and customer re-engagement.",
    icon: "ShoppingBag",
    description: "High-speed storefronts, multi-store stock synchronization, payment integrations, and order processing."
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: "Manufacturing",
    tagline: "Industrial websites, B2B quote portals, and internal workflows.",
    icon: "Factory",
    description: "B2B catalog portals, RFQ quote workflows, equipment logs, and operational business software."
  },
  {
    id: "spiritual-organizations",
    slug: "spiritual-organizations",
    title: "Spiritual & Community",
    tagline: "Digital platforms, trust information, events, and donation systems.",
    icon: "HeartHandshake",
    description: "Digital solutions for spiritual trusts, temples, ashrams, and community organizations—including info portals, events, and donations."
  }
];

export const SERVICES_CATEGORIES = [
  {
    num: "01",
    id: "websites",
    title: "Business Websites & Digital Presence",
    categoryLabel: "01 · DIGITAL PRESENCE",
    shortValue: "High-performance websites designed to turn visitors into customers and strengthen your digital presence.",
    image: "/assets/images/projects/Business Websites & Digital Presence.png",
    alt: "ServonTech business website and digital presence platform",
    targetStory: "healthcare"
  },
  {
    num: "02",
    id: "custom-software",
    title: "Custom Business Software",
    categoryLabel: "02 · CUSTOM SOFTWARE",
    shortValue: "Business software built around your team's actual workflows, data and operational needs.",
    image: "/assets/images/projects/Custom Business Software.png",
    alt: "ServonTech custom business software dashboard",
    targetStory: "custom-business-systems"
  },
  {
    num: "03",
    id: "crm-lead-management",
    title: "CRM & Lead Management",
    categoryLabel: "03 · CRM & LEADS",
    shortValue: "Capture, organize and follow up with leads from every channel in one connected system.",
    image: "/assets/images/projects/CRM & Lead Management.png",
    alt: "ServonTech CRM and lead management platform",
    targetStory: "real-estate-crm"
  },
  {
    num: "04",
    id: "appointment-booking",
    title: "Appointment & Booking Platforms",
    categoryLabel: "04 · APPOINTMENTS",
    shortValue: "Let customers discover availability, book appointments and receive automated reminders without phone calls.",
    image: "/assets/images/projects/Appointment & Booking Platforms.png",
    alt: "ServonTech appointment and booking platform",
    targetStory: "healthcare"
  },
  {
    num: "05",
    id: "ecommerce-inventory",
    title: "E-Commerce & Inventory Systems",
    categoryLabel: "05 · E-COMMERCE",
    shortValue: "Connect orders, inventory and operations so your business always knows what is happening.",
    image: "/assets/images/projects/E-Commerce & Inventory Systems.png",
    alt: "ServonTech e-commerce and multi-store inventory platform",
    targetStory: "multi-store-inventory"
  },
  {
    num: "06",
    id: "ai-automation",
    title: "AI & Workflow Automation",
    categoryLabel: "06 · AI & AUTOMATION",
    shortValue: "Automate repetitive work, customer interactions and workflows so your team can focus on growth.",
    image: "/assets/images/projects/AI & Workflow Automation.png",
    alt: "ServonTech AI and workflow automation engine",
    targetStory: "healthcare"
  },
  {
    num: "07",
    id: "data-management",
    title: "Data Management & Admin Platforms",
    categoryLabel: "07 · DATA MANAGEMENT",
    shortValue: "Give your team control over business data, content and updates without depending on developers.",
    image: "/assets/images/projects/custom-website-real-time-data-1200.webp",
    alt: "ServonTech data management and administrative platform",
    targetStory: "custom-website-real-time-data"
  },
  {
    num: "08",
    id: "custom-platforms",
    title: "Custom Digital Platforms",
    categoryLabel: "08 · CUSTOM PLATFORMS",
    shortValue: "Purpose-built digital platforms designed around your organization's unique users, workflows and requirements.",
    image: "/assets/images/projects/custom-business-systems-1200.webp",
    alt: "ServonTech custom digital platform",
    targetStory: "spiritual-organization"
  }
];

export const PROBLEM_SOLVER_OPTIONS = [
  { id: "website", label: "A Better Website", icon: "Globe" },
  { id: "leads", label: "More & Better Leads", icon: "Target" },
  { id: "crm", label: "Organized Lead Follow-ups", icon: "Users" },
  { id: "booking", label: "Online Appointment Booking", icon: "Calendar" },
  { id: "inventory", label: "Inventory & Stock Control", icon: "Box" },
  { id: "automation", label: "Automate Repetitive Work", icon: "Zap" },
  { id: "custom", label: "A Custom Digital System", icon: "Cpu" },
  { id: "unsure", label: "I'm Not Sure Yet", icon: "HelpCircle" }
];

export const WHY_SERVONTECH = [
  {
    title: "We Understand Problems First",
    desc: "We don't talk tech jargon. We ask about your business goals, bottlenecks, and daily operations to design what you actually need."
  },
  {
    title: "Built Around the Way You Work",
    desc: "We adapt software to your existing business processes—not the other way around. No forced rigid templates."
  },
  {
    title: "Practical AI Where It Helps",
    desc: "We integrate AI automation only where it saves real human hours, captures lost leads, or improves customer service."
  },
  {
    title: "A System That Grows With You",
    desc: "Your digital asset belongs 100% to you. We build scalable systems that expand seamlessly as your business expands."
  }
];

export const CAREERS_ROLES = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Pune / Hybrid",
    employmentType: "Full-Time",
    experience: "1–3 Years / Fresh Talent",
    tags: ["React.js", "JavaScript", "CSS", "Tailwind"],
    summary: "Build high-speed, responsive web applications, interactive story journeys, and administrative dashboards for real businesses.",
    whatYoullDo: [
      "Develop modular, high-performance React components using Vite, Tailwind CSS, and JavaScript.",
      "Translate wireframes and product specs into intuitive, mobile-first user interfaces.",
      "Integrate RESTful APIs and state management for real-time dashboard updates.",
      "Optimize web assets and components for sub-1.2s page load speeds."
    ],
    requirements: [
      "Solid understanding of HTML5, CSS3, modern JavaScript (ES6+), and React fundamentals.",
      "Experience with responsive layout design and component-driven architecture.",
      "Familiarity with Git version control concepts and REST API consumption.",
      "Strong problem-solving mindset and passion for clean, readable code."
    ],
    niceToHave: [
      "Experience with Tailwind CSS, Vite, or Next.js.",
      "Understanding of web accessibility (WCAG) and performance profiling.",
      "Knowledge of TypeScript or animation libraries."
    ],
    whatYoullBuild: "Business Web Applications, Booking Engines, and Admin Control Interfaces."
  },
  {
    id: "java-backend-developer",
    title: "Java Backend Developer",
    department: "Engineering",
    location: "Pune / Hybrid",
    employmentType: "Full-Time",
    experience: "1–4 Years / Fresh Talent",
    tags: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    summary: "Architect robust server-side APIs, database schemas, and background transaction workflows for business systems.",
    whatYoullDo: [
      "Design and implement RESTful web services and backend APIs using Java and Spring Boot.",
      "Architect clean relational database schemas in MySQL/PostgreSQL with optimized query performance.",
      "Implement secure authentication, role-based access control (RBAC), and data validation layers.",
      "Integrate third-party messaging services (WhatsApp API, SMS, Email dispatches)."
    ],
    requirements: [
      "Strong proficiency in Java, Object-Oriented Programming (OOP), and Spring Boot fundamentals.",
      "Experience writing relational SQL queries and ORM mappings (Hibernate/JPA).",
      "Understanding of RESTful API architecture and HTTP protocol standards.",
      "Good debugging, logging, and problem-solving capabilities."
    ],
    niceToHave: [
      "Experience with Docker, Redis caching, or message queues.",
      "Knowledge of microservices architecture or cloud deployment."
    ],
    whatYoullBuild: "Enterprise Lead Routing Engines, Booking Synchronization Servers, and Secure Data APIs."
  },
  {
    id: "ai-automation-developer",
    title: "AI / Automation Developer",
    department: "AI & Innovation",
    location: "Pune / Hybrid",
    employmentType: "Full-Time",
    experience: "1–3 Years / Fresh Talent",
    tags: ["Python", "APIs", "LLMs", "Automation"],
    summary: "Engineer intelligent AI assistants, automated lead qualification bots, and cross-system data pipeline integrations.",
    whatYoullDo: [
      "Build custom automation bots and workflow scripts using Python, Node.js, and webhooks.",
      "Integrate Large Language Model (LLM) APIs to automate customer inquiry handling and lead scoring.",
      "Connect disparate business tools (CRMs, messaging channels, portals) into unified data streams.",
      "Monitor bot accuracy, response latency, and exception handling logic."
    ],
    requirements: [
      "Proficiency in Python or JavaScript/TypeScript for scripting and automation.",
      "Hands-on experience consuming REST APIs, webhooks, and JSON data payloads.",
      "Curiosity about AI models, prompt engineering, and LLM API integrations.",
      "Analytical mindset focused on eliminating manual operational effort."
    ],
    niceToHave: [
      "Experience with WhatsApp Business API, LangChain, or automation tools (n8n/Make).",
      "Understanding of vector databases or RAG architectures."
    ],
    whatYoullBuild: "24/7 AI Lead Qualification Bots, Automated WhatsApp Reminders, and Workflow Systems."
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Pune / Hybrid",
    employmentType: "Full-Time",
    experience: "1–3 Years",
    tags: ["Figma", "Product Design", "Design Systems"],
    summary: "Craft intuitive, practical digital interfaces, interactive user journeys, and cohesive design systems for web and mobile products.",
    whatYoullDo: [
      "Design clean, modern user interfaces for web platforms, mobile apps, and administrative dashboards.",
      "Create interactive wireframes, prototypes, and design system components in Figma.",
      "Conduct user workflow research to simplify complex business processes into clear screens.",
      "Collaborate directly with developers to ensure pixel-perfect, accessible implementation."
    ],
    requirements: [
      "Strong portfolio demonstrating UI/UX design capabilities for digital products.",
      "Proficiency in Figma, auto-layout, component variants, and design tokens.",
      "Deep understanding of visual hierarchy, typography, spacing systems, and usability principles.",
      "Clear communication skills to articulate design decisions."
    ],
    niceToHave: [
      "Basic understanding of HTML/CSS capabilities and mobile-first design.",
      "Experience creating micro-interactions or UI prototypes."
    ],
    whatYoullBuild: "Product Design Systems, Interactive Customer Journeys, and Admin Dashboards."
  },
  {
    id: "fullstack-developer",
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Pune / Hybrid",
    employmentType: "Full-Time",
    experience: "2–5 Years",
    tags: ["React", "Node.js", "Java", "SQL"],
    summary: "Own complete end-to-end digital features—from database schema design and API endpoints to responsive frontend components.",
    whatYoullDo: [
      "Develop full-stack web applications combining React frontends with Node.js/Java backends.",
      "Architect relational and document databases with clean data flow contracts.",
      "Implement real-time synchronization features, data export modules, and security policies.",
      "Participate in code reviews, technical architecture decisions, and system deployments."
    ],
    requirements: [
      "Hands-on experience across both frontend (React/JS) and backend (Node/Java) stacks.",
      "Proficiency with SQL/NoSQL databases and API integration patterns.",
      "Experience deploying and maintaining web applications on cloud servers.",
      "High level of ownership and ability to take features from concept to production."
    ],
    niceToHave: [
      "Knowledge of Tailwind CSS, Docker, or AWS/Vercel deployments.",
      "Experience building multi-tenant SaaS or internal business tools."
    ],
    whatYoullBuild: "Custom Business Operating Systems, Multi-Store E-Commerce Platforms, and Operations Portals."
  },
  {
    id: "engineering-intern",
    title: "Engineering Intern / Fresh Talent",
    department: "Engineering",
    location: "Pune / Hybrid",
    employmentType: "Internship / Full-Time Track",
    experience: "Freshers / Final Year Students",
    tags: ["Problem Solving", "React", "Java", "Python"],
    summary: "Join ServonTech's core engineering track to work on real customer projects, learn practical software architecture, and build useful systems.",
    whatYoullDo: [
      "Work alongside senior engineers to build real components and features for client platforms.",
      "Learn modern development practices, Git workflows, clean coding standards, and API integrations.",
      "Participate in daily problem-solving, code reviews, and product testing sessions.",
      "Gain hands-on experience shipping code to live production environments."
    ],
    requirements: [
      "Strong computer science fundamentals (data structures, algorithms, object-oriented concepts).",
      "Basic hands-on experience with at least one programming stack (React/JavaScript, Java, or Python).",
      "High curiosity, eagerness to learn, and passion for building functional software.",
      "Good verbal and written technical communication skills."
    ],
    niceToHave: [
      "Personal coding projects, GitHub repository showcases, or hackathon participation.",
      "Familiarity with web technologies (HTML, CSS, JS, REST APIs)."
    ],
    whatYoullBuild: "Real Business Web Modules, Interactive Product Features, and Automation Scripts."
  }
];

export const WORK_DOMAINS = [
  {
    num: "01",
    title: "AI & Automation",
    desc: "Build AI-powered assistants, workflow automation bots, and intelligent business tools that save real human hours.",
    icon: "Cpu"
  },
  {
    num: "02",
    title: "Business Platforms",
    desc: "Build custom CRMs, executive dashboards, admin control systems, and internal operational software.",
    icon: "Database"
  },
  {
    num: "03",
    title: "Healthcare Technology",
    desc: "Build doctor search engines, 24/7 appointment scheduling systems, and clinic roster management dashboards.",
    icon: "Stethoscope"
  },
  {
    num: "04",
    title: "School ERP Systems",
    desc: "Build comprehensive school administration, student admissions, fee collection, and digital report card platforms.",
    icon: "GraduationCap"
  },
  {
    num: "05",
    title: "E-Commerce Systems",
    desc: "Build multi-store inventory control platforms, real-time POS stock sync, and order management tools.",
    icon: "Box"
  },
  {
    num: "06",
    title: "Digital Experiences",
    desc: "Build high-performance, mobile-first business websites and institutional portals engineered for trust and conversion.",
    icon: "Globe"
  }
];

export const ENGINEERING_VALUES = [
  {
    num: "01",
    title: "OWN THE PROBLEM",
    desc: "Don't wait for perfect instructions. Understand the business problem, investigate the context, and propose a better solution."
  },
  {
    num: "02",
    title: "BUILD FOR THE USER",
    desc: "Technology is valuable only when real people can actually use it without friction or confusion."
  },
  {
    num: "03",
    title: "KEEP LEARNING",
    desc: "Technology changes quickly. We value curiosity, self-driven experimentation, and continuous technical improvement."
  },
  {
    num: "04",
    title: "SIMPLIFY",
    desc: "Prefer simple, practical code and architecture that solves real problems over overly complex over-engineering."
  },
  {
    num: "05",
    title: "TAKE RESPONSIBILITY",
    desc: "Own what you build from initial concept and UI logic all the way to live production testing and improvement."
  },
  {
    num: "06",
    title: "USE AI INTELLIGENTLY",
    desc: "AI is a powerful tool to accelerate research, development, and outcomes—not a substitute for engineering judgment."
  }
];

export const CAREER_GROWTH_STEPS = [
  { step: "01", title: "JOIN", desc: "Start with clear expectations, direct mentoring, and real project context." },
  { step: "02", title: "LEARN", desc: "Master modern frameworks, practical architecture, and business-first problem solving." },
  { step: "03", title: "BUILD", desc: "Ship real features, modules, and products that operate in live production." },
  { step: "04", title: "OWN", desc: "Take end-to-end responsibility for entire systems, architecture decisions, and client outcomes." },
  { step: "05", title: "LEAD", desc: "Guide projects, mentor new team members, and help shape ServonTech's technology roadmap." }
];

export const TECH_STACK_ITEMS = [
  { name: "React", category: "Frontend" },
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Java", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "REST APIs", category: "Architecture" },
  { name: "AI / LLM APIs", category: "Automation" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Vite", category: "Tooling" },
  { name: "Git", category: "Version Control" }
];
