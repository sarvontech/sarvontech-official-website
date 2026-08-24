import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  LayoutDashboard, 
  FileCode,
  FolderKanban, 
  Wrench, 
  Lightbulb,
  Briefcase, 
  Users, 
  MessageSquare,
  UserPlus,
  LogOut, 
  Sun, 
  Moon, 
  Menu, 
  X
} from 'lucide-react';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Page Content Updator', path: '/admin/pages', icon: FileCode },
    { label: 'Manage Projects', path: '/admin/projects', icon: FolderKanban },
    { label: 'Manage Services', path: '/admin/services', icon: Wrench },
    { label: 'Manage Solutions', path: '/admin/solutions', icon: Lightbulb },
    { label: 'Manage Careers', path: '/admin/careers', icon: Briefcase },
    { label: 'Client Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { label: 'Job Applications', path: '/admin/applications', icon: Users },
    { label: 'Manage Admin Team', path: '/admin/team', icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] flex flex-col md:flex-row transition-colors duration-200">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-light)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden p-1">
            <img src="/assets/images/logo-remove-bg.png" alt="ServonTech Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm text-[var(--color-text-primary)]">ServonTech Admin</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-600" />}
          </button>

          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        w-full md:w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col justify-between flex-shrink-0
        ${mobileOpen ? 'block' : 'hidden md:flex'}
      `}>
        <div className="p-6 space-y-8">
          
          {/* Logo & Status */}
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-brand)] to-[var(--color-accent-mint)] p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[var(--color-bg-primary)] rounded-[10px] flex items-center justify-center overflow-hidden p-1">
                  <img src="/assets/images/logo-remove-bg.png" alt="ServonTech Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <div className="font-extrabold text-sm text-[var(--color-text-primary)] tracking-tight">ServonTech</div>
                <div className="text-[10px] font-mono text-[var(--color-brand)] uppercase font-bold">Production Admin</div>
              </div>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[var(--color-brand)]" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-[var(--color-text-muted)] font-bold tracking-wider px-3 mb-2">
              Core Operations
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${isActive 
                      ? 'bg-[var(--color-brand-light)] text-[var(--color-brand)] border border-[var(--color-border)] shadow-sm font-bold' 
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Footer & Logout */}
        <div className="p-4 border-t border-[var(--color-border)] space-y-3">
          <div className="px-3 py-2 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-light)] text-[var(--color-brand)] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[var(--color-text-primary)] truncate">{user?.email}</div>
              <div className="text-[10px] font-mono text-[var(--color-accent-mint)] font-semibold">Authenticated Admin</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] hover:bg-red-500/10 text-[var(--color-text-secondary)] hover:text-red-500 border border-[var(--color-border)] hover:border-red-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[var(--color-bg-primary)]">
        <Outlet />
      </main>

    </div>
  );
}
