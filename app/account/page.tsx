'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import products from '@/data/products.json';
import ProductCard from '@/components/product/ProductCard';

export default function AccountPage() {
  const {wishlist} = useWishlist();
  const saved = products.filter(p=>wishlist.includes(p.slug));
  return <main className="max-w-7xl mx-auto px-6 py-12"><header className="story-mast"><p className="editor-kicker">Your collection</p><h1>Saved fragrances.</h1><p>Your favourites, kept on this device.</p></header>
    {saved.length ? <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-9">{saved.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <div className="py-12"><p>Tap the heart on a bottle to keep it here.</p><Link className="btn-primary mt-5" href="/shop">Explore fragrances</Link></div>}</main>;
}