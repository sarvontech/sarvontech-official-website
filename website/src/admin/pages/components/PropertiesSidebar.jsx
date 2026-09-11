import React, { useState, useEffect } from 'react';
import { Trash2, X } from 'lucide-react';

function UnitInput({ value, onChange, placeholder }) {
  const match = (value || '').match(/^(-?[\d.]+)(px|rem|em|%|vh|vw)?$/);
  const num = match ? match[1] : '';
  const unit = match && match[2] ? match[2] : 'px';

  const handleNumChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      onChange('');
    } else {
      onChange(val + unit);
    }
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    if (num !== '') {
      onChange(num + newUnit);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentNum = parseFloat(num) || 0;
      const step = e.shiftKey ? 10 : 1;
      const newNum = e.key === 'ArrowUp' ? currentNum + step : currentNum - step;
      onChange(newNum + unit);
    }
  };

  return (
    <div className="flex w-full bg-[#1F2937] border border-slate-700 rounded overflow-hidden focus-within:border-teal-500">
      <input
        type="number"
        value={num}
        onChange={handleNumChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-transparent p-1.5 text-xs text-white focus:outline-none placeholder-slate-600 appearance-none"
      />
      <select 
        value={unit} 
        onChange={handleUnitChange}
        className="bg-slate-800 text-slate-400 text-[10px] px-1 border-l border-slate-700 focus:outline-none cursor-pointer"
      >
        <option value="px">px</option>
        <option value="rem">rem</option>
        <option value="em">em</option>
        <option value="%">%</option>
        <option value="vh">vh</option>
        <option value="vw">vw</option>
      </select>
    </div>
  );
}

const STYLE_GROUPS = [
  {
    title: 'Typography',
    fields: [
      { name: 'fontSize', label: 'Font Size', type: 'unit', placeholder: '16' },
      { name: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
      { name: 'color', label: 'Text Color', type: 'color', placeholder: '#000000' },
      { name: 'textAlign', label: 'Align', type: 'select', options: ['left', 'center', 'right', 'justify'] },
      { name: 'lineHeight', label: 'Line Height', type: 'unit', placeholder: '1.5' },
    ]
  },
  {
    title: 'Spacing',
    fields: [
      { name: 'marginTop', label: 'Margin Top', type: 'unit', placeholder: '0' },
      { name: 'marginBottom', label: 'Margin Bottom', type: 'unit', placeholder: '0' },
      { name: 'marginLeft', label: 'Margin Left', type: 'unit', placeholder: '0' },
      { name: 'marginRight', label: 'Margin Right', type: 'unit', placeholder: '0' },
      { name: 'paddingTop', label: 'Padding Top', type: 'unit', placeholder: '0' },
      { name: 'paddingBottom', label: 'Padding Bottom', type: 'unit', placeholder: '0' },
      { name: 'paddingLeft', label: 'Padding Left', type: 'unit', placeholder: '0' },
      { name: 'paddingRight', label: 'Padding Right', type: 'unit', placeholder: '0' },
    ]
  },
  {
    title: 'Layout & Sizing',
    fields: [
      { name: 'width', label: 'Width', type: 'unit', placeholder: '100' },
      { name: 'height', label: 'Height', type: 'unit', placeholder: '300' },
      { name: 'maxWidth', label: 'Max Width', type: 'unit', placeholder: '100' },
      { name: 'display', label: 'Display', type: 'select', options: ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'] },
      { name: 'flexDirection', label: 'Flex Direction', type: 'select', options: ['row', 'column'] },
      { name: 'alignItems', label: 'Align Items', type: 'select', options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] },
      { name: 'justifyContent', label: 'Justify Content', type: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] },
      { name: 'gap', label: 'Gap (for flex/grid)', type: 'unit', placeholder: '10' },
    ]
  },
  {
    title: 'Background & Borders',
    fields: [
      { name: 'backgroundColor', label: 'Background Color', type: 'color', placeholder: '#ffffff' },
      { name: 'borderRadius', label: 'Border Radius', type: 'unit', placeholder: '8' },
      { name: 'border', label: 'Border', type: 'text', placeholder: '1px solid #000' },
    ]
  },
  {
    title: 'Effects',
    fields: [
      { name: 'boxShadow', label: 'Box Shadow', type: 'text', placeholder: '0 4px 6px rgba(0,0,0,0.1)' },
      { name: 'opacity', label: 'Opacity', type: 'text', placeholder: '1, 0.5' },
    ]
  },
  {
    title: 'Image Specific',
    fields: [
      { name: 'objectFit', label: 'Object Fit', type: 'select', options: ['fill', 'contain', 'cover', 'none', 'scale-down'] },
      { name: 'filter', label: 'CSS Filter', type: 'text', placeholder: 'blur(5px), grayscale(100%)' },
    ]
  }
];

export default function PropertiesSidebar({ selectedBlock, updateBlock, onClose, onRemove }) {
  if (!selectedBlock) return null;

  const currentStyles = selectedBlock.styles || {};

  const handleStyleChange = (propName, value) => {
    updateBlock(selectedBlock.id, {
      styles: {
        ...currentStyles,
        [propName]: value
      }
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#111827] text-slate-300">
      <div className="p-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-10 flex justify-between items-start">
        <div>
          <h3 className="font-bold text-white text-sm">Style Properties</h3>
          <p className="text-[10px] text-teal-400 font-mono mt-1 uppercase tracking-wider">Editing: {selectedBlock.type}</p>
        </div>
        <div className="flex items-center gap-2">
          {onRemove && (
            <button 
              onClick={onRemove}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
              title="Delete Block"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              title="Close Properties"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
        {STYLE_GROUPS.map((group) => {
          // Hide Image Specific group if not image/video
          if (group.title === 'Image Specific' && !['image', 'video'].includes(selectedBlock.type)) return null;

          return (
            <div key={group.title} className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1">{group.title}</h4>
              <div className="grid grid-cols-2 gap-2">
                {group.fields.map((field) => (
                  <div key={field.name} className={`${field.type === 'text' && field.name.includes('Margin') || field.name.includes('Padding') ? 'col-span-1' : 'col-span-2'}`}>
                    <label className="block text-[10px] text-slate-500 mb-1">{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        value={currentStyles[field.name] || ''}
                        onChange={(e) => handleStyleChange(field.name, e.target.value)}
                        className="w-full bg-[#1F2937] border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="">Default</option>
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === 'color' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentStyles[field.name] || '#ffffff'}
                          onChange={(e) => handleStyleChange(field.name, e.target.value)}
                          className="w-8 h-8 rounded border-none cursor-pointer bg-transparent p-0"
                        />
                        <span className="text-xs font-mono text-slate-400">{currentStyles[field.name] || 'none'}</span>
                      </div>
                    ) : field.type === 'unit' ? (
                      <UnitInput 
                        value={currentStyles[field.name]} 
                        onChange={(val) => handleStyleChange(field.name, val)} 
                        placeholder={field.placeholder} 
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={currentStyles[field.name] || ''}
                        onChange={(e) => handleStyleChange(field.name, e.target.value)}
                        className="w-full bg-[#1F2937] border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-teal-500 placeholder-slate-600"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
