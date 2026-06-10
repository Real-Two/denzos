import Link from 'next/link';
import products from '@/data/products.json';
import ProductCard, { Product } from '@/components/product/ProductCard';

export default function FeaturedProducts() {
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="section-subheading mb-2">The Collection</p>
          <h2 className="section-heading">Featured Fragrances</h2>
        </div>
        <Link
          href="/shop"
          className="font-inter text-[11px] tracking-[0.2em] uppercase text-bronze border-b-[0.5px] border-bronze hover:text-charcoal hover:border-charcoal transition-colors pb-0.5 self-start md:self-auto"
        >
          View All
        </Link>
      </div>

      {/* Bronze rule */}
      <div className="bronze-rule mb-10" />

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {featured.map(product => (
          <ProductCard key={product.id} product={product as unknown as Product} showSalePrice={false} />
        ))}
      </div>
    </section>
  );
}
