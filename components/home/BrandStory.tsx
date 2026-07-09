import Image from 'next/image';
import Link from 'next/link';

export default function BrandStory() {
  return (
    <section className="bg-surface-alt border-y-[0.5px] border-bronze/20 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text — left */}
          <div>
            <p className="section-subheading mb-3">Our Story</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-theme-primary mb-6 leading-[1.1]">
              Born from the ancient<br />
              <em className="not-italic text-bronze">art of Indian perfumery.</em>
            </h2>
            <div className="w-12 h-[0.5px] bg-bronze mb-6" />
            <p className="font-inter text-sm text-theme-secondary leading-relaxed mb-4">
              Denzos Maison de Parfum was founded with a singular conviction: that India&apos;s extraordinary aromatic heritage deserves a place among the finest perfume houses in the world.
            </p>
            <p className="font-inter text-sm text-theme-secondary leading-relaxed mb-4">
              We work with carefully selected fragrance houses and perfumers who understand our vision — creating compositions that feel authentically Indian in character: warm, layered, and deeply expressive.
            </p>
            <p className="font-inter text-sm text-theme-secondary leading-relaxed mb-8">
              Cruelty-free, paraben-free, and composed with intention — because the finest things in life are made to be lingered over.
            </p>
            <Link href="/about" className="btn-secondary">
              Read Our Full Story
            </Link>
          </div>

          {/* Image — right */}
          <div className="relative">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src="/images/brand/brand-story.jpg"
                alt="Denzos atelier — crafting premium Indian fragrances"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative bronze border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-[0.5px] border-bronze/30 pointer-events-none -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
