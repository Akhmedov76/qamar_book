'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, ShieldCheck, Check, Gift } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const getCartTotal = useStore((state) => state.getCartTotal);

  const [paymentMethod, setPaymentMethod] = useState<'click' | 'payme' | 'uzum'>('click');
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Gifting States
  const [isGift, setIsGift] = useState(false);
  const [giftRecipientName, setGiftRecipientName] = useState('');
  const [giftRecipientPhone, setGiftRecipientPhone] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100000 ? 0 : 15000;
  const giftWrapCost = isGift && giftWrap ? 10000 : 0;
  const total = subtotal + shipping + giftWrapCost;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCheckedOut(true);
      // We clear the cart, but we don't clear the gifting states yet so we can display them on the success card
    }, 2000);
  };

  const handleConfirmReset = () => {
    clearCart();
    setIsCheckedOut(false);
    setIsGift(false);
    setGiftRecipientName('');
    setGiftRecipientPhone('');
    setGiftNote('');
    setGiftWrap(false);
  };

  return (
    <div className="bg-[#F8F4ED] min-h-screen py-16 px-6 md:px-12 text-left">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Navigation back */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#062B22]/70 hover:text-[#D4AF37] uppercase tracking-wider">
          <ArrowLeft size={14} />
          Bosh sahifaga qaytish
        </Link>

        {/* Title */}
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
            <ShoppingBag size={13} className="text-[#D4AF37]" />
            Savat hisoboti
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#062B22]">
            Siz tanlagan asarlar
          </h1>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-1" />
        </div>

        {isCheckedOut ? (
          /* Successful order mock state */
          <div className="py-12 px-8 text-center bg-white rounded-[24px] border border-[#062B22]/5 luxury-shadow flex flex-col items-center gap-6 max-w-xl mx-auto w-full mt-4">
            <div className="w-20 h-20 rounded-full bg-[#062B22] flex items-center justify-center text-[#D4AF37] shadow-lg border border-[#D4AF37]/35">
              <Check size={36} className="stroke-[3]" />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-serif font-bold text-2xl text-[#062B22]">Buyurtmangiz qabul qilindi!</h3>
              <p className="text-xs font-light text-[#062B22]/70 max-w-sm leading-relaxed mx-auto">
                Xaridingiz uchun tashakkur! To&apos;lov so&apos;rovi muvaffaqiyatli jo&apos;natildi. Operatorlarimiz tez orada siz bilan bog&apos;lanadi.
              </p>
            </div>

            {/* Gifting details in receipt if selected */}
            {isGift && (
              <div className="p-5 bg-pink-50/50 border border-pink-100 rounded-[20px] w-full text-left flex flex-col gap-3 text-xs">
                <div className="flex items-center gap-2 text-pink-600 font-bold uppercase tracking-wider text-[10px]">
                  <Gift size={14} />
                  Sovg&apos;a qabul qiluvchi ma&apos;lumotlari:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[#062B22]/80">
                  <div>Ism: <strong className="font-bold text-[#062B22]">{giftRecipientName}</strong></div>
                  <div>Telefon: <strong className="font-bold text-[#062B22]">{giftRecipientPhone}</strong></div>
                  {giftWrap && <div className="col-span-2 text-emerald-600 font-medium">✓ Chiroyli qadoqlash tanlangan</div>}
                  {giftNote && <div className="col-span-2 italic text-gray-500 bg-white p-2.5 rounded-lg border border-gray-100 mt-1">&ldquo;{giftNote}&rdquo;</div>}
                </div>
              </div>
            )}

            <div className="p-4 bg-[#F8F4ED] rounded-[18px] border border-[#062B22]/5 w-full flex justify-between items-center text-xs">
              <span className="text-[#062B22]/60">Tanlangan to&apos;lov turi:</span>
              <span className="font-bold text-[#062B22] uppercase">{paymentMethod}</span>
            </div>

            <button
              onClick={handleConfirmReset}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-[24px] bg-[#062B22] hover:bg-[#D4AF37] text-[#F8F4ED] hover:text-[#062B22] font-semibold text-sm tracking-wide transition-all w-full mt-2"
            >
              Mutolaani davom ettirish
              <ArrowRight size={16} />
            </button>
          </div>
        ) : cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
            {/* Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {cart.map((item) => (
                <div
                  key={item.book.id}
                  className="bg-white p-6 rounded-[24px] border border-[#062B22]/5 shadow-sm flex flex-col sm:flex-row gap-6 items-center justify-between"
                >
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <img
                      src={item.book.cover_image}
                      alt={item.book.title}
                      className="w-16 h-20 object-cover rounded-md shadow border border-[#062B22]/5"
                    />
                    <div className="flex flex-col gap-1 text-left">
                      <span className="text-[9px] tracking-wider uppercase font-semibold text-[#D4AF37]">
                        {item.book.category}
                      </span>
                      <h4 className="text-base font-serif font-bold text-[#062B22] line-clamp-1">
                        {item.book.title}
                      </h4>
                      <span className="text-xs text-[#062B22]/60 font-light">
                        {item.book.author}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#062B22]/5">
                    {/* Quantity Adjustment */}
                    <div className="flex items-center gap-3 bg-[#F8F4ED] py-1 px-3 rounded-full border border-[#062B22]/5 text-xs">
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center font-bold text-[#062B22]"
                      >
                        -
                      </button>
                      <span className="font-semibold text-[#062B22] w-3 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center font-bold text-[#062B22]"
                      >
                        +
                      </button>
                    </div>

                    {/* Price total */}
                    <span className="font-bold text-[#062B22] text-sm shrink-0 min-w-[90px] text-right">
                      {(item.book.price * item.quantity).toLocaleString()} so&apos;m
                    </span>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.book.id)}
                      className="text-red-500 hover:text-red-700 p-2 transition-colors"
                      aria-label="O'chirish"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="text-left text-xs text-red-500 hover:text-red-700 font-semibold uppercase tracking-wider pl-2"
              >
                Savatni butunlay tozalash
              </button>
            </div>

            {/* Cart Order Summary Sidebar */}
            <aside className="lg:col-span-4 bg-white p-8 rounded-[24px] border border-[#062B22]/5 luxury-shadow flex flex-col gap-6">
              <h3 className="font-serif font-bold text-lg text-[#062B22] border-b border-[#062B22]/5 pb-4">
                Buyurtma hisobi
              </h3>

              {/* Order breakdown */}
              <div className="flex flex-col gap-4 text-xs font-light text-[#062B22]/85">
                <div className="flex justify-between">
                  <span>Oraliq jami:</span>
                  <span className="font-semibold">{subtotal.toLocaleString()} so&apos;m</span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-600 font-semibold uppercase text-[10px]">Bepul</strong> : `${shipping.toLocaleString()} so'm`}</span>
                </div>
                {isGift && giftWrap && (
                  <div className="flex justify-between text-pink-600 font-medium">
                    <span>Sovg&apos;a qadog&apos;i:</span>
                    <span>+{giftWrapCost.toLocaleString()} so&apos;m</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#062B22] pt-4 border-t border-[#062B22]/5">
                  <span>Umumiy jami:</span>
                  <span>{total.toLocaleString()} so&apos;m</span>
                </div>
              </div>

              {/* Payment Gateways Selector */}
              <div className="flex flex-col gap-3 mt-2">
                <span className="text-[10px] font-semibold text-[#062B22]/60 uppercase tracking-wider text-left">To&apos;lov turi</span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('click')}
                    className={`py-2.5 rounded-xl border text-[10px] font-bold transition-all ${
                      paymentMethod === 'click'
                        ? 'border-[#D4AF37] bg-sky-50 text-sky-600 shadow-sm'
                        : 'border-[#062B22]/5 hover:bg-gray-50 text-[#062B22]/60'
                    }`}
                  >
                    CLICK
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('payme')}
                    className={`py-2.5 rounded-xl border text-[10px] font-bold transition-all ${
                      paymentMethod === 'payme'
                        ? 'border-[#D4AF37] bg-teal-50 text-teal-600 shadow-sm'
                        : 'border-[#062B22]/5 hover:bg-gray-50 text-[#062B22]/60'
                    }`}
                  >
                    PAYME
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('uzum')}
                    className={`py-2.5 rounded-xl border text-[10px] font-bold transition-all ${
                      paymentMethod === 'uzum'
                        ? 'border-[#D4AF37] bg-violet-50 text-violet-600 shadow-sm'
                        : 'border-[#062B22]/5 hover:bg-gray-50 text-[#062B22]/60'
                    }`}
                  >
                    UZUM
                  </button>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="flex flex-col gap-4 mt-2">
                {/* Gifting Section Toggle */}
                <div className="bg-[#F8F4ED]/50 p-4 rounded-2xl border border-[#062B22]/5 flex flex-col gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#062B22]">
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="rounded accent-[#062B22]"
                    />
                    <Gift size={16} className="text-[#D4AF37]" />
                    Sovg&apos;a sifatida yuborish
                  </label>

                  {isGift && (
                    <div className="flex flex-col gap-3 pt-2 border-t border-[#062B22]/5 text-left">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="recipient-name" className="text-[10px] font-semibold text-[#062B22]/60 uppercase tracking-wider">Oluvchining ismi</label>
                        <input
                          type="text"
                          required={isGift}
                          id="recipient-name"
                          placeholder="Ism sharif"
                          value={giftRecipientName}
                          onChange={(e) => setGiftRecipientName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#062B22]/5 focus:border-[#D4AF37] focus:outline-none text-xs text-[#062B22]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="recipient-phone" className="text-[10px] font-semibold text-[#062B22]/60 uppercase tracking-wider">Oluvchining telefoni</label>
                        <input
                          type="text"
                          required={isGift}
                          id="recipient-phone"
                          placeholder="Telefon raqami"
                          value={giftRecipientPhone}
                          onChange={(e) => setGiftRecipientPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#062B22]/5 focus:border-[#D4AF37] focus:outline-none text-xs text-[#062B22]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="gift-note" className="text-[10px] font-semibold text-[#062B22]/60 uppercase tracking-wider">Tabriknoma matni</label>
                        <textarea
                          id="gift-note"
                          rows={2}
                          placeholder="Tabrik so'zlari..."
                          value={giftNote}
                          onChange={(e) => setGiftNote(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#062B22]/5 focus:border-[#D4AF37] focus:outline-none text-xs text-[#062B22]"
                        />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer text-[10px] font-medium text-[#062B22]/80 mt-1">
                        <input
                          type="checkbox"
                          checked={giftWrap}
                          onChange={(e) => setGiftWrap(e.target.checked)}
                          className="rounded accent-[#062B22]"
                        />
                        Chiroyli qadoqlash (+10,000 so&apos;m)
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="address-input" className="text-[10px] font-semibold text-[#062B22]/60 uppercase tracking-wider">
                    {isGift ? "Qabul qiluvchining manzili" : "Yetkazib berish manzili"}
                  </label>
                  <input
                    type="text"
                    required
                    id="address-input"
                    placeholder="Masalan: Toshkent, Chilonzor 6, 12-uy"
                    className="w-full px-4 py-3 rounded-xl bg-[#062B22]/5 border border-[#062B22]/5 focus:border-[#D4AF37] focus:outline-none text-xs text-[#062B22]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-[24px] bg-[#062B22] text-[#F8F4ED] hover:bg-[#D4AF37] hover:text-[#062B22] font-semibold text-sm tracking-wide transition-all disabled:opacity-50 shadow-md"
                  id="checkout-submit-btn"
                >
                  {isLoading ? 'Tasdiqlanmoqda...' : 'Rasmiylashtirish va Toʻlash'}
                </button>
              </form>

              {/* Security guarantee */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-[#062B22]/50 font-light mt-2">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span>Barcha tranzaksiyalar 100% himoyalangan</span>
              </div>
            </aside>
          </div>
        ) : (
          /* Empty state */
          <div className="py-24 text-center bg-white rounded-[24px] border border-[#062B22]/5 luxury-shadow flex flex-col items-center gap-6 max-w-xl mx-auto w-full mt-6">
            <div className="w-16 h-16 rounded-full bg-[#062B22]/5 flex items-center justify-center text-[#D4AF37]">
              <ShoppingBag size={28} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif font-bold text-xl text-[#062B22]">Savatingiz boʻsh</h3>
              <p className="text-xs text-[#062B22]/60 font-light max-w-xs leading-relaxed">
                Kutubxonamizdagi durdona asarlarni kashf eting va o&apos;zingizga ma&apos;qul kelganlarini savatga qo&apos;shing!
              </p>
            </div>
            <Link
              href="/books"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-[24px] bg-[#062B22] hover:bg-[#D4AF37] text-[#F8F4ED] hover:text-[#062B22] font-semibold text-sm tracking-wide transition-all"
            >
              Kitoblar katalogi
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
