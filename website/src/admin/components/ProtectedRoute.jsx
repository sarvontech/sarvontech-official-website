import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-slate-300">
        <div className="flex items-center gap-3 bg-[#111827] px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
          <span className="font-mono text-xs tracking-wider">Verifying Admin Credentials...</span>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
