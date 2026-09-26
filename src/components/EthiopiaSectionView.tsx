import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Smartphone,
  CreditCard,
  MapPin,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Truck,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { audioManager } from '../utils/audio';

export const EthiopiaSectionView: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const situations = [
    {
      id: 1,
      title: "1. Mobile Money Boom",
      icon: Smartphone,
      highlight: "47M+ Telebirr Users",
      desc: "Ethiopians use Telebirr and CBE Birr instead of credit cards. Anyone can pay in seconds by scanning a QR code or dialing USSD."
    },
    {
      id: 2,
      title: "2. Telegram Shopping",
      icon: MessageSquare,
      highlight: "Chat Commerce #1",
      desc: "Telegram is Ethiopia's biggest online market. Buyers browse photo channels, message sellers directly, and transfer money."
    },
    {
      id: 3,
      title: "3. Landmark Delivery",
      icon: MapPin,
      highlight: "No Street Numbers",
      desc: "Cities lack street addresses. Motorcycle couriers call buyers 2-3 times to meet at landmarks (churches, roundabouts, cafes)."
    },
    {
      id: 4,
      title: "4. Cash on Delivery (COD)",
      icon: ShieldCheck,
      highlight: "Pay Upon Inspection",
      desc: "Because of trust and counterfeit worries, many buyers prefer to check the product in person before releasing payment."
    }
  ];

  const examples = [
    {
      name: "Telebirr",
      role: "Mobile Money & QR Payments",
      stat: "47M+ Users (Ethio Telecom)",
      badge: "Payment Rail",
      iconText: "TB"
    },
    {
      name: "CBE Birr",
      role: "Commercial Bank Mobile Wallet",
      stat: "Nationwide Bank Network",
      badge: "Core Banking",
      iconText: "CBE"
    },
    {
      name: "Chapa",
      role: "Online Payment Gateway API",
      stat: "Powers Local E-Commerce Sites",
      badge: "Fintech API",
      iconText: "CH"
    },
    {
      name: "Deliver Addis",
      role: "Pioneer Food & Grocery Delivery",
      stat: "Motorcycle Fleet (Since 2015)",
      badge: "Delivery",
      iconText: "DA"
    },
    {
      name: "BeU Delivery",
      role: "Fast On-Demand Food Dispatch",
      stat: "High-Volume City Courier",
      badge: "Courier",
      iconText: "BEU"
    },
    {
      name: "ZMall",
      role: "Online Multi-Vendor Shopping",
      stat: "Electronics, Groceries & Goods",
      badge: "Marketplace",
      iconText: "ZM"
    }
  ];

  return (
    <div className="w-full flex flex-col justify-start py-1 max-w-6xl mx-auto space-y-3.5 pb-4">
      {/* 1. Simple Definition Statement */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-[#ff5520]/25 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ff5520]" />
        <span className="text-[11px] font-mono text-[#ff5520] uppercase font-bold tracking-widest block mb-1">
          Simple Definition · Grade 11 IT Unit 1.3.4
        </span>
        <p className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">
          “In Ethiopia, <strong className="text-[#ff5520]">E-Commerce</strong> means buying and selling products on smartphones—mainly using <span className="underline decoration-[#ff5520] underline-offset-4 font-semibold">Telebirr & CBE Birr</span> for payment and <span className="underline decoration-[#ff5520] underline-offset-4 font-semibold">Telegram channels</span> as stores, with motorcycle couriers delivering to landmarks.”
        </p>
      </div>

      {/* 2. The 4 Core Situations in Ethiopia (Simple, high-impact 4 cards) */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
            The 4 Key Situations in Ethiopia:
          </span>
          <span className="text-[11px] font-mono text-[#ff5520]">Current Market Realities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {situations.map((sit) => {
            const Icon = sit.icon;
            return (
              <div
                key={sit.id}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-[#ff5520]/40 transition-all flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#ff5520]/15 border border-[#ff5520]/30 flex items-center justify-center text-[#ff5520]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#ff5520] px-2 py-0.5 rounded bg-[#ff5520]/10">
                      {sit.highlight}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight">{sit.title}</h4>
                  <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">{sit.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Top Ethiopian Company Examples (Clean grid of 6 key companies) */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
            Top Ethiopian E-Commerce Examples:
          </span>
          <span className="text-[11px] font-mono text-zinc-500">Local Leaders</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {examples.map((ex, idx) => (
            <div
              key={ex.name}
              onClick={() => {
                audioManager.playTick();
                setSelectedExample(selectedExample === idx ? null : idx);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedExample === idx
                  ? 'bg-[#ff5520]/15 border-[#ff5520] ring-1 ring-[#ff5520]/40'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-black text-[#ff5520]">{ex.iconText}</span>
                  <span className="text-[9px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-white/5">
                    {ex.badge}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-white truncate">{ex.name}</h5>
                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{ex.role}</p>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 pt-2 block truncate">{ex.stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Grade 11 IT Textbook Note */}
      <div className="p-3.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 flex items-center gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-xs text-zinc-300">
          <strong className="text-white">Textbook Key Point:</strong> E-commerce is still developing in Ethiopia. It requires expanding nationwide internet coverage, reliable transport systems, and digital trade laws.
        </p>
      </div>
    </div>
  );
};
