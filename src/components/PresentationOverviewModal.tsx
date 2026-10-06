import React, { useEffect } from 'react';
import { X, Check, ArrowRight, GraduationCap } from 'lucide-react';
import { PRESENTATION_SECTIONS } from '../data/presentationData';
import { audioManager } from '../utils/audio';

interface PresentationOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const PresentationOverviewModal: React.FC<PresentationOverviewModalProps> = ({
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
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in overflow-hidden">
      <div className="relative w-[96vw] max-w-7xl h-[92vh] max-h-[92vh] bg-[#0c0e12] border-2 border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header - Compact Height, Bold Branding */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3 sm:py-3.5 border-b border-white/10 bg-white/[0.03] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#ff5520] font-black tracking-widest uppercase">
              <GraduationCap className="w-3.5 h-3.5 text-[#ff5520]" />
              <span>IFA BORU BITE SPECIAL SECONDARY SCHOOL · GRADE 11 IT</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight mt-0.5">
              Table of Contents · 12 Presentation Sections
            </h2>
          </div>
          <button
            onClick={() => {
              audioManager.playTick();
              onClose();
            }}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#ff5520] text-zinc-300 hover:text-black transition-all cursor-pointer shadow-md"
            aria-label="Close Overview"
            title="Close Menu (Esc)"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Slides Grid - Exact 3-Row Grid that fills 100% height with NO SCROLLING */}
        <div className="flex-1 p-3 sm:p-5 overflow-hidden flex flex-col min-h-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-6 sm:grid-rows-4 lg:grid-rows-3 gap-2 sm:gap-3 h-full w-full">
            {PRESENTATION_SECTIONS.map((sec) => {
              const isActive = sec.id === currentIndex;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    audioManager.playSlideChange('next');
                    onSelectSlide(sec.id);
                    onClose();
                  }}
                  className={`group relative text-left p-3 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-full overflow-hidden ${
                    isActive
                      ? 'bg-white/[0.12] border-[#ff5520] ring-2 sm:ring-4 ring-[#ff5520]/40 shadow-xl shadow-[#ff5520]/25'
                      : 'bg-white/[0.04] border-white/10 hover:border-[#ff5520]/80 hover:bg-white/[0.08] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/50'
                  }`}
                >
                  {/* Top row: Large Bold Slide Number & Badge */}
                  <div className="flex items-center justify-between w-full shrink-0">
                    <span className="text-xl sm:text-2xl font-mono font-black text-[#ff5520] tracking-tight">
                      {sec.slideNumber}
                    </span>
                    {isActive ? (
                      <span className="flex items-center gap-1 text-[10px] sm:text-xs font-mono font-black text-black bg-[#ff5520] px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                        <Check className="w-3 h-3 stroke-[3]" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-xs font-mono font-black text-zinc-200 bg-white/10 border border-white/15 px-2 py-0.5 rounded-lg uppercase tracking-wider truncate max-w-[110px] sm:max-w-[140px]">
                        {sec.category}
                      </span>
                    )}
                  </div>

                  {/* Center: Bold Title & Subtitle */}
                  <div className="my-auto py-0.5 overflow-hidden">
                    <h3 className="text-xs sm:text-sm lg:text-base font-black text-white group-hover:text-[#ff5520] transition-colors leading-snug line-clamp-2">
                      {sec.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-300 font-semibold truncate mt-0.5">
                      {sec.subtitle}
                    </p>
                  </div>

                  {/* Bottom: Jump Action */}
                  <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-white/10 w-full text-[10px] sm:text-xs font-mono font-bold text-zinc-400 group-hover:text-white transition-colors shrink-0">
                    <span className="text-zinc-300 truncate">Slide {sec.slideNumber}</span>
                    <div className="flex items-center gap-1 text-[#ff5520] font-black group-hover:translate-x-1 transition-transform shrink-0">
                      <span>OPEN</span>
                      <ArrowRight className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer shortcuts hint - Compact & Clean */}
        <div className="px-5 sm:px-8 py-2.5 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] sm:text-xs font-mono text-zinc-300 shrink-0">
          <span className="font-bold text-zinc-200">
            Click any section to jump immediately · Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-black">Esc</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-black">M</kbd> to close
          </span>
          <span className="font-black text-[#ff5520] uppercase tracking-wider hidden sm:inline">
            IFA BORU BITE · Grade 11 IT Presentation
          </span>
        </div>
      </div>
    </div>
  );
};
