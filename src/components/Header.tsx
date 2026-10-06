import React from 'react';
import {
  Maximize2,
  Minimize2,
  Menu,
  Volume2,
  VolumeX,
  GraduationCap,
  ZoomIn,
  ZoomOut,
  ExternalLink
} from 'lucide-react';
import { audioManager } from '../utils/audio';

interface HeaderProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenOverview: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoToCover: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isFullscreen,
  onToggleFullscreen,
  onOpenOverview,
  soundEnabled,
  onToggleSound,
  onGoToCover,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  return (
    <header className="relative z-30 flex items-center justify-between px-5 sm:px-10 py-3 sm:py-3.5 border-b border-white/[0.06] bg-[#08090b]/85 backdrop-blur-md">
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

      {/* Control Actions: Functional Zoom In/Out, Sound, Fullscreen, Menu */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Functional Zoom In / Out & Reset */}
        <div className="flex items-center bg-white/[0.03] border border-white/[0.08] hover:border-white/20 rounded-full p-0.5 transition-colors">
          <button
            onClick={() => {
              audioManager.playTick();
              onZoomOut();
            }}
            disabled={zoomLevel <= 70}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Zoom Out (reduces slide scale)"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              audioManager.playTick();
              onResetZoom();
            }}
            className="px-2 py-0.5 text-xs font-mono font-bold text-zinc-300 hover:text-[#ff5520] transition-colors cursor-pointer"
            title="Reset Zoom to 100%"
            aria-label="Reset Zoom"
          >
            {zoomLevel}%
          </button>

          <button
            onClick={() => {
              audioManager.playTick();
              onZoomIn();
            }}
            disabled={zoomLevel >= 150}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Zoom In (magnifies slide scale)"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
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

        {/* Fullscreen button */}
        <button
          onClick={() => {
            audioManager.playTick();
            onToggleFullscreen();
          }}
          className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer ${
            isFullscreen
              ? 'bg-[#ff5520] border-[#ff5520] text-white shadow-lg shadow-[#ff5520]/25'
              : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white'
          }`}
          title={isFullscreen ? 'Exit Fullscreen (Key: F / Esc)' : 'Enter Fullscreen (Key: F)'}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </button>

        {/* Open in Dedicated Browser Tab (Projector Mode) */}
        <a
          href={window.location.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:p-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520]/50 text-zinc-300 hover:text-[#ff5520] transition-all cursor-pointer hidden md:flex items-center"
          title="Open in Full Browser Tab (Best for school projector & presentation displays)"
          aria-label="Open in Full Tab"
        >
          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>

        {/* Menu / Overview button */}
        <button
          onClick={() => {
            audioManager.playTick();
            onOpenOverview();
          }}
          className="px-2.5 sm:px-3 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-[#ff5520] hover:bg-white/[0.08] text-white hover:text-[#ff5520] transition-all cursor-pointer flex items-center gap-1.5 font-mono font-black text-xs uppercase shadow-sm"
          title="All Presentation Slides Directory (Key: O or M)"
          aria-label="Slide Menu"
        >
          <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff5520] stroke-[2.5]" />
          <span className="hidden sm:inline">MENU</span>
        </button>
      </div>
    </header>
  );
};
