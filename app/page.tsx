import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryTiles from '@/components/home/CategoryTiles';
import BrandStory from '@/components/home/BrandStory';
import HowItSmells from '@/components/home/HowItSmells';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';
import InstagramFeed from '@/components/home/InstagramFeed';

export const metadata: Metadata = {
  title: 'Denzos — Maison de Parfum | Premium Indian Perfumery',
  description: 'Discover Denzos — a new Indian perfume house crafting exceptional fragrances from oud, saffron, mogra, and sandalwood. Inaugural 50% off with code DENZOS50.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProducts />
      <CategoryTiles />
      <BrandStory />
      <HowItSmells />
      <ReviewsCarousel />
      <InstagramFeed />
    </>
  );
}
