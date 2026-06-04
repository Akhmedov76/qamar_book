'use client';

import React, { useState } from 'react';
import { Search, Smartphone, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LivePreviewModal from '@/components/books/LivePreviewModal';

export default function FeaturesSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 -mt-18 sm:-mt-12">
      {/* 3D Curved Capsule Container */}
      <div className="bg-white border border-[#062B22]/10 rounded-[32px] shadow-[0_20px_45px_rgba(6,43,34,0.08)] p-6 md:py-6 md:px-8 relative flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[90px]">
        
        {/* Left Side: Format Options / Tabs */}
        <div className="flex items-center gap-6 md:gap-8 text-[#062B22] w-full lg:w-auto justify-center lg:justify-start">
          <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-all duration-300 group/tab">
            <Search size={18} className="text-[#062B22]/70 group-hover/tab:text-[#D4AF37]" />
            <span className="text-xs md:text-sm font-semibold tracking-wide">Qog&apos;oz</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-all duration-300 group/tab">
            <Smartphone size={18} className="text-[#062B22]/70 group-hover/tab:text-[#D4AF37]" />
            <span className="text-xs md:text-sm font-semibold tracking-wide">Elektron</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-all duration-300 group/tab">
            <Headphones size={18} className="text-[#062B22]/70 group-hover/tab:text-[#D4AF37]" />
            <span className="text-xs md:text-sm font-semibold tracking-wide">Audio</span>
          </div>
        </div>

        {/* Center: 3D Open Book Widget overlapping capsule and curve */}
       

        {/* Right Side: Filled Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-end">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center justify-center px-6 py-2.5 rounded-full bg-[#062B22] border border-[#D4AF37]/35 text-[#FAF6EE] hover:bg-[#D4AF37] hover:text-[#062B22] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm w-[110px] text-center"
          >
            Ko&apos;rish
          </button>
          <Link
            href="/promotions"
            className="flex items-center justify-center px-6 py-2.5 rounded-full bg-[#062B22] border border-[#D4AF37]/35 text-[#FAF6EE] hover:bg-[#D4AF37] hover:text-[#062B22] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm w-[110px] text-center"
          >
            Aksiyalar
          </Link>
        </div>

      </div>

      {/* Preview Modal connection */}
      <LivePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        bookTitle="Atomik odatlar"
        bookAuthor="Jeyms Klar"
      />
    </div>
  );
}
