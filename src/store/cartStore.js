import { create } from 'zustand';

// Product catalog available in the XP store
export const SHOP_ITEMS = [
  {
    id: 'boost-xp-2x',
    name: 'XP Double Boost',
    desc: 'Doubles XP earned on your next technical assessment.',
    price: 80,
    emoji: '⚡',
    category: 'Boosts',
    inStock: true,
  },
  {
    id: 'streak-shield',
    name: 'Streak Shield',
    desc: 'Protects your streak for one missed day of practice.',
    price: 60,
    emoji: '🛡️',
    category: 'Power-ups',
    inStock: true,
  },
  {
    id: 'hint-tokens',
    name: 'Hint Tokens x3',
    desc: 'Reveals syntax hints during quiz assessments when you are stuck.',
    price: 45,
    emoji: '💡',
    category: 'Power-ups',
    inStock: true,
  },
  {
    id: 'mock-interview-pass',
    name: 'Mock Interview Pass',
    desc: 'Unlocks a timed frontend mock technical evaluation module.',
    price: 50,
    emoji: '🎙️',
    category: 'Special',
    inStock: true,
  },
  {
    id: 'badge-frame-emerald',
    name: 'Emerald Verified Border',
    desc: 'Adds an emerald verification border around your earned certifications.',
    price: 120,
    emoji: '✨',
    category: 'Cosmetics',
    inStock: true,
  },
  {
    id: 'theme-zinc',
    name: 'Minimalist Zinc Theme',
    desc: 'A clean, high-contrast monochrome layout for high focus.',
    price: 150,
    emoji: '⚪',
    category: 'Themes',
    inStock: true,
  },
  {
    id: 'theme-slate',
    name: 'Clean Slate Theme',
    desc: 'Refined slate palette designed for code review and documentation.',
    price: 200,
    emoji: '🌑',
    category: 'Themes',
    inStock: false,
  },
  {
    id: 'title-senior',
    name: '"Lead Architect" Title',
    desc: 'Displays the exclusive "Lead Architect" credential on your profile.',
    price: 300,
    emoji: '🛠️',
    category: 'Titles',
    inStock: true,
  },
  {
    id: 'boost-overdrive-3x',
    name: 'Overdrive XP Surge',
    desc: 'Triples your earned XP on the next completed coding project.',
    price: 125,
    emoji: '🚀',
    category: 'Boosts',
    inStock: true,
  },
  {
    id: 'second-chance-token',
    name: 'Second Chance Token',
    desc: 'Grants an instant free retry on any missed assessment question.',
    price: 55,
    emoji: '🔄',
    category: 'Power-ups',
    inStock: true,
  },
  {
    id: 'code-review-pro',
    name: 'AI Code Review Pass',
    desc: 'Unlocks comprehensive architectural feedback on your challenge solutions.',
    price: 95,
    emoji: '🤖',
    category: 'Special',
    inStock: true,
  },
  {
    id: 'avatar-neon-aura',
    name: 'Neon Cyber Aura',
    desc: 'Unlocks a luminous animated aura around your profile avatar.',
    price: 140,
    emoji: '💫',
    category: 'Cosmetics',
    inStock: true,
  },
];

export const CATEGORIES = ['All', 'Boosts', 'Power-ups', 'Themes', 'Titles', 'Cosmetics', 'Special'];

// Helper to load purchased IDs from localStorage
function getInitialPurchasedIds() {
  try {
    const saved = localStorage.getItem('codyssey_purchased_perks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// This custom store is used to manage shopping cart state using Zustand
export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,
  purchasedIds: getInitialPurchasedIds(),

  // This function is used to add an item to the shopping cart or increment its quantity
  addToCart: (item) => {
    set((state) => {
      const exists = state.cartItems.find((i) => i.id === item.id);
      if (exists) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { cartItems: [...state.cartItems, { ...item, qty: 1 }] };
    });
  },

  // This function is used to remove an item from the cart
  removeFromCart: (id) =>
    set((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== id) })),

  // This function is used to decrement an item quantity by 1
  decrementQty: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    })),

  // This function is used to empty the entire cart
  clearCart: () => set({ cartItems: [] }),

  // This function is used to record purchased items and reset the cart
  markPurchased: (ids) =>
    set((state) => {
      const updated = Array.from(new Set([...state.purchasedIds, ...ids]));
      try {
        localStorage.setItem('codyssey_purchased_perks', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return {
        purchasedIds: updated,
        cartItems: [],
        isCartOpen: false,
      };
    }),

  // This function is used to toggle the cart slide-out drawer
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  // This function is used to calculate the total price of all cart items
  getTotal: () => get().cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),

  // This function is used to get the total quantity of items in the cart
  getItemCount: () => get().cartItems.reduce((sum, i) => sum + i.qty, 0),
}));
