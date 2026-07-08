import Link from 'next/link';
import products from '@/data/products.json';
import ProductCard, { Product } from '@/components/product/ProductCard';

const FEATURED_SLUGS = ['amber-royale', 'noir-floral', 'oud-signature', 'woody-intense'];

export default function FeaturedProducts() {
  const featured = FEATURED_SLUGS
    .map(slug => products.find(p => p.slug === slug))
    .filter((p): p is typeof products[0] => !!p);

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
          className="font-inter text-[11px] tracking-[0.2em] uppercase pb-0.5 self-start md:self-auto transition-colors"
          style={{ color: 'var(--bronze)', borderBottom: '0.5px solid var(--bronze)' }}
        >
          View All
        </Link>
      </div>

      {/* Bronze rule */}
      <div className="bronze-rule mb-10" />

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {featured.map(product => (
          <ProductCard key={product.id} product={product as unknown as Product} showSalePrice={true} />
        ))}
      </div>
    </section>
  );
}
