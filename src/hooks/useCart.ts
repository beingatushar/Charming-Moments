import { useCallback } from 'react';
import { Product } from '../types';
import useCartStore from '../stores/useCartStore';

export const useCart = () => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const handleAddToCart = useCartStore((state) => state.handleAddToCart);
  const validateQuantity = useCartStore((state) => state.validateQuantity);
  const validateCartSize = useCartStore((state) => state.validateCartSize);

  // You can add additional hook-specific logic here if needed
  // For example, a memoized derived state:
  const totalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    handleAddToCart,
    validateQuantity,
    validateCartSize,
    totalItems, // Example of additional hook functionality
  };
};
