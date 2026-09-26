import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Lock,
  Search,
  ShoppingCart,
  DollarSign,
  Maximize2,
  RefreshCw,
  PackageCheck,
  Store,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Clock,
  ArrowDown,
  User,
  Users,
  Building,
  GraduationCap,
  Award,
  Heart,
  RotateCcw,
  Home
} from 'lucide-react';
import { audioManager } from '../utils/audio';
import { AppliedDemoView } from './AppliedDemoView';
import { VideoJourneyView } from './VideoJourneyView';
import { EthiopiaSectionView } from './EthiopiaSectionView';
import { DEFAULT_STUDENTS, StudentCredit } from '../data/presentationData';

interface CinematicSlideProps {
  slideId: number; // 0 to 12
  onEnterPresentation: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
}

export const CinematicSlideContent: React.FC<CinematicSlideProps> = ({
  slideId,
  onEnterPresentation,
  onNext,
  onSelectSlide,
}) => {
  // State for interactive features in individual slides
  const [selectedPillarType, setSelectedPillarType] = useState<number>(0);
  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(0);
  const [selectedAdvantageCategory, setSelectedAdvantageCategory] = useState<'customer' | 'business' | 'economy'>('customer');
  const [activeChallengeRisk, setActiveChallengeRisk] = useState<number>(0);
  const [selectedComponent, setSelectedComponent] = useState<number>(0);

  // Group Members state (editable directly by students in UI)
  const [students, setStudents] = useState<StudentCredit[]>(DEFAULT_STUDENTS);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Always reset scroll to the top when navigating to any slide
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [slideId]);

  const handleUpdateStudent = (id: number, field: 'name' | 'rollNumber' | 'role', val: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full h-full flex flex-col justify-start items-center px-3 sm:px-6 md:px-10 lg:px-14 py-2 sm:py-3 overflow-y-auto"
    >
      {/* =========================================================================
          SLIDE 00: OPENING SCREEN (WITH PROMINENT SCHOOL NAME & ORANGE-RED ACCENT)
          ========================================================================= */}
      {slideId === 0 && (
        <div className="relative max-w-5xl mx-auto w-full space-y-6 sm:space-y-7 my-auto">
          {/* Subtle ambient floating nodes in energetic orange / red */}
          <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-[#ff5520]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

          {/* Section Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5520] animate-ping" />
            <span className="text-xs sm:text-sm font-mono tracking-[0.28em] text-zinc-400 uppercase">
              GRADE 11 INFORMATION TECHNOLOGY · UNIT 1.3.4
            </span>
          </motion.div>

          {/* Large Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.92] select-none">
              <span className="text-white">E-</span>
              <span className="text-[#ff5520]">COMMERCE</span>
            </h1>
            <div className="w-28 h-1 bg-gradient-to-r from-[#ff5520] to-transparent rounded-full shadow-[0_0_8px_rgba(255,85,32,0.6)]" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-200 tracking-tight pt-1">
              Electronic Commerce
            </h2>
          </motion.div>

          {/* School Name Prominently Displayed Below Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#ff5520]/10 border border-[#ff5520]/30 text-white backdrop-blur-md shadow-lg shadow-[#ff5520]/5"
          >
            <GraduationCap className="w-4 h-4 text-[#ff5520]" />
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase font-mono text-[#ff5520]">
              IFA BORU BITE SPECIAL SECONDARY SCHOOL
            </span>
          </motion.div>

          {/* Narrative text from prompt */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light"
          >
            A modern presentation about how technology transformed buying, selling, payments, logistics, and digital business.
          </motion.p>

          {/* Abstract elegant network badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1"
          >
            {[
              { label: 'Shopping', icon: ShoppingCart },
              { label: 'Payments', icon: DollarSign },
              { label: 'Logistics', icon: Truck },
              { label: 'Digital Networks', icon: Globe },
              { label: 'Mobile Commerce', icon: Sparkles }
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.label}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-[#ff5520]" />
                  <span className="text-xs font-mono text-zinc-300 truncate">{pillar.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* ENTER PRESENTATION BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-2"
          >
            <button
              onClick={() => {
                audioManager.playAction();
                onEnterPresentation();
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 shadow-xl shadow-[#ff5520]/30 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>ENTER PRESENTATION</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 01: DEFINITION — WHAT IS E-COMMERCE? (INCLUDES SCHOOL NAME)
          ========================================================================= */}
      {slideId === 1 && (
        <div className="max-w-6xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
            <div>
              <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase">
                SLIDE 01 — DEFINITION
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                What is E-Commerce?
              </h2>
            </div>
            {/* School Name on Slide 01 */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-[#ff5520]/40 text-[#ff5520] text-xs font-mono font-bold">
              <GraduationCap className="w-4 h-4 shrink-0 text-[#ff5520]" />
              <span>IFA BORU BITE SPECIAL SECONDARY SCHOOL</span>
            </div>
          </div>

          {/* Large Definition Statement from Textbook */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ff5520]" />
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white leading-snug">
              “E-commerce is the buying and selling of goods and services over the Internet.”
            </p>
            <span className="block mt-2 text-xs font-mono text-zinc-400">
              Grade 11 IT Textbook · Unit 1.3.4 Foundational Principle
            </span>
          </div>

          {/* Visual Ecosystem Flow */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              The Digital Ecosystem Value Chain:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {[
                { title: 'CUSTOMER', sub: 'Intent & Search' },
                { title: 'DIGITAL STOREFRONT', sub: 'Web, App & Social' },
                { title: 'PAYMENT', sub: 'Auth & Mobile Rail' },
                { title: 'ORDER SYSTEM', sub: 'Routing & Inventory' },
                { title: 'LOGISTICS', sub: 'WMS & Transporter' },
                { title: 'DELIVERY', sub: 'Doorstep Handover' }
              ].map((step, idx) => (
                <div
                  key={step.title}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#ff5520]">0{idx + 1}</span>
                    <span className="text-zinc-600 text-xs">→</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{step.title}</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Decade Timeline */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              Historical Evolution of E-Commerce:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {[
                { era: '1960s–70s', tech: 'EDI (Electronic Data Interchange)', desc: 'Standardized enterprise document transfer' },
                { era: '1990s', tech: 'World Wide Web', desc: 'Netscape SSL, early Amazon & eBay catalogs' },
                { era: '2000s', tech: 'Search + Social', desc: 'Google AdWords, targeted PPC & PayPal rails' },
                { era: '2010s', tech: 'Mobile + Cloud', desc: '4G smartphones, Apple Pay & AWS scalability' },
                { era: '2020s+', tech: 'AI + Omnichannel', desc: 'Agentic shopping, Telebirr & instant delivery' }
              ].map((timeline) => (
                <div key={timeline.era} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-xs font-mono font-bold text-[#ff5520] block">{timeline.era}</span>
                  <span className="text-xs font-bold text-white mt-1 block">{timeline.tech}</span>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{timeline.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 02: COMPONENTS — BASED ON FIGURE 1.14
          ========================================================================= */}
      {slideId === 2 && (
        <div className="max-w-6xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
            <div>
              <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase">
                SLIDE 02 — COMPONENTS (FIGURE 1.14)
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                The Ecosystem of E-Commerce
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-[#ff5520] bg-[#ff5520]/10 border border-[#ff5520]/30 font-bold">
              Grade 11 IT · Figure 1.14
            </span>
          </div>

          {/* Visual Interactive Diagram: 4 Essential Components from Textbook */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
            {[
              {
                id: 0,
                title: "Merchant",
                sub: "Sells Products & Services",
                icon: Store,
                color: "text-[#ff5520]",
                tag: "SMEs & Large Businesses",
                desc: "The seller offering tangible goods, digital products, or services. Textbook emphasis: small and medium enterprises (SMEs) can bypass costly physical store rent and sell directly to customers nationwide via the internet.",
                keyAspect: "Direct internet reach without physical shop leases"
              },
              {
                id: 1,
                title: "Buyer",
                sub: "Purchases Goods / Services",
                icon: ShoppingCart,
                color: "text-emerald-400",
                tag: "Consumers & Organizations",
                desc: "The customer browsing, comparing prices, reviewing ratings, and issuing payment for their selected items through computer, tablet, or smartphone.",
                keyAspect: "24/7 self-service convenience"
              },
              {
                id: 2,
                title: "Transporter",
                sub: "Handles Physical Delivery",
                icon: Truck,
                color: "text-amber-400",
                tag: "Couriers & Logistics",
                desc: "The postal network, private delivery courier, or intra-city motorized dispatch taking goods from the merchant warehouse directly to the buyer's destination.",
                keyAspect: "Physical fulfillment bridge"
              },
              {
                id: 3,
                title: "Ecommerce Website",
                sub: "The Digital Platform",
                icon: Globe,
                color: "text-purple-400",
                tag: "Software & Payment Rail",
                desc: "The central digital meeting point hosting product catalogs, shopping cart logic, secure payment gateway integrations, and order management telemetry.",
                keyAspect: "Connects Merchant, Buyer & Transporter"
              }
            ].map((comp) => {
              const isSelected = selectedComponent === comp.id;
              const Icon = comp.icon;
              return (
                <div
                  key={comp.title}
                  onClick={() => {
                    audioManager.playTick();
                    setSelectedComponent(comp.id);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#ff5520] ring-1 ring-[#ff5520]/40 shadow-xl'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${comp.color}`} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                        Fig 1.14
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#ff5520] uppercase font-bold">{comp.tag}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{comp.title}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{comp.sub}</p>
                    <p className="text-xs text-zinc-300 mt-3 leading-relaxed">{comp.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] font-mono text-zinc-400">
                    <strong className="text-white">Role:</strong> {comp.keyAspect}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Textbook Highlight Box */}
          <div className="p-4 rounded-2xl bg-[#ff5520]/5 border border-[#ff5520]/20 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#ff5520] shrink-0" />
            <p className="text-xs sm:text-sm text-zinc-300">
              <strong className="text-white font-semibold">Grade 11 IT Textbook Focus:</strong> The Ecommerce Website acts as the digital infrastructure linking the <strong>Merchant</strong>, the <strong>Buyer</strong>, and the <strong>Transporter</strong> into a seamless, coordinated transaction loop.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 03: TYPES — THE FOUR PILLARS
          ========================================================================= */}
      {slideId === 3 && (
        <div className="max-w-6xl space-y-6">
          <div>
            <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase mb-1">
              SLIDE 03 — TYPES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Four Pillars
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Core transaction models that define commercial interaction.</p>
          </div>

          {/* 4 Pillars Interactive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 0,
                code: "B2B",
                flow: "Business → Business",
                def: "Commercial transactions between two companies.",
                char: "High average order values, negotiated pricing tiers, Net-30/60 terms.",
                example: "Intel selling processors to Dell, or wholesale suppliers selling to retail merchants."
              },
              {
                id: 1,
                code: "B2C",
                flow: "Business → Consumer",
                def: "Businesses selling products directly to individual retail end-users.",
                char: "Impulse buying, frictionless 1-click checkout, brand marketing driven.",
                example: "Amazon, online clothing shops, or ordering food via delivery apps."
              },
              {
                id: 2,
                code: "C2C",
                flow: "Consumer → Consumer",
                def: "Individuals selling goods or pre-owned assets to other individuals.",
                char: "Escrow payment protection, auction models, rating & trust systems.",
                example: "eBay, Facebook Marketplace, or local peer classifieds."
              },
              {
                id: 3,
                code: "C2B",
                flow: "Consumer → Business",
                def: "Consumers provide value, content, or freelance work to commercial businesses.",
                char: "Bidding, influencer sponsorships, reverse auction pricing.",
                example: "Freelancers on Upwork, photographers selling stock photos to Adobe."
              }
            ].map((pillar) => {
              const isSelected = selectedPillarType === pillar.id;
              return (
                <div
                  key={pillar.code}
                  onClick={() => {
                    audioManager.playTick();
                    setSelectedPillarType(pillar.id);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#ff5520] ring-1 ring-[#ff5520]/40'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black font-mono text-white">{pillar.code}</span>
                      <span className="text-xs font-mono text-[#ff5520]">{pillar.flow}</span>
                    </div>
                    <p className="text-xs text-zinc-300 mb-3">{pillar.def}</p>
                    <div className="space-y-1.5 text-[11px] text-zinc-400">
                      <div><strong className="text-zinc-300">Traits:</strong> {pillar.char}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-zinc-400">
                    <strong className="text-[#ff5520]">Example:</strong> {pillar.example}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emerging Models Row: D2C & B2B2C */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#ff5520]/15 text-[#ff5520] font-mono text-xs font-bold">
                EMERGING
              </span>
              <div>
                <span className="text-xs font-bold text-white block">D2C (Direct-to-Consumer)</span>
                <span className="text-[11px] text-zinc-400">Manufacturers bypass wholesalers to sell directly through their own branded web channels.</span>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-white/[0.06] pt-2 sm:pt-0 sm:pl-4">
              <span className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 font-mono text-xs font-bold">
                HYBRID
              </span>
              <div>
                <span className="text-xs font-bold text-white block">B2B2C (Business-to-Business-to-Consumer)</span>
                <span className="text-[11px] text-zinc-400">Company A partners with Company B to offer combined digital products directly to the consumer.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 04: HOW IT WORKS — FROM ONE CLICK TO DELIVERY
          ========================================================================= */}
      {slideId === 4 && (
        <div className="w-full max-w-6xl space-y-4">
          {/* Sticky Header to prevent title being pushed off-screen */}
          <div className="sticky top-0 z-20 bg-[#0c0c0e]/95 backdrop-blur-md pt-1 pb-2.5 border-b border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase mb-0.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5520]" />
                  <span>SLIDE 04 — HOW IT WORKS</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  From One Click to Delivery
                </h2>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                8-Step Lifecycle & The 3 Core Flows
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              How a digital order journeys from intent and payment rails to physical logistics and doorstep handover.
            </p>
          </div>

          {/* 3 Operational Phases Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="px-3.5 py-2 rounded-xl bg-sky-500/[0.05] border border-sky-500/20 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">Phase 1 · Front-End (Steps 01-03)</span>
                <span className="text-xs text-zinc-300 font-medium">Discovery, Product Cart & Address Sizing</span>
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#ff5520]/[0.08] border border-[#ff5520]/25 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#ff5520] shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff5520] font-bold block">Phase 2 · Settlement (Step 04)</span>
                <span className="text-xs text-zinc-300 font-medium">Payment Rail & Fraud Authentication</span>
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">Phase 3 · Physical Ops (Steps 05-08)</span>
                <span className="text-xs text-zinc-300 font-medium">Warehouse WMS, Courier & Delivery</span>
              </div>
            </div>
          </div>

          {/* 8-Step Interactive Process Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { id: 0, num: "01", name: "DISCOVERY", sub: "Frontend Search" },
              { id: 1, num: "02", name: "SELECTION", sub: "Cart & SKU" },
              { id: 2, num: "03", name: "CHECKOUT", sub: "Address Check" },
              { id: 3, num: "04", name: "PAYMENT", sub: "Gateway Auth" },
              { id: 4, num: "05", name: "FULFILLMENT", sub: "Order WMS" },
              { id: 5, num: "06", name: "LOGISTICS", sub: "Parcel Sorting" },
              { id: 6, num: "07", name: "DELIVERY", sub: "Transporter" },
              { id: 7, num: "08", name: "RETENTION", sub: "Reviews & Care" }
            ].map((step) => {
              const isSelected = activeLifecycleStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    audioManager.playTick();
                    setActiveLifecycleStep(step.id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#ff5520]/15 border-[#ff5520] text-white ring-1 ring-[#ff5520]/40 shadow-lg shadow-[#ff5520]/10'
                      : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-[#ff5520]">{step.num}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#ff5520]" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold block truncate text-white">{step.name}</span>
                    <span className="text-[10px] text-zinc-500 block truncate">{step.sub}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Explanation Card with Enriched Technical Breakdown */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {[
              {
                stepNum: "01",
                title: "Discovery & Intent Ingestion",
                phase: "Phase 1: Front-End Experience",
                area: "Front-End Experience Layer",
                desc: "Customer opens storefront via mobile app, search engine or social ad. High-speed edge CDN loads localized assets in under 150ms.",
                metric: "Sub-150ms LCP",
                tech: "Edge CDN · Algolia Search Index · PWA App",
                actor: "Buyer & Storefront Engine",
                goal: "Instant catalog discovery with zero visual latency"
              },
              {
                stepNum: "02",
                title: "Product Selection & Sizing",
                phase: "Phase 1: Front-End Experience",
                area: "Inventory Reservation Engine",
                desc: "Shopper selects variant, size, and quantity. Cart service places temporary holding hold on inventory database preventing overselling.",
                metric: "Real-time stock check",
                tech: "Redis In-Memory Session · Dynamic SKU Matrix",
                actor: "Cart Microservice & Database",
                goal: "Lock inventory without double-booking items"
              },
              {
                stepNum: "03",
                title: "Checkout & Address Verification",
                phase: "Phase 1: Front-End Experience",
                area: "Order Orchestrator",
                desc: "Customer inputs shipping destination. Dynamic address validation checks postal coverage while automated tax engine computes accurate localized duties.",
                metric: "Address auto-complete",
                tech: "GeoIP Services · Postal Validation · Rate Calculator",
                actor: "Order Orchestrator & Address API",
                goal: "Zero address entry error & exact delivery rate quotes"
              },
              {
                stepNum: "04",
                title: "Payment Processing & Risk Gate",
                phase: "Phase 2: Settlement Rail",
                area: "Fintech Settlement Rail",
                desc: "3D-Secure 2.3 biometric challenge or Telebirr prompt authorized. Encrypted token generated; funds provisionally captured with zero raw card storage.",
                metric: "380ms auth latency",
                tech: "Telebirr API / CBE Birr · 3D-Secure · Tokenization Rail",
                actor: "Payment Gateway, Bank & Merchant",
                goal: "Frictionless authentication & fraud-free funds capture"
              },
              {
                stepNum: "05",
                title: "Order Fulfillment & Warehouse",
                phase: "Phase 3: Physical Operations",
                area: "Warehouse Management System (WMS)",
                desc: "Order routed to nearest distribution center. Automated pick lists generated; robotic AGVs or warehouse pickers retrieve and pack items.",
                metric: "Sub-15m pick-to-pack",
                tech: "Automated WMS · Barcode Scanners · Sealed Packaging",
                actor: "Merchant Warehouse Team & Pickers",
                goal: "Fast pick-and-pack with 99.9% item accuracy"
              },
              {
                stepNum: "06",
                title: "Logistics & Sorting Hub",
                phase: "Phase 3: Physical Operations",
                area: "Carrier Route Optimizer",
                desc: "Package weighed, barcoded, and routed through regional hub conveyors. Real-time rate shopping assigns parcel to the fastest reliable carrier.",
                metric: "Barcoded tracking ID",
                tech: "Dynamic Carrier Routing · Conveyor Sortation Hub",
                actor: "Logistics Hub & Transporter Coordinator",
                goal: "Optimal route selection & live tracking activation"
              },
              {
                stepNum: "07",
                title: "Transporter Delivery",
                phase: "Phase 3: Physical Operations",
                area: "Courier Dispatch & Handover",
                desc: "Motorized van, bike, or locker network executes doorstep delivery. Customer receives SMS ETA alert and provides digital signature or one-time delivery PIN.",
                metric: "Doorstep confirmation",
                tech: "Driver Mobile App · GPS Live Tracking · SMS OTP PIN",
                actor: "Transporter Courier & Customer",
                goal: "Safe handover directly to recipient with proof-of-delivery"
              },
              {
                stepNum: "08",
                title: "Retention & Post-Purchase Loop",
                phase: "Phase 3: Physical Operations",
                area: "Customer Care & Feedback",
                desc: "Automated receipt emailed, customer feedback requested, and loyalty points issued. Reverse return logistics available if customer requires exchange.",
                metric: "NPS & loyalty loop",
                tech: "CRM Webhooks · SMS Survey · Reverse Logistics API",
                actor: "Customer Care & Retention Engine",
                goal: "Drive customer trust, reviews, and repeat orders"
              }
            ][activeLifecycleStep] && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#ff5520] uppercase font-bold">
                        Step {[ "01", "02", "03", "04", "05", "06", "07", "08" ][activeLifecycleStep]} · {[
                          "Discovery & Intent Ingestion",
                          "Product Selection & Sizing",
                          "Checkout & Address Verification",
                          "Payment Processing & Risk Gate",
                          "Order Fulfillment & Warehouse",
                          "Logistics & Sorting Hub",
                          "Transporter Delivery",
                          "Retention & Post-Purchase Loop"
                        ][activeLifecycleStep]}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {[
                        "Front-End Experience Layer",
                        "Inventory Reservation Engine",
                        "Order Orchestrator",
                        "Fintech Settlement Rail",
                        "Warehouse Management System (WMS)",
                        "Carrier Route Optimizer",
                        "Courier Dispatch & Handover",
                        "Customer Care & Feedback"
                      ][activeLifecycleStep]}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                      {[
                        "Customer opens storefront via mobile app, search engine or social ad. High-speed edge CDN loads localized assets in under 150ms.",
                        "Shopper selects variant, size, and quantity. Cart service places temporary holding hold on inventory database preventing overselling.",
                        "Customer inputs shipping destination. Dynamic address validation checks postal coverage while automated tax engine computes accurate localized duties.",
                        "3D-Secure 2.3 biometric challenge or Telebirr prompt authorized. Encrypted token generated; funds provisionally captured with zero raw card storage.",
                        "Order routed to nearest distribution center. Automated pick lists generated; robotic AGVs or warehouse pickers retrieve and pack items.",
                        "Package weighed, barcoded, and routed through regional hub conveyors. Real-time rate shopping assigns parcel to the fastest reliable carrier.",
                        "Motorized van, bike, or locker network executes doorstep delivery. Customer receives SMS ETA alert and provides digital signature or one-time delivery PIN.",
                        "Automated receipt emailed, customer feedback requested, and loyalty points issued. Reverse return logistics available if customer requires exchange."
                      ][activeLifecycleStep]}
                    </p>
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-left sm:text-right shrink-0">
                    <span className="text-[10px] font-mono text-zinc-500 block">SLA BENCHMARK</span>
                    <span className="text-sm font-mono font-bold text-emerald-400 block">
                      {[
                        "Sub-150ms LCP",
                        "Real-time stock check",
                        "Address auto-complete",
                        "380ms auth latency",
                        "Sub-15m pick-to-pack",
                        "Barcoded tracking ID",
                        "Doorstep confirmation",
                        "NPS & loyalty loop"
                      ][activeLifecycleStep]}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
                      Target Performance
                    </span>
                  </div>
                </div>

                {/* Subsystem & Objective Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/[0.06]">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Under The Hood Tech</span>
                    <span className="text-xs font-mono text-[#ff5520] font-semibold mt-0.5 block truncate">
                      {[
                        "Edge CDN · Algolia · PWA",
                        "Redis Session · SKU Locking",
                        "GeoIP · Postal Auto-Complete",
                        "Telebirr API · 3D-Secure 2.3",
                        "Automated WMS · Barcode Scan",
                        "Dynamic Carrier Routing",
                        "Driver GPS · SMS OTP Handover",
                        "CRM Engine · Returns Portal"
                      ][activeLifecycleStep]}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Primary Actor</span>
                    <span className="text-xs text-zinc-200 font-medium mt-0.5 block truncate">
                      {[
                        "Buyer & Storefront Engine",
                        "Cart Microservice & DB",
                        "Order Orchestrator & Address API",
                        "Fintech Gateway & Bank Rail",
                        "Merchant Warehouse Team",
                        "Logistics Hub Coordinator",
                        "Courier Transporter & Buyer",
                        "Customer Care & Loyalty Hub"
                      ][activeLifecycleStep]}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Step Objective</span>
                    <span className="text-xs text-zinc-300 font-medium mt-0.5 block truncate">
                      {[
                        "Zero latency catalog discovery",
                        "Guaranteed inventory reservation",
                        "Accurate delivery fee & zone check",
                        "Instant authorized settlement",
                        "Rapid pick-pack within 15 mins",
                        "Fastest dispatch routing",
                        "Physical delivery proof & OTP",
                        "Lifelong repeat buyer loyalty"
                      ][activeLifecycleStep]}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NEW EDUCATIONAL SECTION: The Three Fundamental Flows of E-Commerce */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#ff5520] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                The Three Concurrent Flows in Every E-Commerce Transaction
              </span>
              <span className="text-[10px] font-mono text-zinc-400">Information · Financial · Physical</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Flow 1: Information Flow */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">1. Information Flow</h4>
                    <span className="text-[10px] font-mono text-sky-400">Digital Data & Telemetry</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Product descriptions, real-time inventory counts, customer delivery addresses, order numbers, and live GPS transit alerts exchanged between buyer, seller, and transporter.
                </p>
                <div className="mt-2.5 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-zinc-400">
                  <strong className="text-white">Medium:</strong> Internet, APIs & Mobile Apps
                </div>
              </div>

              {/* Flow 2: Financial Flow */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5520]/10 border border-[#ff5520]/20 flex items-center justify-center text-[#ff5520]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">2. Financial Flow</h4>
                    <span className="text-[10px] font-mono text-[#ff5520]">Electronic Money & Value</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Payment authorization, fund transfer via digital wallets (Telebirr/CBE Birr/debit cards), automated taxation, escrow holds, and merchant payout settlements.
                </p>
                <div className="mt-2.5 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-zinc-400">
                  <strong className="text-white">Medium:</strong> Mobile Banking Rails & Gateways
                </div>
              </div>

              {/* Flow 3: Physical / Goods Flow */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">3. Physical Flow</h4>
                    <span className="text-[10px] font-mono text-emerald-400">Real-World Logistics</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Tangible products packed in warehouses, sorted at regional distribution centers, and transported by motorcycle or vehicle couriers directly to the buyer’s hands.
                </p>
                <div className="mt-2.5 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-zinc-400">
                  <strong className="text-white">Medium:</strong> Couriers, Vans & Motorbikes
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Principle Callout */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#ff5520] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-mono font-bold text-white uppercase">
                Grade 11 IT Core Curriculum Principle:
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                In traditional retail, the buyer must travel to the merchant's physical location. In e-commerce, <strong>information and payments travel electronically in milliseconds</strong>, leaving only the <strong>transporter</strong> to physically bridge geographical distance to the customer's doorstep.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 05: ADVANTAGES — BASED ON TEXTBOOK LIST
          ========================================================================= */}
      {slideId === 5 && (
        <div className="max-w-6xl space-y-6">
          <div>
            <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase mb-1">
              SLIDE 05 — ADVANTAGES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Why E-Commerce Matters
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Three-column textbook categorization: Customer, Business, and Macro Economy.</p>
          </div>

          {/* 3 Columns: CUSTOMER, BUSINESS, ECONOMY from textbook */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Column 1: CUSTOMER */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#ff5520] font-bold uppercase">CUSTOMER</span>
                  <span className="text-xs font-mono text-zinc-500">Buyer Perks</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">For Customers</h3>
                <ul className="space-y-3 text-xs text-zinc-300">
                  {[
                    "Convenience: 24/7 shopping without traveling to physical markets",
                    "Global selection: Access to products from across regional borders",
                    "Price comparison: Compare deals between multiple stores instantly",
                    "Customer reviews: Read peer experiences and ratings before buying",
                    "Personalization: Tailored suggestions matching individual taste"
                  ].map((adv) => (
                    <li key={adv} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#ff5520] shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
                Textbook focus: Accessibility & ease of discovery
              </div>
            </div>

            {/* Column 2: BUSINESS */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">BUSINESS</span>
                  <span className="text-xs font-mono text-zinc-500">Merchant Perks</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">For Businesses</h3>
                <ul className="space-y-3 text-xs text-zinc-300">
                  {[
                    "Lower operational costs: No need to pay physical store rental leases",
                    "Global reach: Sell goods across regional and national borders",
                    "Data analytics: Monitor customer clicks, trends, and cart drops",
                    "Scalability: Handle thousands of simultaneous digital shoppers",
                    "Automated marketing: Triggered campaigns and digital retargeting"
                  ].map((adv) => (
                    <li key={adv} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
                Textbook focus: Eliminates geographic & overhead barriers
              </div>
            </div>

            {/* Column 3: ECONOMY */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">ECONOMY</span>
                  <span className="text-xs font-mono text-zinc-500">Macro Impact</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">For the Economy</h3>
                <ul className="space-y-3 text-xs text-zinc-300">
                  {[
                    "Job creation: Transporter couriers, developers & warehouse staff",
                    "SME growth: Local micro-enterprises connect to broader markets",
                    "Financial inclusion: Digital mobile money onboarding for citizens",
                    "Digital transformation: Accelerates national IT infrastructure adoption"
                  ].map((adv) => (
                    <li key={adv} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
                Textbook focus: Drives modernization & enterprise growth
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 06: CHALLENGES — PROBLEMS AND RISKS
          ========================================================================= */}
      {slideId === 6 && (
        <div className="max-w-6xl space-y-5">
          <div>
            <div className="text-xs font-mono text-red-400 tracking-widest uppercase mb-1">
              SLIDE 06 — CHALLENGES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Dark Side of Digital Commerce
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Six core risk areas, plus textbook perspective on developing infrastructure.</p>
          </div>

          {/* 6 Risk Areas Grid from prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {[
              {
                title: "SECURITY",
                icon: Lock,
                color: "text-red-400",
                points: ["Fraud & card testing attacks", "Data breaches exposing customer information", "Phishing storefronts & spoofed domains"]
              },
              {
                title: "LOGISTICS",
                icon: Truck,
                color: "text-amber-400",
                points: ["Delivery delays & transit bottlenecks", "Loss of parcels or package damage", "Return shipment handling friction"]
              },
              {
                title: "TRUST",
                icon: ShieldCheck,
                color: "text-[#ff5520]",
                points: ["Fake reviews & manipulated ratings", "Payment confidence on unfamiliar portals", "Unclear warranty & refund processes"]
              },
              {
                title: "TECHNOLOGY",
                icon: Cpu,
                color: "text-orange-400",
                points: ["System downtime during peak sales hours", "Integration hurdles with legacy stock software", "Mobile bandwidth & performance lag"]
              },
              {
                title: "LEGAL & REGULATORY",
                icon: AlertTriangle,
                color: "text-purple-400",
                points: ["Digital taxes & tariff regulations", "Consumer privacy protection rules", "Appropriate digital trade laws"]
              },
              {
                title: "INFRASTRUCTURE",
                icon: Globe,
                color: "text-emerald-400",
                points: ["Uneven Internet access in rural areas", "Lack of standardized physical street addresses", "Fragmented payment gateway support"]
              }
            ].map((risk) => {
              const Icon = risk.icon;
              return (
                <div
                  key={risk.title}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">{risk.title}</span>
                    <Icon className={`w-4 h-4 ${risk.color}`} />
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {risk.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <span className="text-zinc-600 mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Exact Quote from Grade 11 IT Textbook */}
          <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/25 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                Direct Quote from Grade 11 IT Textbook:
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 italic leading-relaxed">
                “E-commerce is at its infancy stage in Ethiopia. There is a need to develop the e-commerce infrastructure such as Internet access in all places, efficient transport system, appropriate regulations.”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 07: E-COMMERCE IN ETHIOPIA (STICKY TITLE HEADER)
          ========================================================================= */}
      {slideId === 7 && (
        <div className="w-full max-w-6xl">
          <div className="sticky top-0 z-30 bg-[#0c0c0e]/95 backdrop-blur-md pt-1 pb-2.5 border-b border-white/[0.08] mb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase mb-0.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5520]" />
                  <span>SLIDE 07 — E-COMMERCE IN ETHIOPIA</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  E-Commerce in Ethiopia
                </h2>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                Grade 11 IT Unit 1.3.4
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Definition, current market situations, Telebirr mobile rails & top local company examples.
            </p>
          </div>
          <EthiopiaSectionView />
        </div>
      )}

      {/* =========================================================================
          SLIDE 08: ETHIOPIAN COMPANY PROCESS VIDEO (DELIVER ADDIS - SINGLE COMPANY)
          ========================================================================= */}
      {slideId === 8 && (
        <div className="w-full max-w-6xl">
          <div className="sticky top-0 z-30 bg-[#0c0c0e]/95 backdrop-blur-md pt-1 pb-2.5 border-b border-white/[0.08] mb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase mb-0.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5520]" />
                  <span>SLIDE 08 — ETHIOPIAN COMPANY PROCESS VIDEO</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  Deliver Addis: Order to Delivery Process
                </h2>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#ff5520] px-3 py-1 rounded-full bg-[#ff5520]/15 border border-[#ff5520]/30">
                Deliver Addis (Local Company)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Watch Ethiopia's pioneer delivery company in action: app order, Telebirr checkout & motorcycle courier dispatch.
            </p>
          </div>
          <VideoJourneyView />
        </div>
      )}

      {/* =========================================================================
          SLIDE 09: APPLIED DEMO (FIGURE 1.15) — EXPERIENCE AN ONLINE STORE
          ========================================================================= */}
      {slideId === 9 && (
        <div className="w-full max-w-6xl">
          <div className="sticky top-0 z-30 bg-[#0c0c0e]/95 backdrop-blur-md pt-1 pb-2.5 border-b border-white/[0.08] mb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase mb-0.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5520]" />
                  <span>SLIDE 09 — APPLIED DEMO (FIGURE 1.15)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  Experience an Online Store
                </h2>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                Figure 1.15 Simulation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Interactive store demo based on Figure 1.15 ("Car for Sale in Ethiopia") · Test browsing, item specs & Telebirr checkout.
            </p>
          </div>
          <AppliedDemoView />
        </div>
      )}

      {/* =========================================================================
          SLIDE 10: CONCLUSION — WHAT DID WE LEARN?
          ========================================================================= */}
      {slideId === 10 && (
        <div className="max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
            <div>
              <div className="text-xs font-mono text-[#ff5520] tracking-widest uppercase mb-1">
                SLIDE 10 — CONCLUSION
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                What Did We Learn?
              </h2>
            </div>
            <button
              onClick={() => {
                audioManager.playSlideChange('next');
                onNext();
              }}
              className="px-4 py-2 rounded-xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#ff5520]/20"
            >
              <span>View Group Credits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5 Takeaway Cards from prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
            {[
              { num: "01", text: "E-Commerce transforms commerce digitally across every traditional sector." },
              { num: "02", text: "It connects customers, businesses, payments, and logistics in real-time." },
              { num: "03", text: "It creates unprecedented opportunities but also introduces critical new risks." },
              { num: "04", text: "Local infrastructure strongly shapes how e-commerce develops regionally." },
              { num: "05", text: "The future is increasingly connected, mobile, AI-powered, and omnichannel." }
            ].map((card) => (
              <div
                key={card.num}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between"
              >
                <span className="text-xl font-black font-mono text-[#ff5520]">{card.num}</span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-4">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Final Large Statement & QUESTIONS? */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-4 text-center sm:text-left">
            <p className="text-lg sm:text-2xl font-light text-white leading-relaxed">
              “E-Commerce is not simply buying and selling online. <br className="hidden sm:inline" />
              <strong className="text-[#ff5520] font-semibold">It is the digital infrastructure connecting modern commerce.”</strong>
            </p>

            <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase font-mono">
                QUESTIONS?
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    audioManager.playAction();
                    onSelectSlide(11);
                  }}
                  className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#ff5520]" />
                  <span>Meet Group Members</span>
                </button>
                <button
                  onClick={() => {
                    audioManager.playAction();
                    onSelectSlide(0);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#ff5520]/20"
                >
                  Restart Deck ↺
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 11: GROUP MEMBERS / CREDITS
          ========================================================================= */}
      {slideId === 11 && (
        <div className="max-w-5xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-white/[0.06] pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5520]/10 border border-[#ff5520]/30 text-[#ff5520] text-xs font-mono font-bold uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>SLIDE 11 — GROUP MEMBERS / CREDITS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Group Members
            </h2>
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-mono font-bold text-[#ff5520]">
              <GraduationCap className="w-4 h-4" />
              <span>IFA BORU BITE SPECIAL SECONDARY SCHOOL</span>
            </div>
            <p className="text-xs text-zinc-400">
              Information Technology — Grade 11 — Unit 1.3.4 E-Commerce
            </p>
          </div>

          {/* 5 Student Cards in Glass Style with Staggered Layout */}
          <div className="space-y-2.5 max-w-3xl mx-auto">
            {students.map((student, idx) => {
              const isEditing = editingStudentId === student.id;
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="p-4 sm:p-4.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520]/40 backdrop-blur-md flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Number Badge */}
                    <div className="w-9 h-9 rounded-xl bg-[#ff5520]/10 border border-[#ff5520]/30 flex items-center justify-center font-mono font-bold text-xs text-[#ff5520] shrink-0">
                      0{student.id}
                    </div>

                    {/* Student Name & Editable Role */}
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={student.name}
                            onChange={(e) => handleUpdateStudent(student.id, 'name', e.target.value)}
                            className="w-full text-sm font-bold text-white bg-black/60 border border-[#ff5520] rounded px-2 py-0.5 focus:outline-none"
                            placeholder="Student Name"
                          />
                          <input
                            type="text"
                            value={student.role || ''}
                            onChange={(e) => handleUpdateStudent(student.id, 'role', e.target.value)}
                            className="w-full text-xs text-zinc-300 bg-black/60 border border-white/20 rounded px-2 py-0.5 focus:outline-none"
                            placeholder="Role / Assignment"
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-white tracking-wide truncate">
                            {student.name}
                          </h4>
                          <span className="text-xs text-zinc-400 font-mono block">
                            {student.role || 'Project Member'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Roll Number Badge */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase">Roll No.</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={student.rollNumber}
                          onChange={(e) => handleUpdateStudent(student.id, 'rollNumber', e.target.value)}
                          className="w-16 text-center text-sm font-mono font-bold text-[#ff5520] bg-black/60 border border-[#ff5520] rounded px-1 py-0.5 focus:outline-none"
                        />
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-[#ff5520]/15 border border-[#ff5520]/30 text-[#ff5520] font-mono font-extrabold text-sm sm:text-base">
                          {student.rollNumber}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setEditingStudentId(isEditing ? null : student.id)}
                      className="px-2 py-1 rounded text-[10px] font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
                      title="Click to edit name or roll number"
                    >
                      {isEditing ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Thank You & Closing Footer */}
          <div className="pt-4 border-t border-white/[0.06] text-center space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase font-mono">
              THANK YOU!
            </h3>
            <p className="text-xs text-zinc-400 max-w-lg mx-auto">
              Presented to our teacher and fellow Grade 11 classmates at IFA BORU BITE SPECIAL SECONDARY SCHOOL.
            </p>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  audioManager.playTick();
                  onSelectSlide(0);
                }}
                className="px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-[#ff5520]" />
                <span>Return to Home</span>
              </button>

              <button
                onClick={() => {
                  audioManager.playAction();
                  onSelectSlide(1);
                }}
                className="px-6 py-2.5 rounded-full bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-[#ff5520]/20 transition-transform hover:scale-105"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Presentation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
