'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import products from '@/data/products.json';
import ProductCard, { Product } from '@/components/product/ProductCard';
import Link from 'next/link';

type FilterMode = 'all' | 'full-size' | 'gift-boxes' | 'testers' | 'warm' | 'fresh' | 'woody' | 'floral';

const filterTabs: { label: string; value: FilterMode }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Size', value: 'full-size' },
  { label: 'Gift Boxes', value: 'gift-boxes' },
  { label: 'Discovery Testers', value: 'testers' },
  { label: 'Warm & Oriental', value: 'warm' },
  { label: 'Fresh & Clean', value: 'fresh' },
  { label: 'Dark & Woody', value: 'woody' },
  { label: 'Floral', value: 'floral' },
];

const MOOD_MAP: Record<string, FilterMode> = {
  amber: 'warm',
  'noir-gold': 'floral',
  'ice-blue': 'fresh',
  'deep-brown': 'woody',
  'forest-dark': 'woody',
};

function ShopContent() {
  const searchParams = useSearchParams();
  const initialFilter = (searchParams.get('filter') as FilterMode) ?? 'all';
  const [activeFilter, setActiveFilter] = useState<FilterMode>(initialFilter);

  const filtered = useMemo(() => {
    switch (activeFilter) {
      case 'all':
        return products;
      case 'full-size':
        return products.filter(p => p.sizes.some(s => s.ml === 50));
      case 'gift-boxes':
        return products.filter(p => p.sizes.some(s => s.ml === 100));
      case 'testers':
        return products.filter(p => p.sizes.some(s => s.ml === 10));
      case 'warm':
        return products.filter(p => MOOD_MAP[p.mood] === 'warm');
      case 'fresh':
        return products.filter(p => MOOD_MAP[p.mood] === 'fresh');
      case 'woody':
        return products.filter(p => MOOD_MAP[p.mood] === 'woody');
      case 'floral':
        return products.filter(p => MOOD_MAP[p.mood] === 'floral');
      default:
        return products;
    }
  }, [activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page header */}
      <div className="text-center mb-12">
        <p className="section-subheading mb-2">Denzos — Maison de Parfum</p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-theme-primary mb-4">
          The Collection
        </h1>
        <div className="w-12 h-[0.5px] bg-bronze mx-auto mb-4" />
        <p className="font-inter text-sm text-theme-secondary max-w-md mx-auto">
          Five Eau de Parfum compositions. Each one a statement. Every 10ml tester carries full EDP concentration.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {filterTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`font-inter text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border-[0.5px] transition-all duration-200 ${
              activeFilter === tab.value
                ? 'bg-bronze text-ivory border-bronze'
                : 'bg-theme text-theme-secondary border-bronze/40 hover:border-bronze hover:text-theme-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tester upsell banner */}
      {activeFilter === 'testers' && (
        <div className="bg-surface-alt border-[0.5px] border-bronze/30 p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-theme-secondary mb-1">Discovery Testers</p>
            <p className="font-cormorant text-xl font-light text-theme-primary">Find your signature before you commit.</p>
            <p className="font-inter text-sm text-theme-secondary mt-1">
              Each 10ml is full-concentration EDP — not a diluted sample. Try all five before you decide.
            </p>
          </div>
          <Link href="/testers" className="btn-secondary whitespace-nowrap flex-shrink-0">
            Explore Discovery Sets
          </Link>
        </div>
      )}

      {/* Product count */}
      <p className="font-inter text-xs text-theme-secondary mb-6 text-center">
        Showing {filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'}
      </p>

      {/* Bronze rule */}
      <div className="bronze-rule mb-10" />

      {/* Grid — 3 col desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {filtered.map(product => {
          let preferSize = 50;
          if (activeFilter === 'testers') preferSize = 10;
          if (activeFilter === 'gift-boxes') preferSize = 100;

          return (
            <ProductCard 
              key={product.id} 
              product={product as unknown as Product} 
              showSalePrice={true}
              preferSize={preferSize}
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-cormorant text-3xl font-light text-theme-secondary">No fragrances found</p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopContent />
    </Suspense>
  );
}
