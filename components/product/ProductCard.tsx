'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  salePrice: number;
  category: string;
  images: string[];
  sizes: { ml: number; price: number; salePrice: number }[];
}

export default function ProductCard({ product, showSalePrice = false }: { product: Product; showSalePrice?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const defaultSize = product.sizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: defaultSize.price,
      salePrice: defaultSize.salePrice,
      size: defaultSize.ml,
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
            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="font-inter text-[9px] tracking-[0.15em] uppercase bg-ivory/90 text-charcoal-muted px-2 py-1">
              {product.category === 'edp' ? 'EDP' : product.category === 'tester' ? 'Discovery' : 'Gift Box'}
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

          {/* Add to cart hover overlay */}
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
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-cormorant text-xl font-light text-charcoal hover:text-bronze transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="font-inter text-[11px] text-charcoal-muted mt-0.5">{product.tagline}</p>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          {showSalePrice ? (
            <>
              <span className="font-inter text-sm font-medium text-charcoal">
                ₹{product.salePrice.toLocaleString('en-IN')}
              </span>
              <span className="font-inter text-xs text-charcoal-muted line-through">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="font-inter text-[10px] text-bronze bg-bronze/10 px-1.5 py-0.5">50% off</span>
            </>
          ) : (
            <span className="font-inter text-sm text-charcoal">
              ₹{product.salePrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
