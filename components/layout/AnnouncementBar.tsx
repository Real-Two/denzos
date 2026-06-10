'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-bronze text-ivory relative overflow-hidden" style={{ height: '40px' }}>
      {/* Marquee container */}
      <div className="flex items-center h-full">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-inter text-[11px] tracking-[0.15em] uppercase mx-12">
              Inaugural offer: 50% off all fragrances&nbsp;&nbsp;·&nbsp;&nbsp;Use code <strong>DENZOS50</strong>&nbsp;&nbsp;·&nbsp;&nbsp;Free shipping above ₹999&nbsp;&nbsp;·&nbsp;&nbsp;COD available across India
            </span>
          ))}
        </div>
      </div>
      {/* Dismiss */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/80 hover:text-ivory transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
