import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface BottomBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  currentSlideIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  isAutoPlay,
  onToggleAutoPlay,
}) => {
  const currentFormatted = (currentSlideIndex + 1).toString().padStart(2, '0');
  const totalFormatted = totalSlides.toString().padStart(2, '0');

  // Calculate percentage for the active progress bar
  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <footer className="relative z-30 px-6 sm:px-10 py-5 border-t border-white/[0.06] bg-[#0c0c0e]/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-6 max-w-7xl mx-auto">
        {/* Left: 01 / 13 slide indicator matching screenshot */}
        <div className="flex items-center gap-2 font-mono text-sm sm:text-base select-none shrink-0">
          <span className="font-bold text-[#ff5520]">{currentFormatted}</span>
          <span className="text-zinc-600 font-light">/</span>
          <span className="text-zinc-400 font-medium">{totalFormatted}</span>
        </div>

        {/* Center: Interactive Progress Bar & Segments */}
        <div className="flex-1 max-w-2xl hidden sm:flex flex-col gap-1.5">
          <div
            role="progressbar"
            aria-valuenow={currentSlideIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalSlides}
            aria-label="Presentation progress"
            className="group relative h-1.5 w-full bg-white/[0.08] hover:bg-white/[0.14] rounded-full overflow-hidden cursor-pointer transition-all"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              const targetSlide = Math.min(
                Math.max(Math.floor(clickPos * totalSlides), 0),
                totalSlides - 1
              );
              audioManager.playTick();
              onSelectSlide(targetSlide);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#ff5520] to-[#ff7a45] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Micro dots for all 13 slides */}
          <div className="flex items-center justify-between px-0.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioManager.playTick();
                  onSelectSlide(idx);
                }}
                className={`group relative py-1 cursor-pointer transition-colors focus:outline-none`}
                title={`Jump to slide ${idx + 1}`}
                aria-label={`Jump to slide ${idx + 1}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    idx === currentSlideIndex
                      ? 'bg-[#ff5520] scale-150 ring-2 ring-[#ff5520]/30'
                      : idx < currentSlideIndex
                      ? 'bg-zinc-500 hover:bg-zinc-300'
                      : 'bg-zinc-800 hover:bg-zinc-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Auto-play and Arrow navigation buttons matching screenshot */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Autoplay toggle */}
          <button
            onClick={() => {
              audioManager.playTick();
              onToggleAutoPlay();
            }}
            className={`p-2.5 rounded-full border text-xs transition-all cursor-pointer ${
              isAutoPlay
                ? 'bg-[#ff5520]/20 border-[#ff5520] text-[#ff5520]'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white'
            }`}
            title={isAutoPlay ? 'Pause Auto-Play (Key: A)' : 'Start Auto-Play Presentation (Key: A)'}
            aria-label="Toggle Auto-Play"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Prev Button */}
          <button
            onClick={() => {
              audioManager.playSlideChange('prev');
              onPrev();
            }}
            disabled={currentSlideIndex === 0}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              currentSlideIndex === 0
                ? 'opacity-30 border-white/[0.04] text-zinc-600 cursor-not-allowed'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-[#ff5520]/50 hover:bg-white/[0.08] text-zinc-200 hover:text-white'
            }`}
            title="Previous Slide (← / PageUp)"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => {
              audioManager.playSlideChange('next');
              onNext();
            }}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              currentSlideIndex === totalSlides - 1
                ? 'opacity-30 border-white/[0.04] text-zinc-600 cursor-not-allowed'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-[#ff5520] hover:bg-[#ff5520]/15 text-[#ff5520] hover:text-white'
            }`}
            title="Next Slide (→ / Space / PageDown)"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
