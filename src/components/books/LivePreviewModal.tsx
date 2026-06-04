'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Sparkles } from 'lucide-react';

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  bookAuthor: string;
}

// Traditional Uzbek botanical/leaf motif for page corners (Bodom / Guldor Naqsh)
const UzbekCornerNaqsh = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={`w-5 h-5 text-[#D4AF37] opacity-60 pointer-events-none z-10 absolute ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M 4 4 C 15 4, 25 10, 25 25" strokeLinecap="round" />
    <path d="M 4 4 C 4 15, 10 25, 25 25" strokeLinecap="round" />
    <path d="M 12 12 C 16 8, 20 12, 16 16 C 12 20, 8 16, 12 12 Z" fill="currentColor" fillOpacity="0.12" />
    <circle cx="6" cy="18" r="1.5" fill="currentColor" />
    <circle cx="18" cy="6" r="1.5" fill="currentColor" />
  </svg>
);

// Inner page border with corner naqsh ornaments
const UzbekPageNaqsh = () => (
  <div className="absolute inset-2 md:inset-3 border border-[#D4AF37]/35 rounded-2xl pointer-events-none select-none z-10">
    <div className="absolute inset-0.5 border border-[#D4AF37]/15 rounded-[14px]" />
    <UzbekCornerNaqsh className="top-1 left-1 rotate-0" />
    <UzbekCornerNaqsh className="top-1 right-1 rotate-90" />
    <UzbekCornerNaqsh className="bottom-1 left-1 -rotate-90" />
    <UzbekCornerNaqsh className="bottom-1 right-1 rotate-180" />
  </div>
);

// Faint background watermark (Oriental geometric dome medallion)
const UzbekWatermark = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none z-0">
    <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-56 md:h-56 text-[#D4AF37]" fill="currentColor">
      <path d="M100,20 C105,40 115,50 135,50 C115,50 105,60 100,80 C95,60 85,50 65,50 C85,50 95,40 100,20 Z" />
      <path d="M100,120 C105,140 115,150 135,150 C115,150 105,160 100,180 C95,160 85,150 65,150 C85,150 95,140 100,120 Z" />
      <path d="M50,100 C55,80 65,70 85,70 C65,70 55,60 50,40 C45,60 35,70 15,70 C35,70 45,80 50,100 Z" />
      <path d="M150,100 C155,80 165,70 185,70 C165,70 155,60 150,40 C145,60 135,70 115,70 C135,70 145,80 150,100 Z" />
      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
      <polygon points="100,75 107,93 125,100 107,107 100,125 93,107 75,100 93,93" />
    </svg>
  </div>
);

// Traditional wood-carved Lavh stand corner brackets
const BrassCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const posClass = {
    tl: 'top-2.5 left-2.5 rotate-0',
    tr: 'top-2.5 right-2.5 rotate-90',
    bl: 'bottom-2.5 left-2.5 -rotate-90',
    br: 'bottom-2.5 right-2.5 rotate-180',
  }[position];
  
  return (
    <svg viewBox="0 0 100 100" className={`absolute w-12 h-12 text-[#D4AF37] opacity-80 ${posClass} pointer-events-none select-none z-20`} fill="currentColor">
      <path d="M 0 0 L 100 0 C 80 0, 70 10, 70 30 C 70 50, 50 70, 30 70 C 10 70, 0 80, 0 100 Z" opacity="0.9" />
      <path d="M 5 5 L 90 5 C 75 8, 65 15, 65 30 C 65 48, 48 65, 30 65 C 15 65, 8 75, 5 90 Z" fill="#b08a22" />
      <circle cx="15" cy="15" r="3" fill="#3a2205" />
      <circle cx="45" cy="15" r="2.5" fill="#3a2205" />
      <circle cx="15" cy="45" r="2.5" fill="#3a2205" />
    </svg>
  );
};

// Generates dynamic page contents based on book details to keep it authentic
const getPages = (bookTitle: string, bookAuthor: string) => {
  const isOdatlar = bookTitle.toLowerCase().includes('odat') || bookTitle.toLowerCase().includes('atom');
  const isBoyOta = bookTitle.toLowerCase().includes('boy ota') || bookTitle.toLowerCase().includes('kiyosaki');
  
  let chapters = [
    { name: "KIRISH. Mutolaa shukuhi", page: "4" },
    { name: "I BOB. Hikmatlar xazinasi va ilm nuri", page: "12" },
    { name: "II BOB. Ma'rifat fazilati va ma'naviy kamolot", page: "34" },
    { name: "XOTIMA. Tafakkur silsilasi", page: "60" }
  ];

  let quote = `"Kitob — aqlning qanotidir." — Alisher Navoiy`;
  let mualifdanText = `Aziz kitobxon! Har bir yangi sahifa — ilm va ma'rifat ummoniga tashlangan qadamdir. Ushbu sahifalarda yozilgan fikrlar sizni to'g'ridan-to'g'ri tayyor javoblar sari yetaklamasligi mumkin, ammo eng to'g'ri savollarni berishga o'rgatadi. Mutolaa shunchaki so'zlarni jamlash emas, balki muallif qalbi bilan sirlashuvdir.`;
  let bobText = `Har qanday yuksalish va ma'naviy o'zgarishlar kichik zahmatlardan boshlanadi. Zero, donolar aytganidek: 'Ilm — qorong'u zulmatda yo'l ko'rsatuvchi ma'naviy mayoqdir.' Ota-bobolarimiz ma'rifat chirog'ini asrlar osha baland tutib, bizgacha yetkazdilar. Ushbu hikmatlar hayotingizda aks etib, mutolaa ruhi qalbingizni yoritsin.`;
  
  if (isOdatlar) {
    chapters = [
      { name: "KIRISH. Odatlarning hayotimizdagi o'rni", page: "5" },
      { name: "I BOB. Kichik odatlar — ulkan o'zgarishlar", page: "15" },
      { name: "II BOB. 1 foiz qoidasi va uning qudrati", page: "35" },
      { name: "XOTIMA. Mukammal tizim qurish sirlari", page: "58" }
    ];
    quote = `"Odatlar — bu muvaffaqiyatning murakkab foizlaridir." — Jeyms Klar`;
    mualifdanText = `Aziz kitobxon! Agar har kuni o'z ustingizda atigi bir foizgina ishlashni odat qilsangiz, bir yildan so'ng 37 barobar mukammalroq va kuchliroq bo'lasiz. Ushbu asar sahifalarini varaqlarkan, yomon odatlardan qutulish va yangi ijobiy odatlarni shakllantirishning eng samarali metodikalari bilan tanishasiz.`;
    bobText = `Odatlar hayotimizni boshqaradi. Biz o'z maqsadlarimiz darajasiga ko'tarilmaymiz, balki o'z tizimlarimiz darajasiga yiqilamiz. Muvaffaqiyat — bu bir martalik natija emas, balki kundalik odatlarning mahsulidir. Har kuni kichik qadam tashlab maqsadingiz sari boring.`;
  } else if (isBoyOta) {
    chapters = [
      { name: "KIRISH. Boylar va kambag'allarning tafakkuri", page: "6" },
      { name: "I BOB. Pulni o'zingizga ishlashga majburlang", page: "18" },
      { name: "II BOB. Aktivlar va passivlar farqi", page: "38" },
      { name: "XOTIMA. Moliyaviy erkinlik sari yo'l", page: "62" }
    ];
    quote = `"Kambag'allar pul uchun ishlaydi, boylar pulni o'zlari uchun ishlashga majbur qiladi." — Robert Kiyosaki`;
    mualifdanText = `Aziz kitobxon! Moliyaviy savodxonlik — bu maktablarda o'rgatilmaydigan eng muhim maishiy ilmdir. Ushbu kitob sizga dunyoga, pulga va investitsiyalarga butunlay boshqacha nigoh bilan qarashni o'rgatadi. Boy ota va kambag'al ota saboqlarini hayotga tatbiq etish vaqti keldi.`;
    bobText = `Aktiv nima-yu, passiv nima? Aktiv sizning cho'ntagingizga pul olib keladi, passiv esa cho'ntagingizdan pul olib ketadi. Boy bo'lish siri oddiy: bor kuchingizni aktivlarni sotib olishga sarflang va passivlarni iloji boricha kamaytiring. Tafakkuringizni o'zgartiring!`;
  }

  return [
    {
      title: "Mundarija",
      content: (
        <div className="flex flex-col gap-3 text-[#062B22]/90 h-full justify-between py-2 px-1">
          <div className="flex flex-col gap-1 text-center">
            <h4 className="font-serif font-bold text-xs md:text-sm border-b border-[#062B22]/15 pb-1 tracking-widest text-[#062B22]">МУНДАРИЖА</h4>
            <div className="text-[8px] tracking-widest text-[#D4AF37] font-serif uppercase">Qamar Collection</div>
          </div>
          <ul className="text-[10px] font-serif flex flex-col gap-2.5 my-2">
            {chapters.map((ch, i) => (
              <li key={i} className="flex justify-between border-b border-dashed border-[#062B22]/15 pb-1">
                <span className="font-medium text-[#062B22] truncate pr-2">{ch.name}</span>
                <span className="font-bold text-[#D4AF37]">{ch.page}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-1.5 mt-1">
            <div className="text-[8.5px] text-center italic text-[#062B22]/70 max-w-[200px] font-serif leading-relaxed px-2.5 py-1 bg-[#D4AF37]/5 rounded border border-[#D4AF37]/15">
              {quote}
            </div>
            <span className="text-[7.5px] text-[#062B22]/40 font-light font-sans tracking-wide">Nashr yili — 2026 • Toshkent</span>
          </div>
        </div>
      )
    },
    {
      title: "Kirish",
      content: (
        <div className="flex flex-col gap-3 text-[#062B22]/85 h-full text-justify py-1 px-1">
          <h4 className="font-serif font-bold text-[11px] md:text-xs text-center text-[#062B22] tracking-wider mb-0.5 border-b border-[#062B22]/10 pb-1">KIRISH: MUTOLAA SHUKUHI</h4>
          <p className="text-[10px] font-light leading-relaxed">
            <span className="float-left text-2xl font-serif font-bold text-[#D4AF37] mr-1.5 leading-none border border-[#D4AF37]/35 rounded px-1.5 py-0.5 bg-white/40 shadow-sm font-serif">A</span>
            {mualifdanText}
          </p>
          <div className="flex justify-center my-0.5 select-none text-[10px] text-[#D4AF37]">
            ۞ ۞ ۞
          </div>
          <p className="text-[10px] font-light leading-relaxed">
            Mutolaa ruhning eng oliy ozuqasi, tafakkurning cheksiz parvozidir. Sahifalarni varaqlarkan, har bir satrda yashiringan chuqur falsafani his etasiz.
          </p>
        </div>
      )
    },
    {
      title: "1-Bob",
      content: (
        <div className="flex flex-col gap-2.5 text-[#062B22]/85 h-full text-justify py-1 px-1">
          <h4 className="font-serif font-bold text-[11px] md:text-xs text-[#062B22] border-b border-[#062B22]/10 pb-1 tracking-wider uppercase">{chapters[1].name}</h4>
          <p className="text-[10px] font-light leading-relaxed">
            {bobText}
          </p>
          <div className="bg-[#FAF6EE] border-l-2 border-[#D4AF37] p-2 my-1 text-[9px] italic text-[#062B22]/70 leading-relaxed font-serif rounded-r">
            &ldquo;Ilm — eng toza mayoqdir. Yo&apos;ldan adashmaslik uchun kitob sahifalarini mahkam quchoqlang.&rdquo;
          </div>
        </div>
      )
    },
    {
      title: "Xotima",
      content: (
        <div className="flex flex-col gap-3 text-[#062B22]/85 h-full justify-between py-2 px-1 text-center">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-[#062B22]/5 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 shadow-inner">
              <Sparkles size={14} className="animate-pulse" />
            </div>
            <h4 className="font-serif font-bold text-[11px] md:text-xs text-[#062B22] tracking-widest uppercase">ХОТИМА</h4>
            <div className="text-[9.5px] text-[#D4AF37] font-serif font-semibold tracking-wider">DAVOMI BOR...</div>
            <p className="text-[9.5px] font-light leading-relaxed max-w-[190px] mx-auto text-[#062B22]/80 mt-1">
              Ushbu jonli varaqlash kitobning boshlang&apos;ich qismidir. Agar ushbu satrlar qalbingizga yo&apos;l topgan bo&apos;lsa, to&apos;liq nashrini xarid qilib, mutolaani davom ettirishingiz mumkin.
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center pt-2 border-t border-[#062B22]/10">
            <span className="text-[8px] uppercase tracking-widest text-[#D4AF37] font-bold">Qamar do&apos;koni taklif etadi</span>
            <p className="text-[7.5px] text-[#062B22]/40">Bizda faqat original va sifatli asarlar jamlangan.</p>
          </div>
        </div>
      )
    }
  ];
};

export default function LivePreviewModal({ isOpen, onClose, bookTitle, bookAuthor }: LivePreviewModalProps) {
  const pages = getPages(bookTitle, bookAuthor);

  const [spreadIndex, setSpreadIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);

  const totalSpreads = Math.ceil(pages.length / 2);

  const handleNext = () => {
    if (spreadIndex < totalSpreads - 1 && !flipDirection) {
      setFlipDirection('next');
    }
  };

  const handlePrev = () => {
    if (spreadIndex > 0 && !flipDirection) {
      setFlipDirection('prev');
    }
  };

  const handleAnimationComplete = () => {
    if (flipDirection === 'next') {
      setSpreadIndex((prev) => prev + 1);
    } else if (flipDirection === 'prev') {
      setSpreadIndex((prev) => prev - 1);
    }
    setFlipDirection(null);
  };

  if (!isOpen) return null;

  // Determine current spread pages
  const leftPageIndex = spreadIndex * 2;
  const rightPageIndex = spreadIndex * 2 + 1;

  // Determine target pages during transition
  const targetLeftPageIndex = flipDirection === 'next' ? (spreadIndex + 1) * 2 : (spreadIndex - 1) * 2;
  const targetRightPageIndex = flipDirection === 'next' ? (spreadIndex + 1) * 2 + 1 : (spreadIndex - 1) * 2 + 1;

  return (
    <AnimatePresence>
      {/* Dark Blurred Backdrop Overlay with onClick to close */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-zoom-out"
      >
        {/* Floating Close Button in the top-right corner of the screen */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="fixed top-6 right-6 z-55 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 backdrop-blur-sm shadow-lg cursor-pointer"
          aria-label="Yopish"
        >
          <X size={20} />
        </button>

        {/* 3D Book Stand & Book (stops event propagation so clicking book won't close) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl aspect-[1.45/1] bg-gradient-to-br from-[#2D1A10] via-[#482D1B] to-[#1E0F07] rounded-[28px] p-5 md:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(0,0,0,0.85)] border-4 border-[#3a2012] select-none"
        >
          {/* Wood Carving Details */}
          <div className="absolute inset-2 border border-[#D4AF37]/20 rounded-[20px] pointer-events-none" />
          <div className="absolute inset-3 border-2 border-[#1a0c06]/55 rounded-[18px] pointer-events-none shadow-inner" />
          
          {/* Traditional Brass Corners */}
          <BrassCorner position="tl" />
          <BrassCorner position="tr" />
          <BrassCorner position="bl" />
          <BrassCorner position="br" />

          {/* Book Title Ribbon / Bookmark hanging at the top */}
          <div className="absolute top-0 right-16 w-8 h-16 bg-[#D4AF37] shadow-md z-45 flex flex-col items-center pt-2 rounded-b-sm border-x border-[#b08a22]">
            <span style={{ writingMode: 'vertical-rl' }} className="text-[6.5px] font-serif font-black text-[#062B22] leading-none uppercase tracking-widest mt-2 select-none">QAMAR</span>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Opened Book pages wrapper with 3D Perspective */}
          <div 
            style={{ perspective: 1500 }}
            className="relative w-full h-full rounded-[14px] bg-[#FAF6EE] shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-[#062B22]/15 overflow-hidden flex"
          >
            {/* Book Spine Center Leather Strip */}
            <div className="absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 bg-gradient-to-r from-[#170e09] via-[#2c1a11] to-[#170e09] z-40 pointer-events-none shadow-[0_0_8px_rgba(0,0,0,0.4)]">
              {/* Spine Ribs and Gold Stitches */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-[#D4AF37]/45 z-30" />
              <div className="absolute left-[calc(50%-6px)] top-0 bottom-0 w-[1px] bg-black/45 border-r border-[#D4AF37]/10" />
              <div className="absolute left-[calc(50%+6px)] top-0 bottom-0 w-[1px] bg-black/45 border-l border-[#D4AF37]/10" />
            </div>

            {/* Spine Inner Shadow overlays on pages to simulate curve depth */}
            <div className="absolute left-[calc(50%-40px)] top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-black/15 z-35 pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 w-10 bg-gradient-to-l from-transparent to-black/15 z-35 pointer-events-none" />

            {/* 1. LEFT INTERACTIVE NAVIGATION OVERLAY (Click anywhere on left half to go back) */}
            <div 
              onClick={handlePrev}
              className={`absolute left-0 top-0 bottom-0 w-1/2 z-45 transition-colors duration-300 ${
                spreadIndex > 0 && !flipDirection ? 'cursor-pointer hover:bg-black/[0.01]' : 'cursor-not-allowed'
              }`}
              title={spreadIndex > 0 ? "Oldingi sahifa" : ""}
            />

            {/* 2. RIGHT INTERACTIVE NAVIGATION OVERLAY (Click anywhere on right half to go forward) */}
            <div 
              onClick={handleNext}
              className={`absolute right-0 top-0 bottom-0 w-1/2 z-45 transition-colors duration-300 ${
                spreadIndex < totalSpreads - 1 && !flipDirection ? 'cursor-pointer hover:bg-black/[0.01]' : 'cursor-not-allowed'
              }`}
              title={spreadIndex < totalSpreads - 1 ? "Keyingi sahifa" : ""}
            />

            {/* 3. UNDERLAY LEFT PAGE */}
            <div className="w-1/2 h-full p-5 md:p-7 relative select-none flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#FAF6EE] via-[#F4EEDF] to-[#E9DFCB]">
              <UzbekPageNaqsh />
              <UzbekWatermark />
              <div className="absolute top-4 left-6 text-[8px] uppercase tracking-wider text-[#062B22]/50 font-serif z-10 font-bold select-none">
                {bookAuthor}
              </div>
              
              <div className="flex-grow pt-4 z-10 relative">
                {pages[flipDirection === 'prev' ? targetLeftPageIndex : leftPageIndex] ? (
                  pages[flipDirection === 'prev' ? targetLeftPageIndex : leftPageIndex].content
                ) : (
                  <div className="flex items-center justify-center h-full text-[#062B22]/30 italic">Sahifa bo&apos;sh</div>
                )}
              </div>
              
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-[#062B22]/60 font-serif z-10 flex items-center justify-center font-bold">
                <span className="text-[#D4AF37] mr-1">۞</span>
                {flipDirection === 'prev' ? targetLeftPageIndex + 1 : leftPageIndex + 1}
                <span className="text-[#D4AF37] ml-1">۞</span>
              </div>

              {/* Left Page Shadow overlay during flip transition */}
              {flipDirection === 'next' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.35, 0] }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-black z-35 pointer-events-none" 
                />
              )}
            </div>

            {/* 4. UNDERLAY RIGHT PAGE */}
            <div className="w-1/2 h-full p-5 md:p-7 relative select-none flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#FAF6EE] via-[#F4EEDF] to-[#E9DFCB]">
              <UzbekPageNaqsh />
              <UzbekWatermark />
              <div className="absolute top-4 right-6 text-[8px] uppercase tracking-wider text-[#062B22]/50 font-serif z-10 font-bold select-none">
                {bookTitle}
              </div>
              
              <div className="flex-grow pt-4 z-10 relative">
                {pages[flipDirection === 'next' ? targetRightPageIndex : rightPageIndex] ? (
                  pages[flipDirection === 'next' ? targetRightPageIndex : rightPageIndex].content
                ) : (
                  <div className="flex items-center justify-center h-full text-[#062B22]/30 italic">Sahifa bo&apos;sh</div>
                )}
              </div>
              
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-[#062B22]/60 font-serif z-10 flex items-center justify-center font-bold">
                <span className="text-[#D4AF37] mr-1">۞</span>
                {flipDirection === 'next' ? targetRightPageIndex + 1 : rightPageIndex + 1}
                <span className="text-[#D4AF37] ml-1">۞</span>
              </div>

              {/* Right Page Shadow overlay during flip transition */}
              {flipDirection === 'prev' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.35, 0] }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-black z-35 pointer-events-none" 
                />
              )}
            </div>

            {/* 5. DYNAMIC FLIPPING SHEET (3D ANIMATED LAYER) */}
            {flipDirection === 'next' && (
              <motion.div
                style={{
                  originX: 0,
                  transformStyle: "preserve-3d",
                  zIndex: 30,
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onAnimationComplete={handleAnimationComplete}
                className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
              >
                {/* Front Face (Current right page sheet folding up/left) */}
                <div 
                  style={{ backfaceVisibility: "hidden" }}
                  className="absolute inset-0 bg-gradient-to-br from-[#FAF6EE] via-[#F4EEDF] to-[#E9DFCB] p-5 md:p-7 border-l border-[#062B22]/10"
                >
                  <UzbekPageNaqsh />
                  <UzbekWatermark />
                  <div className="absolute top-4 right-6 text-[8px] uppercase tracking-wider text-[#062B22]/50 font-serif z-10 font-bold select-none">
                    {bookTitle}
                  </div>
                  <div className="flex-grow pt-4 z-10 relative">
                    {pages[rightPageIndex].content}
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-[#062B22]/60 font-serif z-10 flex items-center justify-center font-bold">
                    <span className="text-[#D4AF37] mr-1">۞</span>
                    {rightPageIndex + 1}
                    <span className="text-[#D4AF37] ml-1">۞</span>
                  </div>
                </div>

                {/* Back Face (Target left page landing down/left, rotated 180deg) */}
                <div 
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)" 
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-[#FAF6EE] via-[#F4EEDF] to-[#E9DFCB] p-5 md:p-7 border-r border-[#062B22]/10"
                >
                  <UzbekPageNaqsh />
                  <UzbekWatermark />
                  <div className="absolute top-4 left-6 text-[8px] uppercase tracking-wider text-[#062B22]/50 font-serif z-10 font-bold select-none">
                    {bookAuthor}
                  </div>
                  <div className="flex-grow pt-4 z-10 relative">
                    {pages[targetLeftPageIndex].content}
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-[#062B22]/60 font-serif z-10 flex items-center justify-center font-bold">
                    <span className="text-[#D4AF37] mr-1">۞</span>
                    {targetLeftPageIndex + 1}
                    <span className="text-[#D4AF37] ml-1">۞</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DYNAMIC FLIPPING SHEET BACKWARDS */}
            {flipDirection === 'prev' && (
              <motion.div
                style={{
                  originX: 1,
                  transformStyle: "preserve-3d",
                  zIndex: 30,
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onAnimationComplete={handleAnimationComplete}
                className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none"
              >
                {/* Front Face (Current left page folding up/right) */}
                <div 
                  style={{ backfaceVisibility: "hidden" }}
                  className="absolute inset-0 bg-gradient-to-br from-[#FAF6EE] via-[#F4EEDF] to-[#E9DFCB] p-5 md:p-7 border-r border-[#062B22]/10"
                >
                  <UzbekPageNaqsh />
                  <UzbekWatermark />
                  <div className="absolute top-4 left-6 text-[8px] uppercase tracking-wider text-[#062B22]/50 font-serif z-10 font-bold select-none">
                    {bookAuthor}
                  </div>
                  <div className="flex-grow pt-4 z-10 relative">
                    {pages[leftPageIndex].content}
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-[#062B22]/60 font-serif z-10 flex items-center justify-center font-bold">
                    <span className="text-[#D4AF37] mr-1">۞</span>
                    {leftPageIndex + 1}
                    <span className="text-[#D4AF37] ml-1">۞</span>
                  </div>
                </div>

                {/* Back Face (Target right page landing down/right, rotated -180deg) */}
                <div 
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(-180deg)" 
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-[#FAF6EE] via-[#F4EEDF] to-[#E9DFCB] p-5 md:p-7 border-l border-[#062B22]/10"
                >
                  <UzbekPageNaqsh />
                  <UzbekWatermark />
                  <div className="absolute top-4 right-6 text-[8px] uppercase tracking-wider text-[#062B22]/50 font-serif z-10 font-bold select-none">
                    {bookTitle}
                  </div>
                  <div className="flex-grow pt-4 z-10 relative">
                    {pages[targetRightPageIndex].content}
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-[#062B22]/60 font-serif z-10 flex items-center justify-center font-bold">
                    <span className="text-[#D4AF37] mr-1">۞</span>
                    {targetRightPageIndex + 1}
                    <span className="text-[#D4AF37] ml-1">۞</span>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Ornate Book Ribbon Bottom Tassel Overlay */}
          <div className="absolute top-16 right-[70px] w-4 h-2 bg-[#b08a22] z-45 shadow pointer-events-none rounded-b-sm" />

          {/* Subtle page indicator at the bottom-center of the wood frame */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] text-[#FAF6EE]/50 font-serif tracking-widest pointer-events-none uppercase select-none">
            Varaq: {spreadIndex + 1} / {totalSpreads}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
