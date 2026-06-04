'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Search, Sparkles, RefreshCw } from 'lucide-react';
import BookCard from '@/components/books/BookCard';
import { Book } from '@/store/useStore';

export default function SearchPage() {
  // Enriched mock data matching all other pages
  const allBooks: Book[] = [
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
      has_ebook: true,
      ebook_price: 25000,
      has_audio: true,
      audio_price: 30000,
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
      has_ebook: true,
      ebook_price: 20000,
      has_audio: false,
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
      has_ebook: true,
      ebook_price: 22000,
      has_audio: true,
      audio_price: 25000,
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
      has_ebook: true,
      ebook_price: 30000,
      has_audio: true,
      audio_price: 35000,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  // Debouncing custom hook logic
  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        setDebouncedQuery(searchTerm);
      });
    }, 450); // 450ms debounce time

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredBooks = allBooks.filter((book) => {
    if (!debouncedQuery.trim()) return true;
    const query = debouncedQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      (book.translator && book.translator.toLowerCase().includes(query)) ||
      (book.publisher && book.publisher.toLowerCase().includes(query))
    );
  });

  return (
    <div className="bg-[#F8F4ED] min-h-screen py-16 px-6 md:px-12 text-left">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#D4AF37]" />
            Aqlli qidiruv tizimi
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#062B22]">
            Qidiruv xizmati
          </h1>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-2" />
        </div>

        {/* Large Input Box */}
        <div className="max-w-2xl mx-auto w-full bg-white p-4 rounded-[28px] border border-[#062B22]/10 luxury-shadow flex items-center gap-3">
          <Search size={22} className="text-[#062B22]/40 ml-2" />
          <input
            type="text"
            placeholder="Kitob nomi, muallifi, tarjimoni yoki nashriyoti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-2 bg-transparent focus:outline-none text-base text-[#062B22] font-light"
            id="advanced-search-input"
          />
          {isPending && (
            <RefreshCw size={18} className="animate-spin text-[#D4AF37] mr-2" />
          )}
        </div>

        {/* Results grid */}
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#062B22]/10">
            <span className="text-sm font-light text-[#062B22]/70">
              Qidiruv natijasi: <strong className="text-[#062B22] font-semibold">{filteredBooks.length}</strong> ta kitob
            </span>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-4 bg-white rounded-[24px] border border-dashed border-[#062B22]/15">
              <span className="text-3xl">🔍</span>
              <h3 className="font-serif font-bold text-lg text-[#062B22]">Hech narsa topilmadi</h3>
              <p className="text-xs text-[#062B22]/60 font-light">Siz kiritgan kalit so&apos;zlar bo&apos;yicha hech qanday kitob aniqlanmadi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
