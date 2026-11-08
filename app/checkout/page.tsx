'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Checkout() {
  const {items,subtotal} = useCart();
  const [complete,setComplete] = useState(false);
  const shipping = subtotal >= 999 ? 0 : 99;
  return <main className="max-w-3xl mx-auto px-6 py-16"><p className="section-subheading">Denzos · Demo checkout</p>
    <h1 className="font-cormorant text-5xl my-5">{complete ? 'Preview complete' : 'Review your order'}</h1>
    {complete ? <><p>Your bag is saved on this device. No order was placed or payment collected.</p><Link href="/shop" className="btn-primary mt-6">Return to collection</Link></> :
    items.length ? <><p className="text-theme-secondary">Preview your order with standard delivery. Payment and fulfilment are offline for this demonstration.</p>
    <ul className="my-7">{items.map(item=><li key={item.id+item.size} className="flex justify-between gap-4 py-4 border-b border-bronze/30"><span>{item.name} · {item.size} ml × {item.quantity}</span><span>₹{(item.salePrice*item.quantity).toLocaleString('en-IN')}</span></li>)}</ul>
    <p>Standard delivery · {shipping ? '₹99' : 'Free'}</p><p className="font-cormorant text-3xl my-5">Total ₹{(subtotal+shipping).toLocaleString('en-IN')}</p><button className="btn-primary" onClick={()=>setComplete(true)}>Finish demo checkout</button></> :
    <Link href="/shop" className="btn-primary">Explore the collection</Link>}
  </main>;
}
