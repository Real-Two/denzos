import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    label: 'Full Fragrances',
    sub: 'Eau de Parfum',
    href: '/shop?filter=full-size',
    image: '/images/categories/edp.jpg',
    description: 'Signature scents crafted for the long-lasting impression',
  },
  {
    label: 'Discovery Testers',
    sub: '10ml — Full Concentration',
    href: '/testers',
    image: '/images/categories/testers.jpg',
    description: 'Try all five — full EDP concentration in 10ml. No diluted samples.',
  },
  {
    label: 'Gift Boxes',
    sub: 'For Someone Special',
    href: '/shop?filter=gift-boxes',
    image: '/images/categories/giftbox.jpg',
    description: 'Beautifully presented gifts for every occasion',
  },
];

export default function CategoryTiles() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pb-20">
      <div className="text-center mb-10">
        <p className="section-subheading mb-2">Explore by Category</p>
        <h2 className="section-heading">Shop the Collection</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <Link key={cat.href} href={cat.href} className="group relative overflow-hidden block">
            {/* Image */}
            <div className="relative h-80 md:h-96 overflow-hidden bg-surface-alt">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent transition-opacity duration-300 group-hover:from-charcoal/80" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-ivory/70 mb-1">{cat.sub}</p>
                <h3 className="font-cormorant text-3xl font-light text-ivory mb-2 leading-tight">{cat.label}</h3>
                <p className="font-inter text-xs text-ivory/70 leading-relaxed transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                  <span className="font-inter text-[11px] tracking-[0.2em] uppercase text-ivory border-b-[0.5px] border-theme/60">
                    Shop Now
                  </span>
                  <span className="text-ivory/60">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
