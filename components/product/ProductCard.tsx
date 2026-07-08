'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion } from 'framer-motion';

export interface ProductSize {
  ml: number;
  price: number;
  mrp?: number;
  label?: string;
  image?: string;
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
    glow_hex?: string;
    overlay_mood: string;
    bg_accent: string;
    label_image: string;
  };
}

export default function ProductCard({
  product,
  showSalePrice = false,
  preferSize,
}: {
  product: Product;
  showSalePrice?: boolean;
  preferSize?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const displaySize = preferSize
    ? (product.sizes.find(s => s.ml === preferSize) ?? product.sizes[0])
    : (product.sizes.find(s => s.ml === 50) ?? product.sizes[0]);

  const mainImage = displaySize.image ?? product.images[0];
  const hoverImage = product.images.find(img => img !== mainImage) ?? mainImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: displaySize.mrp ?? displaySize.price,
      salePrice: displaySize.price,
      size: displaySize.ml,
      quantity: 1,
      image: product.images[0],
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlistAnimating(true);
    toggleWishlist(product.slug);
    setTimeout(() => setWishlistAnimating(false), 400);
  };

  const isWished = isWishlisted(product.slug);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-4-5 overflow-hidden" style={{ backgroundColor: 'var(--surface-alt)' }}>
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={hovered ? hoverImage : mainImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="font-inter text-[9px] tracking-[0.15em] uppercase px-2 py-1"
              style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }}
            >
              EDP
            </span>
          </div>

          {/* Wishlist button */}
          <motion.button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-300"
            style={{ backgroundColor: 'var(--bg)', opacity: hovered ? 1 : 0 }}
            animate={wishlistAnimating ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            aria-label="Add to wishlist"
          >
            <Heart
              size={14}
              style={{ color: isWished ? product.theme.accent_hex : 'var(--text-secondary)', fill: isWished ? product.theme.accent_hex : 'none' }}
            />
          </motion.button>

          {/* Add to cart hover overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3.5 font-inter text-[11px] tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg)' }}
            >
              <ShoppingBag size={13} />
              Add to Cart
            </button>
          </motion.div>
        </div>
      </Link>

      {/* Product info */}
      <div className="pt-4 pb-2">
        {product.descriptors && product.descriptors.length > 0 && (
          <p className="font-inter text-[9px] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
            {product.descriptors.join(' · ')}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-cormorant text-xl font-light leading-tight transition-colors" style={{ color: 'var(--text-primary)' }}>
            {product.name}
          </h3>
          <p className="font-inter text-[11px] mt-0.5 italic leading-snug" style={{ color: 'var(--text-secondary)' }}>{product.tagline}</p>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          {showSalePrice && displaySize.mrp ? (
            <>
              <span className="font-inter text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                ₹{displaySize.price.toLocaleString('en-IN')}
              </span>
              <span className="font-inter text-xs line-through" style={{ color: 'var(--text-secondary)' }}>
                ₹{displaySize.mrp.toLocaleString('en-IN')}
              </span>
              <span
                className="font-inter text-[10px] px-1.5 py-0.5"
                style={{ color: product.theme.accent_hex, backgroundColor: `${product.theme.accent_hex}18` }}
              >
                50% off
              </span>
            </>
          ) : (
            <>
              <span className="font-inter text-sm" style={{ color: 'var(--text-primary)' }}>
                ₹{displaySize.price.toLocaleString('en-IN')}
              </span>
              {displaySize.mrp && (
                <span className="font-inter text-xs line-through" style={{ color: 'var(--text-secondary)' }}>
                  ₹{displaySize.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </>
          )}
        </div>
        {/* View Details link */}
        <motion.div
          className="mt-2 overflow-hidden"
          animate={{ maxHeight: hovered ? 32 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-1 font-inter text-[10px] tracking-[0.15em] uppercase transition-colors"
            style={{ color: 'var(--bronze)' }}
          >
            View Details <ArrowRight size={10} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
