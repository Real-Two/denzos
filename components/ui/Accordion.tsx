'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
  id?: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y-[0.5px] divide-bronze/25">
      {items.map((item, index) => (
        <div key={index} id={item.id}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-start justify-between py-6 text-left gap-6 group"
            aria-expanded={openIndex === index}
          >
            <span className="font-cormorant text-xl font-light text-theme-primary group-hover:text-bronze transition-colors leading-snug">
              {item.question}
            </span>
            <span className="flex-shrink-0 mt-1 text-bronze transition-transform duration-200">
              {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
            }`}
          >
            <p className="font-inter text-sm text-theme-secondary leading-relaxed pr-10">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
