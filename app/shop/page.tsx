'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import products from '@/data/products.json';
import ProductCard, { Product } from '@/components/product/ProductCard';

type Category = 'all' | 'edp' | 'tester' | 'gift-box';

const filterTabs: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Eau de Parfum', value: 'edp' },
  { label: 'Discovery Sets', value: 'tester' },
  { label: 'Gift Boxes', value: 'gift-box' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) ?? 'all';
  const [activeFilter, setActiveFilter] = useState<Category>(initialCategory);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page header */}
      <div className="text-center mb-12">
        <p className="section-subheading mb-2">Denzos — Maison de Parfum</p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-charcoal mb-4">
          The Collection
        </h1>
        <div className="w-12 h-[0.5px] bg-bronze mx-auto" />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filterTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`font-inter text-[11px] tracking-[0.2em] uppercase px-6 py-2.5 border-[0.5px] transition-all duration-200 ${
              activeFilter === tab.value
                ? 'bg-bronze text-ivory border-bronze'
                : 'bg-ivory text-charcoal-muted border-bronze/40 hover:border-bronze hover:text-charcoal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product count */}
      <p className="font-inter text-xs text-charcoal-muted mb-6 text-center">
        Showing {filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'}
      </p>

      {/* Bronze rule */}
      <div className="bronze-rule mb-10" />

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product as unknown as Product} showSalePrice={true} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-cormorant text-3xl font-light text-charcoal-muted">No fragrances found</p>
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
