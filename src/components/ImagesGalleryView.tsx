import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/presentationData';
import { audioManager } from '../utils/audio';

export const ImagesGalleryView: React.FC = () => {
  const [activeItem, setActiveItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'Homepage & UI', 'Product Page', 'Checkout Gate', 'Mobile UX', 'Logistics Hub', 'Data Intelligence', 'Ethiopian Social Commerce'];

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  const handleNextLightbox = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((it) => it.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    audioManager.playTick();
    setActiveItem(GALLERY_ITEMS[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((it) => it.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    audioManager.playTick();
    setActiveItem(GALLERY_ITEMS[prevIndex]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              audioManager.playTick();
              setFilter(cat);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
              filter === cat
                ? 'bg-[#ff5520] text-black font-bold shadow-md shadow-[#ff5520]/20'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {cat === 'all' ? 'All Visual Examples' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 my-2 flex-1 overflow-y-auto">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              audioManager.playAction();
              setActiveItem(item);
            }}
            className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.08] hover:border-[#ff5520]/60 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black/60">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute top-2.5 left-2.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ff5520] text-black">
                  {item.metric}
                </span>
              </div>
            </div>

            <div className="p-3.5 space-y-1">
              <span className="text-[10px] font-mono text-[#ff5520] uppercase">{item.category}</span>
              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ff5520] transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl animate-fade-in">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-5xl bg-[#0d1014] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono text-[#ff5520] uppercase">{activeItem.category}</span>
                  <h3 className="text-base font-bold text-white">{activeItem.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevLightbox}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                    title="Previous visual (←)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextLightbox}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                    title="Next visual (→)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer ml-2"
                    title="Close Lightbox (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Expanded Image */}
              <div className="relative aspect-video max-h-[60vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lightbox Caption & Context */}
              <div className="p-6 bg-[#0f1217] border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
                  {activeItem.subtitle}
                </p>
                <div className="flex items-center gap-3 shrink-0 font-mono text-xs text-zinc-400">
                  <span className="px-2.5 py-1 rounded bg-[#ff5520]/20 text-[#ff5520] border border-[#ff5520]/40 font-bold">
                    Key Benchmark: {activeItem.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
