'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';
import styles from './Hero.module.css';

const collection = ['woody-intense', 'oud-signature', 'noir-floral', 'frosted-air', 'amber-royale'].map(slug => products.find(p => p.slug === slug)!);
const materials = ['Carved timber', 'Smoked oud', 'Velvet petals', 'Frosted glass', 'Golden resin'];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const scent = collection[index];
  const bottle = scent.sizes.find(size => size.ml === 50)!;
  return <section className={styles.archive} aria-label="Explore the perfume collection">
    <div className={styles.spread}>
      <div className={styles.copy} key={scent.slug}>
        <p className={styles.kicker}>Denzos &nbsp; / &nbsp; Eau de parfum</p>
        <h1>{scent.name.split(' ')[0]}<br/><em>{scent.name.split(' ')[1]}</em></h1>
        <p className={styles.notes}>{scent.notes.top[0]} · {scent.notes.heart[0]} · {scent.notes.base[0]}</p>
        <p className={styles.price}>50 ml &nbsp; / &nbsp; ₹{bottle.price.toLocaleString('en-IN')}</p>
        <div className={styles.actions}><Link href={'/products/' + scent.slug}>Explore fragrance ↗</Link><Link href={'/products/' + scent.slug + '?size=10'}>Try 10 ml</Link></div>
      </div>
      <div key={index} className={styles.scene} data-scent={scent.slug}>
        <div className={styles.light}/><div className={styles.flacon}><div className={styles.cap}/><div className={styles.glass}><Image src={bottle.image} alt={scent.name + ' label on a concept bottle'} fill sizes="180px" priority={index === 0}/></div></div>
        <span className={styles.caption}>{materials[index]}</span>
      </div>
    </div>
    <div className={styles.tray} aria-label="Choose a fragrance">{collection.map((p,i) => <button key={p.slug} aria-pressed={i===index} onClick={()=>setIndex(i)}><i style={{backgroundColor:p.theme.accent_hex}}/>{p.name}</button>)}</div>
  </section>;
}
