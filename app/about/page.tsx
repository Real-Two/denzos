import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about Denzos Maison de Parfum — the story of an Indian perfume house born from a love of botanical heritage and fine fragrance craft.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <p className="section-subheading mb-3">Who We Are</p>
        <h1 className="font-cormorant text-6xl md:text-7xl font-light text-theme-primary leading-tight mb-6">
          Our Story
        </h1>
        <div className="w-12 h-[0.5px] bg-bronze mx-auto" />
      </div>

      {/* Two-column hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
        <div className="relative h-[550px] overflow-hidden">
          <Image
            src="/images/brand/brand-story.jpg"
            alt="Denzos atelier — Indian perfumery craft"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute -bottom-3 -right-3 w-full h-full border-[0.5px] border-bronze/30 pointer-events-none -z-10" />
        </div>

        <div>
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-theme-secondary mb-4">The Beginning</p>
          <h2 className="font-cormorant text-4xl font-light text-theme-primary mb-6 leading-tight">
            Born from a love of<br />
            <em className="not-italic text-bronze">India&apos;s aromatic soul.</em>
          </h2>
          <div className="space-y-4">
            <p className="font-inter text-sm text-theme-secondary leading-relaxed">
              Denzos was founded on a singular belief: that India has one of the world&apos;s richest aromatic heritages, yet no perfume house had truly brought it to the global stage with the craft and elegance it deserved.
            </p>
            <p className="font-inter text-sm text-theme-secondary leading-relaxed">
              We began in a small atelier in Delhi, with a simple mission: to create fragrances that felt uncompromisingly Indian in character — bold, layered, and rooted in the subcontinent&apos;s centuries-long love affair with scent.
            </p>
            <p className="font-inter text-sm text-theme-secondary leading-relaxed">
              What emerged was not just a collection of fragrances, but a manifesto: that the finest perfumery in the world can — and does — come from India.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bronze-rule mb-16" />

      <div className="text-center mb-12">
        <p className="section-subheading mb-2">What We Stand For</p>
        <h2 className="section-heading">Our Values</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          {
            number: '01',
            title: 'Ingredient Integrity',
            body: 'We are obsessive about what goes into each bottle. Our formulations use only high-quality aromatic compounds — no cheap fillers, no shortcuts. Every note is chosen with intention.',
          },
          {
            number: '02',
            title: 'Craft & Patience',
            body: 'Our fragrances are not rushed. Each formula is developed over months, tested across seasons, and refined until it achieves the precise character we envisioned.',
          },
          {
            number: '03',
            title: 'Indian Provenance',
            body: 'We are proudly and unapologetically Indian. Our ingredients, our inspiration, and our team are all rooted in the subcontinent we love.',
          },
        ].map(value => (
          <div key={value.number} className="border-[0.5px] border-bronze/25 p-8">
            <p className="font-cormorant text-5xl font-light text-bronze/30 mb-4">{value.number}</p>
            <h3 className="font-cormorant text-2xl font-light text-theme-primary mb-3">{value.title}</h3>
            <div className="w-8 h-[0.5px] bg-bronze mb-4" />
            <p className="font-inter text-sm text-theme-secondary leading-relaxed">{value.body}</p>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center bg-surface-alt border-[0.5px] border-bronze/20 p-12">
        <h2 className="font-cormorant text-4xl font-light text-theme-primary mb-4">
          Ready to find your signature scent?
        </h2>
        <p className="font-inter text-sm text-theme-secondary mb-8">
          Start with our Discovery Set — five signature scents to explore before you commit.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/testers" className="btn-primary">
            Explore Discovery Sets
          </Link>
          <Link href="/shop" className="btn-ghost">
            View All Fragrances
          </Link>
        </div>
      </div>
    </div>
  );
}
