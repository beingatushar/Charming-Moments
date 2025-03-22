import React from "react";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";
import Header from "../components/Header"; // Import Header
import Footer from "../components/Footer"; // Import Footer

// CartItem Component
interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">Price: Rs {item.price}</p>
      </div>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition duration-300"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

// CartTotal Component
interface CartTotalProps {
  totalPrice: number;
  onClearCart: () => void;
}

const CartTotal: React.FC<CartTotalProps> = ({ totalPrice, onClearCart }) => {
  return (
    <div className="text-right">
      <p className="text-xl font-bold text-gray-800">
        Total: Rs {totalPrice.toFixed(2)}
      </p>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={onClearCart}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Clear Cart
        </button>
        <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition duration-300">
          Checkout
        </button>
      </div>
    </div>
  );
};

// EmptyCart Component
const EmptyCart: React.FC = () => {
  return (
    <div className="text-center">
      <p className="text-gray-600">Your cart is empty.</p>
      <Link
        to="/shop"
        className="mt-4 inline-block bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

// CartPage Component
const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Total and Actions */}
            <CartTotal totalPrice={totalPrice} onClearCart={clearCart} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage;
