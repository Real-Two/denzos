'use client';

import { useState } from 'react';
import BottleStudy from './BottleStudy';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
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
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const displaySize = preferSize
    ? (product.sizes.find(s => s.ml === preferSize) ?? product.sizes[0])
    : (product.sizes.find(s => s.ml === 50) ?? product.sizes[0]);

  const mainImage = displaySize.image ?? product.images[0];

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
      image: mainImage,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlistAnimating(true);
    toggleWishlist(product.slug);
    setTimeout(() => setWishlistAnimating(false), 400);
  };

  const isWished = isWishlisted(product.slug);


  const href = '/products/' + product.slug + '?size=' + displaySize.ml;
  return <article className="shelf-card">
    <div className="shelf-image">
      <Link href={href} aria-label={'Explore ' + product.name}><BottleStudy name={product.name} image={mainImage} accent={product.theme.accent_hex} tint={product.theme.tint_hex}/></Link>
      <motion.button aria-label={isWished ? 'Remove from wishlist' : 'Save fragrance'} aria-pressed={isWished} onClick={handleWishlist} animate={{scale:wishlistAnimating ? 1.12 : 1}} className="shelf-heart"><Heart size={16} fill={isWished?'currentColor':'none'}/></motion.button>
      <span className="shelf-volume">{displaySize.ml} ml</span>
    </div>
    <p className="shelf-family">{product.descriptors.join(' · ')}</p>
    <Link href={href}><h3>{product.name}</h3></Link>
    <div className="shelf-buy"><span>₹{displaySize.price.toLocaleString('en-IN')} {showSalePrice && displaySize.mrp && <del>₹{displaySize.mrp.toLocaleString('en-IN')}</del>}</span><button aria-label={'Add '+product.name+' to bag'} onClick={handleAddToCart}><ShoppingBag size={16}/></button></div>
  </article>;
}
