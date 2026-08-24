import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  FolderKanban, 
  Wrench, 
  Briefcase, 
  Users, 
  ArrowUpRight, 
  Activity,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    servicesCount: 0,
    rolesCount: 0,
    applicationsCount: 0,
  });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [projRes, servRes, rolesRes, appsRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('careers_roles').select('id', { count: 'exact', head: true }),
        supabase.from('applications').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      setStats({
        projectsCount: projRes.count || 0,
        servicesCount: servRes.count || 0,
        rolesCount: rolesRes.count || 0,
        applicationsCount: appsRes.data?.length || 0,
      });

      if (appsRes.data) {
        setRecentApps(appsRes.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Projects', value: stats.projectsCount, path: '/admin/projects', icon: FolderKanban, color: 'text-[var(--color-brand)]', bg: 'bg-[var(--color-brand-light)] border-[var(--color-border)]' },
    { label: 'Active Services', value: stats.servicesCount, path: '/admin/services', icon: Wrench, color: 'text-[var(--color-accent-mint)]', bg: 'bg-[var(--color-accent-soft)] border-[var(--color-border)]' },
    { label: 'Open Career Roles', value: stats.rolesCount, path: '/admin/careers', icon: Briefcase, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { label: 'Job Applications', value: stats.applicationsCount, path: '/admin/applications', icon: Users, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Live System Telemetry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Admin Control Overview</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-[var(--color-brand-light)] border border-[var(--color-border)] text-[var(--color-brand)] text-xs font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-mint)] animate-pulse"></span>
            <span>Supabase RLS Protected</span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((st, idx) => {
          const Icon = st.icon;
          return (
            <Link 
              key={idx}
              to={st.path}
              className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-all space-y-4 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${st.bg}`}>
                  <Icon className={`w-6 h-6 ${st.color}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] transition-colors" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[var(--color-text-primary)] font-mono">{loading ? '...' : st.value}</div>
                <div className="text-xs text-[var(--color-text-secondary)] font-semibold">{st.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 shadow-md">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase font-mono tracking-wider">Management Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link 
            to="/admin/projects"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
          <Link 
            to="/admin/careers"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] hover:bg-[var(--color-brand-light)] text-[var(--color-text-primary)] font-bold text-xs border border-[var(--color-border)] transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[var(--color-brand)]" />
            <span>Post New Job Opening</span>
          </Link>
          <Link 
            to="/admin/applications"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-surface-hover)] hover:bg-[var(--color-brand-light)] text-[var(--color-text-primary)] font-semibold text-xs border border-[var(--color-border)] transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-amber-500" />
            <span>Review Candidate Resumes</span>
          </Link>
        </div>
      </div>

      {/* Recent Applications Preview */}
      <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase font-mono tracking-wider">Recent Candidate Submissions</h2>
          <Link to="/admin/applications" className="text-xs text-[var(--color-brand)] font-semibold flex items-center gap-1 hover:underline">
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentApps.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] font-mono">
            No applications submitted yet. Candidate submissions from /careers will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {recentApps.map((app) => (
              <div key={app.id} className="p-4 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-[var(--color-text-primary)] text-sm">{app.full_name}</div>
                  <div className="text-[var(--color-text-secondary)]">{app.role_title} • {app.experience}</div>
                </div>
                <div className="text-[var(--color-text-muted)] font-mono text-[11px]">
                  {app.email}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
