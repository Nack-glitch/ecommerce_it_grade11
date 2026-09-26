import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Smartphone,
  Truck,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShoppingBag,
  CreditCard
} from 'lucide-react';
import { audioManager } from '../utils/audio';

interface ProcessStep {
  stepNumber: string;
  timeSec: number;
  timestamp: string;
  title: string;
  actor: string;
  description: string;
  metric: string;
}

export const VideoJourneyView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentProgressSeconds, setCurrentProgressSeconds] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoDurationSec = 50;
  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-motorcyclist-riding-down-a-city-street-41584-large.mp4';
  const fallbackPoster = 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1600&q=80';

  const steps: ProcessStep[] = [
    {
      stepNumber: '01',
      timeSec: 0,
      timestamp: '00:00',
      title: 'Customer Orders & Pays with Telebirr',
      actor: 'Customer (Deliver Addis Mobile App / Web)',
      description: 'The buyer selects goods or food on Deliver Addis. Checkout completes in 3 seconds using an instant Telebirr QR scan or USSD payment approval.',
      metric: 'Instant digital ticket'
    },
    {
      stepNumber: '02',
      timeSec: 12,
      timestamp: '00:12',
      title: 'Merchant Prepares & Packs Sealed Order',
      actor: 'Merchant / Kitchen Partner in Addis',
      description: 'The local merchant receives the digital order ticket, inspects items, packs them into a thermal insulated bag, and applies a tamper-evident seal.',
      metric: '10-minute prep SLA'
    },
    {
      stepNumber: '03',
      timeSec: 25,
      timestamp: '00:25',
      title: 'Motorcycle Courier Dispatched via Landmark Call',
      actor: 'Deliver Addis Motorcycle Courier',
      description: 'The courier picks up the order and navigates city traffic, calling the customer ahead of time to coordinate near known landmarks (e.g. "Bole Medhanialem").',
      metric: 'Active phone routing'
    },
    {
      stepNumber: '04',
      timeSec: 38,
      timestamp: '00:38',
      title: 'Doorstep Handover & SMS Verification',
      actor: 'Customer Doorstep & Driver Mobile App',
      description: 'The courier arrives at the buyer’s gate. The customer checks the package seal, shares the 4-digit SMS OTP code, and the order is marked completed.',
      metric: 'Successful order verified'
    }
  ];

  const activeStepIndex = steps.reduce((acc, curr, idx) => {
    if (currentProgressSeconds >= curr.timeSec) return idx;
    return acc;
  }, 0);

  const activeStep = steps[activeStepIndex] || steps[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentProgressSeconds((prev) => {
          if (prev >= videoDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col justify-start space-y-2.5 pb-4">
      {/* Video Theater Screen */}
      <div className="relative w-full aspect-video max-h-[30vh] sm:max-h-[34vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl flex flex-col justify-between p-3.5 sm:p-4.5">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={fallbackPoster}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#ff5520]/25 via-red-950/25 to-black/80 mix-blend-multiply opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Top Header Inside Video */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest bg-black/70 text-white border border-white/20 backdrop-blur-md uppercase">
              DELIVER ADDIS · ETHIOPIA
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#ff5520] bg-[#ff5520]/15 border border-[#ff5520]/30 font-bold hidden sm:inline">
              SINGLE LOCAL COMPANY PROCESS
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 bg-black/70 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
            <span className="text-white font-bold">{formatSeconds(currentProgressSeconds)}</span>
            <span>/</span>
            <span>{formatSeconds(videoDurationSec)}</span>
          </div>
        </div>

        {/* Center Live Stage Telemetry */}
        <div className="relative z-10 my-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3">
          <div className="space-y-1 max-w-xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff5520] uppercase font-bold">
              <span>Step 0{activeStep.stepNumber} of 04</span>
              <span>·</span>
              <span>{activeStep.timestamp}</span>
              <span>·</span>
              <span className="text-zinc-300">{activeStep.actor}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              {activeStep.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-none">
              {activeStep.description}
            </p>
          </div>

          <div className="hidden sm:flex flex-col gap-1 shrink-0 bg-black/70 border border-white/15 p-2.5 rounded-xl backdrop-blur-xl">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Process Metric:</span>
            <span className="text-xs font-mono font-bold text-emerald-400">{activeStep.metric}</span>
          </div>
        </div>

        {/* Video Player Action Overlay on pause */}
        {!isPlaying && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
            <button
              onClick={() => {
                audioManager.playAction();
                setIsPlaying(true);
              }}
              className="group px-6 sm:px-7 py-3 rounded-full bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-extrabold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2.5 transition-all cursor-pointer shadow-xl shadow-[#ff5520]/40 transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>WATCH DELIVER ADDIS PROCESS VIDEO</span>
            </button>
          </div>
        )}

        {/* Bottom Playback scrub line */}
        <div className="relative z-10">
          <div
            className="w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              setCurrentProgressSeconds(Math.floor(ratio * videoDurationSec));
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#ff5520] to-[#ff6e3a] transition-all duration-200 shadow-[0_0_10px_rgba(255,85,32,0.8)]"
              style={{ width: `${(currentProgressSeconds / videoDurationSec) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Underneath: 4-Step Process Milestones */}
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-1.5 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[#ff5520] font-bold">PROCESS STEPS:</span>
            <span>Click any step to scrub video</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioManager.playTick();
                setIsPlaying(!isPlaying);
              }}
              className="px-2.5 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              onClick={() => {
                audioManager.playTick();
                setCurrentProgressSeconds(0);
              }}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
              title="Reset Video Timeline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {steps.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => {
                  audioManager.playTick();
                  setCurrentProgressSeconds(step.timeSec);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#ff5520]/15 border-[#ff5520] text-white ring-1 ring-[#ff5520]/40'
                    : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-mono text-[#ff5520] font-bold">{step.timestamp}</span>
                  <span className="text-[9px] font-mono text-zinc-500">Step 0{idx + 1}</span>
                </div>
                <div className="text-xs font-bold truncate text-white">{step.title}</div>
                <div className="text-[10px] text-zinc-400 truncate mt-0.5">{step.actor}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
