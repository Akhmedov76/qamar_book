'use client';

import React from 'react';
import { ShieldCheck, Coins, Sliders, ArrowRight, Server, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ValuePropSection() {
  const values = [
    {
      icon: <Coins className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Doimiy xarajatlarning kamligi',
      desc: 'Shopify-dagi oylik obuna to\'lovi ($39-$399) va har bir tranzaksiyadan olinadigan 2% foiz yo\'qoladi. Tizimimizda faqat server va domen uchun minimal xarajat qilinadi.',
      badge: 'Self-hosted tejamkorlik',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Mahalliy to\'lov va kuryerlik integratsiyasi',
      desc: 'Shopify-da O\'zbekistondagi Click, Payme, Uzum Bank to\'lov tizimlari va Fargo, BTS kabi mahalliy yetkazib berish xizmatlarini ulash o\'ta murakkab yoki imkonsiz. Bizda esa hammasi tayyor ulab beriladi.',
      badge: 'Uzbekistan Integrations',
    },
    {
      icon: <Server className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Bloklanish va sanksiyalar xavfi yo\'qligi',
      desc: 'Tizim DigitalOcean, Hetzner yoki o\'zimizning milliy serverlarda mustaqil ishlaydi. Chet el kompaniyalarining sanksiyalari, blokirovkalari yoki to\'lov cheklovlari sababli do\'koningiz o\'chib qolmaydi.',
      badge: '100% Barqarorlik',
    },
    {
      icon: <Sliders className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Mutloq moslashuvchanlik (Customization)',
      desc: 'Shopify-ning tayyor qoliplari bilan cheklanib qolmaysiz. Qamarning brendiga mos, nozik didli va milliy naqsh elementlariga boy premium minimalist dizaynlarni istalgancha o\'zgartira olamiz.',
      badge: 'Cheksiz Dizayn',
    },
  ];

  return (
    <section className="bg-[#031813] text-[#F8F4ED] py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#062B22] rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div className="flex flex-col gap-3 text-left">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              Platforma ustunliklari
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              Nega Qamar tizimi <br className="hidden sm:inline" />
              Shopify&apos;dan ustun?
            </h2>
          </div>
          <p className="text-sm font-light text-[#F8F4ED]/65 max-w-md text-left md:text-right leading-relaxed">
            Biznesingiz uchun global platformalarning cheklovlaridan ozod, to&apos;liq moslashuvchan va iqtisodiy jihatdan eng maqbul yechim.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-[28px] p-8 hover:border-[#D4AF37]/30 transition-all duration-500 group flex flex-col justify-between text-left"
            >
              <div className="flex flex-col gap-6">
                {/* Header elements */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[#D4AF37] group-hover:text-[#031813] transition-all duration-500 flex items-center justify-center">
                    {val.icon}
                  </div>
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[#D4AF37]/60 bg-white/5 py-1 px-3 rounded-full">
                    {val.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-lg md:text-xl font-serif font-bold group-hover:text-[#D4AF37] transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-xs md:text-sm font-light text-[#F8F4ED]/70 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#D4AF37]/80 group-hover:text-[#D4AF37] font-semibold tracking-wider uppercase cursor-pointer">
                <span>Batafsil bilish</span>
                <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#062B22] to-[#042019] border border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-4 text-left luxury-shadow">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-xl md:text-2xl font-serif font-bold">
              Biznesingizni keyingi bosqichga olib chiqing
            </h3>
            <p className="text-xs md:text-sm font-light text-[#F8F4ED]/75 leading-relaxed">
              Biz faqat do&apos;kon yaratmaymiz, balki sizning brendingiz uchun shaxsiy, barqaror va hech qanday cheklovlarga ega bo&apos;lmagan raqamli infratuzilmani quramiz.
            </p>
          </div>
          <Link
            href="/books"
            className="px-8 py-4 rounded-full bg-[#D4AF37] hover:bg-[#F8F4ED] text-[#031813] font-bold text-sm tracking-wide transition-all duration-300 shrink-0 text-center w-full md:w-auto"
          >
            Katalogga o&apos;tish
          </Link>
        </div>
      </div>
    </section>
  );
}
