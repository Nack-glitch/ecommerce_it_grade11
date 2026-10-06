import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESENTATION_SECTIONS } from './data/presentationData';
import { Header } from './components/Header';
import { PresentationBottomBar } from './components/PresentationBottomBar';
import { CinematicSlideContent } from './components/CinematicSlideContent';
import { PresentationOverviewModal } from './components/PresentationOverviewModal';
import { audioManager } from './utils/audio';
import {
  ChevronLeft,
  ChevronRight,
  Minimize2,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Menu
} from 'lucide-react';

export default function App() {
  // Total of 12 states (0: Opening, 1-11: Major sections)
  const TOTAL_PRESENTATION_SLIDES = PRESENTATION_SECTIONS.length; // 12 total (00 to 11)

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Functional Zoom State (70% to 150%)
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(150, prev + 10));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(70, prev - 10));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(100);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Handle Fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as unknown as {
        fullscreenElement?: Element;
        webkitFullscreenElement?: Element;
      };
      const isNativeFs = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
      if (!isNativeFs && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev < TOTAL_PRESENTATION_SLIDES - 1) {
        setSlideDirection('forward');
        return prev + 1;
      }
      return prev;
    });
  }, [TOTAL_PRESENTATION_SLIDES]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev > 0) {
        setSlideDirection('backward');
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleSelectSlide = useCallback((index: number) => {
    setSlideDirection(index >= currentSlideIndex ? 'forward' : 'backward');
    setCurrentSlideIndex(index);
  }, [currentSlideIndex]);

  // Auto-play interval (7s per slide)
  useEffect(() => {
    let autoInterval: NodeJS.Timeout;
    if (isAutoPlay) {
      autoInterval = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev >= TOTAL_PRESENTATION_SLIDES - 1) {
            return 0; // Loop back to start
          }
          return prev + 1;
        });
      }, 7000);
    }
    return () => clearInterval(autoInterval);
  }, [isAutoPlay, TOTAL_PRESENTATION_SLIDES]);

  // Comprehensive keyboard controls as requested in prompt:
  // - Arrow Right / Down / Space -> next
  // - Arrow Left / Up -> previous
  // - Home / H -> first slide
  // - End -> final slide
  // - 1-9, 0 -> jump to corresponding slide
  // - F -> fullscreen
  // - Escape -> exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in a form input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          audioManager.playSlideChange('next');
          handleNext();
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          audioManager.playSlideChange('prev');
          handlePrev();
          break;

        case 'Home':
        case 'h':
        case 'H':
          e.preventDefault();
          audioManager.playTick();
          handleSelectSlide(0);
          break;

        case 'End':
          e.preventDefault();
          audioManager.playTick();
          handleSelectSlide(TOTAL_PRESENTATION_SLIDES - 1);
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'Escape':
          if (isFullscreen) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;

        case 'o':
        case 'O':
        case 'm':
        case 'M':
          e.preventDefault();
          setIsOverviewOpen((prev) => !prev);
          break;

        case 'a':
        case 'A':
          e.preventDefault();
          setIsAutoPlay((prev) => !prev);
          break;

        case '+':
        case '=':
          e.preventDefault();
          audioManager.playTick();
          handleZoomIn();
          break;

        case '-':
        case '_':
          e.preventDefault();
          audioManager.playTick();
          handleZoomOut();
          break;

        // Number keys 0 to 9 jump to corresponding section
        case '0':
          e.preventDefault();
          handleSelectSlide(0);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          e.preventDefault();
          const targetNum = parseInt(e.key, 10);
          if (targetNum < TOTAL_PRESENTATION_SLIDES) {
            handleSelectSlide(targetNum);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleSelectSlide, TOTAL_PRESENTATION_SLIDES]);

  // Touch Swipe gestures for mobile tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe threshold: 50px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        audioManager.playSlideChange('next');
        handleNext();
      } else {
        audioManager.playSlideChange('prev');
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      // Attempt native browser fullscreen
      const elem = containerRef.current || document.documentElement;
      const requestFs =
        elem.requestFullscreen ||
        (elem as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen ||
        (elem as unknown as { msRequestFullscreen?: () => Promise<void> }).msRequestFullscreen;

      if (requestFs) {
        try {
          const promise = requestFs.call(elem);
          if (promise && typeof promise.catch === 'function') {
            promise.catch(() => {
              // Iframe security restriction or denied - in-frame fullscreen fallback activates
            });
          }
        } catch {
          // Ignored
        }
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      const doc = document as unknown as {
        exitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        fullscreenElement?: Element;
        webkitFullscreenElement?: Element;
      };

      if (doc.fullscreenElement || doc.webkitFullscreenElement) {
        const exitFs = doc.exitFullscreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        if (exitFs) {
          try {
            const promise = exitFs.call(document);
            if (promise && typeof promise.catch === 'function') {
              promise.catch(() => {});
            }
          } catch {}
        }
      }
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    audioManager.enabled = nextVal;
    if (nextVal) {
      audioManager.playTick();
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`bg-[#0c0c0e] text-[#f0f0f2] flex flex-col justify-between overflow-hidden select-none bg-slide-grid transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-[99999] w-screen h-screen m-0 p-0 shadow-2xl'
          : 'relative w-screen h-screen'
      }`}
    >
      {/* Top Bar: In Fullscreen, use floating pill; otherwise use standard Header */}
      {isFullscreen ? (
        <div className="fixed top-4 right-4 sm:right-6 z-50 flex items-center gap-2 bg-[#0c0c0e]/95 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-2xl animate-in fade-in duration-200">
          <span className="text-[11px] font-mono font-bold text-[#ff5520] tracking-wider uppercase pl-1 select-none">
            {currentSlideIndex === 0 ? 'COVER' : `SLIDE ${currentSlideIndex.toString().padStart(2, '0')}/11`}
          </span>

          <div className="w-[1px] h-3.5 bg-white/20" />

          {/* Quick Prev / Next */}
          <button
            onClick={() => {
              audioManager.playSlideChange('prev');
              handlePrev();
            }}
            disabled={currentSlideIndex === 0}
            className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
            title="Previous Slide (← / PageUp)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              audioManager.playSlideChange('next');
              handleNext();
            }}
            disabled={currentSlideIndex === TOTAL_PRESENTATION_SLIDES - 1}
            className="p-1 rounded-full text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
            title="Next Slide (→ / Space / PageDown)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-3.5 bg-white/20" />

          {/* Zoom Controls */}
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 70}
            className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="text-[10px] font-mono font-bold text-zinc-300 hover:text-[#ff5520] px-1 cursor-pointer transition-colors"
            title="Reset Zoom (100%)"
          >
            {zoomLevel}%
          </button>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 150}
            className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-3.5 bg-white/20" />

          {/* Hamburger Menu with All Content Directory - Wide & Bold */}
          <button
            onClick={() => {
              audioManager.playTick();
              setIsOverviewOpen(true);
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-mono font-black text-white bg-white/10 hover:bg-[#ff5520] hover:text-black px-3 sm:px-3.5 py-1.5 rounded-full border border-white/20 hover:border-[#ff5520] transition-all cursor-pointer shadow-md uppercase tracking-wider"
            title="All Content Menu · Slide Directory & Outline (Key: O or M)"
            aria-label="Open Content Directory Menu"
          >
            <Menu className="w-4 h-4 text-[#ff5520] stroke-[2.5]" />
            <span>MENU</span>
          </button>

          <div className="w-[1px] h-3.5 bg-white/20" />

          {/* Exit Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1 text-xs font-mono font-bold bg-[#ff5520] hover:bg-[#e04515] text-white px-2.5 py-1 rounded-full cursor-pointer transition-colors shadow-md"
            title="Exit Fullscreen (Esc or F)"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit (Esc)</span>
          </button>
        </div>
      ) : (
        <Header
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          onOpenOverview={() => setIsOverviewOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onGoToCover={() => handleSelectSlide(0)}
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
        />
      )}

      {/* Main Slide Presentation Stage with Smooth Motion Transition & Zoom Scaling */}
      <main className="relative flex-1 w-full overflow-hidden flex flex-col justify-start">
        <div
          style={{
            zoom: `${zoomLevel}%`
          }}
          className="w-full h-full flex flex-col justify-start transition-all duration-200"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{
                opacity: 0,
                x: slideDirection === 'forward' ? 30 : -30,
                scale: 0.985
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: slideDirection === 'forward' ? -30 : 30,
                scale: 0.985
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col justify-start"
            >
              <CinematicSlideContent
                slideId={currentSlideIndex}
                onEnterPresentation={() => handleSelectSlide(1)}
                onNext={handleNext}
                onSelectSlide={handleSelectSlide}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Bar: hidden or minimal scrub line in Fullscreen, full controls in normal mode */}
      {!isFullscreen ? (
        <PresentationBottomBar
          currentSlideIndex={currentSlideIndex}
          totalSlides={TOTAL_PRESENTATION_SLIDES}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectSlide={handleSelectSlide}
          onGoHome={() => handleSelectSlide(0)}
          isAutoPlay={isAutoPlay}
          onToggleAutoPlay={() => setIsAutoPlay((prev) => !prev)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      ) : (
        <div className="fixed bottom-0 left-0 right-0 z-40 h-1 bg-white/[0.08]">
          <div
            className="h-full bg-gradient-to-r from-[#ff5520] to-[#ff7744] transition-all duration-300"
            style={{
              width: `${currentSlideIndex === 0 ? 0 : (currentSlideIndex / (TOTAL_PRESENTATION_SLIDES - 1)) * 100}%`
            }}
          />
        </div>
      )}

      {/* Presentation Overview Grid Modal (11 sections) */}
      <PresentationOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentIndex={currentSlideIndex}
        onSelectSlide={handleSelectSlide}
      />
    </div>
  );
}
