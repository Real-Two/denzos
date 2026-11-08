'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="offer-ribbon"><Link href="/shop?filter=full-size">Opening collection <span>✦</span> Up to 50% off full-size fragrances ↗</Link>
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
