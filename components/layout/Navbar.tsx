'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { href: '/shop', label: 'Collections' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'Blog' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-ivory transition-all duration-300 ${
          scrolled ? 'border-b-[0.5px] border-bronze/30' : 'border-b-[0.5px] border-bronze/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center relative">
          {/* Left nav links — desktop */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-[11px] tracking-[0.2em] uppercase text-charcoal-muted hover:text-charcoal transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link href="/" className="block">
              <span className="font-cormorant text-2xl font-light tracking-[0.25em] text-charcoal uppercase">
                Denzos
              </span>
              <span className="block font-inter text-[8px] tracking-[0.3em] uppercase text-charcoal-muted -mt-0.5">
                Maison de Parfum
              </span>
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5 ml-auto">
            <button
              aria-label="Search"
              className="text-charcoal-muted hover:text-charcoal transition-colors"
            >
              <Search size={18} />
            </button>
            <Link href="/account" aria-label="Wishlist" className="relative text-charcoal-muted hover:text-charcoal transition-colors">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-bronze text-ivory text-[9px] font-inter font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              aria-label="Shopping cart"
              onClick={openDrawer}
              className="relative text-charcoal-muted hover:text-charcoal transition-colors"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-bronze text-ivory text-[9px] font-inter font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-charcoal-muted hover:text-charcoal transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto w-72 h-full bg-ivory border-l-[0.5px] border-bronze/30 flex flex-col p-8 animate-slide-in-right">
            <button
              onClick={() => setMobileOpen(false)}
              className="self-end text-charcoal-muted hover:text-charcoal mb-8"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <div className="mb-8">
              <p className="font-cormorant text-3xl font-light text-charcoal">Denzos</p>
              <p className="font-inter text-[9px] tracking-[0.3em] uppercase text-charcoal-muted">Maison de Parfum</p>
            </div>
            <nav className="flex flex-col gap-6">
              {[...navLinks, { href: '/contact', label: 'Contact' }, { href: '/account', label: 'My Account' }].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-inter text-[11px] tracking-[0.25em] uppercase text-charcoal-muted hover:text-charcoal transition-colors border-b-[0.5px] border-bronze/20 pb-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
