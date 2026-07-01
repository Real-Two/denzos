import Link from 'next/link';
import { MessageCircle } from 'lucide-react';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ivory border-t-[0.5px] border-bronze/30 mt-24">
      {/* Newsletter strip */}
      <div className="bg-bone border-b-[0.5px] border-bronze/20 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-cormorant text-2xl font-light text-charcoal">Stay in the world of Denzos</p>
            <p className="font-inter text-xs text-charcoal-muted mt-1">New releases, exclusive offers, and the art of Indian perfumery.</p>
          </div>
          <form className="flex gap-0 w-full max-w-sm">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-ivory border-[0.5px] border-bronze/40 border-r-0 px-4 py-3 text-sm font-inter text-charcoal placeholder:text-charcoal-muted/60 focus:outline-none focus:border-bronze transition-colors"
            />
            <button
              type="submit"
              className="bg-bronze text-ivory px-6 py-3 text-[11px] font-inter tracking-[0.2em] uppercase font-medium hover:bg-bronze-500 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-cormorant text-2xl font-light tracking-[0.2em] text-charcoal uppercase">Denzos</p>
          <p className="font-inter text-[9px] tracking-[0.3em] uppercase text-charcoal-muted mb-4">Maison de Parfum</p>
          <p className="font-inter text-xs text-charcoal-muted leading-relaxed">
            Crafting exceptional Indian fragrances using the finest botanicals — oud, saffron, mogra, and sandalwood — with intention and artistry.
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="https://instagram.com/denzosparfum"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-charcoal-muted hover:text-bronze transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-charcoal-muted hover:text-bronze transition-colors"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-charcoal mb-5">Shop</p>
          <ul className="space-y-3">
            {[
              { href: '/shop', label: 'All Fragrances' },
              { href: '/shop?filter=full-size', label: 'Full Size EDP' },
              { href: '/testers', label: 'Discovery Testers' },
              { href: '/shop?filter=warm', label: 'Warm & Oriental' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-inter text-xs text-charcoal-muted hover:text-charcoal transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-charcoal mb-5">Company</p>
          <ul className="space-y-3">
            {[
              { href: '/about', label: 'Our Story' },
              { href: '/contact', label: 'Contact Us' },
              { href: '/faq', label: 'FAQ' },
              { href: '/account', label: 'My Account' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-inter text-xs text-charcoal-muted hover:text-charcoal transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-charcoal mb-5">Information</p>
          <ul className="space-y-3">
            {[
              { href: '/faq#shipping', label: 'Shipping Policy' },
              { href: '/faq#returns', label: 'Returns & Exchanges' },
              { href: '/faq#privacy', label: 'Privacy Policy' },
              { href: '/faq#terms', label: 'Terms of Service' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-inter text-xs text-charcoal-muted hover:text-charcoal transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-[0.5px] border-bronze/20 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[11px] text-charcoal-muted">
            © {currentYear} Denzos Maison de Parfum. All rights reserved.
          </p>
          {/* Payment icons */}
          <div className="flex items-center gap-3">
            {['UPI', 'Visa', 'MC', 'RuPay', 'COD'].map(method => (
              <span
                key={method}
                className="font-inter text-[9px] tracking-[0.1em] uppercase text-charcoal-muted bg-bone border-[0.5px] border-bronze/20 px-2 py-1 rounded"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
