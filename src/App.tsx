import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESENTATION_SECTIONS } from './data/presentationData';
import { Header } from './components/Header';
import { PresentationBottomBar } from './components/PresentationBottomBar';
import { CinematicSlideContent } from './components/CinematicSlideContent';
import { PresentationOverviewModal } from './components/PresentationOverviewModal';
import { SpeakerNotesModal } from './components/SpeakerNotesModal';
import { SLIDES } from './data/slides';
import { audioManager } from './utils/audio';

export default function App() {
  // Total of 12 states (0: Opening, 1-11: Major sections)
  const TOTAL_PRESENTATION_SLIDES = PRESENTATION_SECTIONS.length; // 12 total (00 to 11)

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Presenter Elapsed Timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Handle Fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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

        case 'o':
        case 'O':
        case 'm':
        case 'M':
          e.preventDefault();
          setIsOverviewOpen((prev) => !prev);
          break;

        case 's':
        case 'S':
          e.preventDefault();
          setIsNotesOpen((prev) => !prev);
          break;

        case 'a':
        case 'A':
          e.preventDefault();
          setIsAutoPlay((prev) => !prev);
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    audioManager.enabled = nextVal;
    if (nextVal) {
      audioManager.playTick();
    }
  };

  // Provide speaker notes for the current section
  const currentNoteSlide = SLIDES[Math.min(currentSlideIndex, SLIDES.length - 1)] || SLIDES[0];

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-screen h-screen bg-[#0c0c0e] text-[#f0f0f2] flex flex-col justify-between overflow-hidden select-none bg-slide-grid"
    >
      {/* Top Header bar with CLICK → COMMERCE logo, Presenter timer, sound, notes & directory */}
      <Header
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenOverview={() => setIsOverviewOpen(true)}
        onToggleNotes={() => setIsNotesOpen((prev) => !prev)}
        isNotesOpen={isNotesOpen}
        elapsedSeconds={elapsedSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={() => setIsTimerRunning((prev) => !prev)}
        onResetTimer={() => setElapsedSeconds(0)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onGoToCover={() => handleSelectSlide(0)}
      />

      {/* Main Slide Presentation Stage with Smooth Motion Transition */}
      <main className="relative flex-1 w-full overflow-hidden flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, x: slideDirection === 'forward' ? 25 : -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection === 'forward' ? -25 : 25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
      </main>

      {/* Bottom Bar: Home button, 00-11 slide indicators, scrub timeline, and navigation controls */}
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

      {/* Presentation Overview Grid Modal (11 sections) */}
      <PresentationOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentIndex={currentSlideIndex}
        onSelectSlide={handleSelectSlide}
      />

      {/* Speaker Notes Drawer */}
      <SpeakerNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        slide={currentNoteSlide}
      />
    </div>
  );
}
