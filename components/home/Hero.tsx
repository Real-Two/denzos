import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Denzos — Maison de Parfum"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay — left side for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/85 to-ivory/20" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-lg animate-fade-in">
          <p className="font-inter text-[10px] tracking-[0.35em] uppercase text-charcoal-muted mb-6">
            Inaugural Collection — 2026
          </p>
          <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light text-charcoal leading-[1.05] mb-6">
            Composed<br />
            <em className="not-italic text-bronze">for those</em><br />
            who linger.
          </h1>
          <p className="font-inter text-sm text-charcoal-muted leading-relaxed mb-10 max-w-sm">
            Fine Indian perfumery rooted in ancient botanicals. Oud, saffron, mogra, and sandalwood — reimagined for the modern connoisseur.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/shop?category=tester" className="btn-ghost">
              Explore Discovery Sets
            </Link>
          </div>
          {/* Code callout */}
          <div className="mt-8 inline-flex items-center gap-3 border-[0.5px] border-bronze/40 bg-ivory/80 px-5 py-3">
            <div className="w-[2px] h-8 bg-bronze" />
            <div>
              <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-charcoal-muted">Inaugural Offer</p>
              <p className="font-inter text-sm font-medium text-charcoal">Use <span className="text-bronze font-semibold">DENZOS50</span> for 50% off</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-[1px] h-10 bg-bronze/40" />
        <p className="font-inter text-[9px] tracking-[0.3em] uppercase text-charcoal-muted rotate-90 translate-x-4">Scroll</p>
      </div>
    </section>
  );
}
