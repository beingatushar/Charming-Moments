import { useCallback } from 'react';
import { Product } from '../types';
import useCartStore from '../stores/useCartStore';

export const useCart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    handleAddToCart,
    validateQuantity,
    validateCartSize,
  } = useCartStore();

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
