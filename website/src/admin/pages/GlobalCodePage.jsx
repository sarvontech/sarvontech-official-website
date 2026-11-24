import React, { useState, useEffect } from 'react';
import { getGlobalSettings, saveGlobalSettings } from '../../lib/supabase';
import { Code, Save, Loader2, CheckCircle, X, AlertCircle } from 'lucide-react';

import Editor from '@monaco-editor/react';

export default function GlobalCodePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [globalCss, setGlobalCss] = useState('');
  const [globalJs, setGlobalJs] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getGlobalSettings();
      if (data && data.sections) {
        setGlobalCss(data.sections.css || '');
        setGlobalJs(data.sections.js || '');
      }
    } catch (err) {
      setError('Failed to load global code.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      await saveGlobalSettings({ css: globalCss, js: globalJs });
      setSuccessMsg('Global CSS/JS saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('Failed to save global code.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand)]" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] tracking-tight flex items-center gap-3">
            <Code className="w-8 h-8 text-[var(--color-brand)]" />
            Global Custom Code
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Manage global CSS and JavaScript for the entire website.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-sm shadow-lg shadow-[var(--color-brand)]/20 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}
      
      {successMsg && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-500 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium text-sm">{successMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        <div className="bg-[#1e1e1e] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="p-4 border-b border-white/10 bg-[#252526] flex flex-col justify-center">
            <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Global CSS
            </label>
            <p className="text-xs text-slate-400">
              Injected into the &lt;head&gt; of all public pages.
            </p>
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="css"
              theme="vs-dark"
              value={globalCss}
              onChange={(value) => setGlobalCss(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                formatOnPaste: true,
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>

        <div className="bg-[#1e1e1e] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="p-4 border-b border-white/10 bg-[#252526] flex flex-col justify-center">
            <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              Global JavaScript
            </label>
            <p className="text-xs text-slate-400">
              Executed on all public pages.
            </p>
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={globalJs}
              onChange={(value) => setGlobalJs(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                formatOnPaste: true,
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
