import React, { useState } from 'react';
import {
  Smartphone,
  MapPin,
  ShieldCheck,
  MessageSquare,
  AlertTriangle
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
    <div className="w-full flex flex-col justify-start space-y-2.5">
      {/* 1. Simple Definition Statement */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-[#ff5520]/30 relative overflow-hidden backdrop-blur-md shadow-md">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#ff5520]" />
        <span className="text-xs sm:text-sm font-mono text-[#ff5520] uppercase font-black tracking-widest block mb-1">
          Simple Definition · Grade 11 IT Unit 1.3.4
        </span>
        <p className="text-sm sm:text-lg md:text-xl text-white font-medium leading-relaxed pl-1">
          “In Ethiopia, <strong className="text-[#ff5520] font-black">E-Commerce</strong> means buying and selling products on smartphones—mainly using <span className="underline decoration-[#ff5520] decoration-2 underline-offset-4 font-bold text-white">Telebirr & CBE Birr</span> for payment and <span className="underline decoration-[#ff5520] decoration-2 underline-offset-4 font-bold text-white">Telegram channels</span> as stores, with motorcycle couriers delivering to landmarks.”
        </p>
      </div>

      {/* 2. The 4 Core Situations in Ethiopia */}
      <div>
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-xs sm:text-sm font-mono text-zinc-200 uppercase tracking-wider font-black">
            The 4 Key Situations in Ethiopia:
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-[#ff5520]">Current Market Realities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {situations.map((sit) => {
            const Icon = sit.icon;
            return (
              <div
                key={sit.id}
                className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff5520]/40 transition-all flex flex-col justify-between space-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-[#ff5520]/20 border border-[#ff5520]/35 flex items-center justify-center text-[#ff5520]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#ff5520] px-2 py-0.5 rounded bg-[#ff5520]/15">
                      {sit.highlight}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-white leading-tight">{sit.title}</h4>
                  <p className="text-xs sm:text-sm text-zinc-200 mt-1 leading-relaxed font-medium">{sit.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Top Ethiopian Company Examples */}
      <div>
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-xs sm:text-sm font-mono text-zinc-200 uppercase tracking-wider font-black">
            Top Ethiopian E-Commerce Examples:
          </span>
          <span className="text-xs font-mono font-bold text-zinc-400">Local Leaders</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {examples.map((ex, idx) => (
            <div
              key={ex.name}
              onClick={() => {
                audioManager.playTick();
                setSelectedExample(selectedExample === idx ? null : idx);
              }}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedExample === idx
                  ? 'bg-[#ff5520]/20 border-[#ff5520] ring-2 ring-[#ff5520]/40'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-sm font-mono font-black text-[#ff5520]">{ex.iconText}</span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-300 px-1.5 py-0.5 rounded bg-white/10">
                    {ex.badge}
                  </span>
                </div>
                <h5 className="text-xs sm:text-sm font-black text-white truncate">{ex.name}</h5>
                <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5 line-clamp-1 font-medium">{ex.role}</p>
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-400 pt-1.5 block truncate">
                {ex.stat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Grade 11 IT Textbook Note */}
      <div className="p-3 rounded-xl bg-amber-500/[0.08] border border-amber-500/30 flex items-center gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-xs sm:text-sm text-zinc-200 font-medium">
          <strong className="text-white font-bold">Textbook Key Point:</strong> E-commerce is still developing in Ethiopia. It requires expanding nationwide internet coverage, reliable transport systems, and digital trade laws.
        </p>
      </div>
    </div>
  );
};
