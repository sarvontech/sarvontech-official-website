import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/servonData';
import { ArrowRight, Code2, Layers } from 'lucide-react';

export default function SelectedWorkSection() {
  // Show first 2 or 3 projects on homepage
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <section id="projects" className="py-24 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              PROOF & CAPABILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected Work & Systems Built
            </h2>
            <p className="text-gray-300 text-base max-w-xl">
              Real digital solutions, institutional portals, and custom software systems engineered by Sarvon Tech.
            </p>
          </div>

          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors group whitespace-nowrap"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((p) => (
            <div 
              key={p.slug}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-sky-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Preview Banner */}
                <div className="relative h-48 overflow-hidden bg-[#090D16]">
                  <img 
                    src={p.image} 
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-mono text-sky-300 bg-[#0B0F19]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {p.industry}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors leading-snug">
                    {p.name}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {p.summary}
                  </p>

                  {/* Technology Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {p.technology.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <Link 
                  to={`/projects/${p.slug}`}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-sky-500 text-gray-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-sky-400"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
