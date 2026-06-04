'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import LivePreviewModal from '@/components/books/LivePreviewModal';

export default function HeroSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#031813] pt-28 pb-32 px-6 md:px-12">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,rgba(6,43,34,0.7)_0%,rgba(3,24,19,1)_85%)]" />
      
      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600')] bg-cover bg-center" />

      {/* Luxury lighting effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Atmospheric sweeping light beam from top-right to bottom-center */}
      <motion.div
        animate={{
          rotate: [-6, 8, -6],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-30%] right-[-10%] w-[130%] h-[150%] pointer-events-none z-15 origin-top-right mix-blend-screen"
        style={{
          background: 'conic-gradient(from 180deg at 88% 12%, transparent 42%, rgba(212,175,55,0.45) 47%, rgba(255,255,255,0.75) 50%, rgba(212,175,55,0.45) 53%, transparent 58%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Cinematic Right-Side Blend Image for desktop */}
      <div className="absolute right-0 -top-20 bottom-0 w-[100%] z-10 pointer-events-none select-none overflow-hidden hidden lg:block">
        <img
          src="/qamar_hero_concept.png"
          alt="Qamar Window Concept"
          className="w-full h-full object-cover object-right"
        />
        {/* Soft horizontal gradient mask blending left edge with background */}
        <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-[#031813] via-[#031813]/40 to-transparent" />
        {/* Soft vertical gradient mask blending top edge under navbar */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#031813] via-[#031813]/25 to-transparent" />
        {/* Bottom gradient overlay to blend into curve transition */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#031813] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-20">
        
        {/* Left Column: Texts and CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-4xl sm:text-5xl md:text-[56px] font-serif font-bold text-[#F8F4ED] tracking-tight leading-[1.15]"
          >
            Kitoblar va ilm <br />
            bilan hayotingizni <br />
            yoritib qo&apos;shing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-sm md:text-base font-light text-[#F8F4ED]/80 leading-relaxed max-w-xl"
          >
            Qamar kitoblar do&apos;koni – siz uchun faqat eng sara, <br className="hidden sm:inline" />
            foydali bilimlar va milliy tarjimalar.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/books"
              className="flex items-center justify-center px-8 py-3.5 rounded-full bg-[#062B22] border border-[#D4AF37]/35 text-[#F8F4ED] hover:bg-[#D4AF37] hover:text-[#062B22] font-semibold text-xs tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
              id="hero-cta-books"
            >
              Kitoblarni ko&apos;rish
            </Link>
            <Link
              href="/promotions"
              className="flex items-center justify-center px-8 py-3.5 rounded-full bg-white hover:bg-[#F8F4ED] text-[#062B22] border border-[#062B22]/10 hover:border-[#D4AF37] font-semibold text-xs tracking-wide transition-all duration-300"
              id="hero-cta-promos"
            >
              Aksiyalar
            </Link>
          </motion.div>

          {/* Trust Badge / Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex items-center gap-3.5 pt-4 border-t border-white/5 w-full"
          >
            <div className="flex -space-x-3.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80"
                alt="User 1"
                className="w-8 h-8 rounded-full border-2 border-[#031813] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80"
                alt="User 2"
                className="w-8 h-8 rounded-full border-2 border-[#031813] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80"
                alt="User 3"
                className="w-8 h-8 rounded-full border-2 border-[#031813] object-cover"
              />
              <div className="w-8 h-8 rounded-full border-2 border-[#031813] bg-[#062B22] text-[#D4AF37] flex items-center justify-center text-[9px] font-bold">
                +99
              </div>
            </div>
            <span className="text-xs text-[#F8F4ED]/70 font-light">
              <strong className="text-[#D4AF37] font-semibold">30 000+</strong> oqigan blogerlar tavsiyasi
            </span>
          </motion.div>
        </div>

        {/* Right Column: Hero Concept Visual */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center relative w-full mt-10 -right-90 -bottom-50 -mb-40 lg:mt-0 z-20">
          {/* Mobile View: Clean rounded card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-full max-w-[440px] aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl border border-white/10 group cursor-pointer lg:hidden"
            onClick={() => setIsVideoOpen(true)}
          >
            <img
              src="/qamar_hero_concept.png"
              alt="Qamar Bookstore Luxury Concept"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            
            {/* Play overlay for mobile */}
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-2.5 bg-black/45 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/10 text-left">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center">
                  <Play size={10} className="fill-[#062B22] translate-x-0.5 text-[#062B22]" />
                </div>
                <span className="text-[9px] text-[#FAF6EE] font-serif font-semibold">Qamar video</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop View: Interactive Play Button only (image is absolute background blending left) */}
          <div className="hidden lg:flex items-center justify-end w-full min-h-[400px] pr-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-3.5 bg-[#031813]/60 backdrop-blur-md py-3 px-5 rounded-full border border-white/10 shadow-2xl cursor-pointer hover:bg-black/75 transition-all duration-300 group/play mr-4 mt-20"
            >
              <div
                className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#062B22] flex items-center justify-center transition-all duration-300 shadow-md group-hover/play:scale-105 active:scale-95"
              >
                <Play size={14} className="fill-[#062B22] translate-x-0.5 text-[#062B22] relative z-10" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[10px] text-[#FAF6EE]/90 font-serif leading-tight font-semibold">Qamar haqida</span>
                <span className="text-[10px] text-[#FAF6EE]/90 font-serif leading-tight font-semibold">video</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Live Preview trigger link just above the curve */}
      {/* <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="text-xs font-semibold text-white/95 hover:text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5 transition-colors"
        >
          Jonli varaqlash (Live Preview) &rarr;
        </button>
      </div> */}

      {/* Mosque Dome / Scalloped Curve Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,100 L1440,100 L1440,60 C1080,95 900,10 720,10 C540,10 360,95 0,60 Z"
            fill="#F8F4ED"
          />
        </svg>
      </div>

      {/* Embedded Live Preview Modal */}
      {/* <LivePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        bookTitle="Qamar kitoblar do'koni"
        bookAuthor="Taqdimot videosi"
      /> */}

      {/* Cinematic Video Player Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-[#031813] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/10 transition-all duration-300"
                aria-label="Yopish"
              >
                <X size={20} />
              </button>

              {/* Video Tag */}
              <video
                src="/hero.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
