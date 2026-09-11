import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { generateAIBlocks } from '../../lib/gemini';

export default function AIBuilderSidebar({ onGenerate }) {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setGenerating(true);
    setError('');
    
    try {
      const blocks = await generateAIBlocks(prompt);
      onGenerate(blocks);
      setPrompt('');
    } catch (err) {
      console.error(err);
      setError(`AI Error: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-[#111827]">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-teal-400" />
        <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest font-mono">AI Section Builder</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-end bg-slate-900/50">
        <div className="p-3 bg-slate-800 rounded-xl text-sm text-slate-300 border border-slate-700 shadow-sm self-start max-w-[90%]">
          Hello! I can build full sections for you. Try asking me to "Create a 3-item FAQ section" or "Add a Hero section with a button".
        </div>
        {generating && (
          <div className="p-3 bg-teal-500/10 rounded-xl text-sm text-teal-300 border border-teal-500/30 self-start max-w-[90%] flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating blocks...
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-500/10 rounded-xl text-xs text-red-400 border border-red-500/30 self-start max-w-[90%]">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800 bg-[#111827]">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-teal-500 min-h-[100px] resize-none"
            disabled={generating}
          />
          <button
            type="submit"
            disabled={generating || !prompt.trim()}
            className="absolute bottom-3 right-3 p-2 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-center text-[10px] text-slate-500 font-mono">
          Powered by Sarvon Tech AI
        </div>
      </form>
    </div>
  );
}
