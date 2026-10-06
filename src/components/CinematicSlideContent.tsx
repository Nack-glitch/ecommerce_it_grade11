import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Cpu,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Lock,
  ShoppingCart,
  DollarSign,
  Store,
  Users,
  User,
  GraduationCap,
  RotateCcw,
  Home
} from 'lucide-react';
import { audioManager } from '../utils/audio';
import { AppliedDemoView } from './AppliedDemoView';
import { VideoJourneyView } from './VideoJourneyView';
import { EthiopiaSectionView } from './EthiopiaSectionView';
import { DEFAULT_STUDENTS, StudentCredit } from '../data/presentationData';

const LINE1_CHARS = ['E', '-'];
const LINE2_CHARS = ['C', 'O', 'M', 'M', 'E', 'R', 'C', 'E'];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

interface CinematicSlideProps {
  slideId: number; // 0 to 11
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
  const [selectedComponent, setSelectedComponent] = useState<number>(0);

  // Group Members state
  const [students] = useState<StudentCredit[]>(DEFAULT_STUDENTS);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Always reset scroll to top on slide change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [slideId]);

  return (
    <div
      ref={scrollContainerRef}
      className={`relative w-full h-full flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 overflow-y-auto ${
        slideId === 9 ? 'justify-start' : 'justify-center'
      }`}
    >
      {/* =========================================================================
          SLIDE 00: HIGH-TECH IT PRESENTATION LANDING PAGE
          ========================================================================= */}
      {slideId === 0 && (
        <div className="relative w-full h-full flex flex-col justify-between py-3 sm:py-4 px-3 sm:px-8 text-left overflow-hidden bg-[#0c0d10] rounded-3xl border border-white/[0.08] shadow-2xl">
          {/* Faint high-tech grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          {/* Ambient Radial Glowing Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#ff5520]/15 rounded-full blur-[110px] pointer-events-none -z-0" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none -z-0" />
          <div className="absolute -top-12 -left-12 w-72 h-72 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none -z-0" />

          {/* Top Academic & Curriculum Information */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5520] shadow-[0_0_10px_#ff5520] animate-ping" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.22em] text-zinc-300 uppercase">
                GRADE 11 INFORMATION TECHNOLOGY · UNIT 1.3.4
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-white backdrop-blur-md shadow-md w-fit"
            >
              <GraduationCap className="w-4 h-4 text-[#ff5520]" />
              <span className="text-xs sm:text-sm font-black tracking-widest uppercase font-mono text-[#ff5520]">
                IFA BORU BITE SPECIAL SECONDARY SCHOOL
              </span>
            </motion.div>
          </div>

          {/* Center Section: High-Tech Digital Display Headline Animation & Glowing Line */}
          <div className="relative z-10 my-auto py-1 sm:py-2 flex flex-col items-start space-y-3 sm:space-y-4 w-full max-w-7xl">
            {/* Cybernetic Framing Container with Corner Bracket Accents */}
            <div className="relative px-6 sm:px-10 py-3 sm:py-5 rounded-3xl bg-white/[0.02] border border-white/[0.07] overflow-visible w-fit max-w-full">
              {/* Corner Bracket Reticles */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#ff5520] pointer-events-none" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#ff5520] pointer-events-none" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#ff5520] pointer-events-none" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#ff5520] pointer-events-none" />

              {/* Rapid Drop-in Blur-to-Sharp Letter-by-Letter Headline - Starting from Beginning (Left) */}
              <div className="overflow-visible select-none flex flex-col items-start text-left leading-[0.82] tracking-tighter pr-6 sm:pr-12">
                {/* Line 1: E- (Large, bold, visible from far away, never hidden) */}
                <div className="flex items-center justify-start flex-nowrap">
                  {LINE1_CHARS.map((char, idx) => (
                    <motion.span
                      key={`line1-${char}-${idx}`}
                      initial={{
                        opacity: 0,
                        y: -70,
                        scale: 1.25,
                        filter: 'blur(16px)',
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.1 + idx * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.96 }}
                      onHoverStart={() => audioManager.playTick()}
                      className="inline-block shrink-0 text-6xl sm:text-7xl md:text-8xl lg:text-[9.2rem] xl:text-[9.4rem] 2xl:text-[10.5rem] font-black text-white drop-shadow-[0_0_42px_rgba(255,255,255,0.45)] cursor-pointer select-none"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                {/* Line 2: COMMERCE (Large, vibrant electric orange, visible from far away, never hidden) */}
                <div className="flex items-center justify-start flex-nowrap -mt-1 sm:-mt-2 md:-mt-3">
                  {LINE2_CHARS.map((char, idx) => (
                    <motion.span
                      key={`line2-${char}-${idx}`}
                      initial={{
                        opacity: 0,
                        y: -70,
                        scale: 1.25,
                        filter: 'blur(16px)',
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.2 + idx * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.96 }}
                      onHoverStart={() => audioManager.playTick()}
                      className="inline-block shrink-0 text-6xl sm:text-7xl md:text-8xl lg:text-[9.2rem] xl:text-[9.4rem] 2xl:text-[10.5rem] font-black text-[#ff5520] drop-shadow-[0_0_50px_rgba(255,85,32,0.65)] cursor-pointer select-none"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Glowing Orange Horizontal Line Expanding from Left with Laser Scan Beam */}
            <div className="relative w-full max-w-2xl sm:max-w-3xl overflow-hidden py-1">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative h-1.5 sm:h-2 w-full origin-left bg-gradient-to-r from-transparent via-[#ff5520] to-transparent rounded-full shadow-[0_0_20px_#ff5520,0_0_38px_rgba(255,85,32,0.85)]"
              >
                {/* Continuous Laser Scanning Sweep */}
                <motion.div
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent opacity-90 blur-[1px]"
                />
              </motion.div>
            </div>

            {/* Clear, highly readable description under title with 10% metric pill */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-left">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ff5520]/20 border border-[#ff5520]/50 text-[#ff5520] font-mono text-xs font-bold tracking-wider shrink-0 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5520] animate-pulse" />
                10% GLOBAL RETAIL & GROWING
              </span>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.7 }}
                className="text-sm sm:text-base md:text-lg font-medium text-zinc-300 max-w-2xl leading-relaxed"
              >
                The digital architecture of modern commerce: online storefronts, electronic payments, cloud networks, and automated delivery.
              </motion.p>
            </div>
          </div>

          {/* Bottom Section: 5 Floating Bobbing Glassmorphism Cards + Neon CTA Button */}
          <div className="relative z-10 space-y-2.5 sm:space-y-3 shrink-0 pt-1.5 border-t border-white/[0.08]">
            {/* Row of 5 Dark-Mode Glassmorphism Cards Floating with Continuous Y-axis Bobbing Animation */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {[
                { title: 'Storefront', sub: 'Web, App & Catalog', icon: ShoppingCart },
                { title: 'Payments', sub: 'Gateway & Mobile Rails', icon: DollarSign },
                { title: 'Networks', sub: 'Global Cloud & CDN', icon: Globe },
                { title: 'Logistics', sub: 'Warehousing & Fleet', icon: Truck },
                { title: 'Security', sub: 'SSL, Fraud & Trust', icon: ShieldCheck },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                      opacity: 1,
                      y: [0, -5, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.4, delay: 0.65 + idx * 0.07 },
                      y: {
                        repeat: Infinity,
                        duration: 3.2 + (idx % 3) * 0.6,
                        ease: 'easeInOut',
                        delay: idx * 0.25,
                      },
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.025,
                      borderColor: 'rgba(255, 85, 32, 0.8)',
                      boxShadow: '0 10px 25px -5px rgba(255,85,32,0.3)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    onHoverStart={() => audioManager.playTick()}
                    className="p-2 sm:p-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-[#ff5520]/80 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col justify-between cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-7 h-7 rounded-xl bg-[#ff5520]/15 border border-[#ff5520]/30 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-[#ff5520] stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-zinc-500">0{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white">{card.title}</h4>
                      <p className="text-[10px] sm:text-[11px] text-zinc-400 font-medium truncate mt-0.5">{card.sub}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Very Bottom: Large 'ENTER PRESENTATION' Button with Glowing Neon Border + Blinking Prompt on Right */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.9 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5"
            >
              {/* Large CTA with Neon Glowing Border */}
              <motion.button
                onClick={() => {
                  audioManager.playAction();
                  onEnterPresentation();
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 35px rgba(255, 85, 32, 0.8), 0 0 15px #ff5520',
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs sm:text-sm md:text-base tracking-widest uppercase transition-all cursor-pointer shadow-[0_0_22px_rgba(255,85,32,0.55)] border-2 border-white/90 hover:border-white flex items-center justify-center gap-2.5 w-fit"
              >
                <span>ENTER PRESENTATION</span>
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 group-hover:translate-x-1.5 stroke-[3]" />
              </motion.button>

              {/* Small Blinking Prompt on Right Side */}
              <motion.div
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: 'easeInOut',
                }}
                className="flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-300 font-bold"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff5520] shadow-[0_0_8px_#ff5520]" />
                <span>Press Space or -&gt; to begin</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE 01: DEFINITION — WHAT IS E-COMMERCE?
          ========================================================================= */}
      {slideId === 1 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-4 my-auto relative"
        >
          {/* Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -right-10 w-80 h-80 bg-[#ff5520]/20 rounded-full blur-3xl pointer-events-none -z-10"
          />

          {/* Slide Header */}
          <motion.div
            variants={headerVariants}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5"
          >
            <div>
              <div className="text-xs sm:text-sm font-mono text-[#ff5520] font-black tracking-widest uppercase">
                SLIDE 01 — DEFINITION
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                What is E-Commerce?
              </h2>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-[#ff5520]/40 text-[#ff5520] text-xs sm:text-sm font-mono font-bold shadow-sm">
              <GraduationCap className="w-4 h-4 shrink-0 text-[#ff5520]" />
              <span>IFA BORU BITE SPECIAL SECONDARY SCHOOL</span>
            </div>
          </motion.div>

          {/* Large Textbook Definition Statement */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01, borderColor: 'rgba(255, 85, 32, 0.45)' }}
            className="p-5 sm:p-7 rounded-3xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-md relative overflow-hidden shadow-lg transition-all"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-[#ff5520]" />
            <p className="text-xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug pl-2">
              “E-commerce is the buying and selling of goods and services over the Internet.”
            </p>
            <span className="block mt-2 pl-2 text-xs sm:text-sm font-mono text-[#ff5520] font-bold">
              Grade 11 IT Textbook · Unit 1.3.4 Foundational Principle
            </span>
          </motion.div>

          {/* Visual Ecosystem Value Chain (6 steps) */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <span className="text-xs sm:text-sm font-mono text-zinc-300 uppercase tracking-wider font-bold block">
              The Digital Ecosystem Value Chain:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
              {[
                { title: 'CUSTOMER', sub: 'Intent & Search' },
                { title: 'STOREFRONT', sub: 'Web, App & Social' },
                { title: 'PAYMENT', sub: 'Auth & Mobile Rail' },
                { title: 'ORDER SYSTEM', sub: 'Routing & Inventory' },
                { title: 'LOGISTICS', sub: 'WMS & Transporter' },
                { title: 'DELIVERY', sub: 'Doorstep Handover' }
              ].map((step, idx) => (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.03, borderColor: 'rgba(255, 85, 32, 0.45)' }}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between cursor-default transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm sm:text-base font-mono font-black text-[#ff5520]">0{idx + 1}</span>
                    <span className="text-zinc-400 font-bold text-sm">→</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white leading-tight uppercase">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 font-medium">{step.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Historical Evolution Timeline */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <span className="text-xs sm:text-sm font-mono text-zinc-300 uppercase tracking-wider font-bold block">
              Historical Evolution of E-Commerce:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {[
                { era: '1960s–70s', tech: 'EDI Networks', desc: 'Standardized enterprise document transfer' },
                { era: '1990s', tech: 'World Wide Web', desc: 'Netscape SSL, early Amazon & eBay catalogs' },
                { era: '2000s', tech: 'Search + Social', desc: 'Google AdWords, targeted PPC & PayPal rails' },
                { era: '2010s', tech: 'Mobile + Cloud', desc: '4G smartphones, Apple Pay & AWS scalability' },
                { era: '2020s+', tech: 'AI + Omnichannel', desc: 'Agentic shopping, Telebirr & instant delivery' }
              ].map((timeline) => (
                <motion.div
                  key={timeline.era}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.03, borderColor: 'rgba(255, 85, 32, 0.45)' }}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] cursor-default transition-colors"
                >
                  <span className="text-xs sm:text-sm font-mono font-black text-[#ff5520] block">{timeline.era}</span>
                  <span className="text-xs sm:text-sm font-black text-white mt-0.5 block">{timeline.tech}</span>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-snug font-medium">{timeline.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 02: COMPONENTS — BASED ON FIGURE 1.14
          ========================================================================= */}
      {slideId === 2 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-4 my-auto relative"
        >
          {/* Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 left-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10"
          />

          <motion.div
            variants={headerVariants}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5"
          >
            <div>
              <div className="text-xs sm:text-sm font-mono text-[#ff5520] font-black tracking-widest uppercase">
                SLIDE 02 — COMPONENTS (FIGURE 1.14)
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                The Ecosystem of E-Commerce
              </h2>
            </div>
            <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono text-[#ff5520] bg-[#ff5520]/15 border border-[#ff5520]/40 font-black">
              Grade 11 IT · Figure 1.14
            </span>
          </motion.div>

          {/* Visual Interactive Diagram: 4 Essential Components from Textbook */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 0,
                title: "Merchant",
                sub: "Sells Products & Services",
                icon: Store,
                color: "text-[#ff5520]",
                tag: "SMEs & Large Businesses",
                desc: "The seller offering tangible goods, digital products, or services. Textbook emphasis: small and medium enterprises (SMEs) can bypass costly physical store rent and reach customers nationwide via the internet.",
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
                <motion.div
                  key={comp.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    audioManager.playTick();
                    setSelectedComponent(comp.id);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#ff5520] ring-2 ring-[#ff5520]/50 shadow-xl'
                      : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center"
                      >
                        <Icon className={`w-5 h-5 ${comp.color}`} />
                      </motion.div>
                      <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-0.5 rounded">
                        Fig 1.14
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-[#ff5520] uppercase font-bold">{comp.tag}</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{comp.title}</h3>
                    <p className="text-xs sm:text-sm font-semibold text-zinc-300 mt-0.5">{comp.sub}</p>
                    <p className="text-xs sm:text-sm text-zinc-200 mt-2.5 leading-relaxed font-medium">{comp.desc}</p>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-white/[0.08] text-xs sm:text-sm font-mono text-zinc-300">
                    <strong className="text-white">Role:</strong> {comp.keyAspect}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Textbook Highlight Box */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#ff5520]/10 border border-[#ff5520]/30 flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 text-[#ff5520] shrink-0" />
            <p className="text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed font-medium">
              <strong className="text-white font-bold">Grade 11 IT Textbook Focus:</strong> The Ecommerce Website acts as the digital infrastructure linking the <strong className="text-white">Merchant</strong>, the <strong className="text-white">Buyer</strong>, and the <strong className="text-white">Transporter</strong> into a seamless, coordinated transaction loop.
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 03: TYPES — THE FOUR PILLARS
          ========================================================================= */}
      {slideId === 3 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-4 my-auto relative"
        >
          {/* Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.05, 1] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -left-10 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none -z-10"
          />

          <motion.div variants={headerVariants}>
            <div className="text-xs sm:text-sm font-mono text-[#ff5520] font-black tracking-widest uppercase mb-1">
              SLIDE 03 — TYPES
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              The Four Pillars
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-1 font-medium">
              Core transaction models that define commercial interaction.
            </p>
          </motion.div>

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
                <motion.div
                  key={pillar.code}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    audioManager.playTick();
                    setSelectedPillarType(pillar.id);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#ff5520] ring-2 ring-[#ff5520]/50 shadow-xl'
                      : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl sm:text-4xl font-black font-mono text-white">{pillar.code}</span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#ff5520]">{pillar.flow}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-200 mb-2.5 font-medium">{pillar.def}</p>
                    <div className="text-xs sm:text-sm text-zinc-300 leading-snug">
                      <strong className="text-zinc-100">Traits:</strong> {pillar.char}
                    </div>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-white/[0.08] text-xs sm:text-sm text-zinc-300">
                    <strong className="text-[#ff5520]">Example:</strong> {pillar.example}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Emerging Models Row: D2C & B2B2C */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#ff5520]/20 text-[#ff5520] font-mono text-xs sm:text-sm font-black">
                EMERGING
              </span>
              <div>
                <span className="text-xs sm:text-sm font-black text-white block">D2C (Direct-to-Consumer)</span>
                <span className="text-xs sm:text-sm text-zinc-300 font-medium">Manufacturers bypass wholesalers to sell directly through their own branded web channels.</span>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-2 sm:pt-0 sm:pl-4">
              <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs sm:text-sm font-black">
                HYBRID
              </span>
              <div>
                <span className="text-xs sm:text-sm font-black text-white block">B2B2C (Business-to-Business-to-Consumer)</span>
                <span className="text-xs sm:text-sm text-zinc-300 font-medium">Company A partners with Company B to offer combined digital products directly to the consumer.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 04: HOW IT WORKS — FROM ONE CLICK TO DELIVERY
          ========================================================================= */}
      {slideId === 4 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-3 my-auto relative"
        >
          {/* Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10"
          />

          {/* Slide Header */}
          <motion.div variants={headerVariants} className="border-b border-white/[0.08] pb-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm font-mono text-[#ff5520] font-black tracking-widest uppercase mb-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff5520] animate-pulse" />
                  <span>SLIDE 04 — HOW IT WORKS</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  From One Click to Delivery
                </h2>
              </div>
              <span className="hidden sm:inline-block text-xs sm:text-sm font-mono font-bold text-zinc-200 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/15">
                8-Step Lifecycle & The 3 Core Flows
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 mt-0.5 font-medium">
              How a digital order journeys from intent and payment rails to physical logistics and doorstep handover.
            </p>
          </motion.div>

          {/* 3 Operational Phases Summary */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="px-3.5 py-2 rounded-xl bg-sky-500/[0.08] border border-sky-500/30 flex items-center gap-2.5 transition-all"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0 animate-ping" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-black block">Phase 1 · Front-End (Steps 01-03)</span>
                <span className="text-xs sm:text-sm text-zinc-100 font-bold">Discovery, Product Cart & Address Sizing</span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="px-3.5 py-2 rounded-xl bg-[#ff5520]/[0.12] border border-[#ff5520]/35 flex items-center gap-2.5 transition-all"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5520] shrink-0 animate-ping" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#ff5520] font-black block">Phase 2 · Settlement (Step 04)</span>
                <span className="text-xs sm:text-sm text-zinc-100 font-bold">Payment Rail & Fraud Authentication</span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30 flex items-center gap-2.5 transition-all"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-ping" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-black block">Phase 3 · Physical Ops (Steps 05-08)</span>
                <span className="text-xs sm:text-sm text-zinc-100 font-bold">Warehouse WMS, Courier & Delivery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 8-Step Interactive Process Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2">
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
                <motion.button
                  key={step.id}
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    audioManager.playTick();
                    setActiveLifecycleStep(step.id);
                  }}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#ff5520]/20 border-[#ff5520] text-white ring-2 ring-[#ff5520]/50 shadow-lg shadow-[#ff5520]/20'
                      : 'bg-white/[0.03] border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs sm:text-sm font-mono font-black text-[#ff5520]">{step.num}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#ff5520]" />}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black block truncate text-white">{step.name}</span>
                    <span className="text-[11px] sm:text-xs text-zinc-400 block truncate font-medium">{step.sub}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Detailed Active Step Explanation Card with Enriched Technical Breakdown */}
          <motion.div
            variants={itemVariants}
            className="p-4 sm:p-5 rounded-3xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-md"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLifecycleStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-mono text-[#ff5520] uppercase font-black">
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
                    <h3 className="text-xl sm:text-3xl font-black text-white">
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
                    <p className="text-sm sm:text-base md:text-lg text-zinc-100 leading-relaxed pt-0.5 font-medium">
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
                  <div className="px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-left sm:text-right shrink-0">
                    <span className="text-xs font-mono text-zinc-400 block uppercase font-bold">SLA BENCHMARK</span>
                    <span className="text-base sm:text-lg font-mono font-black text-emerald-400 block">
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
                    <span className="text-xs font-mono text-zinc-300 mt-0.5 block font-medium">
                      Target Performance
                    </span>
                  </div>
                </div>

                {/* Subsystem & Objective Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2.5 border-t border-white/[0.08]">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-xs font-mono text-zinc-400 uppercase block font-bold">Under The Hood Tech</span>
                    <span className="text-xs sm:text-sm font-mono text-[#ff5520] font-black mt-0.5 block truncate">
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
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-xs font-mono text-zinc-400 uppercase block font-bold">Primary Actor</span>
                    <span className="text-xs sm:text-sm text-zinc-100 font-bold mt-0.5 block truncate">
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
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <span className="text-xs font-mono text-zinc-400 uppercase block font-bold">Step Objective</span>
                    <span className="text-xs sm:text-sm text-zinc-200 font-semibold mt-0.5 block truncate">
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
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* THE THREE CONCURRENT FLOWS BANNER */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0 transition-all"
          >
            <span className="text-xs sm:text-sm md:text-base font-mono text-[#ff5520] uppercase font-black tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#ff5520]" />
              The Three Concurrent Flows in Every E-Commerce Transaction
            </span>
            <span className="text-xs sm:text-sm md:text-base font-mono font-bold text-zinc-200">
              <span className="text-sky-300 font-black">1. Information Flow</span> · <span className="text-[#ff5520] font-black">2. Financial Flow</span> · <span className="text-emerald-300 font-black">3. Physical Flow</span>
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 05: ADVANTAGES — BASED ON TEXTBOOK LIST
          ========================================================================= */}
      {slideId === 5 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-4 my-auto relative"
        >
          {/* Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10"
          />

          <motion.div variants={headerVariants}>
            <div className="text-xs sm:text-sm font-mono text-[#ff5520] font-black tracking-widest uppercase mb-1">
              SLIDE 05 — ADVANTAGES
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Why E-Commerce Matters
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-1 font-medium">
              Three-column textbook categorization: Customer, Business, and Macro Economy.
            </p>
          </motion.div>

          {/* 3 Columns: CUSTOMER, BUSINESS, ECONOMY from textbook */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Column 1: CUSTOMER */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520]/40 flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-mono text-[#ff5520] font-black uppercase">CUSTOMER</span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-400 font-bold">Buyer Perks</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">For Customers</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm md:text-base text-zinc-200 font-medium">
                  {[
                    "Convenience: 24/7 shopping without traveling to physical markets",
                    "Global selection: Access to products from across regional borders",
                    "Price comparison: Compare deals between multiple stores instantly",
                    "Customer reviews: Read peer experiences and ratings before buying",
                    "Personalization: Tailored suggestions matching individual taste"
                  ].map((adv) => (
                    <motion.li
                      key={adv}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-start gap-2 cursor-default"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ff5520] shrink-0 mt-1" />
                      <span>{adv}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs sm:text-sm font-mono text-zinc-300 font-semibold">
                Textbook focus: Accessibility & ease of discovery
              </div>
            </motion.div>

            {/* Column 2: BUSINESS */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-mono text-amber-400 font-black uppercase">BUSINESS</span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-400 font-bold">Merchant Perks</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">For Businesses</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm md:text-base text-zinc-200 font-medium">
                  {[
                    "Lower operational costs: No need to pay physical store rental leases",
                    "Global reach: Sell goods across regional and national borders",
                    "Data analytics: Monitor customer clicks, trends, and cart drops",
                    "Scalability: Handle thousands of simultaneous digital shoppers",
                    "Automated marketing: Triggered campaigns and digital retargeting"
                  ].map((adv) => (
                    <motion.li
                      key={adv}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-start gap-2 cursor-default"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                      <span>{adv}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs sm:text-sm font-mono text-zinc-300 font-semibold">
                Textbook focus: Eliminates geographic & overhead barriers
              </div>
            </motion.div>

            {/* Column 3: ECONOMY */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-400/40 flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-mono text-emerald-400 font-black uppercase">ECONOMY</span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-400 font-bold">Macro Impact</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">For the Economy</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm md:text-base text-zinc-200 font-medium">
                  {[
                    "Job creation: Transporter couriers, developers & warehouse staff",
                    "SME growth: Local micro-enterprises connect to broader markets",
                    "Financial inclusion: Digital mobile money onboarding for citizens",
                    "Digital transformation: Accelerates national IT infrastructure adoption"
                  ].map((adv) => (
                    <motion.li
                      key={adv}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-start gap-2 cursor-default"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <span>{adv}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs sm:text-sm font-mono text-zinc-300 font-semibold">
                Textbook focus: Drives modernization & enterprise growth
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 06: CHALLENGES — PROBLEMS AND RISKS
          ========================================================================= */}
      {slideId === 6 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-4 my-auto relative"
        >
          {/* Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -left-10 w-80 h-80 bg-red-500/15 rounded-full blur-3xl pointer-events-none -z-10"
          />

          <motion.div variants={headerVariants}>
            <div className="text-xs sm:text-sm font-mono text-red-400 font-black tracking-widest uppercase mb-1">
              SLIDE 06 — CHALLENGES
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              The Dark Side of Digital Commerce
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-1 font-medium">
              Six core risk areas, plus textbook perspective on developing infrastructure.
            </p>
          </motion.div>

          {/* 6 Risk Areas Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                <motion.div
                  key={risk.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.025 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all space-y-2 shadow-md cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-mono font-black text-white uppercase tracking-wider">
                      {risk.title}
                    </span>
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                      <Icon className={`w-5 h-5 ${risk.color}`} />
                    </motion.div>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-200 font-medium">
                    {risk.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <span className="text-[#ff5520] font-bold mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Exact Quote from Grade 11 IT Textbook */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/30 flex items-start gap-3 transition-all"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-mono font-black text-amber-400 uppercase">
                Direct Quote from Grade 11 IT Textbook:
              </span>
              <p className="text-xs sm:text-sm md:text-base text-zinc-100 italic leading-relaxed font-medium">
                “E-commerce is at its infancy stage in Ethiopia. There is a need to develop the e-commerce infrastructure such as Internet access in all places, efficient transport system, appropriate regulations.”
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 07: E-COMMERCE IN ETHIOPIA
          ========================================================================= */}
      {slideId === 7 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full my-auto relative"
        >
          <motion.div variants={headerVariants} className="border-b border-white/[0.08] pb-2 mb-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm font-mono text-[#ff5520] font-black tracking-widest uppercase mb-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff5520] animate-pulse" />
                  <span>SLIDE 07 — E-COMMERCE IN ETHIOPIA</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  E-Commerce in Ethiopia
                </h2>
              </div>
              <span className="hidden sm:inline-block text-xs sm:text-sm font-mono font-bold text-zinc-200 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/15">
                Grade 11 IT Unit 1.3.4
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 mt-0.5 font-medium">
              Definition, current market situations, Telebirr mobile rails & top local company examples.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <EthiopiaSectionView />
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 08: ETHIOPIAN COMPANY PROCESS VIDEO (DELIVER ADDIS)
          ========================================================================= */}
      {slideId === 8 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full h-full flex flex-col justify-between py-1 my-auto"
        >
          <motion.div variants={headerVariants} className="border-b border-white/[0.08] pb-1.5 shrink-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] sm:text-xs font-mono text-[#ff5520] font-black tracking-widest uppercase flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5520] animate-pulse" />
                  <span>SLIDE 08 — ETHIOPIAN COMPANY PROCESS VIDEO</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                  Deliver Addis: Order to Delivery Process
                </h2>
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-black text-[#ff5520] px-3 py-1 rounded-full bg-[#ff5520]/15 border border-[#ff5520]/40 shrink-0">
                Deliver Addis (Local Company)
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-300 font-medium">
              Watch Ethiopia's pioneer delivery company in action: 4 process milestones from app order to final delivery.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex-1 flex flex-col justify-between min-h-0 pt-1">
            <VideoJourneyView />
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 09: APPLIED DEMO (FIGURE 1.15) — EXPERIENCE AN ONLINE STORE
          ========================================================================= */}
      {slideId === 9 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full relative"
        >
          <motion.div variants={headerVariants} className="sticky top-0 z-30 bg-[#0c0c0e]/95 backdrop-blur-md pt-1 pb-2.5 border-b border-white/[0.08] mb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs sm:text-sm font-mono text-[#ff5520] font-black tracking-widest uppercase mb-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff5520] animate-pulse" />
                  <span>SLIDE 09 — APPLIED DEMO (FIGURE 1.15)</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Experience an Online Store
                </h2>
              </div>
              <span className="hidden sm:inline-block text-xs sm:text-sm font-mono font-bold text-zinc-200 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/15">
                Figure 1.15 Simulation
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 mt-0.5 font-medium">
              Interactive store demo based on Figure 1.15 ("Car for Sale in Ethiopia") · Test browsing, item specs & Telebirr checkout.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <AppliedDemoView />
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 10: CONCLUSION — WHAT DID WE LEARN?
          ========================================================================= */}
      {slideId === 10 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-4 my-auto relative"
        >
          {/* Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -right-10 w-80 h-80 bg-[#ff5520]/20 rounded-full blur-3xl pointer-events-none -z-10"
          />

          <motion.div variants={headerVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5">
            <div>
              <div className="text-xs sm:text-sm font-mono text-[#ff5520] font-black tracking-widest uppercase mb-1">
                SLIDE 10 — CONCLUSION
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                What Did We Learn?
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                audioManager.playSlideChange('next');
                onNext();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md shadow-[#ff5520]/20 transition-all"
            >
              <span>View Group Credits</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* 5 Takeaway Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { num: "01", text: "E-Commerce transforms commerce digitally across every traditional sector." },
              { num: "02", text: "It connects customers, businesses, payments, and logistics in real-time." },
              { num: "03", text: "It creates unprecedented opportunities but also introduces critical new risks." },
              { num: "04", text: "Local infrastructure strongly shapes how e-commerce develops regionally." },
              { num: "05", text: "The future is increasingly connected, mobile, AI-powered, and omnichannel." }
            ].map((card) => (
              <motion.div
                key={card.num}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.04 }}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520]/40 flex flex-col justify-between transition-colors shadow-md cursor-default"
              >
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#ff5520]">{card.num}</span>
                <p className="text-xs sm:text-sm md:text-base text-zinc-100 font-semibold leading-relaxed mt-3">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Final Large Statement & QUESTIONS? */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.008 }}
            className="p-5 sm:p-7 rounded-3xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-md space-y-3.5 text-center sm:text-left transition-all"
          >
            <p className="text-lg sm:text-2xl md:text-3xl font-light text-white leading-relaxed">
              “E-Commerce is not simply buying and selling online. <br className="hidden sm:inline" />
              <strong className="text-[#ff5520] font-black">It is the digital infrastructure connecting modern commerce.”</strong>
            </p>

            <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-2xl sm:text-4xl font-black tracking-widest text-white uppercase font-mono">
                QUESTIONS?
              </span>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    audioManager.playAction();
                    onSelectSlide(11);
                  }}
                  className="px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#ff5520]" />
                  <span>Meet Group Members</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    audioManager.playAction();
                    onSelectSlide(0);
                  }}
                  className="px-6 py-3 rounded-full bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#ff5520]/25"
                >
                  Restart Deck ↺
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* =========================================================================
          SLIDE 11: GROUP MEMBERS (FULL SCREEN PRESENTATION KEYNOTE)
          ========================================================================= */}
      {slideId === 11 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full h-full flex flex-col justify-between py-2 sm:py-3.5 my-auto relative"
        >
          {/* Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 left-1/3 w-96 h-96 bg-[#ff5520]/20 rounded-full blur-3xl pointer-events-none -z-10"
          />

          {/* Header */}
          <motion.div variants={headerVariants} className="text-center space-y-1 border-b border-white/[0.08] pb-1.5 sm:pb-2 shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-0.5 rounded-full bg-[#ff5520]/15 border border-[#ff5520]/30 text-[#ff5520] text-xs font-mono font-black uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>SLIDE 11 — GROUP MEMBERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Group Members
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-base font-mono font-black text-[#ff5520]">
              <GraduationCap className="w-4 h-4" />
              <span>IFA BORU BITE SPECIAL SECONDARY SCHOOL</span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-300 font-medium">
              Grade 11 Information Technology · E-Commerce Presentation
            </p>
          </motion.div>

          {/* 5 Prominent Student Member Cards across 5 columns */}
          <div className="my-auto py-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full">
            {students.map((student) => (
              <motion.div
                key={student.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.035,
                  borderColor: 'rgba(255, 85, 32, 0.65)',
                  boxShadow: '0 20px 35px -10px rgba(255, 85, 32, 0.25)'
                }}
                className="p-3.5 sm:p-4 rounded-3xl bg-white/[0.04] border border-white/[0.1] hover:border-[#ff5520]/50 backdrop-blur-md flex flex-col justify-between transition-all shadow-lg group cursor-default"
              >
                <div className="space-y-3">
                  {/* Top Row: Avatar Icon & Member Pill */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{ scale: 1.25, rotate: 10 }}
                      className="w-10 h-10 rounded-2xl bg-[#ff5520]/15 border border-[#ff5520]/35 flex items-center justify-center text-[#ff5520]"
                    >
                      <User className="w-5 h-5" />
                    </motion.div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff5520]/15 border border-[#ff5520]/30 text-[10px] font-mono font-bold text-[#ff5520] uppercase">
                      Member
                    </span>
                  </div>

                  {/* Student Name */}
                  <div className="pt-0.5">
                    <h4 className="text-base sm:text-lg font-black text-white tracking-wide line-clamp-1 group-hover:text-[#ff5520] transition-colors">
                      {student.name}
                    </h4>
                    <span className="text-[11px] sm:text-xs text-zinc-400 font-mono mt-0.5 block">
                      Grade 11 Student
                    </span>
                  </div>
                </div>

                {/* Bottom: School Tag & E-Commerce */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold truncate">
                    IFA BORU BITE
                  </span>
                  <span className="text-[10px] font-mono text-[#ff5520] font-bold">
                    E-Commerce
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Thank You & Closing Footer */}
          <motion.div variants={itemVariants} className="pt-1.5 sm:pt-2 border-t border-white/[0.08] text-center space-y-1.5 shrink-0">
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-widest uppercase font-mono">
              THANK YOU!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto font-medium">
              Presented to our teacher and fellow Grade 11 classmates at IFA BORU BITE SPECIAL SECONDARY SCHOOL.
            </p>

            <div className="pt-0.5 flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  audioManager.playTick();
                  onSelectSlide(0);
                }}
                className="px-5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-[#ff5520]" />
                <span>Return to Home</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  audioManager.playAction();
                  onSelectSlide(1);
                }}
                className="px-6 py-2 rounded-full bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#ff5520]/25 transition-transform"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Presentation</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
