import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Eye } from 'lucide-react';

const templatesList = [
  {
    id: 'modern',
    name: 'Modern Professional',
    category: 'Modern',
    atsScore: '98%',
    badge: 'Popular',
    desc: 'Clean indigo accent header with structured typography, optimal for tech & product roles.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    category: 'Executive',
    atsScore: '96%',
    badge: 'ATS Friendly',
    desc: 'Traditional serif format preferred by traditional corporate HR screeners & finance roles.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'minimal',
    name: 'Minimal Sleek',
    category: 'Minimal',
    atsScore: '97%',
    badge: 'Clean Format',
    desc: 'Monochrome high-contrast design maximizing readability for senior engineering resumes.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
  },
];

const TemplateGalleryModal = ({ isOpen, onClose, selectedTemplate, onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'ATS Friendly', 'Modern', 'Professional', 'Executive', 'Minimal'];

  const filteredTemplates = activeCategory === 'All'
    ? templatesList
    : templatesList.filter((t) => t.category === activeCategory || (activeCategory === 'ATS Friendly' && t.atsScore >= '95%'));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5B4BFF]" />
              <h2 className="text-2xl font-extrabold text-slate-900">Choose Resume Template</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Select an ATS-optimized A4 template designed to pass recruiter screening algorithms
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#5B4BFF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {filteredTemplates.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;

              return (
                <motion.div
                  key={tmpl.id}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white border rounded-2xl p-4 shadow-soft-sm hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4 relative group ${
                    isSelected ? 'border-2 border-[#5B4BFF] bg-[#5B4BFF]/5 ring-2 ring-[#5B4BFF]/20' : 'border-slate-200 hover:border-[#5B4BFF]/50'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ✓ {tmpl.atsScore} ATS Match
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#5B4BFF]/10 text-[#5B4BFF]">
                      {tmpl.badge}
                    </span>
                  </div>

                  {/* A4 Realistic Image Thumbnail */}
                  <div className="relative aspect-[1/1.4] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                    <img
                      src={tmpl.image}
                      alt={tmpl.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <Eye className="w-4 h-4" /> Live A4 Layout
                      </span>
                    </div>
                  </div>

                  {/* Template Info & Action */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-sm">{tmpl.name}</h4>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#5B4BFF] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{tmpl.desc}</p>

                    <button
                      onClick={() => {
                        onSelectTemplate(tmpl.id);
                        onClose();
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer mt-2 ${
                        isSelected
                          ? 'bg-[#5B4BFF] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-[#5B4BFF] hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Currently Selected' : 'Use Template'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TemplateGalleryModal;
