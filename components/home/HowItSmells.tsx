import products from '@/data/products.json';
import NotesPyramid, { Notes } from '@/components/product/NotesPyramid';
import Link from 'next/link';
import Image from 'next/image';

export default function HowItSmells() {
  // Always showcase Amber Royale as the featured pyramid product
  const heroProduct = products.find(p => p.slug === 'amber-royale') ?? products[0];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left — explainer */}
        <div>
          <p className="section-subheading mb-3">The Anatomy of a Scent</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-theme-primary mb-6 leading-[1.1]">
            Understanding<br />your fragrance
          </h2>
          <div className="w-12 h-[0.5px] bg-bronze mb-6" />
          <p className="font-inter text-sm text-theme-secondary leading-relaxed mb-8">
            Every Denzos fragrance is built in three layers — called the olfactory pyramid. Top notes are your first impression, heart notes are the soul of the scent, and base notes are what lingers on your skin for hours.
          </p>

          {/* Showcase product */}
          <div className="flex items-center gap-4 mb-8 p-4 border-[0.5px] border-bronze/30 bg-surface-alt">
            <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-theme">
              <Image
                src={heroProduct.images[0]}
                alt={heroProduct.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-theme-secondary mb-1">Featured</p>
              <p className="font-cormorant text-xl font-light text-theme-primary">{heroProduct.name}</p>
              <p className="font-inter text-xs text-theme-secondary italic">{heroProduct.tagline}</p>
              <Link href={`/products/${heroProduct.slug}`} className="font-inter text-[11px] text-bronze hover:text-theme-primary transition-colors mt-1 inline-block">
                View fragrance →
              </Link>
            </div>
          </div>
        </div>

        {/* Right — Notes Pyramid */}
        <div>
          <NotesPyramid
            notes={heroProduct.notes as unknown as Notes}
            accentHex={heroProduct.theme?.accent_hex ?? '#C49A2E'}
          />
        </div>
      </div>
    </section>
  );
}
