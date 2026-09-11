import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getLivePageContent } from '../lib/supabase';
import { ArrowRight, Loader2, FileDown, ExternalLink } from 'lucide-react';

export default function DynamicPage({ onOpenConsultation }) {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadPage() {
      setLoading(true);
      try {
        const pageContent = await getLivePageContent(slug);
        if (!pageContent) {
          setNotFound(true);
        } else {
          setData(pageContent);
          // Update Document SEO
          if (pageContent.seo?.metaTitle) document.title = pageContent.seo.metaTitle;
          if (pageContent.seo?.metaDescription) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', pageContent.seo.metaDescription);
          }
        }
      } catch (err) {
        console.error("Error loading dynamic page", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[var(--color-bg-primary)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand)]" />
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 bg-[var(--color-bg-primary)]">
        <h1 className="text-4xl sm:text-6xl font-black text-[var(--color-text-primary)] tracking-tight mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been removed.
        </p>
        <button onClick={() => window.history.back()} className="px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
          Go Back
        </button>
      </div>
    );
  }

  const sections = data.sections || {};
  const customBlocks = sections.custom_blocks || [];
  const hasVisualBlocks = sections.blocks && sections.blocks.length > 0;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] font-sans">
      
      {/* If Visual Builder Blocks Exist, ONLY render them for 1:1 WYSIWYG */}
      {hasVisualBlocks ? (
        <main className="pt-28 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {sections.blocks.filter(b => !b.parentId).map(block => (
              <BlockRenderer key={block.id} block={block} allBlocks={sections.blocks} />
            ))}
          </div>
        </main>
      ) : (
        /* Legacy Form-Based Rendering */
        <>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-[var(--color-border)]">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[var(--color-bg-primary)] opacity-90 z-10" />
              <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-[var(--color-brand-light)] to-transparent blur-3xl opacity-50 dark:opacity-20" />
              <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-t from-[var(--color-accent-mint)] to-transparent blur-3xl opacity-30 dark:opacity-10" />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {data.title && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm mb-6">
                  <SparkleIcon />
                  <span className="text-xs font-bold tracking-widest text-[var(--color-brand)] uppercase">{data.title}</span>
                </div>
              )}
              
              {data.hero_title && (
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[var(--color-text-primary)] mb-6 max-w-4xl mx-auto leading-tight">
                  {data.hero_title}
                </h1>
              )}
              
              {data.hero_subtitle && (
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
                  {data.hero_subtitle}
                </p>
              )}

              {data.hero_video && (
                <div className="mt-12 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-2xl bg-[var(--color-surface)]">
                  {data.hero_video.includes('youtube') || data.hero_video.includes('vimeo') ? (
                    <div className="aspect-video">
                      <iframe 
                        src={data.hero_video} 
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                      />
                    </div>
                  ) : (
                    <video src={data.hero_video} controls className="w-full rounded-2xl" />
                  )}
                </div>
              )}

              {data.hero_image && !data.hero_video && (
                <div className="mt-12 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-2xl">
                  <img src={data.hero_image} alt={data.hero_title || 'Hero'} className="w-full h-auto object-cover" />
                </div>
              )}
            </div>
          </section>

          {/* Main Content & Overview */}
          {(sections.about_title || sections.about_desc || customBlocks.length > 0) && (
            <section className="py-20 lg:py-32">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                {(sections.about_title || sections.about_desc) && (
                  <div className="space-y-6">
                    {sections.about_title && (
                      <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text-primary)] tracking-tight">
                        {sections.about_title}
                      </h2>
                    )}
                    {sections.about_desc && (
                      <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">
                        {sections.about_desc}
                      </div>
                    )}
                  </div>
                )}

                {/* Custom Blocks */}
                {customBlocks.length > 0 && (
                  <div className="space-y-12">
                    {customBlocks.map(block => (
                      <div key={block.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 sm:p-10 shadow-sm">
                        {block.title && <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{block.title}</h3>}
                        
                        {block.content && (
                          <div className="prose dark:prose-invert max-w-none text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed mb-6">
                            {block.content}
                          </div>
                        )}
                        
                        {block.mediaUrl && (
                          <div className="mt-6">
                            {block.type === 'pdf' ? (
                              <a 
                                href={block.mediaUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold hover:border-[var(--color-brand)] transition-colors group cursor-pointer"
                              >
                                <FileDown className="w-5 h-5 text-[var(--color-brand)] group-hover:-translate-y-0.5 transition-transform" />
                                <span>Download PDF Document</span>
                              </a>
                            ) : block.type === 'video' ? (
                              <div className="aspect-video rounded-2xl overflow-hidden border border-[var(--color-border)]">
                                {block.mediaUrl.includes('youtube') || block.mediaUrl.includes('vimeo') ? (
                                  <iframe src={block.mediaUrl} className="w-full h-full" allowFullScreen />
                                ) : (
                                  <video src={block.mediaUrl} controls className="w-full h-full" />
                                )}
                              </div>
                            ) : block.type === 'image' ? (
                              <img src={block.mediaUrl} alt={block.title} className="rounded-2xl border border-[var(--color-border)] max-h-96 object-cover" />
                            ) : (
                              <a 
                                href={block.mediaUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[var(--color-brand)] font-semibold hover:underline cursor-pointer"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>View External Link</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* CTA Section */}
          {(sections.cta_headline || sections.cta_button_text) && (
            <section className="py-20 lg:py-32 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--color-text-primary)] mb-8 leading-tight">
                  {sections.cta_headline || "Ready to transform your operations?"}
                </h2>
                <button 
                  onClick={() => onOpenConsultation('Dynamic Page CTA')}
                  className="px-8 py-4 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-bold text-lg transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{sections.cta_button_text || "Schedule Free Consultation"}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function BlockRenderer({ block, allBlocks }) {
  if (block.type === 'row') {
    const cols = Math.max(1, Math.min(12, block.props?.cols || 1));
    
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
      7: 'grid-cols-1 md:grid-cols-4 lg:grid-cols-7',
      8: 'grid-cols-1 md:grid-cols-4 lg:grid-cols-8',
      9: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-9',
      10: 'grid-cols-1 md:grid-cols-5 lg:grid-cols-10',
      11: 'grid-cols-1 md:grid-cols-4 lg:grid-cols-11',
      12: 'grid-cols-1 md:grid-cols-4 lg:grid-cols-12',
    };

    return (
      <div className={`grid gap-6 ${gridClasses[cols]}`}>
        {Array.from({ length: cols }).map((_, idx) => {
          const colId = `${block.id}-col${idx}`;
          const colItems = (allBlocks || []).filter(b => b.parentId === colId);
          return (
            <div key={colId} className="flex flex-col gap-4">
              {colItems.map(b => (
                <BlockRenderer key={b.id} block={b} allBlocks={allBlocks} />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
  
  if (block.type === 'container') {
    const containerId = `${block.id}-content`;
    const containerItems = (allBlocks || []).filter(b => b.parentId === containerId);
    return (
      <div className="container mx-auto px-4 w-full">
        {containerItems.map(b => (
          <BlockRenderer key={b.id} block={b} allBlocks={allBlocks} />
        ))}
      </div>
    );
  }

  switch (block.type) {
    case 'heading':
      const Tag = `h${block.props?.level || 2}`;
      return <Tag style={block.styles || {}} className={`font-bold text-[var(--color-text-primary)] ${block.props?.level === 1 ? 'text-4xl lg:text-6xl mb-6' : block.props?.level === 2 ? 'text-3xl lg:text-4xl mb-4' : 'text-2xl mb-3'} ${block.props?.align === 'center' ? 'text-center' : ''}`}>{block.content}</Tag>;
    case 'paragraph':
      return <p style={block.styles || {}} className={`text-lg text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed ${block.props?.align === 'center' ? 'text-center' : ''}`}>{block.content}</p>;
    case 'image':
      return (
        <div style={{ ...block.styles, filter: undefined, objectFit: undefined }} className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md my-8">
          <img src={block.content} alt={block.props?.alt || 'Image block'} style={{ objectFit: block.styles?.objectFit, filter: block.styles?.filter }} className="w-full h-auto object-cover" />
        </div>
      );
    case 'video':
      return (
        <div style={block.styles || {}} className="aspect-video rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md my-8">
          <iframe src={block.content} className="w-full h-full" allowFullScreen />
        </div>
      );
    case 'button':
      return (
        <div className={`py-4 ${block.props?.align === 'center' ? 'text-center' : ''}`}>
          <a style={block.styles || {}} href={block.props?.url || '#'} className="px-6 py-3 rounded-xl bg-[var(--color-brand)] text-white font-bold inline-block hover:bg-[var(--color-brand-hover)] transition-colors">
            {block.content}
          </a>
        </div>
      );
    case 'list':
      const ListTag = block.props?.ordered ? 'ol' : 'ul';
      return (
        <ListTag style={block.styles || {}} className={`space-y-2 pl-6 ${block.props?.ordered ? 'list-decimal' : 'list-disc'} text-lg text-[var(--color-text-secondary)]`}>
          {(block.content || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ListTag>
      );
    default:
      return null;
  }
}

function SparkleIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[var(--color-brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
