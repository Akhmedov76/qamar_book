'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search } from 'lucide-react';
import BookCard from '@/components/books/BookCard';
import { Book } from '@/store/useStore';

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

export default function BooksPage() {
  // Filters State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedPublisher, setSelectedPublisher] = useState('All');
  const [selectedTranslator, setSelectedTranslator] = useState('All');
  const [maxPrice, setMaxPrice] = useState(250000);

  const categories = ['All', 'Shaxsiy rivojlanish', 'Biznes va iqtisod', 'Badiiy adabiyotlar', 'Tarix'];
  const formats = [
    { label: 'Barchasi', value: 'All' },
    { label: 'Bosma (Qattiq muqova)', value: 'Qog\'oz (Qattiq)' },
    { label: 'Bosma (Yumshoq muqova)', value: 'Qog\'oz (Yumshoq)' },
    { label: 'Elektron kitoblar', value: 'ebook' },
    { label: 'Audio-kitoblar', value: 'audio' },
  ];
  
  const publishers = ['All', 'Qamar Nashriyot', 'Hilol Nashr', 'Nihol Nashr'];
  const translators = ['All', 'M. G\'afforov', 'I. Solihov', 'O. Fayzullayev', 'D. Begmatov', 'S. Hasanov', 'Alisher Navoiy'];

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      // 1. Text Search
      const matchSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        (book.translator && book.translator.toLowerCase().includes(search.toLowerCase()));

      // 2. Category
      const matchCategory = selectedCategory === 'All' || book.category.toLowerCase() === selectedCategory.toLowerCase();
      
      // 3. Price
      const matchPrice = book.price <= maxPrice;

      // 4. Format
      let matchFormat = true;
      if (selectedFormat !== 'All') {
        if (selectedFormat === 'ebook') {
          matchFormat = book.has_ebook === true;
        } else if (selectedFormat === 'audio') {
          matchFormat = book.has_audio === true;
        } else {
          matchFormat = book.binding === selectedFormat;
        }
      }

      // 5. Publisher
      const matchPublisher = selectedPublisher === 'All' || book.publisher === selectedPublisher;

      // 6. Translator
      const matchTranslator = selectedTranslator === 'All' || book.translator === selectedTranslator;

      return matchSearch && matchCategory && matchPrice && matchFormat && matchPublisher && matchTranslator;
    });
  }, [search, selectedCategory, maxPrice, selectedFormat, selectedPublisher, selectedTranslator]);

  return (
    <div className="bg-[#F8F4ED] min-h-screen py-16 px-6 md:px-12 text-left">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header section */}
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Qamar Kutubxonasi</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#062B22]">
            Barcha premium kitoblar
          </h1>
          <div className="w-20 h-[2px] bg-[#D4AF37] mt-1" />
        </div>

        {/* Search & Filters Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 bg-white p-8 rounded-[24px] border border-[#062B22]/5 luxury-shadow flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[#062B22]/5">
              <SlidersHorizontal size={18} className="text-[#D4AF37]" />
              <h3 className="font-serif font-bold text-lg text-[#062B22]">Filtrlar</h3>
            </div>

            {/* Keyword Search */}
            <div className="flex flex-col gap-2">
              <label htmlFor="search-input" className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">Qidiruv</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#062B22]/40" />
                <input
                  type="text"
                  id="search-input"
                  placeholder="Nom, muallif yoki tarjimon..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-[16px] bg-[#062B22]/5 border border-[#062B22]/5 focus:border-[#D4AF37] focus:outline-none text-xs text-[#062B22]"
                />
              </div>
            </div>

            {/* Format filter */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">Format</span>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[14px] bg-[#062B22]/5 border border-[#062B22]/5 text-xs text-[#062B22] focus:border-[#D4AF37] focus:outline-none"
              >
                {formats.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* Category selection */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">Kategoriyalar</span>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-xs py-2 px-3 rounded-[12px] transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#062B22] text-[#F8F4ED] font-semibold'
                        : 'text-[#062B22]/85 hover:bg-[#062B22]/5 hover:text-[#062B22]'
                    }`}
                  >
                    {cat === 'All' ? 'Barchasi' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Publisher selection */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">Nashriyot</span>
              <select
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[14px] bg-[#062B22]/5 border border-[#062B22]/5 text-xs text-[#062B22] focus:border-[#D4AF37] focus:outline-none"
              >
                {publishers.map((pub) => (
                  <option key={pub} value={pub}>{pub === 'All' ? 'Barcha nashriyotlar' : pub}</option>
                ))}
              </select>
            </div>

            {/* Translator selection */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">Tarjimon</span>
              <select
                value={selectedTranslator}
                onChange={(e) => setSelectedTranslator(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[14px] bg-[#062B22]/5 border border-[#062B22]/5 text-xs text-[#062B22] focus:border-[#D4AF37] focus:outline-none"
              >
                {translators.map((t) => (
                  <option key={t} value={t}>{t === 'All' ? 'Barcha tarjimonlar' : t}</option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">
                <span>Maks. Narx</span>
                <span className="text-[#D4AF37]">{maxPrice.toLocaleString()} so&apos;m</span>
              </div>
              <input
                type="range"
                min={20000}
                max={250000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#062B22] h-1 bg-[#062B22]/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </aside>

          {/* Catalog Listing */}
          <main className="lg:col-span-9 flex flex-col gap-8">
            <div className="flex justify-between items-center bg-white py-4 px-6 rounded-[18px] border border-[#062B22]/5 shadow-sm">
              <span className="text-sm font-light text-[#062B22]/70">
                Jami <strong className="text-[#062B22] font-semibold">{filteredBooks.length}</strong> ta kitob topildi
              </span>
            </div>

            {filteredBooks.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBooks.map((book) => (
                  <motion.div key={book.id} layout>
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center bg-white rounded-[24px] border border-dashed border-[#062B22]/15 flex flex-col items-center gap-4">
                <span className="text-4xl">📚</span>
                <h3 className="font-serif font-bold text-lg text-[#062B22]">Hech qanday kitob topilmadi</h3>
                <p className="text-xs text-[#062B22]/60 font-light">Qidiruv kalit soʻzlari yoki filtr chegaralarini oʻzgartirib koʻring.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
