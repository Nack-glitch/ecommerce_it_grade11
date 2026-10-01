import React, { useState, useRef, useCallback } from 'react';
import {
  Play,
  RotateCcw,
  ExternalLink,
  Clock
} from 'lucide-react';
import { audioManager } from '../utils/audio';

interface ProcessStep {
  stepNumber: string;
  timeRange: string;
  timeSec: number;
  category: string;
  happening: string;
  purpose: string;
}

export const VideoJourneyView: React.FC = () => {
  const YOUTUBE_VIDEO_ID = '3BTwBtWNqYE';
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentStartSec, setCurrentStartSec] = useState<number>(0);

  // Exact 4 Process Milestones table requested by the user:
  const steps: ProcessStep[] = [
    {
      stepNumber: '01',
      timeRange: '00:00–00:15',
      timeSec: 0,
      category: '1. Introduction',
      happening: 'App/service is introduced',
      purpose: 'Shows the main idea'
    },
    {
      stepNumber: '02',
      timeRange: '00:15–00:40',
      timeSec: 15,
      category: '2. Ordering',
      happening: 'Customer selects items',
      purpose: 'Demonstrates ordering'
    },
    {
      stepNumber: '03',
      timeRange: '00:40–01:05',
      timeSec: 40,
      category: '3. Processing',
      happening: 'Order is sent to the restaurant',
      purpose: 'Shows the system working'
    },
    {
      stepNumber: '04',
      timeRange: '01:05–01:30',
      timeSec: 65,
      category: '4. Delivery',
      happening: 'Order is prepared/delivered',
      purpose: 'Shows the final step'
    }
  ];

  const activeStep = steps[activeStepIndex] || steps[0];

  // Fast seek via YouTube iframe API postMessage for sub-10ms jumping with zero reload
  const seekYouTubeTo = useCallback((seconds: number) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'seekTo',
            args: [seconds, true]
          }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }),
          '*'
        );
      } catch (err) {
        // Safe fallback
      }
    }
  }, []);

  const handleSelectStep = (idx: number) => {
    audioManager.playTick();
    const targetStep = steps[idx];
    setActiveStepIndex(idx);

    if (!hasStarted) {
      setCurrentStartSec(targetStep.timeSec);
      setHasStarted(true);
    } else {
      seekYouTubeTo(targetStep.timeSec);
    }
  };

  const handleStartPlayback = () => {
    audioManager.playAction();
    setCurrentStartSec(activeStep.timeSec);
    setHasStarted(true);
  };

  const handleRestartVideo = () => {
    audioManager.playTick();
    setActiveStepIndex(0);
    if (hasStarted) {
      seekYouTubeTo(0);
    } else {
      setCurrentStartSec(0);
      setHasStarted(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-1.5 sm:space-y-2">
      {/* Top Telemetry Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-mono font-black uppercase bg-[#ff5520]/20 text-[#ff5520] border border-[#ff5520]/40">
            {activeStep.category}
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white font-bold">{activeStep.happening}</span>
            <span className="text-zinc-500 hidden md:inline">·</span>
            <span className="text-emerald-400 font-medium hidden md:inline">
              Purpose: {activeStep.purpose}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-[#ff5520]" />
            <span className="font-bold text-white">{activeStep.timeRange}</span>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors"
            title="Open on YouTube"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3 h-3 text-[#ff5520]" />
          </a>
        </div>
      </div>

      {/* Fast YouTube Video Theater Stage (Calibrated Height so Nothing is Cut) */}
      <div className="relative w-full h-[180px] sm:h-[210px] md:h-[240px] max-h-[30vh] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-xl shrink-0">
        {hasStarted ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&enablejsapi=1&start=${currentStartSec}&rel=0&modestbranding=1&playsinline=1`}
            title="Deliver Addis Process Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="eager"
            className="w-full h-full border-0"
          />
        ) : (
          /* Instant Fast-Launch Poster */
          <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-4">
            <img
              src={`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
              alt="Deliver Addis Video Poster"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-black tracking-wider bg-black/80 text-white border border-white/20 backdrop-blur-md uppercase">
                DELIVER ADDIS · ETHIOPIA
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#ff5520] bg-[#ff5520]/20 border border-[#ff5520]/40 font-black">
                4 PROCESS MILESTONES
              </span>
            </div>

            <div className="relative z-10 my-auto text-center space-y-1.5">
              <button
                onClick={handleStartPlayback}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xl shadow-[#ff5520]/50 transform hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>CLICK TO PLAY VIDEO IMMEDIATELY</span>
              </button>
              <p className="text-[11px] sm:text-xs text-zinc-200 font-medium">
                Click above or choose any step below to jump to that timestamp
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-300">
              <span>Ready at Step 01 ({steps[0].timeRange})</span>
              <span>Fast Stream Enabled</span>
            </div>
          </div>
        )}
      </div>

      {/* 4 Interactive Process Steps (Exact Table from User) */}
      <div className="space-y-1 shrink-0">
        <div className="flex items-center justify-between text-xs text-zinc-300 font-mono px-0.5 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="text-[#ff5520] font-black">PROCESS STEPS:</span>
            <span className="hidden sm:inline text-zinc-400">00:00 Introduction · 00:15 Ordering · 00:40 Processing · 01:05 Delivery</span>
          </div>

          <button
            onClick={handleRestartVideo}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/15 text-white font-mono text-[11px] cursor-pointer transition-colors"
            title="Restart video from beginning"
          >
            <RotateCcw className="w-3 h-3 text-[#ff5520]" />
            <span>Restart (00:00)</span>
          </button>
        </div>

        {/* 4 Responsive Cards Matching the User's Exact 4-Column Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {steps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => handleSelectStep(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#ff5520]/20 border-[#ff5520] ring-2 ring-[#ff5520]/50 shadow-md shadow-[#ff5520]/20'
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-black text-[#ff5520]">
                      {step.timeRange}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-white/10 px-1.5 py-0.2 rounded font-bold">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#ff5520] transition-colors truncate">
                    {step.category}
                  </h4>

                  <p className="text-[11px] text-zinc-200 mt-0.5 font-medium line-clamp-1">
                    {step.happening}
                  </p>
                </div>

                <div className="mt-2 pt-1 border-t border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-emerald-400 font-bold truncate">
                  Purpose: <span className="text-zinc-300 font-normal">{step.purpose}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
