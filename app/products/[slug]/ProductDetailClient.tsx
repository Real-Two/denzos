'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag, Star, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NotesPyramid from '@/components/product/NotesPyramid';

interface Size {
  ml: number;
  price: number;
  salePrice: number;
}

interface Review {
  author: string;
  location: string;
  rating: number;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  salePrice: number;
  sizes: Size[];
  notes: { top: string[]; heart: string[]; base: string[] };
  description: string;
  images: string[];
  reviews: Review[];
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: selectedSize.price,
      salePrice: selectedSize.salePrice,
      size: selectedSize.ml,
      quantity,
      image: product.images[0],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

  return (
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
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="font-inter text-[9px] tracking-[0.2em] uppercase bg-ivory/90 text-charcoal-muted px-2 py-1">
                {product.category === 'edp' ? 'Eau de Parfum' : product.category === 'tester' ? 'Discovery Set' : 'Gift Box'}
              </span>
            </div>
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-24 overflow-hidden border-[0.5px] transition-all ${
                    selectedImage === i ? 'border-bronze' : 'border-bronze/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <p className="section-subheading mb-2">Denzos — Maison de Parfum</p>
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

          <div className="bronze-rule mb-6" />

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-cormorant text-4xl font-light text-charcoal">
              ₹{selectedSize.salePrice.toLocaleString('en-IN')}
            </span>
            <span className="font-inter text-sm text-charcoal-muted line-through">
              ₹{selectedSize.price.toLocaleString('en-IN')}
            </span>
            <span className="font-inter text-xs text-bronze bg-bronze/10 px-2 py-0.5">50% off — Code: DENZOS50</span>
          </div>

          {/* Size selector */}
          {product.sizes.length > 1 && product.sizes[0].ml > 0 && (
            <div className="mb-6">
              <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-charcoal-muted mb-3">Select Size</p>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size.ml}
                    onClick={() => setSelectedSize(size)}
                    className={`border-[0.5px] px-5 py-2.5 font-inter text-sm transition-all ${
                      selectedSize.ml === size.ml
                        ? 'border-bronze bg-bronze text-ivory'
                        : 'border-bronze/40 text-charcoal hover:border-bronze'
                    }`}
                  >
                    {size.ml}ml
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-charcoal-muted mb-3">Quantity</p>
            <div className="flex items-center border-[0.5px] border-bronze/40 w-fit">
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
                addedToCart
                  ? 'bg-charcoal text-ivory'
                  : 'bg-bronze text-ivory hover:bg-bronze-500'
              }`}
            >
              <ShoppingBag size={15} />
              {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleWishlist(product.slug)}
              className={`w-14 h-14 border-[0.5px] flex items-center justify-center transition-all ${
                isWishlisted(product.slug)
                  ? 'border-bronze bg-bronze/5 text-bronze'
                  : 'border-bronze/40 text-charcoal-muted hover:border-bronze hover:text-bronze'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={18} className={isWishlisted(product.slug) ? 'fill-bronze' : ''} />
            </button>
          </div>

          {/* Description */}
          <div className="bronze-rule mb-6" />
          <p className="font-inter text-sm text-charcoal-muted leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Trust items */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Free shipping above ₹999' },
              { label: 'COD available' },
              { label: 'Easy 7-day returns' },
              { label: '100% authentic ingredients' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-bronze rounded-full flex-shrink-0" />
                <span className="font-inter text-[11px] text-charcoal-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Pyramid */}
      <div className="mt-20 mb-20">
        <div className="bronze-rule mb-12" />
        <NotesPyramid notes={product.notes} productName={product.name} />
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="mt-4">
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
    </div>
  );
}
