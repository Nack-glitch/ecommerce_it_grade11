import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  CreditCard,
  Truck,
  Check,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Store,
  RotateCcw,
  Car,
  X
} from 'lucide-react';
import { DEMO_PRODUCTS, DemoProduct } from '../data/presentationData';
import { audioManager } from '../utils/audio';

interface CartItem {
  product: DemoProduct;
  quantity: number;
}

export const AppliedDemoView: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<DemoProduct | null>(DEMO_PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>([
    { product: DEMO_PRODUCTS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmed'>('cart');
  const [selectedPayment, setSelectedPayment] = useState<'telebirr' | 'cbebirr' | 'cod'>('telebirr');
  const [customerName, setCustomerName] = useState<string>('Abebe Bikila');
  const [customerPhone, setCustomerPhone] = useState<string>('+251 91 123 4567');
  const [deliveryArea, setDeliveryArea] = useState<string>('Bole, Addis Ababa');
  const [orderReference, setOrderReference] = useState<string>('ETH-94821');

  // Helpers
  const addToCart = (product: DemoProduct) => {
    audioManager.playAction();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setCheckoutStep('cart');
  };

  const updateQuantity = (productId: string, delta: number) => {
    audioManager.playTick();
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    audioManager.playTick();
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.priceETB * item.quantity, 0);
  const deliveryFee = subtotal > 100000 ? 2500 : (subtotal > 0 ? 150 : 0);
  const totalETB = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    audioManager.playAction();
    const randomRef = 'ETH-' + Math.floor(100000 + Math.random() * 900000);
    setOrderReference(randomRef);
    setCheckoutStep('confirmed');
  };

  const handleResetDemo = () => {
    audioManager.playTick();
    setCart([{ product: DEMO_PRODUCTS[0], quantity: 1 }]);
    setCheckoutStep('cart');
    setIsCartOpen(false);
  };

  return (
    <div className="w-full flex flex-col justify-start py-1">
      {/* Compact Store Navigation Bar */}
      <div className="flex items-center justify-between gap-3 pb-2.5 mb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#ff5520] uppercase">FIGURE 1.15 STORE</span>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="text-xs text-zinc-300 hidden sm:inline">Vehicles & Goods in Ethiopia</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-1.5 rounded-xl bg-[#ff5520]/15 hover:bg-[#ff5520]/25 border border-[#ff5520]/40 text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff5520]" />
            <span>Bag</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#ff5520] text-black font-mono font-bold text-[10px]">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </button>

          <button
            onClick={handleResetDemo}
            className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Store Demo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Storefront Area: 2 columns (Product Catalog + Active Detail view) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1">
        {/* Left Column: Product Cards Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
            <span>FIGURE 1.15 PRODUCTS (VEHICLES & GOODS)</span>
            <span>4 CATALOG ITEMS READY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DEMO_PRODUCTS.map((prod) => {
              const isSelected = selectedProduct?.id === prod.id;
              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    audioManager.playTick();
                    setSelectedProduct(prod);
                  }}
                  className={`group relative p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'bg-white/[0.07] border-[#ff5520] ring-1 ring-[#ff5520]/40'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 mb-2.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {prod.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/80 backdrop-blur-md text-[#ff5520] border border-white/10">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{prod.category}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-[#ff5520] transition-colors">
                      {prod.name}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04]">
                    <div>
                      <span className="text-xs font-mono font-bold text-white">
                        {prod.priceETB.toLocaleString()} ETB
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(prod);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Product Detail Spotlight (5 cols) */}
        <div className="lg:col-span-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          {selectedProduct ? (
            <div className="space-y-3.5">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <div className="w-full flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-[#ff5520] bg-[#ff5520]/20 border border-[#ff5520]/30">
                      In Stock · Immediate Dispatch
                    </span>
                    <span className="text-xs font-mono text-zinc-300">★ {selectedProduct.rating} ({selectedProduct.reviewsCount})</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-[#ff5520] uppercase">{selectedProduct.category}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedProduct.name}</h3>
                <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
                {selectedProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <Check className="w-3.5 h-3.5 text-[#ff5520] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block">PRICE (VAT INCL.)</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-white">
                    {selectedProduct.priceETB.toLocaleString()} <span className="text-xs text-[#ff5520]">ETB</span>
                  </span>
                </div>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="px-5 py-2.5 rounded-xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#ff5520]/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order Bag</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs text-center py-10">
              <Store className="w-8 h-8 mb-2 opacity-40" />
              <span>Select an item from the left to inspect</span>
            </div>
          )}
        </div>
      </div>

      {/* Cart & Checkout Drawer Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-[#0d1014] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#ff5520]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {checkoutStep === 'cart' && 'Your Shopping Bag'}
                    {checkoutStep === 'shipping' && 'Delivery Information'}
                    {checkoutStep === 'payment' && 'Select Mobile Rail'}
                    {checkoutStep === 'confirmed' && 'Order Placed Successfully!'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {checkoutStep === 'cart' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="text-center py-10 text-zinc-500 text-xs">
                        Your bag is currently empty. Add products to test the checkout!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <h5 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h5>
                                <span className="text-[11px] font-mono text-[#ff5520]">
                                  {item.product.priceETB.toLocaleString()} ETB
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-bold text-white w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1.5 rounded text-zinc-500 hover:text-red-400 ml-2 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Summary breakdown */}
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs">
                          <div className="flex justify-between text-zinc-400">
                            <span>Subtotal</span>
                            <span className="font-mono text-white">{subtotal.toLocaleString()} ETB</span>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>Addis Transit Dispatch</span>
                            <span className="font-mono text-white">{deliveryFee.toLocaleString()} ETB</span>
                          </div>
                          <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/[0.06]">
                            <span>Total Due</span>
                            <span className="font-mono text-[#ff5520]">{totalETB.toLocaleString()} ETB</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'shipping' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-zinc-400 block mb-1">Customer Full Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#ff5520]"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Phone Number (For Delivery SMS)</label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#ff5520]"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Delivery Destination / Landmark</label>
                      <input
                        type="text"
                        value={deliveryArea}
                        onChange={(e) => setDeliveryArea(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#ff5520]"
                      />
                    </div>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div className="space-y-3">
                    <span className="text-xs text-zinc-400 block">Choose Payment Gateway:</span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        {
                          id: 'telebirr',
                          title: 'Telebirr (Ethio Telecom)',
                          desc: 'Instant QR / USSD push prompt · 47M+ active accounts in Ethiopia',
                          icon: Sparkles
                        },
                        {
                          id: 'cbebirr',
                          title: 'CBE Birr (Commercial Bank of Ethiopia)',
                          desc: 'Direct banking debit authorization rail',
                          icon: CreditCard
                        },
                        {
                          id: 'cod',
                          title: 'Cash on Delivery (Courier Handover)',
                          desc: 'Pay physical cash or mobile transfer at doorstep upon inspection',
                          icon: Truck
                        }
                      ].map((gate) => (
                        <button
                          key={gate.id}
                          onClick={() => {
                            audioManager.playTick();
                            setSelectedPayment(gate.id as 'telebirr' | 'cbebirr' | 'cod');
                          }}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            selectedPayment === gate.id
                              ? 'bg-[#ff5520]/15 border-[#ff5520] text-white'
                              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">{gate.title}</span>
                            <span className="text-[11px] text-zinc-400 block mt-0.5">{gate.desc}</span>
                          </div>
                          {selectedPayment === gate.id && <Check className="w-4 h-4 text-[#ff5520]" />}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Classroom Demonstration: No real money is charged.</span>
                    </div>
                  </div>
                )}

                {checkoutStep === 'confirmed' && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Order Confirmed!</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Tracking Reference: <strong className="text-white font-mono">{orderReference}</strong>
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left text-xs space-y-1.5 text-zinc-300">
                      <div>Recipient: <strong className="text-white">{customerName}</strong></div>
                      <div>Destination: <strong className="text-white">{deliveryArea}</strong></div>
                      <div>Payment Channel: <strong className="text-[#ff5520] uppercase">{selectedPayment}</strong></div>
                      <div>Handled Via: <strong>Addis Logistics Delivery Transporter</strong></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between">
                {checkoutStep !== 'confirmed' ? (
                  <>
                    <button
                      onClick={() => {
                        audioManager.playTick();
                        if (checkoutStep === 'shipping') setCheckoutStep('cart');
                        if (checkoutStep === 'payment') setCheckoutStep('shipping');
                      }}
                      disabled={checkoutStep === 'cart'}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        audioManager.playAction();
                        if (checkoutStep === 'cart') setCheckoutStep('shipping');
                        else if (checkoutStep === 'shipping') setCheckoutStep('payment');
                        else if (checkoutStep === 'payment') handlePlaceOrder();
                      }}
                      disabled={cart.length === 0}
                      className="px-6 py-2.5 rounded-xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40"
                    >
                      <span>
                        {checkoutStep === 'cart' && 'Proceed to Delivery'}
                        {checkoutStep === 'shipping' && 'Continue to Payment'}
                        {checkoutStep === 'payment' && `Authorize ${totalETB.toLocaleString()} ETB`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      audioManager.playTick();
                      setCheckoutStep('cart');
                      setIsCartOpen(false);
                      setCart([{ product: DEMO_PRODUCTS[0], quantity: 1 }]);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#ff5520] text-black font-bold text-xs uppercase tracking-wider text-center cursor-pointer"
                  >
                    Done · Continue Exploring Demo
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
