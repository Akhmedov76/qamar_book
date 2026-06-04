'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore, Book } from '@/store/useStore';

interface BookCardProps {
  book: Book;
  minimal?: boolean;
}

export default function BookCard({ book, minimal = false }: BookCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const wishlist = useStore((state) => state.wishlist);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const isInWishlist = wishlist.some((item) => item.id === book.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, 1);
  };

  return (
    <div
      className={`group flex flex-col h-full transition-all duration-500 ease-out transform hover:-translate-y-1.5 cursor-pointer ${
        minimal 
          ? 'bg-transparent border-0 shadow-none' 
          : 'bg-white border border-[#062B22]/5 rounded-[24px] overflow-hidden luxury-shadow hover:border-[#D4AF37]/35'
      }`}
      id={`book-card-${book.id}`}
    >
      <Link href={`/books/${book.id}`} className="flex flex-col h-full">
        {/* Book Cover Wrapper */}
        <div className={`relative aspect-[3/4] flex items-center justify-center overflow-hidden transition-all duration-500 ${
          minimal 
            ? 'bg-[#062B22]/5 rounded-[20px] p-0 shadow-[0_8px_25px_rgba(6,43,34,0.06)]' 
            : 'bg-[#062B22]/5 p-6'
        }`}>
          {/* Zoom on hover cover */}
          <div className={`relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-103 ${
            minimal 
              ? '' 
              : 'shadow-[5px_10px_20px_rgba(6,43,34,0.15)] rounded-r-[8px] rounded-l-[2px]'
          }`}>
            <img
              src={book.cover_image}
              alt={book.title}
              className={`object-cover w-full h-full ${
                minimal 
                  ? 'rounded-[20px]' 
                  : 'rounded-r-[8px] rounded-l-[2px]'
              }`}
            />
          </div>

          {/* Quick Action Top Wishlist Badge */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#062B22] flex items-center justify-center shadow-md backdrop-blur-sm transition-all duration-300 transform active:scale-90"
            aria-label="Sevimlilarga qo'shish"
          >
            <Heart
              size={16}
              className={`transition-colors duration-300 ${
                isInWishlist ? 'fill-red-500 text-red-500' : 'text-[#062B22]/60 hover:text-red-500'
              }`}
            />
          </button>

          {/* Rating Badge (Only in default/non-minimal mode overlayed) */}
          {!minimal && (
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[#D4AF37] text-xs font-semibold">
              <Star size={12} className="fill-[#D4AF37] stroke-none" />
              <span>{book.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content detail */}
        <div className={`flex flex-col flex-grow justify-between ${
          minimal ? 'pt-4 px-1 pb-1 bg-transparent' : 'p-5 bg-white'
        }`}>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[10px] uppercase font-light text-[#062B22]/60 tracking-wider">
              {book.author}
            </span>
            <h3 className="text-sm md:text-base font-serif font-bold text-[#062B22] group-hover:text-[#D4AF37] transition-colors line-clamp-1 leading-snug">
              {book.title}
            </h3>

            {/* Inline Rating for Minimal card (5 stars + reviews count) */}
            {minimal && (
              <div className="flex items-center gap-1 mt-1">
                <div className="flex gap-0.5 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-[#D4AF37] stroke-none" />
                  ))}
                </div>
                <span className="text-[10px] text-[#062B22]/50 font-light ml-1">33 sharh</span>
              </div>
            )}
          </div>

          <div className={`flex mt-2 ${
            minimal 
              ? 'pt-1.5 items-center justify-start' 
              : 'pt-3 border-t border-[#062B22]/5 items-center justify-between'
          }`}>
            <div className="flex flex-col text-left">
              {book.old_price && !minimal && (
                <span className="text-[10px] text-[#062B22]/40 line-through">
                  {book.old_price.toLocaleString()} so&apos;m
                </span>
              )}
              <span className={`text-xs md:text-sm font-bold text-[#062B22] ${minimal ? 'text-[#062B22]/90' : ''}`}>
                {book.price.toLocaleString()} so&apos;m
              </span>
            </div>

            {/* Quick Add to Cart */}
            {!minimal && (
              <button
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-full bg-[#062B22] text-[#F8F4ED] hover:bg-[#D4AF37] hover:text-[#062B22] flex items-center justify-center shadow transition-all duration-300 transform active:scale-95 shrink-0"
                id={`quick-add-cart-${book.id}`}
                aria-label="Savatga qo'shish"
              >
                <ShoppingBag size={16} />
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
