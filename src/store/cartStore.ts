import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  updateCart: (item: CartItem) => void; // Add the helper function to state
}

const useCartStore = create<CartState>((set) => ({
  cart: [],

  // Helper function to update or add item to the cart
  updateCart: (item) =>
    set((state) => {
      const index = state.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        // Update the quantity if the item exists
        const updatedCart = [...state.cart];
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity + 1,
        };
        return { cart: updatedCart };
      } else {
        // Add the new item if it doesn't exist
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
        cartItem.id === id ? { ...cartItem, quantity } : cartItem,
      ),
    })),

  // Clear the entire cart
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
