import { create } from 'zustand';
import { CartItem } from '../types';

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  updateCart: (item: CartItem) => void; // Add the helper function to state

  validateQuantity: (quantity: number) => boolean;
  validateCartSize: () => boolean;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  validateQuantity: (quantity) =>
    quantity <= parseInt(import.meta.env.VITE_MAX_ITEM_QUANTITY || '10'),
  validateCartSize: () =>
    get().cart.length < parseInt(import.meta.env.VITE_MAX_CART_ITEMS || '100'),
  // Helper function to update or add item to the cart
  updateCart: (item) =>
    set((state) => {
      if (!state.validateCartSize()) {
        console.error('Cart is full');
        return {};
      }

      const index = state.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        const newQuantity = state.cart[index].quantity + 1;
        if (!state.validateQuantity(newQuantity)) {
          console.error('Maximum quantity reached');
          return {};
        }

        const updatedCart = [...state.cart];
        updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }
    }),

  // Add item to cart, calling the updateCart helper
  addToCart: (item) =>
    set((state) => {
      state.updateCart(item); // This will now work, as updateCart is part of the state
      return {};
    }),

  // Remove item from cart
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((cartItem) => cartItem.id !== id),
    })),

  // Update item quantity in cart
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      ),
    })),

  // Clear the entire cart
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
