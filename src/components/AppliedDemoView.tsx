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
  ShieldCheck,
  ArrowRight,
  Store,
  RotateCcw,
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
            const nextQ = item.quantity + delta;
            return nextQ > 0 ? { ...item, quantity: nextQ } : null;
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

  const subtotalETB = cart.reduce(
    (acc, curr) => acc + curr.product.priceETB * curr.quantity,
    0
  );
  const deliveryFeeETB = subtotalETB > 0 ? (subtotalETB > 500000 ? 0 : 250) : 0;
  const totalETB = subtotalETB + deliveryFeeETB;

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
      {/* Store Navigation Bar */}
      <div className="flex items-center justify-between gap-3 pb-2.5 mb-2.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-mono font-black text-[#ff5520] uppercase">FIGURE 1.15 STORE</span>
          <span className="text-zinc-500 hidden sm:inline">·</span>
          <span className="text-xs sm:text-sm text-zinc-200 hidden sm:inline font-medium">Vehicles & Goods in Ethiopia</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 rounded-xl bg-[#ff5520]/20 hover:bg-[#ff5520]/30 border border-[#ff5520]/50 text-xs sm:text-sm font-black text-white flex items-center gap-2.5 transition-all cursor-pointer shadow-md shadow-[#ff5520]/20"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff5520]" />
            <span>Bag</span>
            <span className="px-2 py-0.5 rounded-full bg-[#ff5520] text-black font-mono font-black text-xs">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </button>

          <button
            onClick={handleResetDemo}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Reset Store Demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Storefront Area: 2 columns (Product Catalog + Active Detail view) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1">
        {/* Left Column: Product Cards Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-300 font-mono px-1 font-bold">
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
                  className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#ff5520] ring-2 ring-[#ff5520]/45 shadow-lg'
                      : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 mb-2.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {prod.badge && (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[11px] sm:text-xs font-mono font-black uppercase bg-black/85 backdrop-blur-md text-[#ff5520] border border-white/15">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#ff5520] uppercase font-bold">{prod.category}</span>
                    <h4 className="text-sm sm:text-base font-black text-white line-clamp-1 group-hover:text-[#ff5520] transition-colors">
                      {prod.name}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.08]">
                    <div>
                      <span className="text-sm sm:text-base font-mono font-black text-white">
                        {prod.priceETB.toLocaleString()} ETB
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(prod);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
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
        <div className="lg:col-span-5 bg-white/[0.04] border border-white/[0.1] rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          {selectedProduct ? (
            <div className="space-y-3.5">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/60 shadow-inner">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3.5">
                  <div className="w-full flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-black text-[#ff5520] bg-[#ff5520]/20 border border-[#ff5520]/40">
                      In Stock · Immediate Dispatch
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-zinc-200 font-bold">★ {selectedProduct.rating} ({selectedProduct.reviewsCount})</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs sm:text-sm font-mono text-[#ff5520] uppercase font-black">{selectedProduct.category}</span>
                <h3 className="text-lg sm:text-2xl font-black text-white mt-0.5">{selectedProduct.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-200 mt-1.5 leading-relaxed font-medium">{selectedProduct.description}</p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-200">
                {selectedProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <Check className="w-4 h-4 text-[#ff5520] shrink-0" />
                    <span className="truncate font-semibold">{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div className="pt-2.5 flex items-center justify-between gap-3 border-t border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono text-zinc-400 block font-bold uppercase">PRICE (VAT INCL.)</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-white">
                    {selectedProduct.priceETB.toLocaleString()} <span className="text-xs text-[#ff5520]">ETB</span>
                  </span>
                </div>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="px-6 py-3 rounded-2xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#ff5520]/25"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order Bag</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-400 text-sm text-center py-10">
              <Store className="w-10 h-10 mb-2 opacity-40 text-[#ff5520]" />
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
              className="relative w-full max-w-xl bg-[#0d1014] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#ff5520]" />
                  <h3 className="text-base font-black text-white uppercase tracking-wider">
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
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {checkoutStep === 'cart' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="text-center py-10 text-zinc-400 text-sm font-medium">
                        Your bag is currently empty. Add products to test the checkout!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-14 h-14 rounded-xl object-cover"
                              />
                              <div>
                                <h5 className="text-sm font-bold text-white line-clamp-1">{item.product.name}</h5>
                                <span className="text-xs sm:text-sm font-mono text-[#ff5520] font-black">
                                  {item.product.priceETB.toLocaleString()} ETB
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-zinc-300 cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-sm font-mono font-black text-white w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-zinc-300 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 ml-2 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Summary breakdown */}
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between text-zinc-300">
                            <span>Subtotal</span>
                            <span className="font-mono text-white font-bold">{subtotalETB.toLocaleString()} ETB</span>
                          </div>
                          <div className="flex justify-between text-zinc-300">
                            <span>Logistics Transporter Fee</span>
                            <span className="font-mono text-white font-bold">{deliveryFeeETB === 0 ? 'FREE' : `${deliveryFeeETB} ETB`}</span>
                          </div>
                          <div className="pt-2 border-t border-white/[0.08] flex justify-between text-white font-bold text-base">
                            <span>Total Due</span>
                            <span className="font-mono text-[#ff5520] text-lg font-black">{totalETB.toLocaleString()} ETB</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setCheckoutStep('shipping')}
                          className="w-full py-3.5 rounded-2xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ff5520]/25 transition-transform hover:scale-[1.01]"
                        >
                          <span>Proceed to Delivery Info</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'shipping' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-mono text-zinc-300 block mb-1 font-bold">Recipient Full Name</label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-[#ff5520]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-zinc-300 block mb-1 font-bold">Phone Number (For Landmark Courier Call)</label>
                        <input
                          type="text"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-[#ff5520]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-zinc-300 block mb-1 font-bold">City / Landmark / Specific Gate</label>
                        <input
                          type="text"
                          value={deliveryArea}
                          onChange={(e) => setDeliveryArea(e.target.value)}
                          className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-[#ff5520]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <button
                        onClick={() => setCheckoutStep('cart')}
                        className="w-1/3 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs uppercase cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCheckoutStep('payment')}
                        className="w-2/3 py-3 rounded-2xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ff5520]/25"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-zinc-300 font-bold block">
                      Choose Ethiopian Payment Method:
                    </span>

                    <div className="space-y-2.5">
                      {[
                        { id: 'telebirr', name: 'Telebirr QR / USSD', sub: 'Instant Ethio Telecom Mobile Wallet', tag: 'Fastest' },
                        { id: 'cbebirr', name: 'CBE Birr', sub: 'Commercial Bank of Ethiopia Mobile Banking', tag: 'Direct' },
                        { id: 'cod', name: 'Cash on Delivery (COD)', sub: 'Pay courier directly at doorstep upon inspection', tag: 'Inspection' }
                      ].map((pay) => (
                        <div
                          key={pay.id}
                          onClick={() => setSelectedPayment(pay.id as any)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedPayment === pay.id
                              ? 'bg-[#ff5520]/20 border-[#ff5520] text-white ring-2 ring-[#ff5520]/45'
                              : 'bg-white/[0.03] border-white/[0.08] text-zinc-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-bold text-white">{pay.name}</h5>
                              <span className="text-[10px] font-mono font-bold text-[#ff5520] px-2 py-0.5 rounded bg-[#ff5520]/15">
                                {pay.tag}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-300 mt-0.5 font-medium">{pay.sub}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedPayment === pay.id ? 'border-[#ff5520] bg-[#ff5520]' : 'border-zinc-500'
                          }`}>
                            {selectedPayment === pay.id && <Check className="w-3 h-3 text-black stroke-[3]" />}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <button
                        onClick={() => setCheckoutStep('shipping')}
                        className="w-1/3 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs uppercase cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        className="w-2/3 py-3 rounded-2xl bg-[#ff5520] hover:bg-[#ff6e3a] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ff5520]/25"
                      >
                        <span>Authorize & Place Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 'confirmed' && (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-white">Order Successfully Dispatched!</h4>
                      <p className="text-xs sm:text-sm text-zinc-200 mt-1 font-medium">
                        Payment authorized via <strong className="text-white uppercase">{selectedPayment}</strong>. Order Ref: <span className="font-mono text-[#ff5520] font-bold">{orderReference}</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-zinc-200 max-w-sm mx-auto text-left space-y-1.5 font-medium">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Recipient:</span>
                        <span className="font-bold text-white">{customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Phone:</span>
                        <span className="font-bold text-white">{customerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Destination:</span>
                        <span className="font-bold text-white">{deliveryArea}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/[0.08] pt-1.5">
                        <span className="text-zinc-400">Total Paid:</span>
                        <span className="font-mono font-black text-[#ff5520]">{totalETB.toLocaleString()} ETB</span>
                      </div>
                    </div>

                    <button
                      onClick={handleResetDemo}
                      className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold text-xs uppercase cursor-pointer transition-colors"
                    >
                      Close & Reset Demo
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
