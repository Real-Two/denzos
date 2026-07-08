'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag, Star, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NotesPyramid from '@/components/product/NotesPyramid';
import products from '@/data/products.json';
import { motion } from 'framer-motion';

export interface ProductSize {
  ml: number;
  price: number;
  mrp?: number;
  label?: string;
  image?: string;
}

interface Review {
  author: string;
  location: string;
  rating: number;
  body: string;
}

export interface ProductTheme {
  accent_hex: string;
  tint_hex: string;
  glow_hex: string;
  overlay_mood: string;
  bg_accent: string;
  label_image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  descriptors: string[];
  category: string;
  featured: boolean;
  sizes: ProductSize[];
  notes: { top: string[]; heart: string[]; base: string[] };
  scent_story: string;
  mood: string;
  theme: ProductTheme;
  images: string[];
  reviews: Review[];
}

// ─── Ambient SVG motifs per product ─────────────────────────────────────────
function AmbientMotif({ mood, accentHex }: { mood: string; accentHex: string }) {
  const opacity = 0.10;
  if (mood === 'amber') return (
    // Warm lantern-glow bokeh circles — top-right
    <svg className="absolute top-0 right-0 w-96 h-96 pointer-events-none" viewBox="0 0 400 400" fill="none" style={{ opacity }}>
      <circle cx="320" cy="80" r="120" fill={accentHex} />
      <circle cx="370" cy="160" r="70" fill={accentHex} />
      <circle cx="250" cy="40" r="60" fill={accentHex} />
      <circle cx="340" cy="240" r="40" fill={accentHex} />
    </svg>
  );
  if (mood === 'ice-blue') return (
    // Crystal/ice shard line-art silhouettes — bottom-left
    <svg className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none" viewBox="0 0 400 400" fill="none" stroke={accentHex} style={{ opacity }}>
      <polygon points="80,380 120,200 160,380" strokeWidth="1" />
      <polygon points="30,380 70,180 110,380" strokeWidth="1" />
      <polygon points="140,380 200,140 260,380" strokeWidth="1.5" />
      <polygon points="240,380 280,220 320,380" strokeWidth="1" />
      <polygon points="10,380 50,240 90,380" strokeWidth="0.5" />
    </svg>
  );
  if (mood === 'noir-gold') return (
    // Botanical line-art — single flower stem, right side
    <svg className="absolute right-0 top-10 bottom-0 h-full w-64 pointer-events-none" viewBox="0 0 200 600" fill="none" stroke={accentHex} style={{ opacity }}>
      <line x1="100" y1="600" x2="100" y2="100" strokeWidth="1" />
      <ellipse cx="100" cy="80" rx="40" ry="55" strokeWidth="1" />
      <ellipse cx="100" cy="80" rx="25" ry="35" strokeWidth="0.5" />
      <line x1="100" y1="300" x2="60" y2="240" strokeWidth="0.8" />
      <ellipse cx="45" cy="225" rx="22" ry="30" strokeWidth="0.8" transform="rotate(-20 45 225)" />
      <line x1="100" y1="400" x2="145" y2="350" strokeWidth="0.8" />
      <ellipse cx="158" cy="335" rx="20" ry="28" strokeWidth="0.8" transform="rotate(15 158 335)" />
    </svg>
  );
  if (mood === 'deep-brown') return (
    // Rising smoke wisps — center
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600" fill="none" style={{ opacity }}>
      <path d="M300 580 C300 480 280 460 300 380 C320 300 285 280 300 180 C315 100 295 80 300 20" stroke={accentHex} strokeWidth="2" strokeLinecap="round" />
      <path d="M320 580 C325 490 310 465 325 395 C340 320 315 295 330 195 C345 115 320 85 325 20" stroke={accentHex} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M280 580 C275 490 295 465 280 390 C265 315 288 290 278 192 C268 112 285 82 278 20" stroke={accentHex} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
  if (mood === 'forest-dark') return (
    // Pine treeline silhouette — bottom edge
    <svg className="absolute bottom-0 left-0 right-0 w-full pointer-events-none" viewBox="0 0 800 200" fill={accentHex} style={{ opacity }}>
      <polygon points="0,200 60,80 120,200" />
      <polygon points="80,200 160,40 240,200" />
      <polygon points="180,200 260,70 340,200" />
      <polygon points="290,200 360,50 430,200" />
      <polygon points="390,200 470,30 550,200" />
      <polygon points="490,200 560,65 630,200" />
      <polygon points="590,200 660,45 730,200" />
      <polygon points="680,200 750,75 820,200" />
      <rect x="0" y="190" width="800" height="10" />
    </svg>
  );
  return null;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ProductDetailClient({ product }: { product: Product }) {
  const defaultSize = product.sizes.find(s => s.ml === 50) ?? product.sizes[0];
  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);
  const [selectedImage, setSelectedImage] = useState(defaultSize.image ?? product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();

  const accentHex = product.theme.accent_hex;
  const tintHex = product.theme.tint_hex;
  const glowHex = product.theme.glow_hex;

  // Set dynamic meta theme-color + CSS vars
  useEffect(() => {
    // Dynamic browser chrome color
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = tintHex;

    return () => {
      if (meta) meta.content = '#FAF7F0';
    };
  }, [tintHex]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: selectedSize.mrp ?? selectedSize.price,
      salePrice: selectedSize.price,
      size: selectedSize.ml,
      quantity,
      image: product.images[0],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    setWishlistAnimating(true);
    toggleWishlist(product.slug);
    setTimeout(() => setWishlistAnimating(false), 400);
  };

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;

  const relatedProducts = (products as unknown as Product[])
    .filter(p => p.slug !== product.slug)
    .slice(0, 3);

  const isWished = isWishlisted(product.slug);

  return (
    // Dark themed page wrapper with radial gradient
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: tintHex, color: '#F0EDE6' }}
    >
      {/* Ambient SVG motif layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <AmbientMotif mood={product.mood} accentHex={accentHex} />
      </div>

      {/* Radial gradient hero atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${glowHex} 0%, ${tintHex}CC 45%, ${tintHex} 100%)`,
        }}
      />

      {/* Page content — sits above atmosphere layers */}
      <div className="relative z-10">

        {/* PDP Hero */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 font-inter text-[11px] transition-colors"
              style={{ color: `${accentHex}99` }}
            >
              <ChevronLeft size={12} />
              Back to Collection
            </button>
            <span style={{ color: `${accentHex}40` }}>/</span>
            <span className="font-inter text-[11px]" style={{ color: `${accentHex}CC` }}>{product.name}</span>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image gallery */}
            <div>
              <div
                className="relative aspect-4-5 overflow-hidden mb-3"
                style={{ backgroundColor: `${accentHex}0D` }}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className="font-inter text-[9px] tracking-[0.2em] uppercase px-2 py-1"
                    style={{ backgroundColor: `${tintHex}CC`, color: accentHex, border: `0.5px solid ${accentHex}60` }}
                  >
                    Eau de Parfum
                  </span>
                </div>
              </div>
              {/* Size thumbnails */}
              <div className="flex gap-2">
                {product.sizes.map(size => {
                  const thumbSrc = size.image ?? product.images[0];
                  const isActive = selectedImage === thumbSrc;
                  return (
                    <button
                      key={size.ml}
                      onClick={() => { setSelectedImage(thumbSrc); setSelectedSize(size); }}
                      className="relative w-20 h-24 overflow-hidden flex flex-col transition-all"
                      style={{
                        border: `${isActive ? '1.5px' : '0.5px'} solid ${isActive ? accentHex : `${accentHex}30`}`,
                        opacity: isActive ? 1 : 0.55,
                      }}
                      title={`${size.ml}ml${size.label ? ' — ' + size.label : ''}`}
                    >
                      <Image src={thumbSrc} alt={`${size.ml}ml`} fill className="object-cover" />
                      <span
                        className="absolute bottom-0 left-0 right-0 text-center font-inter text-[8px] tracking-wide uppercase py-0.5"
                        style={{ backgroundColor: isActive ? accentHex : `${tintHex}CC`, color: '#F0EDE6' }}
                      >
                        {size.ml}ml
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product info */}
            <div className="flex flex-col">
              <p
                className="font-inter text-[10px] tracking-[0.25em] uppercase mb-2"
                style={{ color: `${accentHex}99` }}
              >
                Denzos — Maison de Parfum
              </p>

              {/* Descriptor tags */}
              {product.descriptors && product.descriptors.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.descriptors.map(d => (
                    <span
                      key={d}
                      className="font-inter text-[9px] tracking-[0.2em] uppercase px-2.5 py-1"
                      style={{
                        backgroundColor: `${accentHex}25`,
                        color: accentHex,
                        border: `0.5px solid ${accentHex}60`,
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-cormorant text-5xl font-light leading-tight mb-2" style={{ color: '#F0EDE6' }}>
                {product.name}
              </h1>
              <p className="font-inter text-sm italic mb-4" style={{ color: `${accentHex}BB` }}>{product.tagline}</p>

              {/* Rating */}
              {product.reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} style={{ fill: i < Math.round(avgRating) ? accentHex : `${accentHex}30`, color: accentHex }} />
                    ))}
                  </div>
                  <span className="font-inter text-[11px]" style={{ color: `${accentHex}99` }}>({product.reviews.length} reviews)</span>
                </div>
              )}

              {/* Divider */}
              <div className="mb-6" style={{ borderTop: `0.5px solid ${accentHex}40` }} />

              {/* Size selector */}
              <div className="mb-6">
                <p className="font-inter text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: `${accentHex}99` }}>Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => {
                    const isActive = selectedSize.ml === size.ml;
                    return (
                      <motion.button
                        key={size.ml}
                        onClick={() => { setSelectedSize(size); if (size.image) setSelectedImage(size.image); }}
                        className="border-[0.5px] px-5 py-3 font-inter text-sm transition-all text-left"
                        style={{
                          borderColor: isActive ? accentHex : `${accentHex}40`,
                          borderWidth: isActive ? '1.5px' : '0.5px',
                          color: isActive ? accentHex : '#B8B29E',
                          backgroundColor: isActive ? `${accentHex}15` : 'transparent',
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="block font-medium">
                          {size.label ? `${size.ml}ml — ${size.label}` : `${size.ml}ml`}
                        </span>
                        <span className="block font-inter text-xs mt-0.5">
                          <span style={{ color: isActive ? accentHex : '#B8B29E' }}>
                            ₹{size.price.toLocaleString('en-IN')}
                          </span>
                          {size.mrp && (
                            <span className="ml-1.5 line-through text-[10px]" style={{ color: `${accentHex}60` }}>
                              ₹{size.mrp.toLocaleString('en-IN')}
                            </span>
                          )}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
                {/* Tester note */}
                {selectedSize.ml === 10 && (
                  <p className="font-inter text-[11px] mt-3 border-l-[2px] pl-3" style={{ borderColor: accentHex, color: `${accentHex}BB` }}>
                    Tester size — perfect to try before committing to the full bottle. Full EDP concentration.
                  </p>
                )}
                {/* Price display */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-cormorant text-4xl font-light" style={{ color: '#F0EDE6' }}>
                    ₹{selectedSize.price.toLocaleString('en-IN')}
                  </span>
                  {selectedSize.mrp && (
                    <>
                      <span className="font-inter text-sm line-through" style={{ color: `${accentHex}70` }}>
                        ₹{selectedSize.mrp.toLocaleString('en-IN')}
                      </span>
                      <span className="font-inter text-xs px-2 py-0.5" style={{ color: accentHex, backgroundColor: `${accentHex}20` }}>
                        50% off — DENZOS50
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="font-inter text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: `${accentHex}99` }}>Quantity</p>
                <div className="flex items-center w-fit" style={{ border: `0.5px solid ${accentHex}40` }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center transition-colors"
                    style={{ color: `${accentHex}99` }}
                  >−</button>
                  <span className="w-12 text-center font-inter text-sm" style={{ color: '#F0EDE6' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center transition-colors"
                    style={{ color: `${accentHex}99` }}
                  >+</button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 mb-8">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-4 font-inter text-[11px] tracking-[0.2em] uppercase transition-all duration-200"
                  style={{
                    backgroundColor: addedToCart ? '#3D3B28' : accentHex,
                    color: '#F0EDE6',
                  }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ filter: 'brightness(1.1)' }}
                >
                  <ShoppingBag size={15} />
                  {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </motion.button>
                <motion.button
                  onClick={handleWishlist}
                  className="w-14 h-14 flex items-center justify-center transition-all"
                  style={{
                    border: `${isWished ? '1.5px' : '0.5px'} solid ${isWished ? accentHex : `${accentHex}40`}`,
                    color: isWished ? accentHex : `${accentHex}70`,
                  }}
                  animate={wishlistAnimating ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} style={{ fill: isWished ? accentHex : 'none' }} />
                </motion.button>
              </div>

              {/* Tester CTA */}
              {selectedSize.ml !== 10 && (
                <Link
                  href="/testers"
                  className="mb-6 text-center font-inter text-[11px] tracking-[0.15em] uppercase py-3 transition-colors block"
                  style={{ border: `0.5px solid ${accentHex}40`, color: accentHex }}
                >
                  Explore Discovery Testers — 10ml from ₹{product.sizes.find(s => s.ml === 10)?.price.toLocaleString('en-IN') ?? '599'}
                </Link>
              )}

              {/* Trust items */}
              <div className="mb-6" style={{ borderTop: `0.5px solid ${accentHex}30` }} />
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Free shipping above ₹999' },
                  { label: 'COD available' },
                  { label: 'Easy 7-day returns' },
                  { label: '100% authentic ingredients' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: `${accentHex}80` }} />
                    <span className="font-inter text-[11px]" style={{ color: `${accentHex}80` }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scent Story */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center md:text-left">
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${accentHex}80` }}>The Scent Story</p>
          <div className="mb-8" style={{ borderTop: `0.5px solid ${accentHex}40` }} />
          <p className="font-cormorant text-2xl md:text-3xl font-light leading-relaxed" style={{ color: '#F0EDE6' }}>
            {product.scent_story}
          </p>
        </div>

        {/* Notes Pyramid */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div style={{ borderTop: `0.5px solid ${accentHex}40` }} className="mb-12" />
          <NotesPyramid notes={product.notes} accentHex={accentHex} productName={product.name} darkMode />
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <div style={{ borderTop: `0.5px solid ${accentHex}40` }} className="mb-10" />
            <h2 className="font-cormorant text-3xl font-light mb-8" style={{ color: '#F0EDE6' }}>
              Customer Reviews ({product.reviews.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews.map((review, i) => (
                <div
                  key={i}
                  className="p-6"
                  style={{ backgroundColor: `${accentHex}0D`, border: `0.5px solid ${accentHex}30` }}
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} style={{ fill: j < review.rating ? accentHex : `${accentHex}30`, color: accentHex }} />
                    ))}
                  </div>
                  <blockquote className="font-cormorant text-xl font-light leading-relaxed mb-4" style={{ color: '#F0EDE6' }}>
                    &ldquo;{review.body}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-inter text-xs font-medium" style={{ color: '#F0EDE6' }}>{review.author}</p>
                    <p className="font-inter text-[11px]" style={{ color: `${accentHex}80` }}>{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* You May Also Like — back to global theme */}
      <div style={{ backgroundColor: 'var(--surface-alt)', borderTop: `0.5px solid var(--border)` }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="section-subheading mb-2">Continue Exploring</p>
          <h2 className="section-heading mb-10">You May Also Like</h2>
          <div className="bronze-rule mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {relatedProducts.map(p => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group">
                <div className="relative aspect-4-5 overflow-hidden mb-4" style={{ backgroundColor: 'var(--surface)' }}>
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {p.descriptors && (
                  <p className="font-inter text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {p.descriptors.join(' · ')}
                  </p>
                )}
                <h3 className="font-cormorant text-2xl font-light group-hover:text-bronze transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                </h3>
                <p className="font-inter text-[11px] italic mt-0.5" style={{ color: 'var(--text-secondary)' }}>{p.tagline}</p>
                <p className="font-inter text-sm mt-2" style={{ color: 'var(--text-primary)' }}>
                  from ₹{(p.sizes.find(s => s.ml === 50) ?? p.sizes[0]).price.toLocaleString('en-IN')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
