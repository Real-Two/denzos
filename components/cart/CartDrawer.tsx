'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQty, subtotal, totalItems } = useCart();

  const cartIds = items.map(i => i.id);
  const upsellProducts = products.filter(p => !cartIds.includes(p.id)).slice(0, 2);
  const getProductPrice = (p: typeof products[0]) => (p.sizes.find(s => s.ml === 50) ?? p.sizes[0]).price;

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
          />
        )}
      </AnimatePresence>

      {/* Drawer — framer-motion slide from right */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{ backgroundColor: 'var(--bg)', borderLeft: '0.5px solid var(--border)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '0.5px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} style={{ color: 'var(--bronze)' }} />
                <span className="font-cormorant text-xl font-light" style={{ color: 'var(--text-primary)' }}>
                  Your Cart
                  {totalItems > 0 && (
                    <span className="font-inter text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  )}
                </span>
              </div>
              <button onClick={closeDrawer} className="transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Free shipping progress */}
            {subtotal > 0 && (
              <div className="px-6 py-3" style={{ backgroundColor: 'var(--surface-alt)', borderBottom: '0.5px solid var(--border)' }}>
                {remainingForFreeShipping > 0 ? (
                  <p className="font-inter text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                    Add <span style={{ color: 'var(--bronze)', fontWeight: 500 }}>₹{remainingForFreeShipping}</span> more for free shipping
                  </p>
                ) : (
                  <p className="font-inter text-[11px] font-medium" style={{ color: 'var(--bronze)' }}>✓ You qualify for free shipping!</p>
                )}
                <div className="mt-2 h-[1px] rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: 'var(--bronze)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                  <ShoppingBag size={40} style={{ color: 'var(--border)' }} />
                  <div>
                    <p className="font-cormorant text-2xl font-light" style={{ color: 'var(--text-primary)' }}>Your cart is empty</p>
                    <p className="font-inter text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>Add a fragrance to begin your journey</p>
                  </div>
                  <Link href="/shop" onClick={closeDrawer} className="btn-primary text-xs">
                    Explore Collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={`${item.id}-${item.size}`}
                        className="flex gap-4 pb-5"
                        style={{ borderBottom: '0.5px solid var(--border)' }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden" style={{ backgroundColor: 'var(--surface-alt)' }}>
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-cormorant text-lg font-light leading-tight" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                              <p className="font-inter text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.size}ml EDP</p>
                            </div>
                            <button onClick={() => removeItem(item.id, item.size)} className="transition-colors flex-shrink-0" style={{ color: 'var(--text-secondary)' }} aria-label="Remove item">
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center" style={{ border: '0.5px solid var(--border)' }}>
                              <button onClick={() => updateQty(item.id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Decrease quantity">
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center font-inter text-sm" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                              <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Increase quantity">
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="font-inter text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                              ₹{(item.salePrice * item.quantity).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Upsell */}
              {items.length > 0 && upsellProducts.length > 0 && (
                <div className="mt-8">
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>You might also love</p>
                  <div className="grid grid-cols-2 gap-3">
                    {upsellProducts.map(product => (
                      <Link key={product.id} href={`/products/${product.slug}`} onClick={closeDrawer}
                        className="group p-3 transition-colors"
                        style={{ backgroundColor: 'var(--surface-alt)', border: '0.5px solid var(--border)' }}>
                        <div className="relative aspect-square w-full overflow-hidden mb-2">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
                        </div>
                        <p className="font-cormorant text-base font-light leading-tight" style={{ color: 'var(--text-primary)' }}>{product.name}</p>
                        <p className="font-inter text-xs mt-1" style={{ color: 'var(--bronze)' }}>₹{getProductPrice(product).toLocaleString('en-IN')}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 space-y-4" style={{ borderTop: '0.5px solid var(--border)' }}>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm" style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span className="font-cormorant text-xl font-light" style={{ color: 'var(--text-primary)' }}>
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="font-inter text-[11px]" style={{ color: 'var(--text-secondary)' }}>Shipping and taxes calculated at checkout</p>
                <motion.button
                  className="w-full btn-primary justify-center"
                  onClick={() => alert('Checkout coming soon! Razorpay integration in progress.')}
                  whileTap={{ scale: 0.97 }}
                >
                  Proceed to Checkout
                </motion.button>
                <Link href="/cart" onClick={closeDrawer} className="block text-center font-inter text-xs transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
