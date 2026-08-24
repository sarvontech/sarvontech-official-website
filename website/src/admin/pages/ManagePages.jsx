import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileCode, 
  Plus, 
  Edit3, 
  ExternalLink, 
  Trash2, 
  Search, 
  Loader2,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

const DEFAULT_WEBSITE_PAGES = [
  { slug: 'home', title: 'Home Page', path: '/', description: 'Main flagship landing page, hero, value pillars & selected case studies' },
  { slug: 'solutions', title: 'Solutions Page', path: '/solutions', description: 'Capabilities grid & enterprise technology pillars' },
  { slug: 'services', title: 'Services Page', path: '/services', description: 'Detailed services categories & technical offerings' },
  { slug: 'products', title: 'Products Page', path: '/products', description: 'Digital assets showcase & pre-engineered software modules' },
  { slug: 'industries', title: 'Industries Page', path: '/industries', description: 'Vertical industry solutions, problem/solution specs & use cases' },
  { slug: 'projects', title: 'Projects & Work Page', path: '/projects', description: 'Live portfolio showcase, case studies & client outcomes' },
  { slug: 'careers', title: 'Careers Page', path: '/careers', description: 'Hiring culture, open job roles & candidate application forms' },
  { slug: 'about', title: 'About Us Page', path: '/about', description: 'Company backstory, mission, engineering team & core values' },
  { slug: 'contact', title: 'Contact Us Page', path: '/contact', description: 'Direct contact info, consultation modal & inquiry forms' },
];

export default function ManagePages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_contents')
        .select('*');

      if (error) throw error;

      // Merge database records with default pages list
      const dbPagesMap = new Map((data || []).map(p => [p.slug, p]));
      
      const mergedList = DEFAULT_WEBSITE_PAGES.map(dp => {
        const dbRecord = dbPagesMap.get(dp.slug);
        return {
          ...dp,
          is_custom: false,
          updated_at: dbRecord?.updated_at || null,
          has_custom_edits: !!dbRecord,
        };
      });

      // Add any custom pages created by user
      (data || []).forEach(dbP => {
        if (!DEFAULT_WEBSITE_PAGES.some(dp => dp.slug === dbP.slug)) {
          mergedList.push({
            slug: dbP.slug,
            title: dbP.title || dbP.slug,
            path: `/${dbP.slug}`,
            description: 'Custom Inner Page',
            is_custom: true,
            updated_at: dbP.updated_at,
            has_custom_edits: true,
          });
        }
      });

      setPages(mergedList);
    } catch (err) {
      console.warn('Could not fetch custom page contents:', err);
      setPages(DEFAULT_WEBSITE_PAGES.map(dp => ({ ...dp, has_custom_edits: false })));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewPage = () => {
    const title = window.prompt('Enter new Inner Page title (e.g. Terms of Service, Case Study Showcase):');
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    navigate(`/admin/pages/edit/${slug}?title=${encodeURIComponent(title)}`);
  };

  const handleDeletePage = async (slug, isCustom) => {
    if (!isCustom) {
      alert('Standard website core pages cannot be deleted, but you can reset or edit their content anytime!');
      return;
    }
    if (!window.confirm(`Delete custom page "${slug}"?`)) return;

    try {
      const { error } = await supabase.from('page_contents').delete().eq('slug', slug);
      if (error) throw error;
      fetchPages();
    } catch (err) {
      alert('Error deleting page: ' + err.message);
    }
  };

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] font-bold uppercase tracking-wider">
            <FileCode className="w-4 h-4" />
            <span>WEBSITE INNER PAGE CONTENT UPDATOR</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Inner Pages & Content Manager</h1>
        </div>

        <button
          onClick={handleCreateNewPage}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Inner Page</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-3.5" />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter pages by name, route slug or description..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--color-brand)]"
        />
      </div>

      {loading ? (
        <div className="p-12 text-center text-[var(--color-text-muted)] font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-brand)]" />
          <span>Loading website page registry...</span>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => (
            <div 
              key={page.slug}
              className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 shadow-md flex flex-col justify-between hover:border-[var(--color-brand)] transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--color-brand)] font-bold bg-[var(--color-brand-light)] px-2.5 py-0.5 rounded border border-[var(--color-border)]">
                    {page.path}
                  </span>

                  {page.has_custom_edits ? (
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Live Custom Content</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-2 py-0.5 rounded border border-[var(--color-border)]">
                      Default Template
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] text-lg group-hover:text-[var(--color-brand)] transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                    {page.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                <a
                  href={page.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand)] flex items-center gap-1"
                >
                  <span>View Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  {page.is_custom && (
                    <button
                      onClick={() => handleDeletePage(page.slug, true)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 cursor-pointer"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <Link
                    to={`/admin/pages/builder/${page.slug}`}
                    className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Launch Visual On-Screen Page Builder"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Visual Builder</span>
                  </Link>

                  <Link
                    to={`/admin/pages/edit/${page.slug}`}
                    className="p-2 rounded-xl bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer"
                    title="Edit Field Specs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
