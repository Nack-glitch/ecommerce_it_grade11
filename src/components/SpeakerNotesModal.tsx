import React, { useState } from 'react';
import { X, Clock, Lightbulb, CheckSquare, Edit3 } from 'lucide-react';
import { SlideData } from '../data/slides';
import { audioManager } from '../utils/audio';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  slide: SlideData;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  slide,
}) => {
  const [personalNotes, setPersonalNotes] = useState<Record<number, string>>({});

  if (!isOpen) return null;

  const currentPersonalNote = personalNotes[slide.id] || '';

  const handlePersonalNoteChange = (text: string) => {
    setPersonalNotes((prev) => ({
      ...prev,
      [slide.id]: text,
    }));
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] md:w-[480px] bg-[#101014]/95 border-l border-white/10 shadow-2xl backdrop-blur-xl flex flex-col animate-slide-left">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-[#ff5520] uppercase tracking-wider block">
            Slide {slide.indexFormatted} · Presenter Mode
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Speaker Notes & Guide
          </h3>
        </div>
        <button
          onClick={() => {
            audioManager.playTick();
            onClose();
          }}
          className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close Notes"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Recommended Duration */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 text-zinc-400 text-xs">
            <Clock className="w-4 h-4 text-[#ff5520]" />
            <span>Target Duration</span>
          </div>
          <span className="text-xs font-mono font-bold text-white">
            {slide.speakerNotes.duration}
          </span>
        </div>

        {/* Key Talking Points */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider">
            <CheckSquare className="w-4 h-4 text-[#ff5520]" />
            <span>Key Talking Points</span>
          </div>
          <ul className="space-y-2.5">
            {slide.speakerNotes.keyPoints.map((point, idx) => (
              <li
                key={idx}
                className="text-xs text-zinc-300 bg-white/[0.02] p-3 rounded-lg border border-white/[0.04] leading-relaxed"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Presenter Tip */}
        <div className="p-4 rounded-xl bg-[#ff5520]/10 border border-[#ff5520]/25 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#ff5520] uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Delivery Tip</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed">
            {slide.speakerNotes.presenterTip}
          </p>
        </div>

        {/* Presenter Scratchpad */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
            <span>Presenter Scratchpad (Auto-saved)</span>
          </div>
          <textarea
            value={currentPersonalNote}
            onChange={(e) => handlePersonalNoteChange(e.target.value)}
            placeholder="Type private presenter notes or audience questions for this slide..."
            className="w-full h-28 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#ff5520] transition-colors resize-none font-sans"
          />
        </div>
      </div>

      {/* Footer shortcut */}
      <div className="p-4 border-t border-white/[0.06] bg-black/40 text-[11px] font-mono text-zinc-500 text-center">
        Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">S</kbd> to toggle notes at any time
      </div>
    </div>
  );
};
