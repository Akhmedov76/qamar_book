'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import BookCard from '@/components/books/BookCard';

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);

  return (
    <div className="bg-[#F8F4ED] min-h-screen py-16 px-6 md:px-12 text-left">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Navigation back */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#062B22]/70 hover:text-[#D4AF37] uppercase tracking-wider">
          <ArrowLeft size={14} />
          Bosh sahifaga qaytish
        </Link>

        {/* Title */}
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
            <Heart size={13} className="text-[#D4AF37] fill-[#D4AF37]" />
            Sevimlilar roʻyxati
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#062B22]">
            Sizga yoqqan asarlar
          </h1>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-1" />
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {wishlist.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[24px] border border-[#062B22]/5 luxury-shadow flex flex-col items-center gap-6 max-w-xl mx-auto w-full mt-6">
            <div className="w-16 h-16 rounded-full bg-[#062B22]/5 flex items-center justify-center text-[#D4AF37]">
              <Heart size={28} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif font-bold text-xl text-[#062B22]">Sevimlilar roʻyxati boʻsh</h3>
              <p className="text-xs text-[#062B22]/60 font-light max-w-xs leading-relaxed">
                Hali hech qanday kitob sevimlilarga qo&apos;shilmadi. Sayohatni boshlang va o&apos;zingizga yoqqan asarlarni belgilang!
              </p>
            </div>
            <Link
              href="/books"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-[24px] bg-[#062B22] hover:bg-[#D4AF37] text-[#F8F4ED] hover:text-[#062B22] font-semibold text-sm tracking-wide transition-all"
            >
              Kitoblar katalogi
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
