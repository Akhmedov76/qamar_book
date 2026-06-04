'use client';

import React, { useState, useEffect } from 'react';
import { Check, Smartphone, Gift, Play, ArrowRight, Sparkles, Wifi, Battery, Volume2, Search, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function PromoBanner() {
  // Countdown state: always countdown to 2 days, 14 hours, 35 minutes, 47 seconds from current load
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 47,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          // Reset to keep the demonstration ticking
          return { days: 2, hours: 14, minutes: 35, seconds: 47 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => String(num).padStart(2, '0');

  // Framer Motion variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section className="bg-white py-24 overflow-hidden">
      
      {/* 1. App Promotion Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="bg-gradient-to-br from-[#031813] via-[#04201a] to-[#031813] rounded-[40px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-16 p-8 md:p-16 lg:p-20 items-center shadow-[0_30px_70px_rgba(6,43,34,0.15)] border border-white/5 relative"
        >
          {/* Decorative atmospheric light spots */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#062B22]/80 rounded-full filter blur-[100px] pointer-events-none" />
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8 text-left relative z-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center gap-2 bg-white/5 py-1.5 px-3 rounded-full border border-white/10">
              <Sparkles size={11} className="text-[#D4AF37] animate-pulse" />
              QAMAR MOBIL ILOVASI
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Qamar ilovasi bilan <br />
              mutolaa har yerda qulay!
            </h2>
            
            <p className="text-sm md:text-base font-light text-white/70 leading-relaxed max-w-xl">
              Ilovani yuklab oling va sevimli asarlaringizni oflayn rejimda tinglang, elektron kitoblarni qulay shriftda oʻqing va yangiliklardan birinchilardan boʻlib xabardor boʻling.
            </p>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3.5 text-white/90 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/25 border border-[#D4AF37]/45 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  <Check size={13} className="text-[#D4AF37]" />
                </div>
                Kitoblarni yuklab olib, internetsiz (oflayn) oʻqish
              </li>
              <li className="flex items-center gap-3.5 text-white/90 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/25 border border-[#D4AF37]/45 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  <Check size={13} className="text-[#D4AF37]" />
                </div>
                Audio kitoblar uchun qulay tezlikni boshqarish pleyeri
              </li>
              <li className="flex items-center gap-3.5 text-white/90 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/25 border border-[#D4AF37]/45 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  <Check size={13} className="text-[#D4AF37]" />
                </div>
                Shaxsiy statistika va mutolaa maqsadlarini rejalashtirish
              </li>
            </ul>

            {/* Styled App Stores Badges */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto mt-6">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-[#062B22] border border-white/15 hover:border-white transition-all duration-300 shadow-md group/play"
                id="promo-google-play"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.609 1.814L13.782 12 3.61 22.186A2.22 2.22 0 0 1 3 20.627V3.372c0-.6.22-1.157.609-1.558zm1.096-.983A2.164 2.164 0 0 1 6.273.6c.51-.01 1.05.15 1.58.48l13.11 7.73c1.07.63 1.07 1.65 0 2.28L6.46 22.91a2.126 2.126 0 0 1-1.755.086L14.935 12 4.705.831z"/>
                </svg>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[8px] uppercase tracking-wider opacity-60 leading-none">YUKLAB OLING</span>
                  <span className="text-xs font-bold leading-tight mt-0.5">Google Play</span>
                </div>
              </a>
              
              <a
                href="https://apple.com/app-store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-[#062B22] border border-white/15 hover:border-white transition-all duration-300 shadow-md group/store"
                id="promo-app-store"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.62.73-1.16 1.87-1.02 2.98 1.1.09 2.25-.56 2.97-1.43z"/>
                </svg>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[8px] uppercase tracking-wider opacity-60 leading-none">YUKLAB OLING</span>
                  <span className="text-xs font-bold leading-tight mt-0.5">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Premium Phone Mockup matching the App Homepage design */}
          <div className="lg:col-span-5 flex justify-center relative mt-10 lg:mt-0">
            {/* Soft decorative background glow behind the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[500px] bg-[#D4AF37]/10 rounded-[48px] filter blur-[60px] pointer-events-none" />

            {/* Pseudo-3D Floating Badge 1 (Left) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 md:-left-12 top-28 z-30 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-3 flex items-center gap-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.25)] max-w-[155px]"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center text-[#062B22]">
                <Gift size={16} className="fill-[#062B22]" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[8px] text-[#D4AF37] font-bold uppercase tracking-wider">HADYU</span>
                <span className="text-[10px] text-white font-medium mt-0.5 leading-tight">Kitob sovgʻa qilish</span>
              </div>
            </motion.div>

            {/* Pseudo-3D Floating Badge 2 (Right) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 md:-right-12 bottom-36 z-30 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-3 flex items-center gap-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.25)] max-w-[155px]"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Check size={16} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-wider">DO&apos;KON</span>
                <span className="text-[10px] text-white font-medium mt-0.5 leading-tight">Tez buyurtma berish</span>
              </div>
            </motion.div>

            {/* Phone Frame wrapper - Adjusted size to be taller and perfectly proportioned */}
            <div className="relative w-[305px] h-[620px] bg-[#0c0c0c] border-[8px] border-zinc-800 rounded-[48px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden shrink-0 z-20 ring-1 ring-white/10">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-45 flex items-center justify-center border border-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-900/60 border border-blue-400/25 mr-12" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
              </div>
              
              {/* Screen Content - Styled in warm cream with matching mockup colors */}
              <div className="flex-grow bg-[#FAF6EE] rounded-[38px] p-3 flex flex-col justify-start gap-3 pt-8.5 relative overflow-hidden border border-[#062B22]/5 z-20">
                
                {/* Phone Status Bar */}
                <div className="flex justify-between items-center text-[7.5px] text-[#062B22] px-2 font-sans font-bold select-none pt-0.5">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <Wifi size={8} />
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="currentColor">
                      <path d="M12 3c-1.2 0-2.4.4-3.4 1.1L12 21l3.4-16.9C14.4 3.4 13.2 3 12 3zm0 2.5c.7 0 1.4.2 2 .6L12 16.5 10 6.1c.6-.4 1.3-.6 2-.6z" />
                    </svg>
                    <Battery size={10} className="text-[#062B22] font-bold" />
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between text-[#062B22] border-b border-[#062B22]/5 pb-1 mt-0.5">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <div className="flex flex-col gap-0.5">
                      <span className="w-3 h-[1.5px] bg-[#062B22]" />
                      <span className="w-3 h-[1.5px] bg-[#062B22]" />
                      <span className="w-2 h-[1.5px] bg-[#062B22]" />
                    </div>
                    <span className="text-[8.5px] font-bold uppercase tracking-wider font-sans">Menu</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-serif font-bold tracking-wider leading-none">QAMAR</span>
                    <span className="text-[4px] tracking-[0.25em] font-semibold text-[#D4AF37] leading-none mt-0.5">KITOBLAR DO&apos;KONI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={10} className="text-[#062B22]/70 cursor-pointer" />
                    <div className="relative cursor-pointer">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#062B22]/70" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
                      </svg>
                      <span className="absolute -top-1.5 -right-1.5 bg-[#062B22] text-[#FAF6EE] font-bold text-[5.5px] w-2.5 h-2.5 rounded-full flex items-center justify-center">1</span>
                    </div>
                  </div>
                </div>

                {/* Search Bar Input */}
                <div className="relative flex items-center bg-white rounded-xl px-2.5 py-1.5 shadow-sm border border-[#062B22]/5">
                  <Search size={9} className="text-[#062B22]/40 mr-1.5 shrink-0" />
                  <span className="text-[7.5px] text-[#062B22]/45 font-light truncate">Yangi kitoblar yoki janr bo&apos;yicha qidirish...</span>
                </div>

                {/* Banner Card */}
                <div className="bg-[#062B22] rounded-xl p-3 flex items-center justify-between gap-1 shadow-sm relative overflow-hidden text-left min-h-[78px]">
                  <div className="absolute right-[-10%] bottom-[-10%] w-16 h-16 bg-white/5 rounded-full filter blur-lg pointer-events-none" />
                  <div className="flex flex-col items-start gap-1.5 z-10">
                    <h4 className="text-[9.5px] font-serif font-bold text-white leading-tight max-w-[130px]">
                      O&apos;zbekiston bo&apos;ylab tezgina yetkazish
                    </h4>
                    <button className="text-[5.5px] bg-[#D4AF37] hover:bg-[#FAF6EE] text-[#062B22] py-0.5 px-2 rounded-full font-bold uppercase tracking-wider transition-colors">
                      Video darslar va sharhlar
                    </button>
                  </div>
                  {/* Delivery truck graphic with speed lines */}
                  <div className="flex items-center gap-1.5 shrink-0 z-10 select-none">
                    <div className="flex flex-col gap-[2px] items-end">
                      <span className="w-2.5 h-[1.5px] bg-[#D4AF37]/50 rounded-full" />
                      <span className="w-4 h-[1.5px] bg-[#D4AF37]/75 rounded-full" />
                      <span className="w-3 h-[1.5px] bg-[#D4AF37]/50 rounded-full" />
                    </div>
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#D4AF37]" fill="currentColor">
                      <path d="M20 8h-3V4H4c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM7 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H17V9h2.5l2 3.5H19.5z" />
                    </svg>
                  </div>
                </div>

                {/* Quick Menu Buttons Row */}
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    // Notification bell
                    <svg key="1" viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>,
                    // Monitor video play card
                    <svg key="2" viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><polygon points="10 8 14 10 10 12 10 8" /></svg>,
                    // Book stacks/stairs
                    <svg key="3" viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
                    // Globe
                    <svg key="4" viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
                    // Shop front/home
                    <svg key="5" viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22" /></svg>
                  ].map((icon, idx) => (
                    <div key={idx} className="aspect-square rounded-xl bg-white border border-[#062B22]/5 flex items-center justify-center text-[#062B22]/70 shadow-sm cursor-pointer hover:bg-[#D4AF37]/15 transition-colors">
                      {icon}
                    </div>
                  ))}
                </div>

                {/* Format Tabs Row */}
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="flex items-center justify-center gap-1 py-1 bg-[#062B22] text-[#FAF6EE] rounded-lg text-[8px] font-bold cursor-pointer shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"/></svg>
                    <span>Qog&apos;oz</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 py-1 bg-white text-[#062B22] border border-[#062B22]/10 rounded-lg text-[8px] font-bold cursor-pointer hover:bg-zinc-50">
                    <Smartphone size={10} className="text-[#062B22]/70" />
                    <span>Elektron</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 py-1 bg-white text-[#062B22] border border-[#062B22]/10 rounded-lg text-[8px] font-bold cursor-pointer hover:bg-zinc-50">
                    <Headphones size={10} className="text-[#062B22]/70" />
                    <span>Audio</span>
                  </div>
                </div>

                {/* Top Selling Books Section */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center px-0.5">
                    <span className="text-[9.5px] font-serif font-bold text-[#062B22]">Eng ko&apos;p sotilgan kitoblar</span>
                    <span className="text-[7.5px] font-bold text-[#062B22]/60 hover:text-[#D4AF37] cursor-pointer">Barchasi &rarr;</span>
                  </div>
                  
                  {/* Book List Row wrapper */}
                  <div className="flex flex-col gap-1.5">
                    {[
                      { rank: 1, title: 'Atomik odatlar', author: 'Jeyms Klar', price: '33 000 so\'m/m', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=150' },
                      { rank: 2, title: 'Boy ota, kambag\'al ota', author: 'Robert Kiyosaki', price: '79 000 so\'m/m', img: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=150' },
                      { rank: 3, title: 'Ikigai', author: 'Ektor Garsiya', price: '85 000 so\'m/m', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=150' }
                    ].map((b) => (
                      <div key={b.rank} className="flex items-center justify-between p-1 bg-white border border-[#062B22]/5 rounded-xl shadow-[0_2px_8px_rgba(6,43,34,0.02)]">
                        <div className="flex items-center gap-1.5">
                          {/* Rank Number */}
                          <span className="text-[8.5px] font-bold text-[#062B22]/35 w-2.5 text-center">{b.rank}</span>
                          {/* Cover thumbnail */}
                          <img src={b.img} alt={b.title} className="w-5.5 h-7.5 object-cover rounded shadow-[1px_1px_3px_rgba(0,0,0,0.08)] shrink-0" />
                          {/* Details */}
                          <div className="flex flex-col items-start text-left leading-tight">
                            <span className="text-[8px] font-bold text-[#062B22] truncate max-w-[100px]">{b.title}</span>
                            <span className="text-[6.5px] text-[#062B22]/50 mt-0.5">{b.author}</span>
                            <div className="flex gap-0.5 text-[#D4AF37] mt-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-[5.5px]">★</span>
                              ))}
                              <span className="text-[5.5px] text-[#062B22]/40 font-light ml-0.5">33 sharh</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <span className="text-[8px] font-bold text-[#062B22] shrink-0 pr-1">{b.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>

     
    </section>
  );
}
