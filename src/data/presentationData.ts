export interface PresentationSlide {
  id: number;
  slideNumber: string; // e.g. "00", "01", ..., "12"
  title: string;
  subtitle: string;
  category: string;
}

export const PRESENTATION_SECTIONS: PresentationSlide[] = [
  {
    id: 0,
    slideNumber: "00",
    title: "E-COMMERCE",
    subtitle: "Electronic Commerce · IFA BORU BITE SPECIAL SECONDARY SCHOOL",
    category: "OPENING"
  },
  {
    id: 1,
    slideNumber: "01",
    title: "What is E-Commerce?",
    subtitle: "Grade 11 IT Unit 1.3.4 Definition, digital ecosystem & timeline",
    category: "DEFINITION"
  },
  {
    id: 2,
    slideNumber: "02",
    title: "The Ecosystem of E-Commerce",
    subtitle: "Figure 1.14: Merchant, Buyer, Transporter, and Ecommerce Website",
    category: "COMPONENTS"
  },
  {
    id: 3,
    slideNumber: "03",
    title: "The Four Pillars",
    subtitle: "Core transaction models: B2B, B2C, C2C, C2B, plus emerging D2C & B2B2C",
    category: "TYPES"
  },
  {
    id: 4,
    slideNumber: "04",
    title: "From One Click to Delivery",
    subtitle: "The 8-step lifecycle linking frontend discovery with physical fulfillment",
    category: "HOW IT WORKS"
  },
  {
    id: 5,
    slideNumber: "05",
    title: "Why E-Commerce Matters",
    subtitle: "Textbook list of advantages: Customer, Business, and Macro Economy",
    category: "ADVANTAGES"
  },
  {
    id: 6,
    slideNumber: "06",
    title: "The Dark Side of Digital Commerce",
    subtitle: "Six risk areas and textbook insights on Ethiopian infrastructure",
    category: "CHALLENGES"
  },
  {
    id: 7,
    slideNumber: "07",
    title: "E-Commerce in Ethiopia",
    subtitle: "What it is, current situations, mobile money boom & top local examples",
    category: "ETHIOPIA"
  },
  {
    id: 8,
    slideNumber: "08",
    title: "Deliver Addis Process Video",
    subtitle: "Watch Ethiopia's pioneer delivery company from Telebirr payment to motorcycle handover",
    category: "PROCESS VIDEO"
  },
  {
    id: 9,
    slideNumber: "09",
    title: "Experience an Online Store",
    subtitle: "Applied demo matching Figure 1.15 style (Vehicles & Goods in Ethiopia)",
    category: "APPLIED DEMO"
  },
  {
    id: 10,
    slideNumber: "10",
    title: "What Did We Learn?",
    subtitle: "Five core takeaways and the enduring digital infrastructure paradigm",
    category: "CONCLUSION"
  },
  {
    id: 11,
    slideNumber: "11",
    title: "Group Members / Credits",
    subtitle: "IFA BORU BITE SPECIAL SECONDARY SCHOOL · Grade 11 IT Unit 1.3.4",
    category: "CREDITS"
  }
];

export interface StudentCredit {
  id: number;
  name: string;
  rollNumber: string;
  role?: string;
}

export const DEFAULT_STUDENTS: StudentCredit[] = [
  { id: 1, name: "Student One", rollNumber: "001", role: "Presenter & Research" },
  { id: 2, name: "Student Two", rollNumber: "002", role: "Slide Content & Figures" },
  { id: 3, name: "Student Three", rollNumber: "003", role: "Ethiopian Commerce Case Study" },
  { id: 4, name: "Student Four", rollNumber: "004", role: "Demo Store & Workflows" },
  { id: 5, name: "Student Five", rollNumber: "005", role: "Technical Delivery & Q&A" }
];

export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  priceETB: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  image: string;
  description: string;
  badge?: string;
  features: string[];
}

// Products including Figure 1.15 "Car for Sale in Ethiopia" and Ethiopian commerce items
export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: "car1",
    name: "Toyota Vitz (Figure 1.15: Car for Sale in Ethiopia)",
    category: "Vehicles & Transport",
    priceETB: 1450000,
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    description: "Referenced directly from Grade 11 IT textbook Figure 1.15 (Car for Sale in Ethiopia online store). Low fuel consumption, automatic transmission, pristine Addis inspection document.",
    badge: "Textbook Fig 1.15",
    features: ["Automatic Transmission", "Low Mileage (48,000 km)", "Original Duty Cleared", "Registered in Addis Ababa"]
  },
  {
    id: "p1",
    name: "Yirgacheffe Single-Origin Special Reserve Coffee",
    category: "Coffee & Gourmet",
    priceETB: 1250,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80",
    description: "Hand-picked, naturally processed washed heirloom beans from Gedeo, Ethiopia. Delicate floral aroma, jasmine notes, and citrus brightness.",
    badge: "Bestseller",
    features: ["100% Organic Fair Trade", "Freshly roasted in Addis Ababa", "Whole bean (500g)", "Altitude: 2,100m"]
  },
  {
    id: "p2",
    name: "Artisan Handwoven Shemma Scarf",
    category: "Apparel & Craft",
    priceETB: 2400,
    rating: 4.8,
    reviewsCount: 89,
    inStock: true,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80",
    description: "Authentic Ethiopian traditional pure cotton scarf handwoven by master artisans, finished with intricate geometric Tibeb border embroidery.",
    badge: "Handcrafted",
    features: ["Pure unbleached organic cotton", "Traditional Tibeb embroidery", "Featherlight yet warm", "Supports local weaver collectives"]
  },
  {
    id: "p3",
    name: "Pure Natural Sidama White Honey",
    category: "Organic Honey",
    priceETB: 1850,
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80",
    description: "Raw, unpasteurized white honey sustainably harvested from wild forest flora in the southern Ethiopian highlands.",
    badge: "Organic",
    features: ["100% Raw & unprocessed", "Glass jar packaging (1,000g)", "Zero artificial sugars", "Medicinal enzyme rich"]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Headless Storefront Experience",
    subtitle: "Ultra-fast Next.js edge storefront with sub-100ms Largest Contentful Paint.",
    category: "Homepage & UI",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    aspect: "16:9",
    metric: "0.12s LCP"
  },
  {
    id: "g2",
    title: "Figure 1.15: Online Store Product Page",
    subtitle: "High-resolution car and goods detail view with localized specs and Telebirr CTA.",
    category: "Product Page",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80",
    aspect: "4:3",
    metric: "Textbook Fig 1.15"
  },
  {
    id: "g3",
    title: "1-Tap Biometric & Telebirr Checkout",
    subtitle: "Tokenized checkout minimizing cart friction down to zero unnecessary fields.",
    category: "Checkout Gate",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80",
    aspect: "16:9",
    metric: "94% Auth Rate"
  },
  {
    id: "g4",
    title: "Responsive Mobile Commerce",
    subtitle: "Thumb-zone navigation and instant app-like caching for on-the-go purchasing.",
    category: "Mobile UX",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&auto=format&fit=crop&q=80",
    aspect: "4:3",
    metric: "73% Traffic"
  },
  {
    id: "g5",
    title: "Autonomous Robotics & Warehouse Sortation",
    subtitle: "Automated guided vehicles sorting 10,000+ parcels per hour with zero human delay.",
    category: "Logistics Hub",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    aspect: "16:9",
    metric: "11m Dispatch"
  },
  {
    id: "g6",
    title: "Real-Time GMV & Merchant Analytics",
    subtitle: "Telemetry monitoring conversion funnels, payment gateway health, and churn signals.",
    category: "Data Intelligence",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    aspect: "16:9",
    metric: "Live Telemetry"
  },
  {
    id: "g7",
    title: "Social Commerce & Telegram Channels in Addis",
    subtitle: "High-engagement peer-to-peer storefronts leveraging messenger channels & mobile money.",
    category: "Ethiopian Social Commerce",
    image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=1200&auto=format&fit=crop&q=80",
    aspect: "4:3",
    metric: "15M+ Users"
  }
];
