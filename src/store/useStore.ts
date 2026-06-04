import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  old_price?: number;
  rating: number;
  cover_image: string;
  category: string;
  sku?: string;
  stock?: number;
  description?: string;
  binding?: string;
  publisher?: string;
  translator?: string;
  language?: string;
  published_year?: number;
  has_preview?: boolean;
  preview_pages?: string[];
  has_ebook?: boolean;
  ebook_price?: number;
  ebook_file_url?: string;
  has_audio?: boolean;
  audio_price?: number;
  audio_file_url?: string;
  quotes?: string[];
  reviews?: {
    id: number;
    user: {
      username: string;
      first_name?: string;
      last_name?: string;
    };
    rating: number;
    text: string;
    quote?: string;
    created_at: string;
  }[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

interface User {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface AppState {
  // Wishlist State
  wishlist: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: number) => void;
  isInWishlist: (bookId: number) => boolean;

  // Cart State
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: number) => void;
  updateCartQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Auth State
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Wishlist Implementation
      wishlist: [],
      addToWishlist: (book) => set((state) => {
        if (state.wishlist.some((item) => item.id === book.id)) return state;
        return { wishlist: [...state.wishlist, book] };
      }),
      removeFromWishlist: (bookId) => set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== bookId)
      })),
      isInWishlist: (bookId) => {
        return get().wishlist.some((item) => item.id === bookId);
      },

      // Cart Implementation
      cart: [],
      addToCart: (book, quantity = 1) => set((state) => {
        const existing = state.cart.find((item) => item.book.id === book.id);
        if (existing) {
          return {
            cart: state.cart.map((item) =>
              item.book.id === book.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        return { cart: [...state.cart, { book, quantity }] };
      }),
      removeFromCart: (bookId) => set((state) => ({
        cart: state.cart.filter((item) => item.book.id !== bookId)
      })),
      updateCartQuantity: (bookId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.book.id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.book.price * item.quantity, 0);
      },

      // Auth Implementation
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'qamar-bookstore-storage',
      partialize: (state) => ({
        wishlist: state.wishlist,
        cart: state.cart,
        token: state.token,
        user: state.user,
      }),
    }
  )
);
