import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './admin/context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

// Public Pages
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import IndustriesPage from './pages/IndustriesPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CareersPage from './pages/CareersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin Module Components & Pages
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import LoginPage from './admin/pages/LoginPage';
import DashboardOverview from './admin/pages/DashboardOverview';
import ManagePages from './admin/pages/ManagePages';
import EditPageContent from './admin/pages/EditPageContent';
import VisualPageBuilder from './admin/pages/VisualPageBuilder';
import ManageProjects from './admin/pages/ManageProjects';
import ManageServices from './admin/pages/ManageServices';
import ManageSolutions from './admin/pages/ManageSolutions';
import ManageCareers from './admin/pages/ManageCareers';
import ManageInquiries from './admin/pages/ManageInquiries';
import ViewApplications from './admin/pages/ViewApplications';
import ManageAdmins from './admin/pages/ManageAdmins';

function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleOpenConsultation = (context = '') => {
    setModalContext(context);
    setModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
    setModalContext('');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-brand)] selection:text-white flex flex-col justify-between transition-colors duration-200">
      
      {/* Show Navbar on Public Routes only */}
      {!isAdminRoute && <Navbar onOpenConsultation={handleOpenConsultation} />}

      {/* Dynamic Route Content */}
      <main className="flex-grow">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/solutions" element={<SolutionsPage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/services" element={<ServicesPage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/products" element={<ProductsPage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/industries" element={<IndustriesPage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/projects" element={<ProjectsPage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/careers" element={<CareersPage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/about" element={<AboutPage onOpenConsultation={handleOpenConsultation} />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Standalone Visual On-Screen Page Builder (Full-screen) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/pages/builder/:pageSlug" element={<VisualPageBuilder />} />
          </Route>

          {/* Admin Routes under single domain */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="pages" element={<ManagePages />} />
              <Route path="pages/edit/:pageSlug" element={<EditPageContent />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="solutions" element={<ManageSolutions />} />
              <Route path="careers" element={<ManageCareers />} />
              <Route path="inquiries" element={<ManageInquiries />} />
              <Route path="applications" element={<ViewApplications />} />
              <Route path="team" element={<ManageAdmins />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {/* Show Footer on Public Routes only */}
      {!isAdminRoute && <Footer onOpenConsultation={handleOpenConsultation} />}

      {/* Global Contextual Consultation Modal for Public Routes */}
      {!isAdminRoute && (
        <ConsultationModal 
          isOpen={modalOpen} 
          onClose={handleCloseConsultation} 
          initialContext={modalContext}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
