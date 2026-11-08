'use client';

import { useState } from 'react';
import Link from 'next/link';
import products from '@/data/products.json';
import BottleStudy from './BottleStudy';

export default function ScentFinder() {
  const scents = products.filter(p => p.sizes.some(s => s.ml === 10));
  const [slug, setSlug] = useState(scents[0]?.slug);
  const p = scents.find(item => item.slug === slug);
  if (!p) return null;
  const size = p.sizes.find(s => s.ml === 10)!;
  return <section className="finder">
    <div className="finder-copy"><p className="editor-kicker">Discovery · 10 ml</p><h1>Find your<br/><em>signature.</em></h1>
    <p>Which opening note draws you in?</p><div className="note-options">{scents.map(item=><button key={item.slug} aria-pressed={slug===item.slug} onClick={()=>setSlug(item.slug)}>{item.notes.top[0]}</button>)}</div></div>
    <div key={slug} className="finder-result"><BottleStudy image={size.image} name={p.name} accent={p.theme.accent_hex} tint={p.theme.tint_hex}/><div aria-live="polite"><h2>{p.name}</h2><p>{p.notes.heart[0]} settles into {p.notes.base[0].toLowerCase()}.</p><Link href={'/products/'+slug+'?size=10'}>Explore 10 ml · ₹{size.price} ↗</Link></div></div>
  </section>;
}
