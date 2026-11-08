import Link from 'next/link';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--bg)', borderTop: '0.5px solid var(--border)' }} className="mt-24">
      <div className="footer-edition"><div><p className="editor-kicker">The discovery collection</p><h2>A little bottle.<br/><em>A lasting impression.</em></h2><Link href="/testers">Find your 10 ml ↗</Link></div></div>
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-cormorant text-2xl font-light tracking-[0.2em] uppercase" style={{ color: 'var(--text-primary)' }}>Denzos</p>
          <p className="font-inter text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>Maison de Parfum</p>
          <p className="font-inter text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Crafting exceptional Indian fragrances using the finest botanicals — oud, saffron, mogra, and sandalwood — with intention and artistry.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="https://instagram.com/denzosparfum" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: 'var(--text-primary)' }}>Shop</p>
          <ul className="space-y-3">
            {[
              { href: '/shop', label: 'All Fragrances' },
              { href: '/shop?filter=full-size', label: 'Full Size EDP' },
              { href: '/testers', label: 'Discovery Testers' },
              { href: '/shop?filter=warm', label: 'Warm & Oriental' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-inter text-xs transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: 'var(--text-primary)' }}>Company</p>
          <ul className="space-y-3">
            {[
              { href: '/about', label: 'Our Story' },
              { href: '/contact', label: 'Contact Us' },
              { href: '/faq', label: 'FAQ' },
              { href: '/account', label: 'My Account' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-inter text-xs transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: 'var(--text-primary)' }}>Information</p>
          <ul className="space-y-3">
            {[
              { href: '/faq#shipping', label: 'Shipping Policy' },
              { href: '/faq#returns', label: 'Returns & Exchanges' },
              { href: '/faq#privacy', label: 'Privacy Policy' },
              { href: '/faq#terms', label: 'Terms of Service' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-inter text-xs transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '0.5px solid var(--border)' }} className="py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[11px]" style={{ color: 'var(--text-secondary)' }}>
            © {currentYear} Denzos Maison de Parfum. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {['UPI', 'Visa', 'MC', 'RuPay', 'COD'].map(method => (
              <span key={method} className="font-inter text-[9px] tracking-[0.1em] uppercase px-2 py-1 rounded"
                style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--surface-alt)', border: '0.5px solid var(--border)' }}>
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
