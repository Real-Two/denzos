'use client';

import { useState } from 'react';
import Link from 'next/link';
import products from '@/data/products.json';

export default function ScentCompare() {
  const [pair, setPair] = useState(['woody-intense','oud-signature']);
  return <section className="my-16 border-y border-current/20 py-8">
    <h2 className="font-cormorant text-4xl mb-6">Compare two fragrances</h2>
    <div className="grid grid-cols-2 gap-4 md:gap-10">{pair.map((slug,index) => {
      const p = products.find(item => item.slug === slug)!;
      return <div key={index}>
        <select aria-label={'Fragrance ' + (index+1)} className="w-full text-sm p-2 bg-transparent border border-current/30" value={slug} onChange={e => setPair(pair.map((v,i)=>i===index?e.target.value:v))}>{products.map(item=><option key={item.id} disabled={item.slug===pair[1-index]} value={item.slug}>{item.name}</option>)}</select>
        <dl>{[ ['First spray',p.notes.top[0]],['Heart',p.notes.heart[0]],['Dry-down',p.notes.base[0]] ].map(([label,note])=><div className="border-b border-current/20 py-3" key={label}><dt className="text-xs opacity-70">{label}</dt><dd className="font-cormorant text-xl">{note}</dd></div>)}</dl>
        <Link className="inline-block underline mt-4 text-sm" href={'/products/'+slug+'?size=10'}>Try 10 ml</Link>
      </div>;
    })}</div>
  </section>;
}
