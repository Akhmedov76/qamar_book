'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Abdulloh T.',
      role: 'Mijoz',
      text: 'Qamardan kitob olish har doim quvonch bag\'ishlaydi. Sifatli xizmat va tez yetkazib berish!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    },
    {
      id: 2,
      name: 'Malika Axmedova',
      role: 'O\'qituvchi',
      text: 'Bolalar va tarix bo\'limi doimiy quvonch manbai. Farzandlarim uchun rang-barang va sifatli kitoblarni aynan shu yerdan topaman.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    },
    {
      id: 3,
      name: 'Abdurashid Tursunov',
      role: 'Dasturchi',
      text: 'Kitob do\'konida Apple va Notion nafasini his qildim. UI/UX premium darajada, har bir sahifada nafislik sezilib turadi.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-6 md:px-12 bg-white relative overflow-hidden" id="testimonials">
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
        {/* Carousel Content */}
        <div className="min-h-[160px] flex items-center justify-center w-full mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-5"
            >
              {/* Quote text */}
              <p className="text-xl md:text-2xl font-serif italic text-[#062B22]/90 leading-relaxed max-w-2xl">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>

              {/* Rating stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} size={15} className="fill-[#D4AF37] text-[#D4AF37] stroke-none" />
                ))}
              </div>

              {/* Avatar and name */}
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                />
                <div className="text-left">
                  <h4 className="font-bold text-xs text-[#062B22]">{testimonials[activeIndex].name}</h4>
                  <span className="text-[10px] text-[#062B22]/50 font-light">{testimonials[activeIndex].role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-6 bg-[#D4AF37]' : 'bg-[#062B22]/20 hover:bg-[#062B22]/40'
              }`}
              aria-label={`Slayd ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
