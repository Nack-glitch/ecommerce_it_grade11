import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Home, Maximize2, Minimize2 } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface PresentationBottomBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  onGoHome: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const PresentationBottomBar: React.FC<PresentationBottomBarProps> = ({
  currentSlideIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  onGoHome,
  isAutoPlay,
  onToggleAutoPlay,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const currentFormatted = currentSlideIndex.toString().padStart(2, '0');
  const totalFormatted = (totalSlides - 1).toString().padStart(2, '0');

  // Percentage based on total slides
  const progressPercent = currentSlideIndex === 0 ? 0 : (currentSlideIndex / (totalSlides - 1)) * 100;

  return (
    <footer className="relative z-30 px-5 sm:px-10 py-3.5 sm:py-4 border-t border-white/[0.06] bg-[#08090b]/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Home Button & Slide Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              audioManager.playTick();
              onGoHome();
            }}
            className="p-2 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520]/50 text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="Go to Opening Screen (Key: H or Home)"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm select-none">
            <span className="font-extrabold text-[#ff5520]">{currentFormatted}</span>
            <span className="text-zinc-600 font-light">/</span>
            <span className="text-zinc-400 font-medium">{totalFormatted}</span>
          </div>
        </div>

        {/* Center: Interactive Progress Bar & 12 Slide Micro Segments */}
        <div className="flex-1 max-w-2xl hidden sm:flex flex-col gap-1.5">
          <div
            role="progressbar"
            aria-valuenow={currentSlideIndex}
            aria-valuemin={0}
            aria-valuemax={totalSlides - 1}
            aria-label="Presentation progress"
            className="group relative h-1.5 w-full bg-white/[0.08] hover:bg-white/[0.14] rounded-full overflow-hidden cursor-pointer transition-all"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              const targetSlide = Math.min(
                Math.max(Math.round(clickPos * (totalSlides - 1)), 0),
                totalSlides - 1
              );
              audioManager.playTick();
              onSelectSlide(targetSlide);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#ff5520] to-[#ff6e3a] rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,85,32,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Micro dots for all sections */}
          <div className="flex items-center justify-between px-0.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioManager.playTick();
                  onSelectSlide(idx);
                }}
                className="group relative py-1 cursor-pointer transition-colors focus:outline-none"
                title={
                  idx === 0
                    ? "Opening Screen"
                    : idx === totalSlides - 1
                    ? "Group Members / Credits"
                    : `Jump to Slide ${idx.toString().padStart(2, '0')}`
                }
                aria-label={`Jump to slide ${idx}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    idx === currentSlideIndex
                      ? 'bg-[#ff5520] scale-150 ring-2 ring-[#ff5520]/40'
                      : idx < currentSlideIndex
                      ? 'bg-zinc-500 hover:bg-zinc-300'
                      : 'bg-zinc-800 hover:bg-zinc-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Autoplay, Prev, Next, and Fullscreen Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Autoplay toggle */}
          <button
            onClick={() => {
              audioManager.playTick();
              onToggleAutoPlay();
            }}
            className={`p-2 sm:p-2.5 rounded-full border text-xs transition-all cursor-pointer ${
              isAutoPlay
                ? 'bg-[#ff5520]/20 border-[#ff5520] text-[#ff5520]'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white'
            }`}
            title={isAutoPlay ? 'Pause Auto-Play (Key: A)' : 'Start Auto-Play Presentation (Key: A)'}
            aria-label="Toggle Auto-Play"
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Prev Button */}
          <button
            onClick={() => {
              audioManager.playSlideChange('prev');
              onPrev();
            }}
            disabled={currentSlideIndex === 0}
            className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer ${
              currentSlideIndex === 0
                ? 'opacity-30 border-white/[0.04] text-zinc-600 cursor-not-allowed'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-[#ff5520]/50 hover:bg-white/[0.08] text-zinc-200 hover:text-white'
            }`}
            title="Previous Slide (← / ↑ / PageUp)"
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
            className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer ${
              currentSlideIndex === totalSlides - 1
                ? 'opacity-30 border-white/[0.04] text-zinc-600 cursor-not-allowed'
                : 'bg-white/[0.03] border-white/[0.08] hover:border-[#ff5520] hover:bg-[#ff5520]/15 text-[#ff5520] hover:text-white'
            }`}
            title="Next Slide (→ / ↓ / Space / PageDown)"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Fullscreen Quick Toggle */}
          <button
            onClick={() => {
              audioManager.playTick();
              onToggleFullscreen();
            }}
            className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer hidden sm:block"
            title={isFullscreen ? 'Exit Fullscreen (F / Esc)' : 'Enter Fullscreen (F)'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </footer>
  );
};
