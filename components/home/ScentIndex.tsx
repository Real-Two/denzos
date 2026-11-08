'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import products from '@/data/products.json';
import styles from './Parfum.module.css';

export default function ScentIndex() {
  const [position,setPosition] = useState(0);
  const touch = useRef<{x:number;y:number}|null>(null);
  const scents = products.filter(p=>p.sizes.some(s=>s.ml===10));
  if (!scents.length) return null;
  const index = (position % scents.length + scents.length) % scents.length;
  const scent = scents[index];
  const tester = scent.sizes.find(s=>s.ml===10)!;
  return <section id="scent-index" className={styles.index}>
    <div className={styles.intro}><p className={styles.eyebrow}>The scent index</p><h2>Pick a<br/><em>blotter.</em></h2><p>Swipe through the perfume strips to find a note you want to wear.</p></div>
    <div className={styles.samples}>
      <div className={styles.fan} aria-label="Swipe to change fragrance" onPointerDown={e=>{touch.current={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(touch.current)e.currentTarget.style.setProperty("--drag",Math.max(-12,Math.min(12,(e.clientX-touch.current.x)/7))+"deg")}} onPointerCancel={e=>{touch.current=null;e.currentTarget.style.removeProperty("--drag")}} onPointerUp={e=>{e.currentTarget.style.removeProperty("--drag");const start=touch.current;touch.current=null;if(!start)return;const dx=e.clientX-start.x;if(Math.abs(dx)>28 && Math.abs(dx)>Math.abs(e.clientY-start.y))setPosition(v=>v+(dx<0?1:-1))}}>
        {[-2,-1,0,1,2].map(offset=>{const p=scents[(index+offset+scents.length*2)%scents.length];return <div key={offset} className={styles.strip} style={{transform:'rotate(calc('+offset*13+'deg + var(--drag, 0deg)))',zIndex:3-Math.abs(offset),backgroundColor:offset===0?'#f8ead4':'#dfc9aa'}}><i style={{background:p.theme.accent_hex}}/><span>{p.name}</span><small>Denzos</small></div>})}
        <Image key={scent.slug} src={tester.image} width={84} height={102} alt="" className={styles.stamp} draggable={false}/>
      </div>
      <div className={styles.controls}><button aria-label="Previous scent" onClick={()=>setPosition(v=>v-1)}><ChevronLeft/></button><div key={position} aria-live="polite"><h3>{scent.name}</h3><p>{scent.notes.top[0]} · {scent.notes.heart[0]}</p></div><button aria-label="Next scent" onClick={()=>setPosition(v=>v+1)}><ChevronRight/></button></div>
      <Link className={styles.sampleLink} href={'/products/'+scent.slug+'?size=10'}>Try the 10 ml · ₹{tester.price} ↗</Link>
    </div>
  </section>;
}
