'use client';

import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, totalItems, clearCart } = useCart();

  // Upsell products
  const cartIds = items.map(i => i.id);
  const getProductPrice = (p: typeof products[0]) => (p.sizes.find(s => s.ml === 50) ?? p.sizes[0]).price;
  const upsells = products.filter(p => !cartIds.includes(p.id)).slice(0, 3);

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="section-subheading mb-2">Review Your Selection</p>
        <h1 className="font-cormorant text-5xl font-light text-theme-primary">
          Your Cart
          {totalItems > 0 && (
            <span className="font-inter text-lg text-theme-secondary ml-3">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
          )}
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <ShoppingBag size={48} className="text-bronze/20" />
          <h2 className="font-cormorant text-4xl font-light text-theme-primary">Your cart is empty</h2>
          <p className="font-inter text-sm text-theme-secondary max-w-xs">
            Add a fragrance to your cart to begin your journey with Denzos.
          </p>
          <Link href="/shop" className="btn-primary">
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bronze-rule mb-6" />
            <div className="space-y-6">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="grid grid-cols-[auto_1fr] gap-5 pb-6 border-b-[0.5px] border-bronze/15">
                  <div className="relative w-24 h-30 overflow-hidden bg-surface-alt flex-shrink-0" style={{ height: '120px' }}>
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-cormorant text-2xl font-light text-theme-primary hover:text-bronze transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="font-inter text-xs text-theme-secondary mt-0.5">{item.size}ml Eau de Parfum</p>
                        <p className="font-inter text-xs text-theme-secondary">₹{item.salePrice.toLocaleString('en-IN')} each</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-theme-secondary hover:text-theme-primary transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border-[0.5px] border-bronze/40">
                        <button onClick={() => updateQty(item.id, item.size, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-theme-secondary hover:text-theme-primary">
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center font-inter text-sm">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-theme-secondary hover:text-theme-primary">
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-cormorant text-xl font-light text-theme-primary">
                        ₹{(item.salePrice * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={clearCart}
              className="mt-6 font-inter text-xs text-theme-secondary hover:text-bronze transition-colors underline"
            >
              Clear cart
            </button>

            {/* Upsell */}
            {upsells.length > 0 && (
              <div className="mt-12">
                <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-theme-secondary mb-6">You might also love</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upsells.map(product => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group border-[0.5px] border-bronze/20 hover:border-bronze/40 transition-colors p-4 flex gap-4 items-center"
                    >
                      <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-surface-alt">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-cormorant text-lg font-light text-theme-primary leading-tight">{product.name}</p>
                       <p className="font-inter text-xs text-bronze mt-1">₹{getProductPrice(product).toLocaleString('en-IN')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-surface-alt border-[0.5px] border-bronze/25 p-6">
              <h2 className="font-cormorant text-2xl font-light text-theme-primary mb-5">Order Summary</h2>
              <div className="bronze-rule mb-5" />
              <div className="space-y-3">
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-theme-secondary">Subtotal</span>
                  <span className="text-theme-primary">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-theme-secondary">Shipping</span>
                  <span className={shipping === 0 ? 'text-bronze' : 'text-theme-primary'}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                {subtotal < 999 && (
                  <p className="font-inter text-[11px] text-theme-secondary bg-theme border-[0.5px] border-bronze/20 px-3 py-2">
                    Add ₹{(999 - subtotal).toLocaleString('en-IN')} more for free shipping
                  </p>
                )}
              </div>
              <div className="bronze-rule my-5" />
              <div className="flex justify-between items-baseline mb-6">
                <span className="font-inter text-sm font-medium text-theme-primary">Total</span>
                <span className="font-cormorant text-3xl font-light text-theme-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>

              {/* Promo code */}
              <div className="flex gap-0 mb-5">
                <input
                  type="text"
                  placeholder="Promo code"
                  defaultValue="DENZOS50"
                  className="flex-1 bg-theme border-[0.5px] border-bronze/40 border-r-0 px-3 py-2.5 font-inter text-sm focus:outline-none"
                />
                <button className="bg-charcoal text-ivory px-4 font-inter text-[11px] tracking-widest uppercase hover:bg-bronze transition-colors">
                  Apply
                </button>
              </div>

              <button
                onClick={() => alert('Checkout coming soon! Razorpay integration in progress.')}
                className="w-full btn-primary justify-center"
              >
                Proceed to Checkout
              </button>
              <Link href="/shop" className="block text-center mt-4 font-inter text-xs text-theme-secondary hover:text-bronze transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
