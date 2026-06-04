'use client';

import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BookCard from './BookCard';
import { Book } from '@/store/useStore';

interface BookSliderProps {
  books: Book[];
  title: string;
  subtitle?: string;
}

export default function BookSlider({ books, title, subtitle }: BookSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigations */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col gap-3">
            {subtitle && (
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#062B22]">
              {title}
            </h2>
            <div className="w-16 h-[2px] bg-[#D4AF37] mt-1" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-11 h-11 rounded-full border border-[#062B22]/10 bg-[#F8F4ED] hover:bg-[#062B22] text-[#062B22] hover:text-[#F8F4ED] flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label="Oldingi slayd"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={scrollRight}
              className="w-11 h-11 rounded-full border border-[#062B22]/10 bg-[#F8F4ED] hover:bg-[#062B22] text-[#062B22] hover:text-[#F8F4ED] flex items-center justify-center transition-all duration-300 shadow-sm"
              aria-label="Keyingi slayd"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Area */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {books.map((book) => (
            <div key={book.id} className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-start flex-shrink-0">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
