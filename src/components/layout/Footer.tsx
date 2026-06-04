import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#031813] text-[#F8F4ED] pt-20 pb-10 border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Subtle gold line accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand & Description */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="group">
            <span className="text-3xl font-serif font-bold tracking-tight text-[#F8F4ED] flex items-center">
              QAMAR
              <span className="text-[#D4AF37] ml-1 font-sans text-sm font-semibold tracking-widest uppercase">
                Store
              </span>
            </span>
          </Link>
          <p className="text-sm font-light text-[#F8F4ED]/70 leading-relaxed max-w-sm">
            Qamar Premium Bookstore kitobxonlik madaniyatini yuksak darajada taqdim etadi. Biz shunchaki do&apos;kon emas, balki ma&apos;rifat maskanimiz.
          </p>
          <div className="flex gap-4">
            <a href="https://t.me/qamar_uz" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#062B22] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B22] transition-colors duration-300" aria-label="Telegram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </a>
            <a href="https://instagram.com/qamar_uz" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#062B22] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B22] transition-colors duration-300" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="p-2.5 rounded-full bg-[#062B22] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#062B22] transition-colors duration-300" aria-label="Facebook">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-[#D4AF37] mb-6">Turkumlar</h3>
          <ul className="flex flex-col gap-4 text-sm font-light text-[#F8F4ED]/80">
            <li><Link href="/categories" className="hover:text-[#D4AF37] hover:underline transition-all">Diniy adabiyotlar</Link></li>
            <li><Link href="/categories" className="hover:text-[#D4AF37] hover:underline transition-all">Shaxsiy rivojlanish</Link></li>
            <li><Link href="/categories" className="hover:text-[#D4AF37] hover:underline transition-all">Badiiy adabiyotlar</Link></li>
            <li><Link href="/categories" className="hover:text-[#D4AF37] hover:underline transition-all">Biznes va Iqtisodiyot</Link></li>
            <li><Link href="/categories" className="hover:text-[#D4AF37] hover:underline transition-all">Tarix va Siyosat</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-[#D4AF37] mb-6">Foydali</h3>
          <ul className="flex flex-col gap-4 text-sm font-light text-[#F8F4ED]/80">
            <li><Link href="#" className="hover:text-[#D4AF37] hover:underline transition-all">Biz haqimizda</Link></li>
            <li><Link href="/books" className="hover:text-[#D4AF37] hover:underline transition-all">Barcha kitoblar</Link></li>
            <li><Link href="/authors" className="hover:text-[#D4AF37] hover:underline transition-all">Mualliflar</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37] hover:underline transition-all">Yetkazib berish xizmati</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37] hover:underline transition-all">Yordam & Tez-tez so&apos;raladigan savollar</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6 text-sm font-light text-[#F8F4ED]/80">
          <h3 className="text-lg font-serif font-semibold text-[#D4AF37] mb-2">Aloqa</h3>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
            <span>Toshkent shahri, Chilonzor tumani, Lutfiy ko&apos;chasi, 24-uy</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-[#D4AF37] shrink-0" />
            <a href="tel:+998712000000" className="hover:text-[#D4AF37] transition-all">+998 (71) 200-00-00</a>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-[#D4AF37] shrink-0" />
            <a href="mailto:info@qamar.uz" className="hover:text-[#D4AF37] transition-all">info@qamar.uz</a>
          </div>
        </div>
      </div>

      {/* Payment Partners & Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#F8F4ED]/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs font-light text-[#F8F4ED]/55 text-center md:text-left">
          &copy; {currentYear} Qamar Premium Bookstore. Barcha huquqlar himoyalangan.
        </p>

        {/* Payment badges */}
        <div className="flex items-center gap-4 opacity-75">
          <span className="text-[10px] uppercase font-semibold text-[#F8F4ED]/50 tracking-wider">To&apos;lov turlari:</span>
          <div className="flex items-center gap-3">
            {/* Click mock logo */}
            <div className="h-6 w-14 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-[10px] font-bold text-sky-400 select-none">
              CLICK
            </div>
            {/* Payme mock logo */}
            <div className="h-6 w-14 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-[10px] font-bold text-teal-400 select-none">
              PAYME
            </div>
            {/* Uzum mock logo */}
            <div className="h-6 w-14 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-[10px] font-bold text-violet-400 select-none">
              UZUM
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
