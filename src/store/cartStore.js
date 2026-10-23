/**
 * cartStore.js — Zustand store for the XP Shop cart
 *
 * WHY ZUSTAND?
 * Context API re-renders every subscriber when ANY part of the value changes.
 * Zustand only re-renders components that subscribe to the specific slice
 * of state that changed. Great for cart state that many components read.
 *
 * COMPARE with StudentContext (Context API approach):
 *   - Context: wrap with <Provider>, use useContext()
 *   - Zustand: no Provider needed, just import and call useCartStore()
 */

import { create } from 'zustand';

// The products available in the XP Shop
export const SHOP_ITEMS = [
  {
    id: 'boost-xp-2x',
    name: 'XP Double Boost',
    desc: 'Doubles XP earned on your next quiz attempt.',
    price: 80,
    emoji: '⚡',
    category: 'Boosts',
    inStock: true,
  },
  {
    id: 'streak-shield',
    name: 'Streak Shield',
    desc: 'Protects your streak for one missed day. Never lose your streak again!',
    price: 60,
    emoji: '🛡️',
    category: 'Power-ups',
    inStock: true,
  },
  {
    id: 'hint-tokens',
    name: 'Hint Tokens x3',
    desc: 'Reveals a subtle hint during quiz questions when you are stuck.',
    price: 45,
    emoji: '💡',
    category: 'Power-ups',
    inStock: true,
  },
  {
    id: 'theme-neon',
    name: 'Neon Coder Theme',
    desc: 'A vibrant electric-green theme skin for your dashboard.',
    price: 150,
    emoji: '🟢',
    category: 'Themes',
    inStock: true,
  },
  {
    id: 'theme-galaxy',
    name: 'Galaxy Dark Theme',
    desc: 'Deep space dark theme with nebula purple accents. Exclusive skin.',
    price: 200,
    emoji: '🌌',
    category: 'Themes',
    inStock: false, // Out of stock — shows disabled state in UI
  },
  {
    id: 'title-legend',
    name: '"Legend" Title',
    desc: 'Displays the exclusive "Legend" title badge next to your name.',
    price: 300,
    emoji: '👑',
    category: 'Titles',
    inStock: true,
  },
  {
    id: 'badge-frame-gold',
    name: 'Gold Badge Frame',
    desc: 'Adds a shimmering gold border frame around all your earned badges.',
    price: 120,
    emoji: '🏆',
    category: 'Cosmetics',
    inStock: true,
  },
  {
    id: 'xp-refill',
    name: 'XP Starter Pack',
    desc: 'Instantly adds 25 bonus XP to your account. Perfect for beginners!',
    price: 0,
    emoji: '🎁',
    category: 'Special',
    inStock: true,
    isFree: true,
  },
];

export const CATEGORIES = ['All', 'Boosts', 'Power-ups', 'Themes', 'Titles', 'Cosmetics', 'Special'];

/**
 * useCartStore — The Zustand store
 *
 * create() takes a function that receives (set, get):
 *   - set(fn)  → updates state, like setState in React
 *   - get()    → reads current state synchronously (useful inside actions)
 */
export const useCartStore = create((set, get) => ({
  // ─── State ────────────────────────────────────────────────
  cartItems: [],        // Array of { ...product, qty: number }
  isCartOpen: false,    // Controls cart drawer visibility
  purchasedIds: [],     // Tracks already purchased item IDs

  // ─── Cart Actions ──────────────────────────────────────────
  addToCart: (item) => {
    set((state) => {
      const exists = state.cartItems.find((i) => i.id === item.id);
      if (exists) {
        // Item already in cart — just bump quantity
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      // New item — add with qty 1
      return { cartItems: [...state.cartItems, { ...item, qty: 1 }] };
    });
  },

  removeFromCart: (id) =>
    set((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== id) })),

  decrementQty: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0), // remove if qty hits 0
    })),

  clearCart: () => set({ cartItems: [] }),

  // ─── Purchase ──────────────────────────────────────────────
  markPurchased: (ids) =>
    set((state) => ({
      purchasedIds: [...state.purchasedIds, ...ids],
      cartItems: [],
      isCartOpen: false,
    })),

  // ─── Cart Drawer ───────────────────────────────────────────
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  // ─── Derived (computed from state using get()) ─────────────
  // Note: these are functions, not reactive — call them like getTotal()
  getTotal: () => get().cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
  getItemCount: () => get().cartItems.reduce((sum, i) => sum + i.qty, 0),
}));
