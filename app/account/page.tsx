'use client';

import { useState } from 'react';
import { Package, MapPin, Heart, User, ChevronRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';

type Tab = 'orders' | 'addresses' | 'wishlist';

// Mock order data
const mockOrders = [
  {
    id: '#DZ-00142',
    date: 'June 2, 2026',
    status: 'Delivered',
    statusColor: 'text-green-600',
    total: 2400,
    items: [{ name: 'Amber Noir', size: '50ml', qty: 1 }],
  },
  {
    id: '#DZ-00089',
    date: 'May 15, 2026',
    status: 'Delivered',
    statusColor: 'text-green-600',
    total: 1900,
    items: [{ name: 'Jasmine d\'Inde', size: '50ml', qty: 1 }],
  },
];

// Mock addresses
const mockAddresses = [
  {
    name: 'Home',
    line1: '42 Napean Sea Road, Flat 7B',
    city: 'Delhi',
    state: 'Maharashtra',
    pin: '400006',
    isDefault: true,
  },
  {
    name: 'Office',
    line1: '14th Floor, One BKC, Bandra Kurla Complex',
    city: 'Delhi',
    state: 'Maharashtra',
    pin: '400051',
    isDefault: false,
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const { wishlist } = useWishlist();
  const wishlistProducts = products.filter(p => wishlist.includes(p.slug));

  const tabs = [
    { id: 'orders' as Tab, label: 'Order History', icon: Package },
    { id: 'addresses' as Tab, label: 'Saved Addresses', icon: MapPin },
    { id: 'wishlist' as Tab, label: `Wishlist (${wishlist.length})`, icon: Heart },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="section-subheading mb-2">Welcome back</p>
        <h1 className="font-cormorant text-5xl font-light text-charcoal">My Account</h1>
      </div>

      {/* Profile card */}
      <div className="bg-bone border-[0.5px] border-bronze/20 p-5 flex items-center gap-5 mb-8">
        <div className="w-12 h-12 bg-bronze/10 border-[0.5px] border-bronze/40 flex items-center justify-center rounded-full">
          <User size={20} className="text-bronze" />
        </div>
        <div>
          <p className="font-cormorant text-2xl font-light text-charcoal">Guest User</p>
          <p className="font-inter text-xs text-charcoal-muted">Authentication coming soon — your wishlist and cart are stored locally</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b-[0.5px] border-bronze/25 mb-8 overflow-x-auto scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-inter text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-all border-b-[1.5px] -mb-[0.5px] ${
              activeTab === tab.id
                ? 'border-bronze text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Order History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {mockOrders.map(order => (
            <div key={order.id} className="border-[0.5px] border-bronze/20 bg-ivory p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-inter text-xs text-charcoal-muted">Order</p>
                    <p className="font-cormorant text-xl font-light text-charcoal">{order.id}</p>
                  </div>
                  <div>
                    <p className="font-inter text-xs text-charcoal-muted">Date</p>
                    <p className="font-inter text-sm text-charcoal">{order.date}</p>
                  </div>
                  <div>
                    <p className="font-inter text-xs text-charcoal-muted">Status</p>
                    <p className={`font-inter text-sm font-medium ${order.statusColor}`}>{order.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-inter text-xs text-charcoal-muted">Total</p>
                  <p className="font-cormorant text-2xl font-light text-charcoal">₹{order.total.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="bronze-rule mb-4" />
              <div className="space-y-1">
                {order.items.map(item => (
                  <p key={item.name} className="font-inter text-sm text-charcoal-muted">
                    {item.qty}× {item.name} — {item.size}
                  </p>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button className="font-inter text-[11px] text-charcoal-muted hover:text-bronze transition-colors underline">Track Order</button>
                <button className="font-inter text-[11px] text-charcoal-muted hover:text-bronze transition-colors underline">Reorder</button>
              </div>
            </div>
          ))}
          <p className="font-inter text-xs text-charcoal-muted text-center pt-4 italic">
            Note: Showing sample order history. Actual orders will appear after authentication is implemented.
          </p>
        </div>
      )}

      {/* Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          {mockAddresses.map((addr, i) => (
            <div key={i} className={`border-[0.5px] p-6 ${addr.isDefault ? 'border-bronze bg-bone' : 'border-bronze/20 bg-ivory'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-charcoal">{addr.name}</p>
                    {addr.isDefault && (
                      <span className="font-inter text-[9px] tracking-[0.1em] uppercase bg-bronze text-ivory px-2 py-0.5">Default</span>
                    )}
                  </div>
                  <p className="font-inter text-sm text-charcoal-muted">{addr.line1}</p>
                  <p className="font-inter text-sm text-charcoal-muted">{addr.city}, {addr.state} — {addr.pin}</p>
                </div>
                <button className="font-inter text-xs text-charcoal-muted hover:text-bronze transition-colors">Edit</button>
              </div>
            </div>
          ))}
          <button className="w-full border-[0.5px] border-dashed border-bronze/40 py-5 font-inter text-sm text-charcoal-muted hover:border-bronze hover:text-bronze transition-colors flex items-center justify-center gap-2">
            + Add New Address
          </button>
        </div>
      )}

      {/* Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart size={40} className="text-bronze/20 mx-auto mb-4" />
              <p className="font-cormorant text-3xl font-light text-charcoal mb-2">Your wishlist is empty</p>
              <p className="font-inter text-sm text-charcoal-muted mb-8">Save fragrances you love to find them here later</p>
              <Link href="/shop" className="btn-primary">Explore Collection</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {wishlistProducts.map(product => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-4-5 overflow-hidden bg-bone mb-3">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="font-cormorant text-xl font-light text-charcoal group-hover:text-bronze transition-colors">
                    {product.name}
                  </p>
                  <p className="font-inter text-sm text-charcoal-muted mt-0.5">
                    ₹{product.salePrice.toLocaleString('en-IN')}
                  </p>
                  <div className="mt-2 flex items-center gap-1 font-inter text-[10px] text-bronze">
                    View Product <ChevronRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
