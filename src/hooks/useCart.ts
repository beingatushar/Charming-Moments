import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { CartItem, Product } from '../types';

const MAX_ITEM_QUANTITY = parseInt(import.meta.env.VITE_MAX_ITEM_QUANTITY || '10');
const MAX_CART_ITEMS = parseInt(import.meta.env.VITE_MAX_CART_ITEMS || '100');

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const validateQuantity = useCallback((quantity: number) => {
    return quantity <= MAX_ITEM_QUANTITY;
  }, []);

  const validateCartSize = useCallback(() => {
    return cart.length < MAX_CART_ITEMS;
  }, [cart.length]);

  const updateCart = useCallback((item: CartItem) => {
    setCart(prevCart => {
      if (!validateCartSize()) {
        console.error('Cart is full');
        return prevCart;
      }

      const index = prevCart.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        const newQuantity = prevCart[index].quantity + 1;
        if (!validateQuantity(newQuantity)) {
          console.error('Maximum quantity reached');
          return prevCart;
        }

        const updatedCart = [...prevCart];
        updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }, [validateCartSize, validateQuantity]);

  const addToCart = useCallback((item: CartItem) => {
    updateCart(item);
  }, [updateCart]);

  const removeFromCart = useCallback((id: string) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? 'https://via.placeholder.com/150',
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  }, [addToCart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    handleAddToCart,
    validateQuantity,
    validateCartSize,
  };
};