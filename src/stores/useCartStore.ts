import { create } from 'zustand';
import { CartItem, Product } from '../types';
import toast from 'react-hot-toast';

const MAX_ITEM_QUANTITY = parseInt(
  import.meta.env.VITE_MAX_ITEM_QUANTITY || '10'
);
const MAX_CART_ITEMS = parseInt(import.meta.env.VITE_MAX_CART_ITEMS || '100');

interface CartState {
  cart: CartItem[];
  validateQuantity: (quantity: number) => boolean;
  validateCartSize: () => boolean;
  updateCart: (item: CartItem) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  handleAddToCart: (product: Product) => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  validateQuantity: (quantity) => quantity <= MAX_ITEM_QUANTITY,

  validateCartSize: () => get().cart.length < MAX_CART_ITEMS,

  updateCart: (item) => {
    if (!get().validateCartSize()) {
      console.error('Cart is full');
      return;
    }

    const index = get().cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      const newQuantity = get().cart[index].quantity + 1;
      if (!get().validateQuantity(newQuantity)) {
        console.error('Maximum quantity reached');
        return;
      }

      set((state) => ({
        cart: state.cart.map((cartItem, i) =>
          i === index ? { ...cartItem, quantity: newQuantity } : cartItem
        ),
      }));
    } else {
      set((state) => ({ cart: [...state.cart, { ...item, quantity: 1 }] }));
    }
  },

  addToCart: (item) => {
    get().updateCart(item);
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((cartItem) => cartItem.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    set((state) => ({
      cart: state.cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      ),
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  handleAddToCart: (product) => {
    get().addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? 'https://via.placeholder.com/150',
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  },
}));

export default useCartStore;
