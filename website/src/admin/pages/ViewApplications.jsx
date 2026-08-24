import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Users, 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  Calendar, 
  Loader2, 
  Search, 
  FileText,
  Trash2
} from 'lucide-react';

export default function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadResume = async (app) => {
    if (!app.resume_url) {
      alert('No resume attached.');
      return;
    }

    setDownloadingId(app.id);
    try {
      if (app.resume_url.startsWith('http')) {
        window.open(app.resume_url, '_blank');
        return;
      }

      const { data, error } = await supabase.storage
        .from('resumes')
        .createSignedUrl(app.resume_url, 60);

      if (error) throw error;

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (err) {
      alert('Could not download resume: ' + err.message);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this candidate application record?')) return;
    try {
      const { error } = await supabase.from('applications').delete().eq('id', id);
      if (error) throw error;
      fetchApplications();
    } catch (err) {
      alert('Error deleting application: ' + err.message);
    }
  };

  const filteredApps = applications.filter(a => 
    a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    a.role_title?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>CANDIDATE APPLICATIONS & RESUME SUBMISSIONS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Job Applications</h1>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--color-brand-light)] border border-[var(--color-border)] text-[var(--color-brand)] text-xs font-mono font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span>{applications.length} Submissions Received</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-3.5" />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidates by name, email, or role title..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-brand)]"
        />
      </div>

      {loading ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand)]" />
          <span>Loading applications from database...</span>
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] font-mono text-xs">
          No job applications submitted yet. Submissions from the /careers page will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((a) => (
            <div key={a.id} className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 shadow-md hover:border-[var(--color-brand)] transition-all">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{a.full_name}</h3>
                    <span className="text-[10px] font-mono text-[var(--color-brand)] bg-[var(--color-brand-light)] px-2.5 py-0.5 rounded border border-[var(--color-border)] font-semibold">
                      {a.role_title}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-2 py-0.5 rounded border border-[var(--color-border)]">
                      Experience: {a.experience}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)] pt-2 flex-wrap font-mono">
                    <a href={`mailto:${a.email}`} className="hover:text-[var(--color-brand)] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                      <span>{a.email}</span>
                    </a>
                    {a.phone && (
                      <a href={`tel:${a.phone}`} className="hover:text-[var(--color-brand)] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[var(--color-accent-mint)]" />
                        <span>{a.phone}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(a.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0">
                  {a.portfolio_url && (
                    <a 
                      href={a.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] text-xs font-semibold inline-flex items-center gap-1.5 border border-[var(--color-border)]"
                    >
                      <span>Portfolio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => handleDownloadResume(a)}
                    disabled={downloadingId === a.id}
                    className="px-4 py-2 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    {downloadingId === a.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>Download Resume PDF</span>
                  </button>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {a.short_message && (
                <div className="p-3.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] space-y-1">
                  <div className="text-[10px] font-mono text-[var(--color-text-muted)] font-bold uppercase">Candidate Message</div>
                  <p className="leading-relaxed">{a.short_message}</p>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
