'use client';

import React, { use, useState, useEffect } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, ShoppingBag, BookOpen, Headphones, AlignLeft, Sparkles, MessageSquare, Play, Pause } from 'lucide-react';
import { useStore, Book } from '@/store/useStore';
import BookSlider from '@/components/books/BookSlider';
import LivePreviewModal from '@/components/books/LivePreviewModal';
import Link from 'next/link';

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const bookId = Number(resolvedParams.id);

  // Expanded mock database matching homepage data
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
      sku: "QMR-BK-001",
      stock: 12,
      description: "Har kuni atigi 1 foizga yaxshilanish uzoq muddatda qanchalik ulkan natijalar berishi haqida ilmiy va amaliy kitob. James Clear yomon odatlardan qutulish va yangi ijobiy odatlarni shakllantirishning eng samarali metodikasini sodda tarzda bayon qiladi.",
      binding: "Qog'oz (Yumshoq)",
      publisher: "Nihol Nashr",
      translator: "M. G'afforov",
      language: "O'zbekcha",
      published_year: 2022,
      has_preview: true,
      preview_pages: ["", "", "", ""],
      has_ebook: true,
      ebook_price: 25000,
      has_audio: true,
      audio_price: 30000,
      audio_file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      quotes: [
        "Har kuni 1% ga yaxshilanish - yil oxirida 37 barobar o'sish degani.",
        "Odatlar - bu muvaffaqiyatning murakkab foizlaridir.",
        "Maqsadlarni unuting, tizimga e'tibor qarating."
      ],
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
      sku: "QMR-BK-002",
      stock: 25,
      description: "Dunyodagi eng ko'p sotilgan shaxsiy rivojlanish kitoblaridan biri. Stephen Covey inson tabiati, odatlar va ularni muvaffaqiyatga yo'naltirish to'g'risida chuqur tahliliy falsafani ajoyib hayotiy misollar bilan tushuntiradi.",
      binding: "Qog'oz (Qattiq)",
      publisher: "Qamar Nashriyot",
      translator: "I. Solihov",
      language: "O'zbekcha",
      published_year: 2021,
      has_preview: true,
      preview_pages: ["", ""],
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
      sku: "QMR-BK-003",
      stock: 8,
      description: "Hujjatul Islom Abu Homid al-Ghazoliyning islom ma'rifati va axloqi, nafs tarbiyasi va qalb sirlari to'g'risidagi asari.",
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
      sku: "QMR-BK-004",
      stock: 15,
      description: "Hayot mazmuni (Ikigai) - siz yaxshi ko'radigan, qila oladigan, dunyoga kerak bo'lgan va haq to'lanadigan ishlar chorrahasidir.",
      binding: "Qog'oz (Qattiq)",
      publisher: "Nihol Nashr",
      translator: "D. Begmatov",
      language: "O'zbekcha",
      published_year: 2023,
      has_preview: true,
      preview_pages: ["", "", ""],
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
      sku: "QMR-BK-005",
      stock: 5,
      description: "Sohibqiron Amir Temurning davlat boshqaruvi, harbiy mahorat, siyosat va adolat to'g'risidagi tarixiy qo'llanmasi.",
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
      sku: "QMR-BK-006",
      stock: 14,
      description: "Chalg'ituvchi texnologiyalar asrida diqqatni jamlash va chuqur ishlash qobiliyati eng noyob ko'nikmaga aylandi.",
      binding: "Qog'oz (Qattiq)",
      publisher: "Hilol Nashr",
      translator: "S. Hasanov",
      language: "O'zbekcha",
      published_year: 2020,
      has_preview: true,
      preview_pages: [""],
      has_ebook: true,
      ebook_price: 30000,
      has_audio: true,
      audio_price: 35000,
      audio_file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      quotes: ["Biz dunyoni tasavvurimizdagi hikoyalar orqali boshqaramiz."],
      reviews: []
    },
  ];

  const book = allBooks.find((b) => b.id === bookId) || allBooks[0];

  const addToCart = useStore((state) => state.addToCart);
  const wishlist = useStore((state) => state.wishlist);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const isInWishlist = wishlist.some((item) => item.id === book.id);

  // States
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<'paper' | 'ebook' | 'audio'>('paper');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Audio Player State
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25); // percentage
  const [audioSpeed, setAudioSpeed] = useState<number>(1); // 1x, 1.25x, 1.5x, 2x

  // Reviews Local State
  const [reviewsList, setReviewsList] = useState(book.reviews || []);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewQuote, setNewReviewQuote] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [userQuotes, setUserQuotes] = useState(book.quotes || []);

  // Format details helper
  const getFormatDetails = () => {
    switch (selectedFormat) {
      case 'ebook':
        return {
          price: book.ebook_price || 20000,
          label: "Elektron kitob (PDF, EPUB)",
          stockText: "Zudlik bilan yuklab olish",
        };
      case 'audio':
        return {
          price: book.audio_price || 25000,
          label: "Audio-kitob (MP3)",
          stockText: "Saytning o'zida tinglash",
        };
      default:
        return {
          price: book.price,
          label: `${book.binding} (Qog'ozli)`,
          stockText: `Sotuvda bor (${book.stock || 5} dona)`,
        };
    }
  };

  const currentDetails = getFormatDetails();

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  // Handle Review Submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newReview = {
      id: reviewsList.length + 1,
      user: { username: "kitobxon_uz", first_name: "Siz", last_name: "" },
      rating: newReviewRating,
      text: newReviewText,
      quote: newReviewQuote.trim() ? newReviewQuote : undefined,
      created_at: new Date().toISOString()
    };

    setReviewsList([newReview, ...reviewsList]);
    
    if (newReviewQuote.trim()) {
      setUserQuotes([...userQuotes, newReviewQuote.trim()]);
    }

    // Reset inputs
    setNewReviewText('');
    setNewReviewQuote('');
    setNewReviewRating(5);
  };

  // Audio Play Simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (audioPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setAudioPlaying(false);
            return 0;
          }
          return prev + 1 * audioSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [audioPlaying, audioSpeed]);

  const handleAddToCart = () => {
    // Add format type in the cart if required. Here we map the format name to custom book
    const customBookItem: Book = {
      ...book,
      price: currentDetails.price,
      title: `${book.title} [${selectedFormat === 'paper' ? 'Qog\'oz' : selectedFormat === 'ebook' ? 'Elektron' : 'Audio'}]`,
    };
    addToCart(customBookItem, quantity);
  };

  const similarBooks = allBooks.filter((b) => b.category === book.category && b.id !== book.id);

  return (
    <div className="bg-[#F8F4ED] min-h-screen py-32 px-6 md:px-12 text-left">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs tracking-wider uppercase font-semibold text-[#062B22]/55">
          <Link href="/" className="hover:text-[#D4AF37]">Bosh sahifa</Link>
          <span className="mx-2.5">/</span>
          <Link href="/books" className="hover:text-[#D4AF37]">Kitoblar</Link>
          <span className="mx-2.5">/</span>
          <span className="text-[#062B22] font-bold">{book.title}</span>
        </nav>

        {/* Dynamic Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Cover Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            <div className="w-full max-w-[340px] aspect-[3/4] bg-white rounded-[24px] border border-[#062B22]/5 p-8 luxury-shadow flex items-center justify-center relative overflow-hidden group">
              <div className="relative w-full h-full shadow-[10px_20px_40px_rgba(6,43,34,0.22)] rounded-r-[12px] rounded-l-[3px] transition-transform duration-700 group-hover:scale-105">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="object-cover w-full h-full rounded-r-[12px] rounded-l-[3px]"
                />
              </div>
            </div>

            {/* Live Preview Button */}
            {book.has_preview !== false && (
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="w-full max-w-[340px] flex items-center justify-center gap-2 py-4 rounded-[20px] bg-white hover:bg-[#062B22] text-[#062B22] hover:text-[#F8F4ED] border border-[#062B22]/15 hover:border-transparent font-bold text-sm tracking-wide transition-all duration-300 shadow-sm"
              >
                <BookOpen size={16} />
                Jonli varaqlash (Live Preview)
              </button>
            )}
          </div>

          {/* Core Information Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                {book.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#062B22] leading-tight">
                {book.title}
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-[#062B22]/70 font-light">
                <span>Muallif: <strong className="text-[#062B22] font-semibold">{book.author}</strong></span>
                {book.translator && (
                  <span>Tarjimon: <strong className="text-[#062B22] font-semibold">{book.translator}</strong></span>
                )}
                {book.publisher && (
                  <span>Nashriyot: <strong className="text-[#062B22] font-semibold">{book.publisher}</strong></span>
                )}
              </div>
              
              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(book.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#062B22] mt-0.5">
                  {book.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs text-[#062B22]/50 font-light mt-0.5">({reviewsList.length} ta sharh)</span>
              </div>
            </div>

            {/* Format Selection Cards */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">Formatni tanlang</span>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {/* Paper format option */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('paper')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all duration-300 ${
                    selectedFormat === 'paper'
                      ? 'border-[#D4AF37] bg-white shadow-sm'
                      : 'border-[#062B22]/5 bg-white/40 hover:bg-white/70'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <AlignLeft className="w-5 h-5 text-[#062B22]" />
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-[#D4AF37]">Bosma</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#062B22]/50 font-light">Kitob muqovasi</div>
                    <div className="font-bold text-[#062B22] text-sm">{book.price.toLocaleString()} so&apos;m</div>
                  </div>
                </button>

                {/* Ebook format option */}
                <button
                  type="button"
                  disabled={!book.has_ebook}
                  onClick={() => setSelectedFormat('ebook')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all duration-300 disabled:opacity-40 ${
                    selectedFormat === 'ebook'
                      ? 'border-[#D4AF37] bg-white shadow-sm'
                      : 'border-[#062B22]/5 bg-white/40 hover:bg-white/70'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <BookOpen className="w-5 h-5 text-[#062B22]" />
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-[#D4AF37]">PDF / EPUB</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#062B22]/50 font-light">Elektron</div>
                    <div className="font-bold text-[#062B22] text-sm">{(book.ebook_price || 20000).toLocaleString()} so&apos;m</div>
                  </div>
                </button>

                {/* Audio format option */}
                <button
                  type="button"
                  disabled={!book.has_audio}
                  onClick={() => setSelectedFormat('audio')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all duration-300 disabled:opacity-40 ${
                    selectedFormat === 'audio'
                      ? 'border-[#D4AF37] bg-white shadow-sm'
                      : 'border-[#062B22]/5 bg-white/40 hover:bg-white/70'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Headphones className="w-5 h-5 text-[#062B22]" />
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-[#D4AF37]">MP3</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#062B22]/50 font-light">Audio-kitob</div>
                    <div className="font-bold text-[#062B22] text-sm">{(book.audio_price || 25000).toLocaleString()} so&apos;m</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Interactive Audio Player Preview Widget */}
            {selectedFormat === 'audio' && book.has_audio && (
              <div className="bg-[#062B22] text-[#F8F4ED] p-6 rounded-[24px] border border-white/5 flex flex-col gap-4 luxury-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37]">
                    <Headphones className="animate-pulse" size={18} />
                  </div>
                  <div className="text-left flex-grow">
                    <div className="text-[10px] tracking-wider uppercase font-semibold text-[#D4AF37]">Audio-kitob tinglab ko&apos;rish</div>
                    <div className="text-sm font-serif font-bold line-clamp-1">{book.title} — Audio-parcha</div>
                  </div>
                  {/* Speed Controller */}
                  <button
                    onClick={() => setAudioSpeed(audioSpeed === 1 ? 1.25 : audioSpeed === 1.25 ? 1.5 : audioSpeed === 1.5 ? 2 : 1)}
                    className="text-[10px] font-bold px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[#D4AF37]"
                  >
                    {audioSpeed}x tezlik
                  </button>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-1">
                  <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
                    <div
                      className="bg-[#D4AF37] h-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-white/55 font-light">
                    <span>{Math.floor((audioProgress * 4.15) / 100)}:{Math.floor(((audioProgress * 4.15) % 1) * 60).toString().padStart(2, '0')}</span>
                    <span>4:15</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => setAudioPlaying(!audioPlaying)}
                    className="w-11 h-11 rounded-full bg-[#D4AF37] hover:bg-[#F8F4ED] text-[#031813] flex items-center justify-center shadow transition-all transform active:scale-95"
                    aria-label={audioPlaying ? "Pauza" : "Play"}
                  >
                    {audioPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Interactive E-Book Mini Reader Widget */}
            {selectedFormat === 'ebook' && book.has_ebook && (
              <div className="bg-white p-5 rounded-[24px] border border-[#062B22]/5 flex flex-col gap-3 text-left">
                <div className="flex items-center justify-between border-b border-[#062B22]/5 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-[#D4AF37]" />
                    <span className="text-xs font-serif font-bold text-[#062B22]">Dastlabki sahifadan parcha</span>
                  </div>
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="text-[10px] font-bold text-[#D4AF37] hover:text-[#062B22] uppercase tracking-wider"
                  >
                    To&apos;liq varaqlash
                  </button>
                </div>
                <div className="p-4 bg-[#F8F4ED]/50 rounded-xl border border-[#062B22]/5 text-[11px] font-light leading-relaxed italic text-[#062B22]/85">
                  &ldquo;Inson hayotidagi o&apos;zgarishlar birdaniga, to&apos;satdan ro&apos;y bermaydi. Har bir odatimiz, har bir qilayotgan ishimiz xuddi suvning muzlash haroratiga yetib borishi kabi asta-sekin to&apos;planib, so&apos;ngra keskin natija beradi...&rdquo;
                </div>
              </div>
            )}

            {/* Description */}
            <div className="flex flex-col gap-3 border-t border-[#062B22]/10 pt-6">
              <h3 className="font-serif font-bold text-lg text-[#062B22]">Tavsif</h3>
              <p className="text-sm font-light text-[#062B22]/75 leading-relaxed">
                {book.description || "Ushbu asar to'g'risida batafsil ma'lumotlar yaqin orada taqdim etiladi."}
              </p>
            </div>

            {/* Meta Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-light text-[#062B22]/80 border-b border-[#062B22]/10 pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#062B22]/40 uppercase tracking-wider font-semibold">SKU:</span>
                <span className="font-semibold">{book.sku || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#062B22]/40 uppercase tracking-wider font-semibold">Muqova:</span>
                <span className="font-semibold">{book.binding || "Yumshoq"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#062B22]/40 uppercase tracking-wider font-semibold">Nashr yili:</span>
                <span className="font-semibold">{book.published_year || "N/A"}-yil</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#062B22]/40 uppercase tracking-wider font-semibold">Mavjudlik:</span>
                <span className="font-semibold text-emerald-600">{currentDetails.stockText}</span>
              </div>
            </div>

            {/* Price & Purchase Actions */}
            <div className="flex flex-col gap-6 bg-white p-6 md:p-8 rounded-[24px] border border-[#062B22]/5 luxury-shadow">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-[#062B22]">
                  {currentDetails.price.toLocaleString()} so&apos;m
                </span>
                {selectedFormat === 'paper' && book.old_price && (
                  <span className="text-base text-[#062B22]/40 line-through">
                    {book.old_price.toLocaleString()} so&apos;m
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Quantity adjuster */}
                {selectedFormat === 'paper' && (
                  <div className="flex items-center gap-4 bg-[#F8F4ED] py-2 px-4 rounded-full border border-[#062B22]/5 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center font-bold text-[#062B22]"
                    >
                      -
                    </button>
                    <span className="font-semibold text-sm w-4 text-center text-[#062B22]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center font-bold text-[#062B22]"
                    >
                      +
                    </button>
                  </div>
                )}

                {/* Primary CTA Buttons */}
                <button
                  onClick={handleAddToCart}
                  className="flex-grow w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-[24px] bg-[#062B22] text-[#F8F4ED] hover:bg-[#D4AF37] hover:text-[#062B22] font-semibold text-sm tracking-wide transition-all duration-300"
                  id="add-to-cart-btn"
                >
                  <ShoppingBag size={18} />
                  Savatga qo&apos;shish
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isInWishlist
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'border-[#062B22]/10 bg-[#F8F4ED] text-[#062B22] hover:bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={20} className={isInWishlist ? 'fill-red-500' : ''} />
                </button>
              </div>
            </div>

            {/* Quick Delivery info badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#062B22]/5 text-xs font-light text-[#062B22]/65">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-[#D4AF37]" />
                <span>100% original premium kitoblar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck size={20} className="text-[#D4AF37]" />
                <span>Tezkor yetkazib berish (24 soat)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw size={20} className="text-[#D4AF37]" />
                <span>Oson qaytarish va almashtirish</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Quotes Gallery Block */}
        {userQuotes.length > 0 && (
          <div className="flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-1 border-b border-[#062B22]/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <Sparkles size={13} />
                Kitobdan iqtiboslar
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#062B22]">Kitobxonlar tanlagan satrlar</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userQuotes.map((quote, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[24px] border border-[#062B22]/5 shadow-sm text-left flex flex-col gap-4 relative overflow-hidden group hover:border-[#D4AF37]/45 transition-all"
                >
                  <span className="absolute top-2 right-4 text-7xl font-serif text-[#062B22]/5 pointer-events-none">&ldquo;</span>
                  <p className="text-xs font-serif italic font-medium leading-relaxed text-[#062B22]/90 flex-grow pt-2 z-10">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="text-[10px] text-[#062B22]/45 font-light">
                    — Qamar kitobxoni ulashdi
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews and Ratings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Reviews List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-serif font-bold text-xl text-[#062B22] border-b border-[#062B22]/10 pb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-[#D4AF37]" />
              Fikrlar va sharhlar ({reviewsList.length})
            </h3>

            {reviewsList.length > 0 ? (
              <div className="flex flex-col gap-6">
                {reviewsList.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-[24px] border border-[#062B22]/5 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#062B22] text-sm">
                          {review.user.first_name} {review.user.last_name || `@${review.user.username}`}
                        </span>
                        <span className="text-[10px] text-[#062B22]/45 font-light mt-0.5">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-200'}
                          />
                        ))}
                      </div>
                    </div>

                    {review.quote && (
                      <div className="p-3 bg-[#F8F4ED] rounded-xl border-l-2 border-[#D4AF37] text-xs font-serif italic text-[#062B22]/75">
                        &ldquo;{review.quote}&rdquo;
                      </div>
                    )}

                    <p className="text-xs font-light text-[#062B22]/85 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-white rounded-[24px] border border-dashed border-[#062B22]/10 flex flex-col items-center gap-2">
                <span className="text-2xl">✍️</span>
                <p className="text-xs text-[#062B22]/50 font-light">Ushbu asarga birinchi bo&apos;lib sharh qoldiring!</p>
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div className="lg:col-span-5 bg-white p-8 rounded-[24px] border border-[#062B22]/5 shadow-sm self-start">
            <h4 className="font-serif font-bold text-lg text-[#062B22] border-b border-[#062B22]/5 pb-4 mb-6">
              Sharh va Iqtibos qoldiring
            </h4>
            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-5">
              {/* Rating Star selection */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">Baholash</span>
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setNewReviewRating(i + 1)}
                      className="focus:outline-none transition-transform active:scale-90"
                    >
                      <Star
                        size={24}
                        className={i < newReviewRating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-200 hover:text-[#D4AF37]/50'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quote Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote-input" className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">
                  Kitobdan eng yoqqan satr / iqtibos (Ixtiyoriy)
                </label>
                <input
                  type="text"
                  id="quote-input"
                  placeholder="Masalan: Odatlar muvaffaqiyatning kalitidir..."
                  value={newReviewQuote}
                  onChange={(e) => setNewReviewQuote(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#062B22]/5 border border-[#062B22]/5 focus:border-[#D4AF37] focus:outline-none text-xs text-[#062B22]"
                />
              </div>

              {/* Review Text */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="review-text-input" className="text-xs font-semibold text-[#062B22]/60 uppercase tracking-wider">
                  Fikringiz
                </label>
                <textarea
                  id="review-text-input"
                  rows={4}
                  required
                  placeholder="Kitob haqidagi taassurotlaringizni yozing..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#062B22]/5 border border-[#062B22]/5 focus:border-[#D4AF37] focus:outline-none text-xs text-[#062B22]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#062B22] text-[#F8F4ED] hover:bg-[#D4AF37] hover:text-[#062B22] font-bold text-sm tracking-wide transition-all shadow"
              >
                Sharh yuborish
              </button>
            </form>
          </div>
        </div>

        {/* Similar Books Slider */}
        {similarBooks.length > 0 && (
          <BookSlider
            books={similarBooks}
            title="O'xshash kitoblar"
            subtitle="Mutolaani davom ettiring"
          />
        )}
      </div>

      {/* Live Preview Flip book Modal */}
      <LivePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        bookTitle={book.title}
        bookAuthor={book.author}
      />
    </div>
  );
}
