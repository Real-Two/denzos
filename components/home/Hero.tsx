import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.png"
          alt="Denzos Maison de Parfum"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay — adapts to theme */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, var(--bg) 0%, rgba(var(--bg-rgb), 0.85) 55%, rgba(var(--bg-rgb), 0.15) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-lg animate-fade-in">
          <p className="font-inter text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: 'var(--text-secondary)' }}>
            Inaugural Collection — 2026
          </p>
          <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6" style={{ color: 'var(--text-primary)' }}>
            Composed<br />
            <em className="not-italic" style={{ color: 'var(--bronze)' }}>for those</em><br />
            who linger.
          </h1>
          <p className="font-inter text-sm leading-relaxed mb-10 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            Fine Indian perfumery rooted in ancient botanicals. Oud, saffron, mogra, and sandalwood — reimagined for the modern connoisseur.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/testers" className="btn-ghost">
              Discovery Testers
            </Link>
          </div>
          {/* Code callout */}
          <div
            className="mt-8 inline-flex items-center gap-3 px-5 py-3"
            style={{
              border: '0.5px solid rgba(196,154,46,0.4)',
              backgroundColor: 'rgba(var(--bg-rgb), 0.8)',
            }}
          >
            <div className="w-[2px] h-8" style={{ backgroundColor: 'var(--bronze)' }} />
            <div>
              <p className="font-inter text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Inaugural Offer</p>
              <p className="font-inter text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Use <span style={{ color: 'var(--bronze)', fontWeight: 600 }}>DENZOS50</span> for 50% off
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-[1px] h-10" style={{ backgroundColor: 'rgba(196,154,46,0.4)' }} />
        <p className="font-inter text-[9px] tracking-[0.3em] uppercase rotate-90 translate-x-4" style={{ color: 'var(--text-secondary)' }}>Scroll</p>
      </div>
    </section>
  );
}
