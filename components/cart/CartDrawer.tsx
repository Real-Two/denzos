'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQty, subtotal, totalItems } = useCart();

  // Upsell products (first 2 featured products not in cart)
  const cartIds = items.map(i => i.id);
  const upsellProducts = products.filter(p => !cartIds.includes(p.id) && p.featured).slice(0, 2);

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-charcoal/25 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 flex flex-col transition-transform duration-350 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-[0.5px] border-bronze/30">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-bronze" />
            <span className="font-cormorant text-xl font-light text-charcoal">
              Your Cart
              {totalItems > 0 && (
                <span className="font-inter text-sm text-charcoal-muted ml-2">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
              )}
            </span>
          </div>
          <button onClick={closeDrawer} className="text-charcoal-muted hover:text-charcoal transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal > 0 && (
          <div className="px-6 py-3 bg-bone border-b-[0.5px] border-bronze/20">
            {remainingForFreeShipping > 0 ? (
              <p className="font-inter text-[11px] text-charcoal-muted">
                Add <span className="text-bronze font-medium">₹{remainingForFreeShipping}</span> more for free shipping
              </p>
            ) : (
              <p className="font-inter text-[11px] text-bronze font-medium">✓ You qualify for free shipping!</p>
            )}
            <div className="mt-2 h-[1px] bg-bronze/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-bronze transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <ShoppingBag size={40} className="text-bronze/30" />
              <div>
                <p className="font-cormorant text-2xl font-light text-charcoal">Your cart is empty</p>
                <p className="font-inter text-xs text-charcoal-muted mt-2">Add a fragrance to begin your journey</p>
              </div>
              <Link href="/shop" onClick={closeDrawer} className="btn-primary text-xs">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-5 border-b-[0.5px] border-bronze/15">
                  <div className="relative w-20 h-24 flex-shrink-0 bg-bone overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-cormorant text-lg font-light text-charcoal leading-tight">{item.name}</p>
                        <p className="font-inter text-[11px] text-charcoal-muted mt-0.5">{item.size}ml EDP</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-charcoal-muted hover:text-charcoal transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border-[0.5px] border-bronze/40">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-charcoal-muted hover:text-charcoal transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-inter text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-charcoal-muted hover:text-charcoal transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-inter text-sm font-medium text-charcoal">
                        ₹{(item.salePrice * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsell */}
          {items.length > 0 && upsellProducts.length > 0 && (
            <div className="mt-8">
              <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-charcoal-muted mb-4">You might also love</p>
              <div className="grid grid-cols-2 gap-3">
                {upsellProducts.map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={closeDrawer}
                    className="group bg-bone border-[0.5px] border-bronze/20 p-3 hover:border-bronze/40 transition-colors"
                  >
                    <div className="relative aspect-square w-full overflow-hidden mb-2">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <p className="font-cormorant text-base font-light text-charcoal leading-tight">{product.name}</p>
                    <p className="font-inter text-xs text-bronze mt-1">₹{product.salePrice.toLocaleString('en-IN')}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-[0.5px] border-bronze/30 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-inter text-sm text-charcoal-muted">Subtotal</span>
              <span className="font-cormorant text-xl font-light text-charcoal">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="font-inter text-[11px] text-charcoal-muted">Shipping and taxes calculated at checkout</p>
            <button
              className="w-full btn-primary justify-center"
              onClick={() => alert('Checkout coming soon! Razorpay integration in progress.')}
            >
              Proceed to Checkout
            </button>
            <Link href="/cart" onClick={closeDrawer} className="block text-center font-inter text-xs text-charcoal-muted hover:text-bronze transition-colors">
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
