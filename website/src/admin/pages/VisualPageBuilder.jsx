import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLivePageContent, savePageContent, getGlobalSettings, saveGlobalSettings } from '../../lib/supabase';
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle, X, Trash2, GripVertical, Code } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, useDroppable } from '@dnd-kit/core';

// Create a Droppable Canvas wrapper
function DroppableCanvas({ children, id }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`min-h-[800px] w-full max-w-4xl bg-[var(--color-bg-primary)] rounded-2xl shadow-2xl border ${isOver ? 'border-teal-500 bg-teal-500/5' : 'border-slate-700/50'} p-8 sm:p-12 text-[var(--color-text-primary)] transition-colors`}>
      {children}
    </div>
  );
}
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import BuilderToolbox from './components/BuilderToolbox';
import AIBuilderSidebar from './components/AIBuilderSidebar';
import PropertiesSidebar from './components/PropertiesSidebar';

const HARDCODED_PAGES = ['home', 'solutions', 'services', 'products', 'industries', 'projects', 'careers', 'about', 'contact'];

// Generate unique IDs for blocks
const generateId = () => Math.random().toString(36).substr(2, 9);

function CustomDialog({ config, onClose }) {
  if (!config.isOpen) return null;
  const [inputValue, setInputValue] = React.useState(config.defaultValue || '');

  // Reset input when dialog opens with new default value
  React.useEffect(() => {
    if (config.isOpen) setInputValue(config.defaultValue || '');
  }, [config.isOpen, config.defaultValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    config.onConfirm(config.type === 'prompt' ? inputValue : true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1F2937] border border-slate-700 p-6 rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-bold text-white mb-2">{config.title}</h3>
        {config.message && <p className="text-sm text-slate-400 mb-4">{config.message}</p>}
        
        <form onSubmit={handleSubmit}>
          {config.type === 'prompt' && (
            <input 
              type="text" 
              autoFocus
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 mb-2"
            />
          )}
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className={`px-6 py-2 text-white font-bold rounded-xl shadow-lg transition-colors ${config.type === 'confirm' && config.danger ? 'bg-red-600 hover:bg-red-500' : 'bg-teal-600 hover:bg-teal-500'}`}>
              {config.type === 'prompt' ? 'Save' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SortableColumn({ id, items, allBlocks, updateBlock, removeBlock, openDialog, selectedBlockId, setSelectedBlockId }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`min-h-[100px] p-4 rounded-xl border-2 border-dashed transition-colors ${isOver ? 'border-teal-500 bg-teal-500/5' : 'border-slate-700/50 hover:border-slate-600'}`}>
      <SortableContext items={items.map(b => b.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {items.map(block => (
            <SortableBlock 
              key={block.id} 
              block={block} 
              allBlocks={allBlocks}
              updateBlock={updateBlock} 
              removeBlock={removeBlock} 
              openDialog={openDialog}
              selectedBlockId={selectedBlockId}
              setSelectedBlockId={setSelectedBlockId}
            />
          ))}
          {items.length === 0 && (
            <div className="text-center text-xs text-slate-500 font-mono py-4 pointer-events-none">Drop here</div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableBlock({ block, allBlocks, updateBlock, removeBlock, openDialog, selectedBlockId, setSelectedBlockId }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const isSelected = selectedBlockId === block.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleInput = (e) => {
    updateBlock(block.id, { content: e.currentTarget.innerText });
  };

  const renderContent = () => {
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
        <div className="w-full">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">{cols} Column Grid</div>
            <div className="flex items-center gap-1 bg-slate-800 rounded px-1 py-0.5">
              <button 
                onClick={() => updateBlock(block.id, { props: { ...block.props, cols: Math.max(1, cols - 1) } })}
                className="w-5 h-5 flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white rounded text-xs leading-none"
              >-</button>
              <span className="text-xs text-white font-mono w-4 text-center">{cols}</span>
              <button 
                onClick={() => updateBlock(block.id, { props: { ...block.props, cols: Math.min(12, cols + 1) } })}
                className="w-5 h-5 flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white rounded text-xs leading-none"
              >+</button>
            </div>
          </div>
          <div className={`grid gap-4 ${gridClasses[cols]}`}>
            {Array.from({ length: cols }).map((_, idx) => {
              const colId = `${block.id}-col${idx}`;
              const colItems = allBlocks.filter(b => b.parentId === colId);
              return (
                <SortableColumn 
                  key={colId} 
                  id={colId} 
                  items={colItems} 
                  allBlocks={allBlocks}
                  updateBlock={updateBlock} 
                  removeBlock={removeBlock} 
                  openDialog={openDialog}
                  selectedBlockId={selectedBlockId}
                  setSelectedBlockId={setSelectedBlockId}
                />
              );
            })}
          </div>
        </div>
      );
    }
    if (block.type === 'container') {
      const containerId = `${block.id}-content`;
      const containerItems = allBlocks.filter(b => b.parentId === containerId);
      return (
        <div className="w-full">
          <div className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Bootstrap Container</div>
          <div className="container mx-auto px-4">
            <SortableColumn 
              id={containerId} 
              items={containerItems} 
              allBlocks={allBlocks}
              updateBlock={updateBlock} 
              removeBlock={removeBlock} 
              openDialog={openDialog}
              selectedBlockId={selectedBlockId}
              setSelectedBlockId={setSelectedBlockId}
            />
          </div>
        </div>
      );
    }
    switch (block.type) {
      case 'heading':
        const Tag = `h${block.props?.level || 2}`;
        return (
          <Tag 
            contentEditable suppressContentEditableWarning onBlur={handleInput}
            style={block.styles || {}}
            className={`outline-none focus:bg-teal-500/10 rounded font-bold text-[var(--color-text-primary)] min-w-[50px] min-h-[1.5em] ${block.props?.level === 1 ? 'text-4xl lg:text-6xl mb-6' : block.props?.level === 2 ? 'text-3xl lg:text-4xl mb-4' : 'text-2xl mb-3'} ${block.props?.align === 'center' ? 'text-center' : ''}`}
          >
            {block.content}
          </Tag>
        );
      case 'paragraph':
        return (
          <p 
            contentEditable suppressContentEditableWarning onBlur={handleInput}
            style={block.styles || {}}
            className={`outline-none focus:bg-teal-500/10 rounded text-lg text-[var(--color-text-secondary)] min-w-[50px] min-h-[1.5em] whitespace-pre-wrap leading-relaxed ${block.props?.align === 'center' ? 'text-center' : ''}`}
          >
            {block.content}
          </p>
        );
      case 'image':
        return (
          <div style={{ ...block.styles, filter: undefined, objectFit: undefined }} className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md my-8 relative group">
            <img 
              src={block.content || 'https://via.placeholder.com/800x400?text=Placeholder+Image'} 
              alt="Block" 
              className="w-full h-auto object-cover" 
              style={{ objectFit: block.styles?.objectFit, filter: block.styles?.filter }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <button 
                onClick={() => {
                  openDialog({
                    type: 'prompt',
                    title: 'Update Image URL',
                    defaultValue: block.content,
                    onConfirm: (url) => { if (url) updateBlock(block.id, { content: url }); }
                  });
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded font-bold text-sm"
              >
                Change Image URL
              </button>
            </div>
          </div>
        );
      case 'video':
        return (
          <div style={block.styles || {}} className="aspect-video rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md my-8 relative group">
            {block.content ? (
              <iframe src={block.content} className="w-full h-full pointer-events-none" />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">Video Placeholder</div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <button 
                onClick={() => {
                  openDialog({
                    type: 'prompt',
                    title: 'Update Video URL',
                    message: 'Enter a valid YouTube embed URL.',
                    defaultValue: block.content,
                    onConfirm: (url) => { if (url) updateBlock(block.id, { content: url }); }
                  });
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded font-bold text-sm"
              >
                Change Video URL
              </button>
            </div>
          </div>
        );
      case 'button':
        return (
          <div className={`py-4 ${block.props?.align === 'center' ? 'text-center' : ''}`}>
            <span 
              contentEditable suppressContentEditableWarning onBlur={handleInput}
              style={block.styles || {}}
              className="px-6 py-3 rounded-xl bg-[var(--color-brand)] text-white font-bold inline-block outline-none focus:ring-2 focus:ring-teal-400"
            >
              {block.content || 'Button Text'}
            </span>
            <div className="mt-2">
              <button 
                onClick={() => {
                  openDialog({
                    type: 'prompt',
                    title: 'Update Button Link',
                    defaultValue: block.props?.url || '',
                    onConfirm: (url) => { if (url !== null) updateBlock(block.id, { props: { ...block.props, url } }); }
                  });
                }}
                className="text-xs text-[var(--color-brand)] hover:underline"
              >
                Edit Link URL
              </button>
            </div>
          </div>
        );
      case 'list':
        const ListTag = block.props?.ordered ? 'ol' : 'ul';
        const items = block.content && Array.isArray(block.content) ? block.content : ['List item 1', 'List item 2'];
        return (
          <div style={block.styles || {}} className="relative group p-2 rounded hover:bg-teal-500/10 transition-colors">
            <ListTag className={`space-y-2 pl-6 ${block.props?.ordered ? 'list-decimal' : 'list-disc'} text-lg text-[var(--color-text-secondary)]`}>
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ListTag>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2">
              <button 
                onClick={() => {
                  openDialog({
                    type: 'prompt',
                    title: 'Edit List Items',
                    message: 'Separate items with commas',
                    defaultValue: items.join(', '),
                    onConfirm: (val) => { if (val) updateBlock(block.id, { content: val.split(',').map(s => s.trim()) }); }
                  });
                }}
                className="text-[10px] bg-teal-600 text-white px-2 py-1 rounded"
              >
                Edit List
              </button>
            </div>
          </div>
        );
      default:
        return <div className="p-4 bg-red-100 text-red-600">Unknown block type</div>;
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); }}
      className={`relative group rounded-xl border transition-colors bg-[var(--color-surface)] ${isSelected ? 'border-teal-500 shadow-[0_0_0_2px_rgba(20,184,166,0.3)]' : 'border-transparent hover:border-teal-500/50'}`}
    >
      <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button {...listeners} {...attributes} className="p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded cursor-grab">
          <GripVertical className="w-4 h-4" />
        </button>
        <button onClick={() => removeBlock(block.id)} className="p-1.5 bg-red-900/50 text-red-400 hover:text-white rounded hover:bg-red-600 transition-colors cursor-pointer">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default function VisualPageBuilder() {
  const { pageSlug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [blocks, setBlocks] = useState([]);
  const [pageData, setPageData] = useState(null);
  
  const [activeDragId, setActiveDragId] = useState(null);
  const [activeDragType, setActiveDragType] = useState(null);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const [dialogConfig, setDialogConfig] = useState({ isOpen: false });
  const [isGlobalCodeOpen, setIsGlobalCodeOpen] = useState(false);
  const [globalCss, setGlobalCss] = useState('');
  const [globalJs, setGlobalJs] = useState('');

  const openDialog = (options) => {
    setDialogConfig({ ...options, isOpen: true });
  };
  const closeDialog = () => {
    setDialogConfig({ isOpen: false });
  };

  const isHardcoded = HARDCODED_PAGES.includes(pageSlug);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (!isHardcoded) {
      loadPageContent();
    } else {
      setLoading(false);
    }
  }, [pageSlug, isHardcoded]);

  const loadPageContent = async () => {
    setLoading(true);
    try {
      const data = await getLivePageContent(pageSlug);
      const globalData = await getGlobalSettings();
      if (globalData && globalData.sections) {
        setGlobalCss(globalData.sections.css || '');
        setGlobalJs(globalData.sections.js || '');
      }
      setPageData(data);
      if (data && data.sections && data.sections.blocks) {
        setBlocks(data.sections.blocks);
      } else {
        setBlocks([]);
      }
    } catch (err) {
      setError('Failed to load page content.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndPublish = async () => {
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      await savePageContent(pageSlug, {
        ...pageData, // preserve other SEO data
        sections: {
          ...(pageData?.sections || {}),
          blocks
        }
      });
      setSuccessMsg(`Page changes published live to website!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save page changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveDragId(active.id);
    if (active.data.current?.type === 'toolbox-item') {
      setActiveDragType(active.data.current.elementType);
    } else {
      setActiveDragType('canvas-item');
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragId(null);
    setActiveDragType(null);

    if (!over) return;

    // Dropping from Toolbox to Canvas or Column
    if (active.data.current?.type === 'toolbox-item') {
      const type = active.data.current.elementType;
      let newBlock = { id: generateId(), type, content: '', props: {}, parentId: null };
      
      // Inherit props for row from the toolbox
      if (type === 'row') {
        const layoutId = active.id; // e.g. toolbox-row-2
        const cols = layoutId.includes('row-2') ? 2 : layoutId.includes('row-3') ? 3 : 1;
        newBlock.props = { cols };
      }

      if (type === 'heading') { newBlock.content = 'New Heading'; newBlock.props = { level: 2 }; }
      if (type === 'paragraph') newBlock.content = 'Start typing your paragraph here...';
      if (type === 'button') { newBlock.content = 'Click Me'; newBlock.props = { url: '#' }; }
      if (type === 'list') { newBlock.content = ['Item 1', 'Item 2']; }

      let targetParentId = null;
      let insertIndex = blocks.length;

      // Determine where it was dropped
      if (over.id !== 'canvas-droppable') {
        // Did we drop onto a specific column container?
        if (typeof over.id === 'string' && (over.id.includes('-col') || over.id.includes('-content'))) {
          targetParentId = over.id;
        } else {
          // We dropped onto another block, find its parent and index
          const overBlockIndex = blocks.findIndex((b) => b.id === over.id);
          if (overBlockIndex !== -1) {
            targetParentId = blocks[overBlockIndex].parentId || null;
            insertIndex = overBlockIndex;
          }
        }
      }

      newBlock.parentId = targetParentId;

      setBlocks((items) => {
        const newItems = [...items];
        if (insertIndex < newItems.length) {
          newItems.splice(insertIndex, 0, newBlock);
        } else {
          newItems.push(newBlock);
        }
        return newItems;
      });
      return;
    }

    // Reordering within Canvas or moving between lists
    if (active.id !== over.id && over.id !== 'canvas-droppable') {
      setBlocks((items) => {
        const activeIndex = items.findIndex((i) => i.id === active.id);
        const overIndex = items.findIndex((i) => i.id === over.id);
        
        if (activeIndex === -1) return items;

        const newItems = [...items];
        const activeItem = newItems[activeIndex];

        let targetParentId = null;
        let targetIndex = newItems.length - 1;

        if (typeof over.id === 'string' && (over.id.includes('-col') || over.id.includes('-content'))) {
          // Dropped on empty column
          targetParentId = over.id;
          targetIndex = newItems.length; // Append to end of that column conceptually (handled by index)
          
          newItems.splice(activeIndex, 1);
          activeItem.parentId = targetParentId;
          newItems.push(activeItem);
        } else if (overIndex !== -1) {
          // Dropped over an existing item
          targetParentId = newItems[overIndex].parentId;
          
          if (activeItem.parentId === targetParentId) {
            // Same parent -> Array move
            return arrayMove(newItems, activeIndex, overIndex);
          } else {
            // Different parent -> Change parent and insert at index
            newItems.splice(activeIndex, 1);
            activeItem.parentId = targetParentId;
            // recalculate overIndex after removal
            const newOverIndex = newItems.findIndex((i) => i.id === over.id);
            newItems.splice(newOverIndex, 0, activeItem);
          }
        }
        
        return newItems;
      });
    } else if (over.id === 'canvas-droppable' && active.id !== over.id) {
       // Moving back to main canvas
       setBlocks((items) => {
        const activeIndex = items.findIndex((i) => i.id === active.id);
        if (activeIndex === -1) return items;
        const newItems = [...items];
        const activeItem = newItems[activeIndex];
        newItems.splice(activeIndex, 1);
        activeItem.parentId = null;
        newItems.push(activeItem);
        return newItems;
       });
    }
  };

  const updateBlock = (id, newProps) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...newProps } : b));
  };

  const removeBlock = (id) => {
    openDialog({
      type: 'confirm',
      title: 'Delete Block',
      message: 'Are you sure you want to delete this block? This cannot be undone.',
      danger: true,
      onConfirm: () => {
        setBlocks(blocks.filter(b => b.id !== id));
      }
    });
  };

  const handleAIGenerate = (aiBlocks) => {
    if (!Array.isArray(aiBlocks)) return;
    
    let processedBlocks = [];

    const processBlock = (block, parentId = null) => {
      const id = generateId();
      
      // If it's a row, it has children arrays for columns
      if (block.type === 'row' && block.children) {
        processedBlocks.push({
          id,
          type: 'row',
          parentId,
          props: block.props || { cols: 1 },
          styles: block.styles || {}
        });

        const cols = block.props?.cols || 1;
        for (let i = 0; i < cols; i++) {
          const colId = `${id}-col${i}`;
          const colBlocks = block.children[i] || [];
          colBlocks.forEach(child => processBlock(child, colId));
        }
      } else {
        // Standard block
        processedBlocks.push({
          id,
          type: block.type,
          parentId,
          content: block.content || '',
          props: block.props || {},
          styles: block.styles || {}
        });
      }
    };

    aiBlocks.forEach(b => processBlock(b, null));

    setBlocks([...blocks, ...processedBlocks]);
    setSuccessMsg('AI generated section added successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSaveGlobalCode = async () => {
    setSaving(true);
    try {
      await saveGlobalSettings({ css: globalCss, js: globalJs });
      setIsGlobalCodeOpen(false);
      setSuccessMsg('Global CSS/JS saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('Failed to save global code.');
    } finally {
      setSaving(false);
    }
  };

  if (isHardcoded) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-6">
          <AlertCircle className="w-16 h-16 text-teal-500 mx-auto" />
          <h1 className="text-3xl font-bold">Custom Template Page</h1>
          <p className="text-slate-400">
            The <b>/{pageSlug}</b> page uses a hardcoded React template to ensure pixel-perfect brand compliance and complex animations. It cannot be edited using the Drag & Drop Visual Builder.
          </p>
          <button onClick={() => navigate('/admin/pages')} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-bold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen bg-[#0B0F19] text-slate-100 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-[#111827] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-50 flex-shrink-0 shadow-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/pages')}
              className="p-2 rounded-xl bg-[#1F2937] hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="font-extrabold text-sm tracking-tight">Block Visual Editor</span>
              <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded border border-teal-500/20">/{pageSlug}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsGlobalCodeOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Code className="w-4 h-4" />
              <span>Global CSS/JS</span>
            </button>
            <button
              onClick={handleSaveAndPublish}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Publish Live</span>
            </button>
          </div>
        </header>

        {/* ALERTS */}
        {error && (
          <div className="bg-red-500/10 border-b border-red-500/30 px-6 py-2 text-red-300 text-xs flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
          </div>
        )}
        {successMsg && (
          <div className="bg-teal-500/10 border-b border-teal-500/30 px-6 py-2 text-teal-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /><span>{successMsg}</span></div>
            <button onClick={() => setSuccessMsg('')}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* 3 COLUMN LAYOUT */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* COLUMN 1: TOOLBOX */}
          <BuilderToolbox />

          {/* COLUMN 2: CANVAS */}
          <main className="flex-1 bg-slate-900 overflow-y-auto p-4 sm:p-8 flex justify-center pb-32">
            <DroppableCanvas id="canvas-droppable">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                  <span className="font-mono text-sm">Loading Canvas...</span>
                </div>
              ) : (
                <SortableContext items={blocks.filter(b => !b.parentId).map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4 min-h-[500px]">
                    {blocks.filter(b => !b.parentId).map(block => (
                      <SortableBlock 
                        key={block.id} 
                        block={block} 
                        allBlocks={blocks}
                        updateBlock={updateBlock} 
                        removeBlock={removeBlock} 
                        openDialog={openDialog}
                        selectedBlockId={selectedBlockId}
                        setSelectedBlockId={setSelectedBlockId}
                      />
                    ))}
                    
                    {blocks.filter(b => !b.parentId).length === 0 && (
                      <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center text-slate-500 font-mono flex flex-col items-center justify-center min-h-[300px] pointer-events-none">
                        Drop elements here from the toolbox or use the AI builder to start.
                      </div>
                    )}
                  </div>
                </SortableContext>
              )}
            </DroppableCanvas>
          </main>

          {/* COLUMN 3: SIDEBARS (PROPERTIES & AI) */}
          <div className="w-80 flex flex-col border-l border-slate-800 bg-[#111827] flex-shrink-0 z-10 shadow-xl overflow-hidden">
            {selectedBlockId ? (
              <>
                <div className="flex-1 overflow-hidden">
                  <PropertiesSidebar 
                    selectedBlock={blocks.find(b => b.id === selectedBlockId)} 
                    updateBlock={updateBlock} 
                    onClose={() => setSelectedBlockId(null)}
                    onRemove={() => removeBlock(selectedBlockId)}
                  />
                </div>
                <div className="h-[40%] min-h-[300px] overflow-hidden border-t border-slate-800 shrink-0">
                  <AIBuilderSidebar onGenerate={handleAIGenerate} />
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-hidden">
                <AIBuilderSidebar onGenerate={handleAIGenerate} />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* DRAG OVERLAY FOR SMOOTH VISUALS */}
      <DragOverlay>
        {activeDragId ? (
          <div className="p-3 bg-teal-900/90 border border-teal-500 rounded-xl text-teal-100 font-bold text-sm shadow-2xl flex items-center gap-2">
            Moving {activeDragType}...
          </div>
        ) : null}
      </DragOverlay>

      <CustomDialog config={dialogConfig} onClose={closeDialog} />

      {/* GLOBAL CODE MODAL */}
      {isGlobalCodeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1F2937] border border-slate-700 p-6 rounded-2xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-teal-500" />
                Global Custom Code
              </h3>
              <button onClick={() => setIsGlobalCodeOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <p className="text-sm text-slate-400 mb-4">These styles and scripts will be injected across all public pages.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Global CSS</label>
                <textarea 
                  value={globalCss}
                  onChange={(e) => setGlobalCss(e.target.value)}
                  className="w-full h-32 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 font-mono text-sm"
                  placeholder="body { background-color: #000; }"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Global JS</label>
                <textarea 
                  value={globalJs}
                  onChange={(e) => setGlobalJs(e.target.value)}
                  className="w-full h-32 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 font-mono text-sm"
                  placeholder="console.log('Hello World!');"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsGlobalCodeOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleSaveGlobalCode} disabled={saving} className="px-6 py-2 text-white font-bold rounded-xl shadow-lg transition-colors bg-teal-600 hover:bg-teal-500 disabled:opacity-50 flex items-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Globally
              </button>
            </div>
          </div>
        </div>
      )}

    </DndContext>
  );
}
