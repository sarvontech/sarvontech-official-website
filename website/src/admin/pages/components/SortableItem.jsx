import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Trash2, ChevronDown, ChevronUp, Circle } from 'lucide-react';

export function SortableItem({ id, item, onEdit, onDelete, childrenLinks, onEditChild, onDeleteChild, allLinks }) {
  const [expanded, setExpanded] = useState(true);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const hasChildren = childrenLinks && childrenLinks.length > 0;

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`relative ${isDragging ? 'z-10' : 'z-0'}`}
    >
      {/* Parent Row */}
      <div className={`flex items-center justify-between p-3 rounded-xl border ${
        isDragging 
          ? 'border-[var(--color-brand)] shadow-lg bg-[var(--color-brand-light)]' 
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)] transition-colors'
      }`}>
        <div className="flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab hover:text-[var(--color-brand)] text-[var(--color-text-muted)] p-1">
            <GripVertical className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm text-[var(--color-text-primary)]">{item.label}</div>
            <div className="text-[10px] font-mono text-[var(--color-text-muted)]">{item.url}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="p-1.5 rounded-lg bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]">
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {hasChildren && (
            <button onClick={() => setExpanded(!expanded)} className="p-1.5 ml-2 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Children Tree Branch */}
      {hasChildren && expanded && (
        <div className="relative ml-[26px] mt-1 pl-5 border-l-2 border-[var(--color-border-subtle)] space-y-1 pb-2">
          {childrenLinks.map(child => {
            // Find 3rd level children
            const subChildren = (allLinks || []).filter(c => c.parent_id === child.id).sort((a,b) => a.order_index - b.order_index);
            const hasSubChildren = subChildren.length > 0;
            
            return (
              <div key={child.id} className="relative space-y-1">
                {/* 2nd Level Item */}
                <div className="relative flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-brand-light)] transition-colors group">
                  {/* Horizontal line connector */}
                  <div className="absolute -left-5 top-1/2 w-4 h-[2px] bg-[var(--color-border-subtle)]"></div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shadow-sm"></div>
                    <div>
                      <div className="font-semibold text-xs text-[var(--color-text-primary)]">{child.label}</div>
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)]">{child.url}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEditChild(child)} className="p-1.5 rounded-lg bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]">
                      <Edit className="w-3 h-3" />
                    </button>
                    <button onClick={() => onDeleteChild(child.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 3rd Level Branch */}
                {hasSubChildren && (
                  <div className="relative ml-4 pl-5 border-l-2 border-[var(--color-border-subtle)] space-y-1 pb-1">
                    {subChildren.map(subChild => (
                      <div key={subChild.id} className="relative flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors group">
                        <div className="absolute -left-5 top-1/2 w-4 h-[2px] bg-[var(--color-border-subtle)]"></div>
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] shadow-sm"></div>
                          <div>
                            <div className="font-semibold text-[11px] text-[var(--color-text-primary)]">{subChild.label}</div>
                            <div className="text-[9px] font-mono text-[var(--color-text-muted)]">{subChild.url}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => onEditChild(subChild)} className="p-1 rounded-lg bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button onClick={() => onDeleteChild(subChild.id)} className="p-1 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
