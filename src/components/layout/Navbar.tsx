'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, User, Sparkles, Menu, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const wishlistCount = useStore((state) => state.wishlist.length);
  const cartCount = useStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  const token = useStore((state) => state.token);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Bosh sahifa', path: '/' },
    { name: 'Kitoblar', path: '/books' },
    { name: 'Mualliflar', path: '/authors' },
    { name: 'Janrlar', path: '/categories' },
    { name: 'Aksiyalar', path: '/promotions' },
    { name: 'Blog', path: '/blog' },
    { name: 'Biz haqimizda', path: '/about' },
  ];

  const isHome = pathname === '/';

  // Decide whether the header text should be white or dark green
  // On home page, before scrolling, it should be white to overlay the dark hero section.
  const isLightTheme = scrolled || !isHome;

  const textClass = isLightTheme ? 'text-[#062B22]' : 'text-[#FAF6EE]';
  const textMutedClass = isLightTheme ? 'text-[#062B22]/75 hover:text-[#D4AF37]' : 'text-[#FAF6EE]/80 hover:text-[#D4AF37]';
  const logoClass = isLightTheme ? 'text-[#062B22]' : 'text-[#FAF6EE]';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
          ? 'py-3.5 px-6 md:px-12 bg-[#F8F4ED]/90 backdrop-blur-md border-b border-[#062B22]/10 shadow-[0_10px_30px_rgba(6,43,34,0.05)]'
          : 'py-6 px-6 md:px-12 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with Qamar title */}
          <Link href="/" className="flex items-center gap-3 ">

            <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full" />
          <div className='flex flex-col items-start gap-0.5 group'>
            <span className={`text-2xl font-serif font-bold tracking-wider transition-colors duration-300 leading-none ${logoClass}`}>
              QAMAR
            </span>
            <span className="text-[8px] tracking-[0.25em] uppercase font-sans font-semibold text-[#D4AF37] leading-none">
              KITOBLAR DO&apos;KONI
            </span>
          </div>
          </Link>

          {/* Desktop Navigation Link Items */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${isActive
                    ? (isLightTheme ? 'text-[#062B22]' : 'text-white')
                    : textMutedClass
                    }`}
                  id={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 bottom-[-6px] h-[1.5px] bg-[#D4AF37]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Search Widget */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Elegant header search bar widget */}
            <div className={`relative flex items-center rounded-full px-4 py-1.5 border transition-all duration-300 ${isLightTheme
              ? 'bg-[#062B22]/5 border-[#062B22]/10 focus-within:bg-[#062B22]/10'
              : 'bg-black/35 border-white/15 focus-within:bg-black/50'
              }`}>
              <input
                type="text"
                placeholder="Qidirish..."
                className={`bg-transparent text-xs w-32 focus:w-44 transition-all focus:outline-none font-light ${isLightTheme ? 'text-[#062B22] placeholder-[#062B22]/45' : 'text-white placeholder-white/45'
                  }`}
              />
              <Search size={14} className={isLightTheme ? 'text-[#062B22]/45' : 'text-white/45'} />
            </div>

            <Link
              href="/wishlist"
              className={`transition-colors relative p-1.5 ${textClass} hover:text-[#D4AF37]`}
              id="action-wishlist"
              aria-label="Sevimlilar"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#062B22] font-bold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#F8F4ED]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className={`transition-colors relative p-1.5 ${textClass} hover:text-[#D4AF37]`}
              id="action-cart"
              aria-label="Savat"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 font-bold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center border ${isLightTheme
                  ? 'bg-[#062B22] text-[#F8F4ED] border-[#F8F4ED]'
                  : 'bg-[#D4AF37] text-[#062B22] border-[#031813]'
                  }`}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* AI Assistant Button */}
            <Link
              href="/#ai-assistant"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${isLightTheme
                ? 'bg-[#062B22] text-[#F8F4ED] hover:bg-[#D4AF37] hover:text-[#062B22]'
                : 'bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#062B22] border border-white/10'
                }`}
              id="action-ai-assistant"
            >
              <Sparkles size={12} className="animate-pulse" />
              AI Assistant
            </Link>

            <Link
              href={token ? "/profile" : "/login"}
              className={`transition-colors p-1.5 ${textClass} hover:text-[#D4AF37]`}
              id="action-profile"
              aria-label="Profil"
            >
              <User size={18} />
            </Link>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2 transition-colors duration-300 ${textClass} hover:text-[#D4AF37]`}
            id="mobile-menu-toggle"
            aria-label="Menyuni ochish"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Slide Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-[#F8F4ED] border-b border-[#062B22]/10 flex flex-col p-8 xl:hidden shadow-lg text-left"
          >
            <nav className="flex flex-col gap-5 text-sm font-serif font-bold text-[#062B22] mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-[#D4AF37] transition-colors ${pathname === link.path ? 'text-[#D4AF37] border-l-2 border-[#D4AF37] pl-3' : 'pl-3'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-[#062B22]/10">
              <Link
                href="/#ai-assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#062B22] text-[#F8F4ED] font-bold text-xs tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#062B22] transition-colors"
              >
                <Sparkles size={14} /> AI Kutubxonachi
              </Link>

              <div className="flex justify-around items-center py-2 mt-2">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative p-2 text-[#062B22] hover:text-[#D4AF37]"
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#D4AF37] text-[#062B22] font-bold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative p-2 text-[#062B22] hover:text-[#D4AF37]"
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#062B22] text-[#F8F4ED] font-bold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  href={token ? "/profile" : "/login"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#062B22] hover:text-[#D4AF37]"
                >
                  <User size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
