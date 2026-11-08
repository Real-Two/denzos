import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryTiles from '@/components/home/CategoryTiles';
import BrandStory from '@/components/home/BrandStory';
import HowItSmells from '@/components/home/HowItSmells';

export const metadata: Metadata = {
  title: 'Denzos — Maison de Parfum | Premium Indian Perfumery',
  description: 'Discover Denzos — a new Indian perfume house crafting exceptional fragrances from oud, saffron, mogra, and sandalwood.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryTiles />
      <BrandStory />
      <HowItSmells />
    </>
  );
}
