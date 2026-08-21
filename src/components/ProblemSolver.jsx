import React from 'react';
import { PROBLEM_SOLVER_OPTIONS } from '../data/servonData';
import { Globe, Target, Users, Calendar, Box, Zap, Cpu, HelpCircle, ArrowRight } from 'lucide-react';

export default function ProblemSolver({ onSelectProblem }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-sky-400" />;
      case 'Target': return <Target className="w-5 h-5 text-emerald-400" />;
      case 'Users': return <Users className="w-5 h-5 text-purple-400" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-amber-400" />;
      case 'Box': return <Box className="w-5 h-5 text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-pink-400" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-sky-300" />;
      default: return <Globe className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section className="py-16 bg-[#0B0F19] border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            SIMPLE ENTRY POINT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Are You Trying to Solve?
          </h2>
          <p className="text-gray-300 text-base">
            You don't need to know the exact technology. Select what your business needs below, and we'll help you figure out the right digital solution.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {PROBLEM_SOLVER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelectProblem(opt.label)}
              className="p-5 rounded-2xl glass-card border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all text-left flex flex-col justify-between space-y-4 group hover:scale-[1.02]"
            >
              <div className="p-2.5 rounded-xl bg-white/5 w-fit border border-white/10 group-hover:bg-sky-500/20 transition-colors">
                {getIcon(opt.icon)}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-gray-400 group-hover:text-sky-300">My business needs</span>
                <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                  {opt.label}
                </h3>
              </div>

              <div className="flex items-center text-[11px] font-mono text-sky-400 gap-1 opacity-80 group-hover:opacity-100">
                <span>Select & Discuss</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
