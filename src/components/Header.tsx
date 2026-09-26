import React from 'react';
import { Maximize2, Minimize2, Menu, Volume2, VolumeX, MessageSquare, Timer, RotateCcw, GraduationCap } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface HeaderProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenOverview: () => void;
  onToggleNotes: () => void;
  isNotesOpen: boolean;
  elapsedSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoToCover: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isFullscreen,
  onToggleFullscreen,
  onOpenOverview,
  onToggleNotes,
  isNotesOpen,
  elapsedSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  soundEnabled,
  onToggleSound,
  onGoToCover,
}) => {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="relative z-30 flex items-center justify-between px-5 sm:px-10 py-3.5 sm:py-4 border-b border-white/[0.06] bg-[#08090b]/85 backdrop-blur-md">
      {/* Brand logo & School Name tag */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            audioManager.playTick();
            onGoToCover();
          }}
          className="group flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-[0.22em] text-white hover:text-[#ff5520] transition-colors uppercase select-none cursor-pointer"
          title="Go to Cover Slide"
        >
          <span>E-COMMERCE</span>
          <span className="text-[#ff5520] transition-transform group-hover:translate-x-0.5">·</span>
          <span className="text-zinc-400 font-mono text-[11px] hidden sm:inline">GRADE 11 IT</span>
        </button>

        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-zinc-400">
          <GraduationCap className="w-3 h-3 text-[#ff5520]" />
          <span className="truncate max-w-[220px]">IFA BORU BITE SPECIAL SEC.</span>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Presenter Timer */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full text-xs font-mono text-zinc-300">
          <button
            onClick={() => {
              audioManager.playTick();
              onToggleTimer();
            }}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title={isTimerRunning ? 'Pause presentation timer' : 'Start presentation timer'}
          >
            <Timer className={`w-3.5 h-3.5 ${isTimerRunning ? 'text-[#ff5520] animate-pulse' : 'text-zinc-400'}`} />
            <span>{formatTime(elapsedSeconds)}</span>
          </button>
          <button
            onClick={() => {
              audioManager.playTick();
              onResetTimer();
            }}
            className="hover:text-[#ff5520] transition-colors pl-1 border-l border-white/10 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Sound toggle */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
          title={soundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
          )}
        </button>

        {/* Speaker Notes Drawer toggle */}
        <button
          onClick={() => {
            audioManager.playTick();
            onToggleNotes();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
            isNotesOpen
              ? 'bg-[#ff5520]/15 border-[#ff5520] text-[#ff5520]'
              : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white'
          }`}
          title="Toggle Speaker Notes (Key: S)"
          aria-label="Speaker Notes"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#ff5520]" />
          <span className="hidden sm:inline">Notes</span>
        </button>

        {/* Fullscreen button */}
        <button
          onClick={() => {
            audioManager.playTick();
            onToggleFullscreen();
          }}
          className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen (Key: F / Esc)' : 'Enter Fullscreen (Key: F)'}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </button>

        {/* Menu / Overview button */}
        <button
          onClick={() => {
            audioManager.playTick();
            onOpenOverview();
          }}
          className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520]/50 text-zinc-300 hover:text-[#ff5520] transition-all cursor-pointer"
          title="All Presentation Slides Directory (Key: O or M)"
          aria-label="Slide Menu"
        >
          <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </header>
  );
};
