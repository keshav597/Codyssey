import { create } from 'zustand';

// Product catalog available in the XP store
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
    desc: 'Displays the exclusive "Lead Architect" credential next to your profile.',
    price: 300,
    emoji: '🛠️',
    category: 'Titles',
    inStock: true,
  },
  {
    id: 'badge-frame-emerald',
    name: 'Emerald Verified Border',
    desc: 'Adds a crisp emerald verification border around your earned certifications.',
    price: 120,
    emoji: '✨',
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

// This custom store is used to manage shopping cart state using Zustand
export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,
  purchasedIds: [],

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
    set((state) => ({
      purchasedIds: [...state.purchasedIds, ...ids],
      cartItems: [],
      isCartOpen: false,
    })),

  // This function is used to toggle the cart slide-out drawer
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  // This function is used to calculate the total price of all cart items
  getTotal: () => get().cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),

  // This function is used to get the total quantity of items in the cart
  getItemCount: () => get().cartItems.reduce((sum, i) => sum + i.qty, 0),
}));
