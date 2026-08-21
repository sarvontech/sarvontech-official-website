import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

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

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');

  const handleOpenConsultation = (context = '') => {
    setModalContext(context);
    setModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
    setModalContext('');
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-brand)] selection:text-white flex flex-col justify-between transition-colors duration-200">
          
          {/* Top Navbar */}
          <Navbar onOpenConsultation={handleOpenConsultation} />

          {/* Dynamic Route Content */}
          <main className="flex-grow">
            <Routes>
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
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer onOpenConsultation={handleOpenConsultation} />

          {/* Global Contextual Consultation Modal */}
          <ConsultationModal 
            isOpen={modalOpen} 
            onClose={handleCloseConsultation}
            initialContext={modalContext}
          />

        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
