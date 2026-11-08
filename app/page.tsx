import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';
import ScentIndex from '@/components/home/ScentIndex';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from '@/components/home/Parfum.module.css';

export default function HomePage() {
  const amber = products.find(p => p.slug === 'amber-royale');
  const bottle = amber?.sizes.find(s => s.ml === 50);
  return <div className={styles.issue}>
    <header className={styles.opening}>
      <Image src="/images/hero/saffron-study.jpg" alt="An amber Denzos bottle on sunlit sandstone beneath saffron silk" fill priority sizes="100vw" className={styles.campaign}/>
      <div className={styles.mast}><span>Maison de parfum</span><span>India</span></div>
      <div className={styles.openCopy}><p className={styles.eyebrow}>The amber edit</p><h1>Saffron<br/><em>afterglow.</em></h1>
      <div className={styles.openActions}><Link href={amber ? '/products/'+amber.slug : '/shop'}>Explore {amber?.name ?? 'the collection'} ↗</Link><a href="#scent-index">Find a scent ↓</a></div></div>
    </header>
    <ScentIndex/>
    {amber && bottle && <ScrollReveal><section className={styles.offer}>
      <div className={styles.offerArt}><Image src="/images/hero/material-study.jpg" alt="Amber glass, oud wood and a dark rose" fill sizes="(max-width:700px) 100vw, 50vw"/></div>
      <div className={styles.offerCopy}><p className={styles.eyebrow}>Opening collection offer</p><h2>Amber Royale<br/><em>by the bottle.</em></h2><p>Saffron, velvet rose and warm vanilla.</p><div className={styles.ticket}><span>50 ml · Eau de parfum</span><strong>₹{bottle.price.toLocaleString('en-IN')} {bottle.mrp && <del>₹{bottle.mrp.toLocaleString('en-IN')}</del>}</strong></div><Link href={'/products/'+amber.slug+'?size=50'}>Shop the offer ↗</Link></div>
    </section></ScrollReveal>}
    <ScrollReveal><FeaturedProducts/></ScrollReveal>
    <section className={styles.atelier}><Image src="/images/brand/brand-story.jpg" alt="Inside the Denzos fragrance atelier" fill sizes="100vw"/><div><p className={styles.eyebrow}>Inside the maison</p><h2>At the perfume<br/><em>table.</em></h2><Link href="/about">Our story ↗</Link></div></section>
  </div>;
}
