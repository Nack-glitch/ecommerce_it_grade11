import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ShoppingCart,
  ShieldCheck,
  Box,
  Truck,
  Layers,
  Database,
  Globe,
  Smartphone,
  CreditCard,
  Lock,
  Cpu,
  RefreshCw,
  Store,
  Clock,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Zap,
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { SlideData } from '../data/slides';
import { audioManager } from '../utils/audio';

interface SlideContentProps {
  slide: SlideData;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
}

export const SlideContent: React.FC<SlideContentProps> = ({
  slide,
  onNext,
  onSelectSlide,
}) => {
  // State for interactive features in individual slides
  const [selectedEcosystemStep, setSelectedEcosystemStep] = useState<number>(0);
  const [selectedRegion, setSelectedRegion] = useState<'global' | 'apac' | 'na' | 'eu' | 'latam'>('global');
  const [selectedModel, setSelectedModel] = useState<number>(0);
  const [architectureMode, setArchitectureMode] = useState<'composable' | 'monolith'>('composable');
  const [simulatingPayment, setSimulatingPayment] = useState<boolean>(false);
  const [paymentStep, setPaymentStep] = useState<number>(4);
  const [latencySlider, setLatencySlider] = useState<number>(180); // ms
  const [selectedAiPrompt, setSelectedAiPrompt] = useState<string>("Waterproof breathable trail jacket under $180");
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);
  const [activeOmniTouchpoint, setActiveOmniTouchpoint] = useState<number>(0);

  // Trigger simulated payment flow
  const handleSimulatePayment = () => {
    audioManager.playAction();
    setSimulatingPayment(true);
    setPaymentStep(0);
    const intervals = [100, 300, 500, 750];
    intervals.forEach((delay, idx) => {
      setTimeout(() => {
        setPaymentStep(idx + 1);
        if (idx === intervals.length - 1) {
          setSimulatingPayment(false);
        }
      }, delay);
    });
  };

  // Trigger simulated AI prompt parser
  const handleRunAiPrompt = (prompt: string) => {
    audioManager.playAction();
    setSelectedAiPrompt(prompt);
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
    }, 450);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-8 md:py-12 overflow-y-auto">
      {/* Slide Badge matching screenshot: 00 — INTRODUCTION */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 sm:mb-6"
      >
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-zinc-400 uppercase">
          <span>{slide.badge}</span>
        </div>
      </motion.div>

      {/* Main Slide Content Based on Slide ID */}
      {slide.id === 1 ? (
        /* SLIDE 1: EXACT MATCH TO USER'S UPLOADED SCREENSHOT */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl space-y-6 sm:space-y-8"
        >
          {/* Display Title: E-COMMERCE */}
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight select-none">
              <span className="text-white">{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>

            {/* Subtle accent line under title matching image */}
            <div className="relative mt-3 sm:mt-4 w-full max-w-md h-[1px] bg-gradient-to-r from-[#ff5520]/40 via-white/10 to-transparent">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#ff5520]" />
            </div>
          </div>

          {/* Subtitle & Paragraph */}
          <div className="max-w-2xl space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
              {slide.subtitle}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {slide.description}
            </p>
          </div>

          {/* Tags Pills matching image: DIGITAL ECONOMY, INTERACTIVE PRESENTATION, 2026 */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {slide.tags.map((tag, idx) => (
              <span
                key={tag}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border ${
                  idx === 0
                    ? 'border-[#ff5520]/60 text-[#ff5520] bg-[#ff5520]/5'
                    : 'border-white/10 text-zinc-300 bg-white/[0.03]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button: ENTER PRESENTATION → matching image */}
          <div className="pt-4">
            <button
              onClick={() => {
                audioManager.playAction();
                onNext();
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff5520] hover:bg-[#ff6736] text-[#0c0c0e] font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#ff5520]/20 hover:shadow-[#ff5520]/35 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{slide.ctaText || 'ENTER PRESENTATION'}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      ) : slide.id === 2 ? (
        /* SLIDE 2: THE UNIFIED VALUE CHAIN (INTERACTIVE 5-NODE ARCHITECTURE) */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          {/* 5-Node Interactive Chain */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
            {slide.details?.steps?.map((step, idx) => {
              const isSelected = selectedEcosystemStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    audioManager.playTick();
                    setSelectedEcosystemStep(idx);
                  }}
                  className={`group text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-white/[0.07] border-[#ff5520] ring-1 ring-[#ff5520]/40'
                      : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#ff5520]">0{idx + 1}</span>
                    <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded">
                      {step.latency}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#ff5520] transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{step.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Detailed inspection pane for selected node */}
          {slide.details?.steps && (
            <motion.div
              key={selectedEcosystemStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.1] backdrop-blur-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#ff5520] uppercase tracking-wider">
                    Node Focus · Step 0{selectedEcosystemStep + 1}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1">
                    {slide.details.steps[selectedEcosystemStep].title}
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-zinc-400 block">SLA Target</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      {slide.details.steps[selectedEcosystemStep].latency}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed max-w-3xl">
                {slide.details.steps[selectedEcosystemStep].desc}
              </p>
            </motion.div>
          )}
        </div>
      ) : slide.id === 3 ? (
        /* SLIDE 3: GLOBAL SCALE & MACROECONOMICS */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'global', label: 'Worldwide Global' },
                { id: 'apac', label: 'Asia-Pacific ($3.6T)' },
                { id: 'na', label: 'North America ($1.5T)' },
                { id: 'eu', label: 'Western Europe ($890B)' },
                { id: 'latam', label: 'Latin America (Fastest Growth +22%)' }
              ] as const
            ).map((region) => (
              <button
                key={region.id}
                onClick={() => {
                  audioManager.playTick();
                  setSelectedRegion(region.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedRegion === region.id
                    ? 'bg-[#ff5520] text-black font-bold shadow-md shadow-[#ff5520]/20'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {slide.details?.stats?.map((stat, idx) => {
              // Custom adjustment based on selected region
              let displayVal = stat.value;
              let changeVal = stat.change;
              if (selectedRegion === 'apac') {
                if (idx === 0) displayVal = '$3.64T';
                if (idx === 1) displayVal = '81.2%';
              } else if (selectedRegion === 'na') {
                if (idx === 0) displayVal = '$1.52T';
                if (idx === 1) displayVal = '64.5%';
              } else if (selectedRegion === 'latam') {
                if (idx === 0) displayVal = '$210B';
                if (idx === 1) displayVal = '76.1%';
                changeVal = '+22.4% YoY';
              }

              return (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">{stat.label}</span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {changeVal}
                    </span>
                  </div>
                  <div className="my-4">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                      {displayVal}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{stat.hint}</p>
                </div>
              );
            })}
          </div>

          {/* Context Banner */}
          <div className="p-4 rounded-xl bg-[#ff5520]/10 border border-[#ff5520]/20 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-[#ff5520] shrink-0" />
            <p className="text-xs sm:text-sm text-zinc-300">
              <strong className="text-white font-semibold">Tipping Point:</strong> Over 21% of all global retail sales now occur through digital channels, with mobile wallets replacing credit cards as the default medium of exchange.
            </p>
          </div>
        </div>
      ) : slide.id === 4 ? (
        /* SLIDE 4: COMMERCIAL ARCHETYPES (B2C, B2B, D2C, MARKETPLACES) */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          {/* Archetype Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {slide.details?.comparison?.map((comp, idx) => (
              <button
                key={comp.name}
                onClick={() => {
                  audioManager.playTick();
                  setSelectedModel(idx);
                }}
                className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedModel === idx
                    ? 'bg-white/[0.08] border-[#ff5520] text-white'
                    : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white'
                }`}
              >
                <span className="text-[10px] font-mono text-[#ff5520] block uppercase">{comp.tag}</span>
                <span className="text-sm font-bold block mt-1">{comp.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Model Deep Dive */}
          {slide.details?.comparison && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {slide.details.comparison[selectedModel].name}
                  </h3>
                  <span className="text-xs text-[#ff5520] font-mono">
                    Category Archetype · {slide.details.comparison[selectedModel].tag}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center sm:text-right">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">Avg Order Value</span>
                    <span className="text-sm sm:text-base font-bold text-white font-mono">
                      {slide.details.comparison[selectedModel].aov}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">Typical CAC</span>
                    <span className="text-sm sm:text-base font-bold text-zinc-300 font-mono">
                      {slide.details.comparison[selectedModel].cac}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">Gross Margins</span>
                    <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
                      {slide.details.comparison[selectedModel].margins}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Primary Advantage
                  </span>
                  <p className="text-sm text-zinc-200">
                    {slide.details.comparison[selectedModel].strength}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/20">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Operational Vulnerability
                  </span>
                  <p className="text-sm text-zinc-200">
                    {slide.details.comparison[selectedModel].challenge}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : slide.id === 5 ? (
        /* SLIDE 5: TECH STACK (HEADLESS & COMPOSABLE MACH) */
        <div className="max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
                <span>{slide.titlePrefix}</span>
                <span className="text-[#ff5520]">{slide.titleAccent}</span>
              </h1>
              <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
            </div>

            {/* Toggle Architecture Mode */}
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-full shrink-0">
              <button
                onClick={() => {
                  audioManager.playTick();
                  setArchitectureMode('composable');
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  architectureMode === 'composable'
                    ? 'bg-[#ff5520] text-black shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Composable (MACH)
              </button>
              <button
                onClick={() => {
                  audioManager.playTick();
                  setArchitectureMode('monolith');
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  architectureMode === 'monolith'
                    ? 'bg-zinc-700 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monolithic Legacy
              </button>
            </div>
          </div>

          {/* Architecture Visual Layers */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4">
            {architectureMode === 'composable' ? (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#ff5520] uppercase font-bold block">
                      Presentation Layer (Decoupled Frontends)
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Next.js / Vite SPA / React Native Mobile / In-Store Smart Displays
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-white/[0.06] px-2.5 py-1 rounded-full">
                    Edge CDN Cached
                  </span>
                </div>

                <div className="text-center text-zinc-500 font-mono text-xs">↕ GraphQL / REST API Orchestration Gateway ↕</div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-[#ff5520]/10 border border-[#ff5520]/30">
                    <span className="text-xs font-bold text-[#ff5520] block">Commerce Engine</span>
                    <p className="text-xs text-zinc-300 mt-1">Shopify / Commercelayer / medusa</p>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                    <span className="text-xs font-bold text-cyan-400 block">Search & Vector</span>
                    <p className="text-xs text-zinc-300 mt-1">Algolia / Meilisearch / Pinecone</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                    <span className="text-xs font-bold text-purple-400 block">Headless CMS</span>
                    <p className="text-xs text-zinc-300 mt-1">Sanity / Strapi / Contentful</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="text-xs font-bold text-emerald-400 block">Payment Rail</span>
                    <p className="text-xs text-zinc-300 mt-1">Stripe / Adyen / Checkout.com</p>
                  </div>
                </div>

                <div className="text-center text-zinc-500 font-mono text-xs">↕ Unified Event Bus & Database ↕</div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>PostgreSQL (Transactional Store) + Redis (Session Cache)</span>
                  <span className="text-emerald-400">Zero Single Point of Failure</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-8 rounded-xl bg-zinc-800/50 border border-zinc-700 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Monolithic Suite (Coupled Backend + Frontend)</h4>
                  <p className="text-xs text-zinc-400 max-w-lg mx-auto">
                    All logic (templates, checkout, inventory, database tables) packaged into a single codebase. A slow query can bring down the entire storefront, and simple visual tweaks require full site rebuilds and redeployments.
                  </p>
                  <div className="flex justify-center gap-4 text-xs font-mono text-zinc-500 pt-2">
                    <span>Deploy time: 45+ mins</span>
                    <span>·</span>
                    <span>High blast radius</span>
                    <span>·</span>
                    <span>Vendor lock-in</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : slide.id === 6 ? (
        /* SLIDE 6: PAYMENT REVOLUTION (ZERO-CLICK & 3D SECURE) */
        <div className="max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
                <span>{slide.titlePrefix}</span>
                <span className="text-[#ff5520]">{slide.titleAccent}</span>
              </h1>
              <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
            </div>

            <button
              onClick={handleSimulatePayment}
              disabled={simulatingPayment}
              className="px-5 py-2.5 rounded-full bg-[#ff5520] hover:bg-[#ff6838] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>{simulatingPayment ? 'Authorizing...' : 'Simulate 1-Click Pay'}</span>
            </button>
          </div>

          {/* Interactive Simulation Timeline */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-[#ff5520] uppercase font-bold">
                Transaction Trace: Apple Pay Biometric Tap
              </span>
              <span className="text-xs font-mono text-zinc-400">Total Latency: 382ms</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { title: '1. Device Biometrics', detail: 'FaceID / TouchID enclave generates cryptographic cryptogram', time: '12ms', done: paymentStep >= 1 },
                { title: '2. Network Tokenization', detail: 'Card network converts token to secure payment credential', time: '85ms', done: paymentStep >= 2 },
                { title: '3. Real-Time Risk Score', detail: 'ML model scores behavioral telemetry & device fingerprint', time: '110ms', done: paymentStep >= 3 },
                { title: '4. Issuing Bank Settlement', detail: 'Funds provisionally captured & 3D Secure 2.3 authorized', time: '175ms', done: paymentStep >= 4 }
              ].map((step, idx) => (
                <div
                  key={step.title}
                  className={`p-4 rounded-xl border transition-all ${
                    step.done
                      ? 'bg-emerald-500/[0.06] border-emerald-500/30 text-white'
                      : 'bg-white/[0.01] border-white/[0.04] text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-emerald-400">Step 0{idx + 1}</span>
                    <span className="text-[11px] font-mono text-zinc-400">{step.time}</span>
                  </div>
                  <h5 className="text-xs font-bold leading-tight">{step.title}</h5>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{step.detail}</p>
                </div>
              ))}
            </div>

            {/* Bottom Insight */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero raw 16-digit card numbers touched server memory. PCI Scope reduced by 99%.</span>
            </div>
          </div>
        </div>
      ) : slide.id === 7 ? (
        /* SLIDE 7: LOGISTICS & SUPPLY CHAIN VELOCITY */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <Box className="w-7 h-7 text-[#ff5520]" />
              <h3 className="text-lg font-bold text-white">Predictive Staging</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Machine learning forecasts regional demand spikes and pre-routes inventory to localized suburban fulfillment centers before customers place orders.
              </p>
              <div className="text-xs font-mono text-[#ff5520] pt-2">Transit reduction: -36h</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <Cpu className="w-7 h-7 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Robotic Sortation (AGV)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Autonomous guided vehicles and robotic pick arms achieve 99.98% inventory accuracy, cutting pick-to-pack warehouse cycles from hours to under 12 minutes.
              </p>
              <div className="text-xs font-mono text-cyan-400 pt-2">Cycle time: 11.4 mins</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <Truck className="w-7 h-7 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Dynamic Carrier Routing</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Real-time rate shopping algorithms dispatch between national postal carriers, regional couriers, and on-demand gig drivers based on congestion and weather.
              </p>
              <div className="text-xs font-mono text-emerald-400 pt-2">Shipping savings: 14.8%</div>
            </div>
          </div>
        </div>
      ) : slide.id === 8 ? (
        /* SLIDE 8: AI & AGENTIC COMMERCE */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          {/* Interactive AI Agent Simulator */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-[#ff5520] uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autonomous Natural Language Buyer Agent</span>
              </span>
              <span className="text-xs font-mono text-zinc-400">Vector Similarity: 0.942</span>
            </div>

            {/* Prompt pills to test */}
            <div className="flex flex-wrap gap-2">
              {[
                "Waterproof breathable trail jacket under $180",
                "Ergonomic mechanical keyboard for Mac with silent switches",
                "Artisan whole-bean espresso with dark roast notes"
              ].map((sample) => (
                <button
                  key={sample}
                  onClick={() => handleRunAiPrompt(sample)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedAiPrompt === sample
                      ? 'bg-[#ff5520] text-black font-semibold'
                      : 'bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  "{sample}"
                </button>
              ))}
            </div>

            {/* Resolved AI Intent Card */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Semantic Intent Extracted:</span>
                <span className="text-emerald-400 font-bold">Ready to Bundle</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Category Filter</span>
                  <span className="text-xs font-bold text-white">Outerwear / Technical Trail</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Price Ceiling</span>
                  <span className="text-xs font-bold text-[#ff5520]">&lt; $180 USD</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Attributes</span>
                  <span className="text-xs font-bold text-white">Waterproof, Breathable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : slide.id === 9 ? (
        /* SLIDE 9: OMNICHANNEL & HYBRID RETAIL */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              {
                title: "BOPIS & Curbside",
                desc: "Buy Online, Pick Up In Store within 2 hours. Converts 38% into add-on physical basket purchases.",
                icon: Store
              },
              {
                title: "Endless Aisle",
                desc: "Store associates order missing sizes directly to the customer's home using in-store checkout tablets.",
                icon: Layers
              },
              {
                title: "Unified Identity",
                desc: "Single customer profile synchronizes online wishlists, in-store fitting room visits, and loyalty tiers.",
                icon: RefreshCw
              },
              {
                title: "Reverse Drop-Off",
                desc: "Zero-box return drop-offs in physical retail stores cutting return processing expenses by up to 60%.",
                icon: Box
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520]/40 transition-all space-y-3"
                >
                  <Icon className="w-6 h-6 text-[#ff5520]" />
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : slide.id === 10 ? (
        /* SLIDE 10: CONVERSION SCIENCE & LATENCY */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#ff5520] uppercase font-bold">
                  Latency ROI Calculator (Annual Store GMV: $50M)
                </span>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Drag the slider to calculate revenue unlocked by frontend speed optimization.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  +${((500 - latencySlider) * 1250).toLocaleString()} / yr
                </span>
                <span className="text-[11px] text-zinc-500 block font-mono">Estimated Revenue Lift</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>Fast Edge (100ms)</span>
                <span className="text-white font-bold">{latencySlider}ms LCP</span>
                <span>Sluggish Monolith (500ms)</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                value={latencySlider}
                onChange={(e) => setLatencySlider(Number(e.target.value))}
                className="w-full accent-[#ff5520] cursor-pointer"
              />
            </div>

            {/* Funnel Dropoff Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-zinc-500 font-mono block">Top Drop-off Reason</span>
                <span className="font-bold text-white text-sm mt-1 block">48% Hidden Shipping Fees</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-zinc-500 font-mono block">Second Leak Point</span>
                <span className="font-bold text-white text-sm mt-1 block">24% Forced Account Sign-Up</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-zinc-500 font-mono block">Third Leak Point</span>
                <span className="font-bold text-white text-sm mt-1 block">18% Complicated Multi-Step Form</span>
              </div>
            </div>
          </div>
        </div>
      ) : slide.id === 11 ? (
        /* SLIDE 11: TRUST & CYBERSECURITY */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              {
                title: "PCI-DSS 4.0 Compliance",
                desc: "Strict client-side script telemetry to prevent digital skimming (Magecart) attacks on checkout forms.",
                metric: "Zero Card Leaks"
              },
              {
                title: "Bot Mitigation & WAF",
                desc: "Invisible CAPTCHA-less fingerprinting stopping credential stuffing and scraping without annoying human buyers.",
                metric: "Sub-20ms Interception"
              },
              {
                title: "Account Takeover (ATO) Shield",
                desc: "Continuous behavioral anomaly detection flagging sudden shipping address and device alterations.",
                metric: "99.4% Precision"
              },
              {
                title: "Chargeback & Friendly Fraud ML",
                desc: "Automated dispute package generation and pre-arbitration representations recovering merchant capital.",
                metric: "+62% Win Rate"
              }
            ].map((sec) => (
              <div
                key={sec.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#ff5520] uppercase font-bold">{sec.metric}</span>
                    <Lock className="w-4 h-4 text-zinc-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{sec.title}</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{sec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : slide.id === 12 ? (
        /* SLIDE 12: HORIZONS 2026+ */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              {
                title: "Machine-to-Machine",
                sub: "Autonomous IoT Trade",
                desc: "Smart appliances and enterprise sensors placing authenticated micro-orders without human intervention."
              },
              {
                title: "Spatial Computing",
                sub: "Apple Vision Pro & WebXR",
                desc: "Photorealistic 3D interactive models enabling true-to-scale living room placement and tactile apparel preview."
              },
              {
                title: "Circular Re-Commerce",
                sub: "Embedded Lifecycle Tags",
                desc: "Instant verified trade-ins, certified refurbished resale, and recycling provenance passports."
              },
              {
                title: "Autonomous Delivery",
                sub: "Sub-30 Min Dispatches",
                desc: "FAA-approved suburban drone routes and pavement sidewalk rovers eliminating driver parking bottlenecks."
              }
            ].map((trend) => (
              <div
                key={trend.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520] transition-all space-y-3"
              >
                <span className="text-[10px] font-mono text-[#ff5520] uppercase block">{trend.sub}</span>
                <h3 className="text-base font-bold text-white">{trend.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{trend.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SLIDE 13: STRATEGIC IMPERATIVES & PLAYBOOK */
        <div className="max-w-6xl space-y-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              <span>{slide.titlePrefix}</span>
              <span className="text-[#ff5520]">{slide.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl">{slide.subtitle}</p>
          </div>

          {/* 4 Pillars Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {slide.details?.takeaways?.map((takeaway, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#ff5520]/15 border border-[#ff5520]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-mono font-bold text-[#ff5520]">0{idx + 1}</span>
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                audioManager.playAction();
                onSelectSlide(0);
              }}
              className="px-6 py-3.5 rounded-full bg-[#ff5520] hover:bg-[#ff6838] text-black font-bold text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#ff5520]/20"
            >
              Restart Presentation ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
