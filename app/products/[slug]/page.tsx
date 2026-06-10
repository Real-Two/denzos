import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import products from '@/data/products.json';
import ProductDetailClient, { Product } from './ProductDetailClient';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return { title: 'Not Found' };
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description.slice(0, 160),
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) notFound();

  return <ProductDetailClient product={product as unknown as Product} />;
}
