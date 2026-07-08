'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

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
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg)',
          borderBottom: `0.5px solid ${scrolled ? 'rgba(196,154,46,0.3)' : 'rgba(196,154,46,0.15)'}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center relative">
          {/* Left nav links — desktop */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link href="/" className="block">
              <span
                className="font-cormorant text-2xl font-light tracking-[0.25em] uppercase"
                style={{ color: 'var(--text-primary)' }}
              >
                Denzos
              </span>
              <span
                className="block font-inter text-[8px] tracking-[0.3em] uppercase -mt-0.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Maison de Parfum
              </span>
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4 ml-auto">
            <button
              aria-label="Search"
              className="transition-colors hidden md:block"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Search size={18} />
            </button>
            <Link
              href="/account"
              aria-label="Wishlist"
              className="relative transition-colors hidden md:block"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-bronze text-ivory text-[9px] font-inter font-medium w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bronze)' }}>
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              aria-label="Shopping cart"
              onClick={openDrawer}
              className="relative transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-[9px] font-inter font-medium w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bronze)', color: '#FAF7F0' }}
                >
                  {totalItems}
                </span>
              )}
            </button>
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              className="md:hidden transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col p-8"
              style={{ backgroundColor: 'var(--bg)', borderLeft: '0.5px solid var(--border)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end mb-8 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
              <div className="mb-8">
                <p className="font-cormorant text-3xl font-light" style={{ color: 'var(--text-primary)' }}>Denzos</p>
                <p className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-secondary)' }}>Maison de Parfum</p>
              </div>
              <nav className="flex flex-col gap-0">
                {[...navLinks, { href: '/contact', label: 'Contact' }, { href: '/account', label: 'My Account' }].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block font-inter text-[11px] tracking-[0.25em] uppercase py-4 transition-colors"
                      style={{
                        color: 'var(--text-secondary)',
                        borderBottom: '0.5px solid var(--border)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto flex items-center gap-4 pt-6">
                <ThemeToggle />
                <span className="font-inter text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>
                  Toggle theme
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
