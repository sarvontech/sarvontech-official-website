import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Image, Video, LayoutList, Hand, Code, Columns, RectangleHorizontal, GalleryHorizontalEnd } from 'lucide-react';

const LAYOUTS = [
  { id: 'toolbox-row', type: 'row', props: { cols: 2 }, label: 'Grid Row', icon: Columns },
  { id: 'toolbox-container', type: 'container', label: 'Container', icon: RectangleHorizontal },
];

const ELEMENTS = [
  { id: 'toolbox-heading', type: 'heading', label: 'Heading', icon: Type },
  { id: 'toolbox-paragraph', type: 'paragraph', label: 'Paragraph', icon: Type },
  { id: 'toolbox-image', type: 'image', label: 'Image', icon: Image },
  { id: 'toolbox-video', type: 'video', label: 'Video', icon: Video },
  { id: 'toolbox-button', type: 'button', label: 'Button', icon: Hand },
  { id: 'toolbox-list', type: 'list', label: 'List', icon: LayoutList },
];

function ToolboxItem({ element }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: element.id,
    data: {
      type: 'toolbox-item',
      elementType: element.type,
    },
  });

  const Icon = element.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex items-center gap-3 cursor-grab hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-brand)] transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="w-5 h-5 text-[var(--color-text-secondary)]" />
      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{element.label}</span>
    </div>
  );
}

export default function BuilderToolbox() {
  return (
    <div className="w-64 bg-[#111827] border-r border-slate-800 p-4 flex flex-col gap-6 overflow-y-auto flex-shrink-0 z-10 shadow-xl">
      <div>
        <div className="mb-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Layouts</h3>
        </div>
        <div className="flex flex-col gap-2">
          {LAYOUTS.map(el => (
            <ToolboxItem key={el.id} element={el} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="mb-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Elements</h3>
        </div>
        <div className="flex flex-col gap-2">
          {ELEMENTS.map(el => (
            <ToolboxItem key={el.id} element={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
