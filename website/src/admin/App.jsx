import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardOverview from './pages/DashboardOverview';
import ManageProjects from './pages/ManageProjects';
import ManageServices from './pages/ManageServices';
import ManageCareers from './pages/ManageCareers';
import ViewApplications from './pages/ViewApplications';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/projects" element={<ManageProjects />} />
              <Route path="/services" element={<ManageServices />} />
              <Route path="/careers" element={<ManageCareers />} />
              <Route path="/applications" element={<ViewApplications />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
