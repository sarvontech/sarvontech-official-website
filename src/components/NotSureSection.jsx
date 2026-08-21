import React from 'react';
import { HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';

export default function NotSureSection({ onOpenConsultation }) {
  return (
    <section className="py-20 bg-[#0B0F19] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-sky-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto border border-sky-500/20">
            <HelpCircle className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Not Sure What You Need?
            </h2>
            <p className="text-sky-300 font-semibold text-lg">
              That's completely okay.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Tell us what is difficult, slow or manual in your business. You don't need to be a software expert—our technical team will help you identify the right digital solution.
            </p>
          </div>

          <div className="pt-2">
            <button 
              onClick={() => onOpenConsultation("I'm Not Sure Yet — Discuss My Problem")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-base shadow-xl shadow-sky-500/25 inline-flex items-center gap-2.5 transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Discuss My Problem</span>
            </button>
          </div>

          <div className="text-xs font-mono text-gray-400">
            No technical knowledge required • Friendly 30-minute consultation
          </div>

        </div>
      </div>
    </section>
  );
}
