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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#0c0e12] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/[0.08] bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff5520] tracking-widest uppercase">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>IFA BORU BITE SPECIAL SECONDARY SCHOOL · GRADE 11 IT</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              12 Presentation Sections Directory
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
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
                  className={`group relative text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-38 overflow-hidden ${
                    isActive
                      ? 'bg-white/[0.08] border-[#ff5520] ring-2 ring-[#ff5520]/40 shadow-lg shadow-[#ff5520]/15'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-mono font-bold text-[#ff5520]">
                      {sec.slideNumber}
                    </span>
                    {isActive ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#ff5520] bg-[#ff5520]/15 px-2 py-0.5 rounded-full font-bold">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-500 uppercase truncate max-w-[110px]">
                        {sec.category}
                      </span>
                    )}
                  </div>

                  {/* Center Title */}
                  <div className="my-auto">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#ff5520] transition-colors leading-snug line-clamp-2">
                      {sec.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 truncate mt-1">{sec.subtitle}</p>
                  </div>

                  {/* Bottom tags */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] w-full text-[10px] font-mono text-zinc-500">
                    <span>Section {sec.slideNumber}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-6 py-3 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Click any card to jump immediately · Keyboard: 0–9, Esc</span>
          <span className="hidden sm:inline">Grade 11 IT Presentation Mode</span>
        </div>
      </div>
    </div>
  );
};
