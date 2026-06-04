import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Qamar Bookstore | Premium & Cinematic Literary Space",
  description: "Experience literature like never before. Qamar Bookstore offers a curated selection of religious, classical, business, and shaxsiy rivojlanish books, rendered in a luxury cultural design.",
  keywords: ["Bookstore", "Uzbekistan Bookstore", "Islamic Books", "Bestsellers", "Qamar Bookstore", "Toshkent", "Badiiy kitoblar"],
  openGraph: {
    title: "Qamar Bookstore | Premium Literary Space",
    description: "Experience literature like never before. Discover books that inspire your soul and mind.",
    type: "website",
    locale: "uz-UZ",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body className="antialiased font-sans selection:bg-[#D4AF37]/30 selection:text-[#062B22]">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
