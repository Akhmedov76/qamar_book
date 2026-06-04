'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, X, Send, Star } from 'lucide-react';
import { Book } from '@/store/useStore';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  books?: Book[];
  loading?: boolean;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Assalomu alaykum! Men Qamar Bookstore AI yordamchisiman. Sizga qanday janr yoki mavzudagi kitoblar kerak? Masalan, "Shaxsiy rivojlanish haqida saralarini tavsiya et" deb soʻrashingiz mumkin.',
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const promptExamples = [
    'Atomic Habits kabi kitoblar',
    'Tadbirkorlik haqida kitoblar',
    'Ruhni tarbiyalovchi asarlar',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = textToSend;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Add loading assistant message
    setMessages((prev) => [...prev, { sender: 'assistant', text: 'Tavsiyalarni tayyorlayapman...', loading: true }]);

    // Simulated luxury AI book database to respond beautifully
    setTimeout(() => {
      let responseText = '';
      let recommendedBooks: Book[] = [];

      const query = userMsg.toLowerCase();
      if (query.includes('habits') || query.includes('odat') || query.includes('shaxsiy')) {
        responseText = "Sizga shaxsiy rivojlanish va oʻz-oʻzini tarbiyalash boʻyicha dunyodagi eng sara kitoblarni tavsiya qilaman:";
        recommendedBooks = [
          {
            id: 2,
            title: "Muvaffaqiyatli insonlarning 7 ko'nikmasi",
            author: "Stephen Covey",
            price: 52000,
            rating: 4.9,
            cover_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300",
            category: "Shaxsiy Rivojlanish",
          },
          {
            id: 3,
            title: "Atom Odatlar",
            author: "James Clear",
            price: 49000,
            rating: 4.8,
            cover_image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300",
            category: "Shaxsiy Rivojlanish",
          }
        ];
      } else if (query.includes('tadbirkor') || query.includes('biznes') || query.includes('pul')) {
        responseText = "Tadbirkorlar, biznes yuritish va moliyaviy muvaffaqiyat sirlarini oʻrganish uchun quyidagi asarlar ideal tanlovdir:";
        recommendedBooks = [
          {
            id: 5,
            title: "Boy ota, kambag'al ota",
            author: "Robert Kiyosaki",
            price: 45000,
            rating: 4.7,
            cover_image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=300",
            category: "Biznes",
          },
          {
            id: 6,
            title: "Kafesiz biznes",
            author: "Jason Fried",
            price: 39000,
            rating: 4.6,
            cover_image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=300",
            category: "Biznes",
          }
        ];
      } else {
        responseText = "Ushbu ajoyib yoʻnalish boʻyicha Qamar kutubxonasidagi eng nufuzli manbalarni taqdim etaman:";
        recommendedBooks = [
          {
            id: 1,
            title: "Al-Jome' as-Sahih",
            author: "Imom al-Buxoriy",
            price: 180000,
            rating: 5.0,
            cover_image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300",
            category: "Diniy adabiyotlar",
          },
          {
            id: 4,
            title: "Ihyou ulumid-din",
            author: "Abu Homid al-Ghazoliy",
            price: 95000,
            rating: 4.9,
            cover_image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300",
            category: "Diniy adabiyotlar",
          }
        ];
      }

      setMessages((prev) => {
        // Remove loading state and add actual response
        const filtered = prev.filter((m) => !m.loading);
        return [...filtered, { sender: 'assistant', text: responseText, books: recommendedBooks }];
      });
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end" id="ai-assistant">
      {/* Expandable Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[360px] sm:w-[400px] h-[520px] bg-white border border-[#062B22]/10 rounded-[24px] luxury-shadow flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#031813] text-[#F8F4ED] p-5 flex items-center justify-between border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#062B22] border border-[#D4AF37]/30 flex items-center justify-center">
                  <Sparkles size={16} className="text-[#D4AF37] animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm">AI Kitobxon hamkori</h3>
                  <span className="text-[10px] text-[#D4AF37] tracking-wider uppercase font-semibold">QAMAR ONLINE</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1 transition-colors"
                aria-label="Yopish"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message area */}
            <div className="flex-grow overflow-y-auto p-5 flex flex-col gap-4 bg-[#F8F4ED]/40">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-[18px] p-4 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#062B22] text-[#F8F4ED] rounded-tr-none'
                        : 'bg-white text-[#062B22] border border-[#062B22]/5 shadow-sm rounded-tl-none'
                    }`}
                  >
                    {msg.loading ? (
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>

                  {/* Render Recommended Books Inside Chat */}
                  {msg.books && msg.books.length > 0 && (
                    <div className="grid grid-cols-1 gap-2.5 mt-2.5 w-full max-w-[85%]">
                      {msg.books.map((book) => (
                        <div
                          key={book.id}
                          className="p-3 bg-white border border-[#D4AF37]/20 rounded-[16px] shadow-sm flex gap-3 hover:border-[#D4AF37]/50 transition-colors"
                        >
                          <img
                            src={book.cover_image}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded shadow-sm border border-gray-100"
                          />
                          <div className="flex flex-col justify-between text-left">
                            <div>
                              <h4 className="text-xs font-serif font-bold text-[#062B22] line-clamp-1">
                                {book.title}
                              </h4>
                              <p className="text-[10px] text-[#062B22]/60 font-light">{book.author}</p>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs font-bold text-[#062B22]">
                                {book.price.toLocaleString()} so&apos;m
                              </span>
                              <div className="flex items-center gap-0.5 text-[9px] text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-1.5 py-0.5 rounded-full">
                                <Star size={8} className="fill-[#D4AF37] stroke-none" />
                                {book.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length === 1 && (
              <div className="px-5 py-3 border-t border-[#062B22]/5 flex flex-wrap gap-2 bg-[#F8F4ED]/40">
                {promptExamples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(ex)}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white border border-[#062B22]/10 hover:border-[#D4AF37] text-[#062B22] hover:text-[#D4AF37] transition-all"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-4 border-t border-[#062B22]/5 flex items-center gap-3 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savolingizni yozing..."
                className="flex-grow px-4 py-2.5 rounded-[18px] bg-[#062B22]/5 border border-[#062B22]/5 focus:border-[#D4AF37] focus:outline-none text-sm text-[#062B22] font-light"
                id="ai-assistant-input"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-[#062B22] text-[#F8F4ED] hover:bg-[#D4AF37] hover:text-[#062B22] disabled:opacity-40 flex items-center justify-center shadow transition-colors shrink-0"
                id="ai-assistant-send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#062B22] border-2 border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:border-[#062B22] text-[#F8F4ED] hover:text-[#062B22] flex items-center justify-center shadow-2xl relative transition-all duration-300 transform active:scale-90"
        id="ai-assistant-toggle"
        aria-label="AI Yordamchi"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {/* Sparkle badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center shadow">
            <Sparkles size={11} className="text-[#062B22] animate-pulse" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
