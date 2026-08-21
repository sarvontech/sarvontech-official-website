# ServonTech — High-Performance Digital Solutions & Systems Platform

ServonTech is a modern, high-performance web platform built for **ServonTech**, delivering custom business software, digital presence flagships, CRMs, booking platforms, and AI workflow automations.

---

## 🚀 Key Features & Highlights

- **Visual-First Product Showcase**: Outcome-driven capability cards with local high-resolution product imagery and minimal text.
- **Interactive Product Journey**: 5-stage connected Healthcare Scheduling Engine (`01 DISCOVER` → `02 CHOOSE` → `03 BOOK` → `04 SYNC` → `05 CONFIRM`) featuring interactive map views, doctor rosters, visual data packet transitions, and real-time clinic admin dashboard synchronization.
- **Centralized Data Architecture**: All services, projects, industries, solutions, and products are driven through `src/data/servonData.js` for single-point maintainability.
- **Light & Dark Theme Engine**: Theme system leveraging CSS variables:
  - **Light Theme (Default)**: Warm Mineral (`#F4F3EE`), Soft Ivory (`#FCFBF7`), Deep Ink (`#172126`), Deep Petrol (`#075E67`), Signal Lime (`#B8D83D`).
  - **Dark Theme**: Deep Navy (`#0B0F19`), Dark Surface (`#111827`), Sky Blue Accent (`#0EA5E9`).
- **100% Local Production Assets**: Zero dependency on remote Unsplash URLs. All images are optimized locally in `public/assets/images/`.
- **Sub-1.2s Performance**: Built with React 18, Vite 5, and Tailwind CSS with lazy loading and asynchronous image decoding.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM 6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Head & SEO**: Custom `SEOHead` component for Meta title & description management

---

## 📁 Project Structure

```
Servontech/
├── public/
│   └── assets/
│       └── images/
│           └── projects/          # Local optimized WebP & PNG project imagery
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Top navigation header with theme toggle & mobile drawer
│   │   ├── Footer.jsx             # Site footer with service directory & consultation links
│   │   ├── SEOHead.jsx            # Dynamic document head & SEO metadata manager
│   │   ├── RevealOnScroll.jsx     # IntersectionObserver reveal animations
│   │   ├── InteractiveStorySection.jsx # Connected 5-stage Healthcare Product Journey
│   │   └── ConsultationModal.jsx # Interactive tech consultation modal
│   ├── data/
│   │   └── servonData.js          # Centralized data repository (Projects, Services, Solutions)
│   ├── pages/
│   │   ├── HomePage.jsx           # Flagship homepage & Selected Work slider
│   │   ├── ServicesPage.jsx       # Visual-first Services Overview & Transformation cards
│   │   ├── ProjectsPage.jsx       # Selected Work portfolio with category filtering
│   │   ├── ProjectDetailPage.jsx  # Detailed case studies & live project links
│   │   ├── SolutionsPage.jsx      # Outcome-focused business solutions
│   │   ├── ProductsPage.jsx       # Humanized software product breakdowns
│   │   ├── IndustriesPage.jsx     # Industry-specific solution blueprints
│   │   └── AboutPage.jsx          # ServonTech engineering philosophy & methodology
│   ├── App.jsx                    # Core application routing & modal management
│   ├── main.jsx                   # React DOM entrypoint
│   └── index.css                  # Tailwind directives & CSS theme design tokens
├── index.html                     # HTML root template
├── package.json                   # Project dependencies & scripts
├── vite.config.js                 # Vite bundler configuration
└── README.md                      # Project documentation
```

---

## ⚙️ Getting Started

### 1. Installation
Clone or download the project folder, then install dependencies:
```bash
npm install
```

### 2. Development Server
Start the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
Build the production-ready distribution bundle:
```bash
npm run build
```
The optimized output will be generated in the `dist/` directory.

### 4. Preview Production Build
Preview the built `dist/` files locally:
```bash
npm run preview
```

---

## 📄 License & Deployment

This project is ready for direct production deployment. All local images are licensed and documented.
