'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export interface ProductSize {
  ml: number;
  price: number;
  mrp?: number;
  label?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  descriptors: string[];
  price?: number;
  salePrice?: number;
  category: string;
  featured: boolean;
  images: string[];
  sizes: ProductSize[];
  notes: { top: string[]; heart: string[]; base: string[] };
  scent_story: string;
  mood: string;
  theme: {
    accent_hex: string;
    tint_hex: string;
    overlay_mood: string;
    bg_accent: string;
    label_image: string;
  };
}

export default function ProductCard({ product, showSalePrice = false }: { product: Product; showSalePrice?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Default to the 50ml size for card display, fallback to first size
  const displaySize = product.sizes.find(s => s.ml === 50) ?? product.sizes[0];
  const defaultCartSize = product.sizes.find(s => s.ml === 50) ?? product.sizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: defaultCartSize.mrp ?? defaultCartSize.price,
      salePrice: defaultCartSize.price,
      size: defaultCartSize.ml,
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => {
        setHovered(true);
        if (product.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setImageIndex(0);
      }}
    >
      {/* Image container */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-4-5 overflow-hidden bg-bone">
          <Image
            src={product.images[imageIndex]}
            alt={product.name}
            fill
            className="object-contain transition-all duration-700 group-hover:scale-[1.03] p-4"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="font-inter text-[9px] tracking-[0.15em] uppercase bg-ivory/90 text-charcoal-muted px-2 py-1">
              EDP
            </span>
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.slug); }}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-ivory/90 transition-all duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart
              size={14}
              className={isWishlisted(product.slug) ? 'fill-bronze text-bronze' : 'text-charcoal-muted'}
            />
          </button>

          {/* Add to cart + View Details hover overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
              hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-charcoal text-ivory py-3.5 font-inter text-[11px] tracking-[0.2em] uppercase hover:bg-bronze transition-colors duration-200"
            >
              <ShoppingBag size={13} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      {/* Product info */}
      <div className="pt-4 pb-2">
        {/* Descriptor dots */}
        {product.descriptors && product.descriptors.length > 0 && (
          <p className="font-inter text-[9px] tracking-[0.2em] uppercase text-charcoal-muted/70 mb-1.5">
            {product.descriptors.join(' · ')}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-cormorant text-xl font-light text-charcoal hover:text-bronze transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="font-inter text-[11px] text-charcoal-muted mt-0.5 italic leading-snug">{product.tagline}</p>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          {showSalePrice && displaySize.mrp ? (
            <>
              <span className="font-inter text-sm font-medium text-charcoal">
                ₹{displaySize.price.toLocaleString('en-IN')}
              </span>
              <span className="font-inter text-xs text-charcoal-muted line-through">
                ₹{displaySize.mrp.toLocaleString('en-IN')}
              </span>
              <span className="font-inter text-[10px] text-bronze bg-bronze/10 px-1.5 py-0.5">50% off</span>
            </>
          ) : (
            <>
              <span className="font-inter text-sm text-charcoal">
                ₹{displaySize.price.toLocaleString('en-IN')}
              </span>
              {displaySize.mrp && (
                <span className="font-inter text-xs text-charcoal-muted line-through">
                  ₹{displaySize.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </>
          )}
        </div>
        {/* View Details link */}
        <div className={`mt-2 transition-all duration-300 overflow-hidden ${hovered ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'}`}>
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-1 font-inter text-[10px] tracking-[0.15em] uppercase text-bronze hover:text-charcoal transition-colors"
          >
            View Details <ArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}
