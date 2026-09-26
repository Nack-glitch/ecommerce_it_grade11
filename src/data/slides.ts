export interface SlideData {
  id: number;
  indexFormatted: string; // e.g., "01"
  badge: string; // e.g. "00 — INTRODUCTION"
  titlePrefix?: string; // "E-"
  titleAccent?: string; // "COMMERCE"
  fullTitle?: string;
  subtitle: string;
  description: string;
  tags: string[];
  ctaText?: string;
  speakerNotes: {
    duration: string;
    keyPoints: string[];
    presenterTip: string;
  };
  details?: {
    stats?: { label: string; value: string; change?: string; hint?: string }[];
    steps?: { id: string; title: string; subtitle: string; icon: string; desc: string; latency?: string }[];
    comparison?: { name: string; tag: string; aov: string; cac: string; margins: string; strength: string; challenge: string }[];
    takeaways?: string[];
  };
}

export const TOTAL_SLIDES = 13;

export const SLIDES: SlideData[] = [
  {
    id: 1,
    indexFormatted: "01",
    badge: "00 — INTRODUCTION",
    titlePrefix: "E-",
    titleAccent: "COMMERCE",
    subtitle: "From Click to Commerce",
    description:
      "E-commerce is far more than buying products online. It connects technology, customers, businesses, payments, logistics and digital services into one continuous system.",
    tags: ["DIGITAL ECONOMY", "INTERACTIVE PRESENTATION", "2026"],
    ctaText: "ENTER PRESENTATION →",
    speakerNotes: {
      duration: "1:30 min",
      keyPoints: [
        "Welcome attendees and set the stage for modern digital commerce.",
        "Emphasize that commerce is no longer just a digital catalog — it is a distributed, real-time operating system.",
        "Highlight the transition from 'e-commerce as a sales channel' to 'commerce everywhere' (omnipresent digital trade)."
      ],
      presenterTip: "Use the keyboard arrow keys or bottom navigation bar to transition smoothly between slides. Press 'F' for fullscreen presentation mode."
    }
  },
  {
    id: 2,
    indexFormatted: "02",
    badge: "01 — THE ECOSYSTEM",
    titlePrefix: "THE UNIFIED ",
    titleAccent: "VALUE CHAIN",
    subtitle: "From Intent to Doorstep Delivery",
    description:
      "A single purchase triggers a coordinated dance across 5 critical subsystems within milliseconds. A failure in any one layer breaks the customer promise.",
    tags: ["SYSTEMS ARCHITECTURE", "VALUE STREAM", "END-TO-END"],
    speakerNotes: {
      duration: "2:00 min",
      keyPoints: [
        "Walk through the 5 nodes in the diagram: Storefront, Order Engine, Payment Rail, Fulfillment Hub, and Last-Mile.",
        "Highlight that 80% of customer churn occurs at friction points between systems (e.g. cart-to-payment drop-off).",
        "Explain the importance of sub-50ms API orchestrations in modern distributed commerce."
      ],
      presenterTip: "Click each node in the value chain below to inspect its latency budget, core technology, and business risk."
    },
    details: {
      steps: [
        {
          id: "discovery",
          title: "Discovery & Experience",
          subtitle: "Storefronts & Social",
          icon: "Sparkles",
          desc: "Headless web frontends, mobile apps, social shopping channels, and AI shopping assistants capturing intent.",
          latency: "< 120ms LCP"
        },
        {
          id: "cart",
          title: "Cart & Pricing Engine",
          subtitle: "Rules & Inventory",
          icon: "ShoppingCart",
          desc: "Real-time inventory reservations, dynamic localized tax calculation, tiered promotion rules, and currency conversion.",
          latency: "25ms execution"
        },
        {
          id: "settlement",
          title: "Payment & Risk Gate",
          subtitle: "Auth & Anti-Fraud",
          icon: "ShieldCheck",
          desc: "Network tokenization, 3D Secure biometric auth, machine learning fraud scoring, and multi-processor settlement.",
          latency: "450ms roundtrip"
        },
        {
          id: "fulfillment",
          title: "Order & Warehouse WMS",
          subtitle: "Routing & Robotics",
          icon: "Box",
          desc: "Distributed order management (DOM), automated picking robots (AGV), batch sorting, and package scanning.",
          latency: "Sub-15m dispatch"
        },
        {
          id: "logistics",
          title: "Last-Mile Delivery",
          subtitle: "Carriers & Tracking",
          icon: "Truck",
          desc: "Dynamic carrier rate routing, GPS live dispatch, automated locker nodes, and reverse return logistics.",
          latency: "Same-day / 24h SLA"
        }
      ]
    }
  },
  {
    id: 3,
    indexFormatted: "03",
    badge: "02 — GLOBAL SCALE",
    titlePrefix: "THE $6.8T ",
    titleAccent: "PARADIGM",
    subtitle: "Global Penetration & Consumer Shift",
    description:
      "Digital commerce has matured from an auxiliary sales pipe into the primary growth locomotive of global retail trade, with mobile transactions driving the bulk of checkout volume.",
    tags: ["GLOBAL MACRO", "MARKET SIZE", "CONSUMER BEHAVIOR"],
    speakerNotes: {
      duration: "2:15 min",
      keyPoints: [
        "Global e-commerce retail turnover surpasses $6.8 Trillion in 2026.",
        "Mobile commerce (m-commerce) represents nearly three-quarters of all digital purchases.",
        "Cross-border purchases are growing twice as fast as domestic retail, driven by multi-currency payment rails."
      ],
      presenterTip: "Toggle between the regional tabs to compare North America, Europe, and Asia-Pacific digital penetration rates."
    },
    details: {
      stats: [
        { label: "Global E-Commerce GMV", value: "$6.82T", change: "+9.4% YoY", hint: "Worldwide retail digital sales" },
        { label: "Mobile Commerce Share", value: "73.8%", change: "+4.2% YoY", hint: "Smartphones & digital wallets" },
        { label: "Cross-Border Volume", value: "$1.95T", change: "+14.8% YoY", hint: "Purchases made internationally" },
        { label: "Active Digital Buyers", value: "2.78B", change: "+3.1% YoY", hint: "34.5% of total world population" }
      ]
    }
  },
  {
    id: 4,
    indexFormatted: "04",
    badge: "03 — BUSINESS MODELS",
    titlePrefix: "COMMERCIAL ",
    titleAccent: "ARCHETYPES",
    subtitle: "B2C, B2B, D2C & Multi-Sided Marketplaces",
    description:
      "Different business models require fundamentally distinct technological primitives, pricing algorithms, and fulfillment cadences. No single blueprint fits all four.",
    tags: ["BUSINESS MODELS", "UNIT ECONOMICS", "STRATEGY"],
    speakerNotes: {
      duration: "2:30 min",
      keyPoints: [
        "Contrast B2C consumer impulse buying with B2B contract-based purchasing with Net-30 credit terms.",
        "Examine the margin economics of D2C brands: higher gross margins offset by rising customer acquisition costs (CAC).",
        "Highlight marketplace take-rates (8% - 15%) and the flywheel of network effects."
      ],
      presenterTip: "Use the interactive archetype switcher to drill down into unit economics, typical customer lifespans, and operational bottlenecks."
    },
    details: {
      comparison: [
        {
          name: "B2C (Retail & Brands)",
          tag: "Direct Consumer",
          aov: "$78 - $140",
          cac: "High ($25 - $50)",
          margins: "40% - 55%",
          strength: "Frictionless checkout, massive addressable market",
          challenge: "High cart abandonment, ad platform dependency"
        },
        {
          name: "B2B (Wholesale / Enterprise)",
          tag: "Business Accounts",
          aov: "$1,850 - $12,000+",
          cac: "Low relative to LTV",
          margins: "20% - 35%",
          strength: "High order predictability, custom negotiated tiers",
          challenge: "Complex ERP integrations, credit approval delays"
        },
        {
          name: "D2C (Pure-Play Digital)",
          tag: "Brand Owned",
          aov: "$95 - $210",
          cac: "Escalating ($40 - $85)",
          margins: "60% - 75%",
          strength: "Direct 1st-party customer data, brand loyalty",
          challenge: "Logistics scale constraints, rising privacy ad costs"
        },
        {
          name: "Marketplaces (Platforms)",
          tag: "Aggregator Model",
          aov: "Blended ($62)",
          cac: "Distributed to sellers",
          margins: "10% - 20% Take Rate",
          strength: "Unbounded catalog breadth, self-reinforcing flywheel",
          challenge: "Seller counterfeit control, platform regulatory scrutiny"
        }
      ]
    }
  },
  {
    id: 5,
    indexFormatted: "05",
    badge: "04 — TECH STACK",
    titlePrefix: "HEADLESS & ",
    titleAccent: "COMPOSABLE",
    subtitle: "Modern MACH vs Monolithic Architecture",
    description:
      "Legacy monolithic commerce suites have given way to MACH: Microservices, API-first, Cloud-native, and Headless architectures that deploy frontend changes in seconds.",
    tags: ["TECH STACK", "MACH PRINCIPLES", "API-FIRST"],
    speakerNotes: {
      duration: "2:00 min",
      keyPoints: [
        "Explain the fundamental decoupling: the frontend experience layer is completely separated from the commerce backend.",
        "Demonstrate how headless enables multi-channel storefronts: web, mobile app, in-store kiosk, and voice UI all querying the same API.",
        "Discuss developer velocity: deploying a new landing page without risking checkout stability."
      ],
      presenterTip: "Click between 'Monolithic Legacy' and 'Composable MACH' to visually contrast the architectural layers."
    }
  },
  {
    id: 6,
    indexFormatted: "06",
    badge: "05 — PAYMENT REVOLUTION",
    titlePrefix: "FRICTIONLESS ",
    titleAccent: "SETTLEMENT",
    subtitle: "The Zero-Friction Checkout Frontier",
    description:
      "Payments are no longer an afterthought at the end of the funnel. Modern checkout engines use cryptographic tokenization, biometrics, and AI to approve authentic transactions in under 500 milliseconds.",
    tags: ["FINTECH", "TOKENIZATION", "ONE-CLICK"],
    speakerNotes: {
      duration: "2:15 min",
      keyPoints: [
        "Network tokens replace 16-digit PANs with cryptographic representations that never expire and improve auth rates by 3-5%.",
        "Wallets (Apple Pay, Google Pay, Shop Pay) reduce checkout friction from 18 form fields down to a single fingerprint tap.",
        "Explain the delicate balance: maximizing payment acceptance while blocking automated bot credential-stuffing."
      ],
      presenterTip: "Run the interactive payment auth simulation to view the exact sub-millisecond timeline of a 3D-Secure 2.3 transaction."
    }
  },
  {
    id: 7,
    indexFormatted: "07",
    badge: "06 — LOGISTICS & WAREHOUSING",
    titlePrefix: "SUPPLY CHAIN ",
    titleAccent: "VELOCITY",
    subtitle: "The Physical Reality Behind the Screen",
    description:
      "The competitive battleground of modern e-commerce is fought in the warehouse. Predictive inventory placement, automated guided vehicles, and micro-fulfillment centers shrink transit times to hours.",
    tags: ["LOGISTICS", "MICRO-FULFILLMENT", "AUTONOMOUS WMS"],
    speakerNotes: {
      duration: "2:10 min",
      keyPoints: [
        "Explain predictive inventory allocation: shipping items to regional hubs before the customer even clicks 'buy'.",
        "The emergence of urban micro-fulfillment centers (dark stores) enabling 1-hour grocery and retail delivery.",
        "Dynamic carrier routing: algorithms choosing between postal, private courier, or gig-economy drivers in real-time."
      ],
      presenterTip: "Highlight the SLA comparison: Next-day delivery expectations have jumped from 32% to 68% of consumers in the last 3 years."
    }
  },
  {
    id: 8,
    indexFormatted: "08",
    badge: "07 — ARTIFICIAL INTELLIGENCE",
    titlePrefix: "INTELLIGENT ",
    titleAccent: "MERCHANDISING",
    subtitle: "Hyper-Personalization & Agentic Shopping",
    description:
      "AI in commerce has moved beyond basic product recommendations. Natural language search, generative 3D visualization, dynamic pricing engines, and autonomous buyer agents represent the new baseline.",
    tags: ["AGENTIC AI", "PERSONALIZATION", "DYNAMIC PRICING"],
    speakerNotes: {
      duration: "2:30 min",
      keyPoints: [
        "Vector search allows customers to search with natural queries: 'outfit for summer rooftop wedding in Kyoto' instead of keywords.",
        "Dynamic pricing models balancing inventory velocity, competitor scrapers, and customer price elasticity.",
        "The upcoming shift: AI agents doing the shopping on behalf of consumers based on personal preferences and budget limits."
      ],
      presenterTip: "Test the interactive AI prompt simulator on this slide to see how natural language gets parsed into structured cart items."
    }
  },
  {
    id: 9,
    indexFormatted: "09",
    badge: "08 — OMNICHANNEL COMMERCE",
    titlePrefix: "THE HYBRID ",
    titleAccent: "STOREFRONT",
    subtitle: "Dissolving the Physical vs Digital Boundary",
    description:
      "Over 75% of consumers begin their shopping journey online and conclude it in a physical store — or vice-versa. Winning brands treat online and offline as a single synchronized surface.",
    tags: ["OMNICHANNEL", "BOPIS", "UNIFIED IDENTITY"],
    speakerNotes: {
      duration: "1:45 min",
      keyPoints: [
        "BOPIS (Buy Online, Pick Up In Store) drives incremental in-store purchases in 38% of visits.",
        "Endless Aisle: Store associates equipped with tablets can fulfill out-of-stock sizes directly from warehouse to consumer home.",
        "Unified customer profile: knowing a customer's digital wishlist when they walk into a flagship retail boutique."
      ],
      presenterTip: "Emphasize that physical stores have transformed from storage warehouses into experience centers and hyper-local fulfillment nodes."
    }
  },
  {
    id: 10,
    indexFormatted: "10",
    badge: "09 — CONVERSION SCIENCE",
    titlePrefix: "THE 70% ",
    titleAccent: "FUNNEL LEAK",
    subtitle: "Checkout Optimization & Latency Economics",
    description:
      "The global shopping cart abandonment rate hovers at 70.19%. Small UX frictions, hidden shipping fees, and slow page response times collectively bleed billions in lost revenue.",
    tags: ["CONVERSION RATE (CRO)", "LATENCY IMPACT", "CHECKOUT UX"],
    speakerNotes: {
      duration: "2:15 min",
      keyPoints: [
        "Breakdown of abandonment causes: 48% hidden shipping fees, 24% mandatory account creation, 18% complicated checkout process.",
        "Every 100ms improvement in site latency correlates to a 1.1% increase in conversion rate.",
        "Address verification auto-complete alone reduces checkout drop-off by 14% on mobile devices."
      ],
      presenterTip: "Interact with the Latency vs Conversion slider to see projected revenue recovery for a $50M GMV brand."
    }
  },
  {
    id: 11,
    indexFormatted: "11",
    badge: "10 — TRUST & CYBERSECURITY",
    titlePrefix: "RESILIENCE & ",
    titleAccent: "TRUST RAILS",
    subtitle: "Safeguarding Capital and Consumer Identity",
    description:
      "Digital commerce is the primary target for automated credential stuffing, card testing bots, and chargeback fraud. Security cannot come at the expense of user experience.",
    tags: ["CYBERSECURITY", "PCI-DSS 4.0", "FRAUD DEFENSE"],
    speakerNotes: {
      duration: "2:00 min",
      keyPoints: [
        "PCI-DSS 4.0 compliance introduces stringent browser script monitoring to prevent digital skimming (Magecart attacks).",
        "Account Takeover (ATO) attacks surged 140% with the proliferation of leaked password databases.",
        "Behavioral biometrics: analyzing mouse movement, keystroke cadence, and device orientation without frustrating human shoppers."
      ],
      presenterTip: "Point out that consumer trust is asymmetric: it takes years to build and an instant data leak to destroy."
    }
  },
  {
    id: 12,
    indexFormatted: "12",
    badge: "11 — HORIZONS (2026+)",
    titlePrefix: "THE NEXT ",
    titleAccent: "DECADE",
    subtitle: "Emerging Paradigms Reshaping Trade",
    description:
      "The next wave of commerce will look radically different: autonomous machine-to-machine replenishment, spatial computing virtual fit, circular re-commerce, and drone delivery fleets.",
    tags: ["2026+ HORIZONS", "AUTONOMOUS IOT", "CIRCULAR COMMERCE"],
    speakerNotes: {
      duration: "2:10 min",
      keyPoints: [
        "Machine-to-Machine (M2M) Commerce: Smart refrigerators, printers, and manufacturing sensors placing authorized micro-orders.",
        "Circular Commerce: Brands embedding buy-back, verified pre-owned, and recycling credits directly into product lifecycle tags.",
        "Spatial Commerce: Photorealistic Apple Vision Pro / WebXR experiences replacing flat product photo grids."
      ],
      presenterTip: "Ask the audience: 'How does your commerce platform behave when your primary customer is an AI agent rather than a human?'"
    }
  },
  {
    id: 13,
    indexFormatted: "13",
    badge: "12 — STRATEGIC IMPERATIVES",
    titlePrefix: "THE MODERN ",
    titleAccent: "PLAYBOOK",
    subtitle: "Core Principles for Enduring Digital Commerce",
    description:
      "The winners of the next decade of commerce will not simply optimize their website. They will orchestrate an agile, high-trust, resilient ecosystem connecting every touchpoint in real time.",
    tags: ["EXECUTIVE SUMMARY", "STRATEGIC PLAYBOOK", "Q&A"],
    ctaText: "RESTART DECK ↺",
    speakerNotes: {
      duration: "2:00 min",
      keyPoints: [
        "Summarize the 4 foundational pillars: Speed, Frictionless Identity, Composable Modularity, and Uncompromising Trust.",
        "Remind leaders that commerce is an ongoing technological marathon, not a one-time website project.",
        "Open the floor for questions and strategic discussions."
      ],
      presenterTip: "Direct attendees to download the executive slide summary or use the presentation controls to review specific slides."
    },
    details: {
      takeaways: [
        "Uncompromising Velocity: Latency, page weight, and checkout steps are direct revenue levers.",
        "Composable Agility: Decouple presentation from core commerce to adapt to new channels within days, not quarters.",
        "Intelligent Personalization: Replace static rules with real-time vector embeddings and predictive intent.",
        "Trust as a Moat: Guard consumer data and payments with zero-friction cryptographic security."
      ]
    }
  }
];
