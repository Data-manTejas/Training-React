import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, { ...product, quantity: 1 }],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
