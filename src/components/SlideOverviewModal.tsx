import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { SLIDES } from '../data/slides';
import { audioManager } from '../utils/audio';

interface SlideOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideOverviewModal: React.FC<SlideOverviewModalProps> = ({
  isOpen,
  onClose,
  currentIndex,
  onSelectSlide,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#101014] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono text-[#ff5520] tracking-widest uppercase block">
              Deck Navigation
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              All 13 Presentation Slides
            </h2>
          </div>
          <button
            onClick={() => {
              audioManager.playTick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Overview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slides Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    audioManager.playSlideChange('next');
                    onSelectSlide(idx);
                    onClose();
                  }}
                  className={`group relative text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-44 overflow-hidden ${
                    isActive
                      ? 'bg-white/[0.08] border-[#ff5520] ring-2 ring-[#ff5520]/40'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-mono font-bold text-[#ff5520]">
                      {slide.indexFormatted}
                    </span>
                    {isActive ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[#ff5520] bg-[#ff5520]/15 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Current
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-500 uppercase truncate max-w-[120px]">
                        {slide.badge.split('—')[1]?.trim() || slide.badge}
                      </span>
                    )}
                  </div>

                  {/* Center Title */}
                  <div className="my-auto">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#ff5520] transition-colors leading-snug">
                      {slide.titlePrefix}
                      {slide.titleAccent}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate mt-1">{slide.subtitle}</p>
                  </div>

                  {/* Bottom tags */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-white/[0.04] w-full">
                    <span className="text-[10px] font-mono text-zinc-500 truncate">
                      {slide.tags[0] || 'Presentation'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-6 py-3 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Click any slide to jump immediately</span>
          <span className="hidden sm:inline">Press Esc to dismiss</span>
        </div>
      </div>
    </div>
  );
};
