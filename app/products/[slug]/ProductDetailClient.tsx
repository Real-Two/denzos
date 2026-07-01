'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag, Star, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NotesPyramid from '@/components/product/NotesPyramid';
import products from '@/data/products.json';

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

export default function ProductDetailClient({ product }: { product: Product }) {
  const defaultSize = product.sizes.find(s => s.ml === 50) ?? product.sizes[0];
  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);
  // Derive current hero image: prefer the size-specific image, fall back to images array
  const [selectedImage, setSelectedImage] = useState(
    defaultSize.image ?? product.images[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Apply theme CSS vars to document root for this PDP
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--pdp-accent', product.theme.accent_hex);
    root.style.setProperty('--pdp-bg-accent', product.theme.bg_accent);
    return () => {
      root.style.removeProperty('--pdp-accent');
      root.style.removeProperty('--pdp-bg-accent');
    };
  }, [product.theme]);

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

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;

  // Overlay per mood
  const heroOverlay = {
    'ice-blue': 'rgba(126, 200, 216, 0.08)',
    'deep-brown': 'rgba(139, 105, 20, 0.10)',
    'forest-dark': 'rgba(40, 50, 20, 0.10)',
  }[product.mood];

  // Related products (other 3 from catalogue)
  const relatedProducts = (products as unknown as Product[])
    .filter(p => p.slug !== product.slug)
    .slice(0, 3);

  const accentHex = product.theme.accent_hex;
  const bgAccent = product.theme.bg_accent;

  return (
    <div>
      {/* PDP Hero — subtle tinted atmosphere */}
      <div
        className="pdp-hero"
        style={{ backgroundColor: bgAccent }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10">
            <Link href="/shop" className="flex items-center gap-1 font-inter text-[11px] text-charcoal-muted hover:text-bronze transition-colors">
              <ChevronLeft size={12} />
              Back to Collection
            </Link>
            <span className="text-charcoal-muted/40">/</span>
            <span className="font-inter text-[11px] text-charcoal">{product.name}</span>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image gallery */}
            <div>
              {/* Main image */}
              <div className="relative aspect-4-5 overflow-hidden bg-bone mb-3">
                {/* Ambient overlay for specific moods */}
                {heroOverlay && (
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ backgroundColor: heroOverlay }}
                  />
                )}
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain transition-all duration-500 p-6"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="font-inter text-[9px] tracking-[0.2em] uppercase bg-ivory/90 text-charcoal-muted px-2 py-1">
                    Eau de Parfum
                  </span>
                </div>
              </div>
              {/* Size thumbnails — click to preview each size's label art */}
              <div className="flex gap-2">
                {product.sizes.map(size => {
                  const thumbSrc = size.image ?? product.images[0];
                  const isActive = selectedImage === thumbSrc;
                  return (
                    <button
                      key={size.ml}
                      onClick={() => {
                        setSelectedImage(thumbSrc);
                        setSelectedSize(size);
                      }}
                      className={`relative w-20 h-24 overflow-hidden border-[0.5px] transition-all flex flex-col ${
                        isActive ? 'border-bronze' : 'border-bronze/20 opacity-60 hover:opacity-100'
                      }`}
                      title={`${size.ml}ml${size.label ? ' — ' + size.label : ''}`}
                    >
                      <Image src={thumbSrc} alt={`${size.ml}ml`} fill className="object-contain p-2" />
                      <span
                        className="absolute bottom-0 left-0 right-0 text-center font-inter text-[8px] tracking-wide uppercase py-0.5"
                        style={{ backgroundColor: isActive ? `${product.theme.accent_hex}` : 'rgba(30,30,30,0.65)', color: '#FAF8F4' }}
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
              <p className="section-subheading mb-2">Denzos — Maison de Parfum</p>

              {/* Descriptor tags */}
              {product.descriptors && product.descriptors.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.descriptors.map(d => (
                    <span
                      key={d}
                      className="font-inter text-[9px] tracking-[0.2em] uppercase px-2.5 py-1"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${accentHex} 15%, transparent)`,
                        color: accentHex,
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-cormorant text-5xl font-light text-charcoal leading-tight mb-2">
                {product.name}
              </h1>
              <p className="font-inter text-sm text-charcoal-muted italic mb-4">{product.tagline}</p>

              {/* Rating */}
              {product.reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < Math.round(avgRating) ? 'fill-bronze text-bronze' : 'fill-bronze/20 text-bronze/20'} />
                    ))}
                  </div>
                  <span className="font-inter text-[11px] text-charcoal-muted">({product.reviews.length} reviews)</span>
                </div>
              )}

              {/* Divider */}
              <div className="mb-6" style={{ borderTop: `0.5px solid ${accentHex}40` }} />

              {/* Size selector */}
              <div className="mb-6">
                <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-charcoal-muted mb-3">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => {
                    const isActive = selectedSize.ml === size.ml;
                    return (
                      <button
                        key={size.ml}
                        onClick={() => {
                      setSelectedSize(size);
                      if (size.image) setSelectedImage(size.image);
                    }}
                        className="border-[0.5px] px-5 py-3 font-inter text-sm transition-all text-left"
                        style={{
                          borderColor: isActive ? accentHex : `${accentHex}40`,
                          borderWidth: isActive ? '1.5px' : '0.5px',
                          color: isActive ? accentHex : '#1E1E1E',
                        }}
                      >
                        <span className="block font-medium">
                          {size.label ? `${size.ml}ml — ${size.label}` : `${size.ml}ml`}
                        </span>
                        <span className="block font-inter text-xs mt-0.5">
                          <span style={{ color: isActive ? accentHex : '#1E1E1E' }}>
                            ₹{size.price.toLocaleString('en-IN')}
                          </span>
                          {size.mrp && (
                            <span className="ml-1.5 text-charcoal-muted line-through text-[10px]">
                              ₹{size.mrp.toLocaleString('en-IN')}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {/* Tester note */}
                {selectedSize.ml === 10 && (
                  <p className="font-inter text-[11px] text-charcoal-muted mt-3 border-l-[2px] pl-3" style={{ borderColor: accentHex }}>
                    Tester size — perfect to try before committing to the full bottle. Full EDP concentration.
                  </p>
                )}
                {/* Price display */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-cormorant text-4xl font-light text-charcoal">
                    ₹{selectedSize.price.toLocaleString('en-IN')}
                  </span>
                  {selectedSize.mrp && (
                    <>
                      <span className="font-inter text-sm text-charcoal-muted line-through">
                        ₹{selectedSize.mrp.toLocaleString('en-IN')}
                      </span>
                      <span className="font-inter text-xs px-2 py-0.5" style={{ color: accentHex, backgroundColor: `${accentHex}18` }}>
                        50% off — DENZOS50
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-charcoal-muted mb-3">Quantity</p>
                <div className="flex items-center w-fit" style={{ border: `0.5px solid ${accentHex}40` }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-charcoal-muted hover:text-charcoal"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-inter text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-charcoal-muted hover:text-charcoal"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 font-inter text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    addedToCart ? 'bg-charcoal text-ivory' : 'text-ivory'
                  }`}
                  style={!addedToCart ? { backgroundColor: accentHex } : {}}
                >
                  <ShoppingBag size={15} />
                  {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => toggleWishlist(product.slug)}
                  className={`w-14 h-14 flex items-center justify-center transition-all border-[0.5px] ${
                    isWishlisted(product.slug)
                      ? 'bg-transparent'
                      : 'border-bronze/40 text-charcoal-muted hover:text-bronze'
                  }`}
                  style={isWishlisted(product.slug) ? { borderColor: accentHex, color: accentHex } : {}}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} className={isWishlisted(product.slug) ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Tester CTA */}
              {selectedSize.ml !== 10 && (
                <Link
                  href="/testers"
                  className="mb-6 text-center font-inter text-[11px] tracking-[0.15em] uppercase border-[0.5px] py-3 transition-colors hover:bg-bone"
                  style={{ borderColor: `${accentHex}40`, color: accentHex }}
                >
                  Explore Discovery Testers — 10ml from ₹{product.sizes.find(s => s.ml === 10)?.price.toLocaleString('en-IN') ?? '599'}
                </Link>
              )}

              {/* Trust items */}
              <div className="mb-6" style={{ borderTop: `0.5px solid ${accentHex}40` }} />
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Free shipping above ₹999' },
                  { label: 'COD available' },
                  { label: 'Easy 7-day returns' },
                  { label: '100% authentic ingredients' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentHex }} />
                    <span className="font-inter text-[11px] text-charcoal-muted">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scent Story — below the hero */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center md:text-left">
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-charcoal-muted mb-3">The Scent Story</p>
        <div className="bronze-rule mb-8" />
        <p className="font-cormorant text-2xl md:text-3xl font-light text-charcoal leading-relaxed">
          {product.scent_story}
        </p>
      </div>

      {/* Notes Pyramid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bronze-rule mb-12" />
        <NotesPyramid notes={product.notes} accentHex={accentHex} productName={product.name} />
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bronze-rule mb-10" />
          <h2 className="font-cormorant text-3xl font-light text-charcoal mb-8">
            Customer Reviews ({product.reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.reviews.map((review, i) => (
              <div key={i} className="bg-bone border-[0.5px] border-bronze/20 p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className={j < review.rating ? 'fill-bronze text-bronze' : 'fill-bronze/20 text-bronze/20'} />
                  ))}
                </div>
                <blockquote className="font-cormorant text-xl font-light text-charcoal leading-relaxed mb-4">
                  &ldquo;{review.body}&rdquo;
                </blockquote>
                <div>
                  <p className="font-inter text-xs font-medium text-charcoal">{review.author}</p>
                  <p className="font-inter text-[11px] text-charcoal-muted">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* You May Also Like */}
      <div className="bg-bone border-t-[0.5px] border-bronze/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="section-subheading mb-2">Continue Exploring</p>
          <h2 className="section-heading mb-10">You May Also Like</h2>
          <div className="bronze-rule mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {relatedProducts.map(p => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group">
                <div className="relative aspect-4-5 overflow-hidden bg-ivory mb-4">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.03] p-6"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {p.descriptors && (
                  <p className="font-inter text-[9px] tracking-[0.2em] uppercase text-charcoal-muted/70 mb-1">
                    {p.descriptors.join(' · ')}
                  </p>
                )}
                <h3 className="font-cormorant text-2xl font-light text-charcoal group-hover:text-bronze transition-colors">
                  {p.name}
                </h3>
                <p className="font-inter text-[11px] text-charcoal-muted italic mt-0.5">{p.tagline}</p>
                <p className="font-inter text-sm text-charcoal mt-2">
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
