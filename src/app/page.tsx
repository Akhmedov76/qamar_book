'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CategorySection from '@/components/home/CategorySection';
import BookCard from '@/components/books/BookCard';
import PromoBanner from '@/components/home/PromoBanner';
import Testimonials from '@/components/home/Testimonials';
import AiAssistant from '@/components/shared/AiAssistant';
import ValuePropSection from '@/components/home/ValuePropSection';
import { Book } from '@/store/useStore';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  // Rich luxury bookstore mock data aligned with the mockup image
  const recommendedBooks: Book[] = [
    {
      id: 1,
      title: "Atomik odatlar",
      author: "Jeyms Klar",
      price: 89000,
      old_price: 99000,
      rating: 4.8,
      cover_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300",
      category: "Shaxsiy rivojlanish",
      binding: "Qog'oz (Yumshoq)",
      publisher: "Nihol Nashr",
      translator: "M. G'afforov",
      language: "O'zbekcha",
      published_year: 2022,
      has_preview: true,
      preview_pages: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300",
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300",
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300",
        "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=300"
      ],
      has_ebook: true,
      ebook_price: 25000,
      has_audio: true,
      audio_price: 30000,
      audio_file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      quotes: ["Har kuni 1% ga yaxshilanish - yil oxirida 37 barobar o'sish degani.", "Odatlar - bu muvaffaqiyatning murakkab foizlaridir."],
      reviews: [
        {
          id: 1,
          user: { username: "shoxrux_dev", first_name: "Shohruh", last_name: "Abduhamidov" },
          rating: 5,
          text: "Hayotimni o'zgartirgan juda zo'r kitob! Tizim qurish bo'yicha maslahatlar juda foydali bo'ldi.",
          quote: "Har kuni 1% ga yaxshilanish - yil oxirida 37 barobar o'sish degani.",
          created_at: "2026-05-15T12:00:00Z"
        }
      ]
    },
    {
      id: 2,
      title: "Boy ota, kambag'al ota",
      author: "Robert Kiyosaki",
      price: 79000,
      old_price: 89000,
      rating: 4.7,
      cover_image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=300",
      category: "Biznes va iqtisod",
      binding: "Qog'oz (Qattiq)",
      publisher: "Qamar Nashriyot",
      translator: "I. Solihov",
      language: "O'zbekcha",
      published_year: 2021,
      has_preview: true,
      preview_pages: [
        "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=300",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300"
      ],
      has_ebook: true,
      ebook_price: 20000,
      has_audio: false,
      quotes: ["Kambag'allar pul uchun ishlaydi, boylar esa pulni o'zlari uchun ishlashga majbur qiladi."],
      reviews: []
    },
    {
      id: 3,
      title: "Sevgi san'ati",
      author: "Erich Fromm",
      price: 65000,
      rating: 4.9,
      cover_image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300",
      category: "Badiiy adabiyotlar",
      binding: "Qog'oz (Yumshoq)",
      publisher: "Hilol Nashr",
      translator: "O. Fayzullayev",
      language: "O'zbekcha",
      published_year: 2020,
      has_preview: false,
      has_ebook: false,
      has_audio: true,
      audio_price: 18000,
      audio_file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      quotes: ["Sevgi - bu tasodifiy his-tuyg'u emas, balki doimiy harakat va san'atdir."],
      reviews: []
    },
    {
      id: 4,
      title: "Ikigai",
      author: "Gektor Garsiya",
      price: 85000,
      rating: 4.9,
      cover_image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300",
      category: "Shaxsiy rivojlanish",
      binding: "Qog'oz (Qattiq)",
      publisher: "Nihol Nashr",
      translator: "D. Begmatov",
      language: "O'zbekcha",
      published_year: 2023,
      has_preview: true,
      preview_pages: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300",
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300"
      ],
      has_ebook: true,
      ebook_price: 22000,
      has_audio: true,
      audio_price: 25000,
      audio_file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      quotes: ["Hayot mazmuni (Ikigai) - siz yaxshi ko'radigan, qila oladigan, dunyoga kerak bo'lgan va haq to'lanadigan ishlar chorrahasidir."],
      reviews: []
    },
    {
      id: 5,
      title: "Ming bir kecha",
      author: "Anonim",
      price: 75000,
      rating: 4.8,
      cover_image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300",
      category: "Badiiy adabiyotlar",
      binding: "Qog'oz (Qattiq)",
      publisher: "Qamar Nashriyot",
      translator: "Alisher Navoiy",
      language: "O'zbekcha",
      published_year: 2019,
      has_preview: false,
      has_ebook: false,
      has_audio: false,
      quotes: [],
      reviews: []
    },
    {
      id: 6,
      title: "Sapiens Qisqacha tarix",
      author: "Yuval N. Harari",
      price: 95000,
      rating: 4.8,
      cover_image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300",
      category: "Tarix",
      binding: "Qog'oz (Qattiq)",
      publisher: "Hilol Nashr",
      translator: "S. Hasanov",
      language: "O'zbekcha",
      published_year: 2020,
      has_preview: true,
      preview_pages: [
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300"
      ],
      has_ebook: true,
      ebook_price: 30000,
      has_audio: true,
      audio_price: 35000,
      audio_file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      quotes: ["Biz dunyoni tasavvurimizdagi hikoyalar orqali boshqaramiz."],
      reviews: []
    },
  ];

  return (
    <>
      {/* 1. Cinematic Hero with Scalloped Transition */}
      <HeroSection />

      {/* 2. Shop Guarantees Features Bar */}
      <FeaturesSection />

      {/* 3. Categories Section */}
      <CategorySection />

      {/* 4. Recommendation Section (Siz uchun tavsiya etamiz) */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="py-24 px-6 md:px-12 bg-[#F8F4ED]/20 border-t border-[#062B22]/5"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex items-end justify-between border-b border-[#062B22]/10 pb-4">
            <div className="flex flex-col gap-2 text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Tavsiyalar</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#062B22] tracking-tight">
                Siz uchun tavsiya etamiz
              </h2>
            </div>
            <Link
              href="/books"
              className="text-xs font-semibold text-[#062B22]/70 hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
            >
              Barchasini koʻrish &rarr;
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {recommendedBooks.map((book) => (
              <BookCard key={book.id} book={book} minimal={true} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. Mobile App Promotion & Countdown Promo Banner */}
      <PromoBanner />

      {/* 6. Shopify vs Qamar Value Propositions */}
      <ValuePropSection />

      {/* 7. Testimonials Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Testimonials />
      </motion.div>

      {/* Floating AI Book Assistant Drawer */}
      <AiAssistant />
    </>
  );
}
