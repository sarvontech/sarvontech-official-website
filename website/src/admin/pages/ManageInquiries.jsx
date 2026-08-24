import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  Loader2, 
  Search, 
  Trash2,
  CheckCircle2,
  Clock,
  Archive
} from 'lucide-react';

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      alert('Error deleting inquiry: ' + err.message);
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    i.email?.toLowerCase().includes(search.toLowerCase()) ||
    i.service_category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>CLIENT CONSULTATIONS & LEADS MANAGER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Client Inquiries</h1>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--color-brand-light)] border border-[var(--color-border)] text-[var(--color-brand)] text-xs font-mono font-semibold flex items-center gap-2">
          <span>{inquiries.length} Inquiries Logged</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-3.5" />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client name, email, or service context..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-brand)]"
        />
      </div>

      {loading ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand)]" />
          <span>Loading client inquiries from database...</span>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] font-mono text-xs">
          No client inquiries received yet. Submissions from Consultation Modal and /contact page will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div key={inq.id} className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 shadow-md hover:border-[var(--color-brand)] transition-all">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{inq.full_name}</h3>
                    <span className="text-[10px] font-mono text-[var(--color-brand)] bg-[var(--color-brand-light)] px-2.5 py-0.5 rounded border border-[var(--color-border)] font-semibold">
                      {inq.service_category}
                    </span>
                    {inq.project_budget && inq.project_budget !== 'Not specified' && (
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 font-semibold">
                        Budget: {inq.project_budget}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)] pt-2 flex-wrap font-mono">
                    <a href={`mailto:${inq.email}`} className="hover:text-[var(--color-brand)] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                      <span>{inq.email}</span>
                    </a>
                    {inq.phone && (
                      <a href={`tel:${inq.phone}`} className="hover:text-[var(--color-brand)] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[var(--color-accent-mint)]" />
                        <span>{inq.phone}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(inq.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0">
                  <select
                    value={inq.status || 'new'}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-primary)] focus:outline-none"
                  >
                    <option value="new">🔴 New Lead</option>
                    <option value="contacted">🟡 Contacted</option>
                    <option value="in_progress">🔵 In Progress</option>
                    <option value="closed">🟢 Closed / Client</option>
                  </select>

                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {inq.project_details && (
                <div className="p-3.5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] space-y-1">
                  <div className="text-[10px] font-mono text-[var(--color-text-muted)] font-bold uppercase">Project Description</div>
                  <p className="leading-relaxed">{inq.project_details}</p>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
