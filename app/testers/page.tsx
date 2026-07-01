import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';

export const metadata: Metadata = {
  title: 'Discovery Testers — Try Before You Commit',
  description: 'Each Denzos 10ml tester is a full-concentration Eau de Parfum. Find your signature fragrance before committing to the full bottle.',
};

export default function TestersPage() {
  const testerProducts = products.filter(p => p.sizes.some(s => s.ml === 10));

  return (
    <div className="min-h-screen">
      {/* Editorial hero header */}
      <div className="bg-bone border-b-[0.5px] border-bronze/20 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="section-subheading mb-4">Discovery Collection</p>
          <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-light text-charcoal leading-[1.05] mb-6">
            Find your signature<br />
            <em className="not-italic text-bronze">before you commit.</em>
          </h1>
          <div className="w-16 h-[0.5px] bg-bronze mx-auto mb-8" />
          <p className="font-inter text-sm md:text-base text-charcoal-muted leading-relaxed max-w-2xl mx-auto">
            Each 10ml tester is a full-concentration Eau de Parfum — the exact same formula as the full bottle.
            Not a diluted sample. Not a promotional version. The real thing, in a size that lets you wear it properly before you decide.
          </p>
        </div>
      </div>

      {/* Tester products */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-charcoal-muted mb-2">All 5 Fragrances Available as Testers</p>
        <h2 className="font-cormorant text-3xl font-light text-charcoal mb-10">The Full Collection — 10ml</h2>
        <div className="bronze-rule mb-10" />

        <div className="space-y-0">
          {testerProducts.map((product, i) => {
            const testerSize = product.sizes.find(s => s.ml === 10)!;
            const fullSize = product.sizes.find(s => s.ml === 50);
            const accentHex = product.theme?.accent_hex ?? '#C49A2E';

            return (
              <div
                key={product.id}
                className={`grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center py-8 ${
                  i < testerProducts.length - 1 ? 'border-b-[0.5px] border-bronze/20' : ''
                }`}
              >
                {/* Product image */}
                <div className="flex justify-center md:justify-start">
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative w-28 h-36 bg-bone overflow-hidden flex-shrink-0 hover:opacity-90 transition-opacity">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        sizes="112px"
                      />
                    </div>
                  </Link>
                </div>

                {/* Info */}
                <div>
                  {product.descriptors && (
                    <p className="font-inter text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: `${accentHex}99` }}>
                      {product.descriptors.join(' · ')}
                    </p>
                  )}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-cormorant text-3xl font-light text-charcoal hover:text-bronze transition-colors mb-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-inter text-sm text-charcoal-muted italic mb-3">{product.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {[...product.notes.top, ...product.notes.heart.slice(0, 2)].map(note => (
                      <span
                        key={note}
                        className="font-inter text-[10px] text-charcoal bg-ivory border-[0.5px] border-bronze/25 px-2.5 py-0.5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                  <p className="font-inter text-xs text-charcoal-muted max-w-lg leading-relaxed">
                    {product.scent_story.split('—')[0].trim() + '.'}
                  </p>
                </div>

                {/* Pricing + CTA */}
                <div className="text-left md:text-right flex-shrink-0">
                  <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-charcoal-muted mb-1">10ml Tester</p>
                  <p className="font-cormorant text-4xl font-light text-charcoal mb-1">
                    ₹{testerSize.price.toLocaleString('en-IN')}
                  </p>
                  {fullSize && (
                    <p className="font-inter text-[11px] text-charcoal-muted mb-4">
                      Full 50ml — ₹{fullSize.price.toLocaleString('en-IN')}{' '}
                      {fullSize.mrp && <span className="line-through">₹{fullSize.mrp.toLocaleString('en-IN')}</span>}
                    </p>
                  )}
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 font-inter text-[11px] tracking-[0.2em] uppercase py-3 px-6 transition-colors text-ivory"
                    style={{ backgroundColor: accentHex }}
                  >
                    Explore {product.name.split(' ')[0]}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Discovery Set bundle upsell */}
      <div className="bg-bone border-t-[0.5px] border-b-[0.5px] border-bronze/20 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="section-subheading mb-3">Try All Five</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-charcoal mb-4">
            The Discovery Set
          </h2>
          <div className="w-12 h-[0.5px] bg-bronze mx-auto mb-6" />
          <p className="font-inter text-sm text-charcoal-muted leading-relaxed max-w-xl mx-auto mb-4">
            All five 10ml testers, presented together in Denzos signature packaging. The most complete way to explore the collection before choosing your signature.
          </p>
          <p className="font-inter text-xs text-charcoal-muted mb-8 italic">
            Bundle pricing coming soon — add each tester individually in the meantime.
          </p>

          {/* Preview of all 5 bottles */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {products.map(p => (
              <Link key={p.id} href={`/products/${p.slug}`}>
                <div className="relative w-16 h-20 bg-ivory overflow-hidden hover:opacity-80 transition-opacity">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
              </Link>
            ))}
          </div>

          <Link href="/shop" className="btn-primary">
            Shop All Fragrances
          </Link>
        </div>
      </div>

      {/* Bottom trust reassurance */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { headline: 'Full EDP Concentration', body: 'Not a diluted sample or promotional version. The exact same formula as the full bottle.' },
            { headline: 'Wear it properly', body: 'A 10ml bottle gives you roughly 100 sprays — enough to understand how the scent evolves on your skin.' },
            { headline: 'Free shipping above ₹999', body: 'Order multiple testers in one go and your shipping is on us.' },
            { headline: 'COD available', body: 'Pay on delivery, no risk. Try the testers, then order your full bottle when you\'re ready.' },
          ].map(item => (
            <div key={item.headline} className="border-t-[0.5px] border-bronze/30 pt-5">
              <p className="font-inter text-xs font-medium tracking-[0.1em] uppercase text-charcoal mb-2">{item.headline}</p>
              <p className="font-inter text-xs text-charcoal-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
