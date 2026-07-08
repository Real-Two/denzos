import { Truck, CreditCard, RefreshCw, MapPin } from 'lucide-react';

const trustItems = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders above ₹999' },
  { icon: CreditCard, label: 'COD Available', sub: 'Pay on delivery' },
  { icon: RefreshCw, label: 'Easy Returns', sub: '7-day hassle-free returns' },
  { icon: MapPin, label: 'Made in India', sub: 'Crafted with Indian botanicals' },
];

export default function TrustStrip() {
  return (
    <section style={{ backgroundColor: 'var(--surface-alt)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map(item => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center" style={{ border: '0.5px solid rgba(196,154,46,0.4)' }}>
                <item.icon size={16} style={{ color: 'var(--bronze)' }} />
              </div>
              <div>
                <p className="font-inter text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                <p className="font-inter text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
