'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, BookHeart, GraduationCap, Briefcase, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategorySection() {
  const categories = [
    {
      name: 'Diniy adabiyotlar',
      count: '1,200+ kitob',
      icon: <Landmark className="w-5 h-5 text-[#062B22] transition-colors group-hover:text-[#062B22]" />,
      slug: 'diniy',
    },
    {
      name: 'Shaxsiy rivojlanish',
      count: '1,000+ kitob',
      icon: <Sparkles className="w-5 h-5 text-[#062B22] transition-colors group-hover:text-[#062B22]" />,
      slug: 'shaxsiy-rivojlanish',
    },
    {
      name: 'Badiiy adabiyotlar',
      count: '1,500+ kitob',
      icon: <BookOpen className="w-5 h-5 text-[#062B22] transition-colors group-hover:text-[#062B22]" />,
      slug: 'badiiy',
    },
    {
      name: 'Bolalar adabiyoti',
      count: '800+ kitob',
      icon: <BookHeart className="w-5 h-5 text-[#062B22] transition-colors group-hover:text-[#062B22]" />,
      slug: 'bolalar',
    },
    {
      name: 'Tarix',
      count: '600+ kitob',
      icon: <GraduationCap className="w-5 h-5 text-[#062B22] transition-colors group-hover:text-[#062B22]" />,
      slug: 'tarix',
    },
    {
      name: 'Biznes va iqtisod',
      count: '700+ kitob',
      icon: <Briefcase className="w-5 h-5 text-[#062B22] transition-colors group-hover:text-[#062B22]" />,
      slug: 'biznes',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
    },
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white border-t border-[#062B22]/5" id="categories">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-[#062B22]/10 pb-4">
          <div className="flex flex-col gap-2 text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Turkumlar</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#062B22] tracking-tight">
              Mashhur toifalar
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-[#062B22]/70 hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
          >
            Barchasini koʻrish &rarr;
          </Link>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {categories.map((cat, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Link
                href={`/categories?slug=${cat.slug}`}
                className="group flex flex-col items-center justify-center p-6 bg-[#FAF6EE] hover:bg-[#062B22] border border-[#062B22]/5 rounded-[24px] text-center transition-all duration-500 hover:shadow-[0_15px_30px_rgba(6,43,34,0.08)] transform hover:-translate-y-1.5 h-full min-h-[175px]"
                id={`category-${cat.slug}`}
              >
                {/* Icon wrapper - white circle with shadow */}
                <div className="w-12 h-12 rounded-full bg-white group-hover:bg-[#D4AF37] flex items-center justify-center mb-4 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-all duration-500">
                  {cat.icon}
                </div>

                {/* Content */}
                <h3 className="text-xs font-serif font-bold text-[#062B22] group-hover:text-white transition-colors duration-300 line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-[10px] font-light text-[#062B22]/55 group-hover:text-white/70 transition-colors duration-300 mt-1">
                  {cat.count}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
