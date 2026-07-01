import Image from 'next/image';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);


// Placeholder IG posts — replace with Behold.so widget or real IG API
const igPosts = [
  { src: '/products/amber_royale.jpeg', alt: 'Amber Royale by Denzos' },
  { src: '/products/noir_floral.jpeg', alt: 'Noir Floral by Denzos' },
  { src: '/images/categories/edp.jpg', alt: 'Denzos EDP Collection' },
  { src: '/products/oud_signature.jpeg', alt: 'Oud Signature by Denzos' },
  { src: '/products/frosted_air.jpeg', alt: 'Frosted Air by Denzos' },
  { src: '/products/woody_intense.jpeg', alt: 'Woody Intense by Denzos' },
];

export default function InstagramFeed() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <a
          href="https://instagram.com/denzosparfum"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 group"
        >
          <InstagramIcon size={18} />
          <span className="font-inter text-[11px] tracking-[0.25em] uppercase text-charcoal-muted group-hover:text-bronze transition-colors">
            @denzosparfum
          </span>
        </a>
        <h2 className="section-heading mt-2">Follow Our World</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {igPosts.map((post, index) => (
          <a
            key={index}
            href="https://instagram.com/denzosparfum"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={post.src}
              alt={post.alt}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <InstagramIcon size={24} />
            </div>
          </a>
        ))}
      </div>
      <p className="text-center mt-4 font-inter text-[11px] text-charcoal-muted/60">
        Live Instagram feed powered by{' '}
        <a href="https://behold.so" target="_blank" rel="noopener noreferrer" className="underline hover:text-bronze transition-colors">
          Behold.so
        </a>
        {' '}— connect your account to display real posts
      </p>
    </section>
  );
}
