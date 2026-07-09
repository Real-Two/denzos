import type { Metadata } from 'next';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: 'Everything you need to know about Denzos fragrances — shipping, returns, ingredients, and more.',
};

const faqData = [
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Standard delivery takes 4–7 business days across India. We ship from Delhi and use trusted courier partners (Delhivery, Bluedart). Expedited shipping (2–3 days) is available at checkout for an additional charge. You will receive a tracking link once your order is dispatched.',
  },
  {
    id: 'free-shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes! Orders above ₹999 qualify for free standard shipping across India. There is no minimum for Cash on Delivery orders, though a small COD handling fee of ₹49 applies.',
  },
  {
    id: 'returns',
    question: 'What is your return and exchange policy?',
    answer: 'We offer a 7-day hassle-free return policy for unopened products. If a fragrance doesn\'t meet your expectations upon first use, please contact us at hello@denzos.in within 48 hours of delivery and we will arrange a replacement or store credit. Note: We cannot accept returns on opened bottles for hygiene reasons, which is why we highly recommend starting with a Discovery Set.',
  },
  {
    id: 'ingredients',
    question: 'Are your fragrances cruelty-free?',
    answer: 'Absolutely. All Denzos fragrances are 100% cruelty-free and are not tested on animals at any stage of production. We are also free from parabens, phthalates, and synthetic dyes. Our musk ingredients are entirely synthetic (ISO-E Super, Ambroxan) — we do not use any animal-derived musks.',
  },
  {
    id: 'longevity',
    question: 'How long do Denzos fragrances last on skin?',
    answer: 'Our Eau de Parfum concentration (20–25% aromatic compounds) is formulated for exceptional longevity. You can expect 8–12 hours of wear on skin, and up to 24 hours on clothing. Projection (sillage) is strong for the first 2–3 hours before settling into a closer, intimate skin scent.',
  },
  {
    id: 'discovery',
    question: 'I\'m new to perfumery. Where should I start?',
    answer: 'We strongly recommend our Discovery Set — five 2ml vials of our core collection, each with a scent profile card. It\'s the perfect way to explore our range without committing to a full bottle. Once you find your signature scent, you can apply the purchase price of the Discovery Set toward your first full bottle. Just email us!',
  },
  {
    id: 'cod',
    question: 'Do you offer Cash on Delivery?',
    answer: 'Yes, COD is available across all major cities and most pin codes in India. A handling fee of ₹49 applies to COD orders. This fee is waived for orders above ₹2,500.',
  },
  {
    id: 'privacy',
    question: 'How do you handle my personal data?',
    answer: 'We take your privacy seriously. Your personal information is never sold or shared with third parties for marketing purposes. We use industry-standard encryption for all transactions. For full details, please refer to our Privacy Policy.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="section-subheading mb-3">Help & Information</p>
        <h1 className="font-cormorant text-6xl font-light text-theme-primary mb-4">
          Frequently Asked Questions
        </h1>
        <div className="w-12 h-[0.5px] bg-bronze mx-auto mb-5" />
        <p className="font-inter text-sm text-theme-secondary">
          Can&apos;t find what you&apos;re looking for?{' '}
          <a href="/contact" className="text-bronze hover:text-theme-primary transition-colors">
            Contact us directly
          </a>
          {' '}— we&apos;re happy to help.
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion items={faqData} />
    </div>
  );
}
