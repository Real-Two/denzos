import { Truck, CreditCard, RefreshCw, MapPin } from 'lucide-react';

const trustItems = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders above ₹999' },
  { icon: CreditCard, label: 'COD Available', sub: 'Pay on delivery' },
  { icon: RefreshCw, label: 'Easy Returns', sub: '7-day hassle-free returns' },
  { icon: MapPin, label: 'Made in India', sub: 'Crafted with Indian botanicals' },
];

export default function TrustStrip() {
  return (
    <section className="border-y-[0.5px] border-bronze/25 bg-bone">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map(item => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 border-[0.5px] border-bronze/40 flex items-center justify-center">
                <item.icon size={16} className="text-bronze" />
              </div>
              <div>
                <p className="font-inter text-xs font-medium text-charcoal">{item.label}</p>
                <p className="font-inter text-[11px] text-charcoal-muted mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
