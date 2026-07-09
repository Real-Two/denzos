'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  { author: 'Priya S.', location: 'Delhi', rating: 5, handle: '@priyascents', body: 'Amber Royale is everything I didn\'t know I needed. The oud is rich but not overpowering, and the saffron opening is pure luxury. This is what Indian perfumery should be.', product: 'Amber Royale' },
  { author: 'Rahul M.', location: 'Delhi', rating: 5, handle: '@rahul_aromatic', body: 'Got compliments all evening at a wedding. Denzos is genuinely world-class quality at an Indian price point. Ordered two more bottles as gifts.', product: 'Oud Signature' },
  { author: 'Anjali K.', location: 'Bangalore', rating: 5, handle: '@anjali.wears', body: 'Noir Floral is exactly what I\'ve been searching for — dark florals without being sharp or sweet. The patchouli base gives it real depth. Absolutely love it.', product: 'Noir Floral' },
  { author: 'Vikram P.', location: 'Jaipur', rating: 5, handle: '@vikram_parfum', body: 'Oud Signature is the finest oud fragrance from an Indian house I\'ve tried. Ceremonial but wearable. Smoky without being aggressive. Worth every rupee.', product: 'Oud Signature' },
  { author: 'Kavita A.', location: 'Delhi', rating: 5, handle: '@kavita_scents', body: 'Frosted Air is incredible for summer mornings — crisp yuzu and mint, but with a cedar base that keeps it grounded. Not synthetic at all. Very impressive.', product: 'Frosted Air' },
  { author: 'Rohit D.', location: 'Ahmedabad', rating: 5, handle: '@rohit.scent', body: 'Woody Intense is my new signature. Pine and pepper, then deep cedar and vetiver. The oakmoss base is what sets this apart — earthy, real, and long-lasting.', product: 'Woody Intense' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'fill-bronze text-bronze' : 'fill-bronze/20 text-bronze/20'}
        />
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCount = 3;

  const prev = () => {
    setCurrentIndex(i => Math.max(0, i - 1));
  };

  const next = () => {
    setCurrentIndex(i => Math.min(reviews.length - visibleCount, i + 1));
  };

  return (
    <section className="bg-surface-alt border-y-[0.5px] border-bronze/20 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-subheading mb-2">As seen on Instagram · @denzosparfum</p>
            <h2 className="section-heading">What Our Community Says</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 border-[0.5px] border-bronze/40 flex items-center justify-center text-bronze hover:bg-bronze hover:text-ivory transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= reviews.length - visibleCount}
              className="w-10 h-10 border-[0.5px] border-bronze/40 flex items-center justify-center text-bronze hover:bg-bronze hover:text-ivory transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Bronze rule */}
        <div className="bronze-rule mb-10" />

        {/* Carousel */}
        <div className="overflow-hidden" ref={containerRef}>
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${currentIndex} * (100% / ${visibleCount} + 8px)))` }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-12px)] bg-theme border-[0.5px] border-bronze/20 p-7"
              >
                <StarRating rating={review.rating} />
                <blockquote className="font-cormorant text-xl font-light text-theme-primary leading-relaxed mt-4 mb-5">
                  &ldquo;{review.body}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-inter text-xs font-medium text-theme-primary">{review.author}</p>
                    <p className="font-inter text-[11px] text-theme-secondary">{review.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-inter text-[10px] text-theme-secondary">{review.handle}</p>
                    <p className="font-inter text-[10px] text-bronze mt-0.5">{review.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(reviews.length - visibleCount + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 ${
                i === currentIndex ? 'w-6 h-1 bg-bronze' : 'w-1 h-1 bg-bronze/30'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
