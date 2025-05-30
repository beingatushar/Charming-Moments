import React, { useState } from "react";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";
import Header from "../components/Header"; // Import Header
import Footer from "../components/Footer"; // Import Footer
import { generateCheckoutMessage } from "../utils/utils";
import AddressForm from "../components/AddressForm";

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
}) => (
  <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
    {/* Product Image */}
    <img
      src={item.image}
      alt={item.name}
      className="w-24 h-24 object-cover rounded-lg"
    />

    {/* Product Details */}
    <div className="flex-1 ml-4">
      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
      <p className="text-gray-600">Price: Rs {item.price}</p>
    </div>

    {/* Quantity and Remove Button */}
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

// CartTotal Component
interface CartTotalProps {
  totalPrice: number;
  onClearCart: () => void;
}

const CartTotal: React.FC<CartTotalProps> = ({ totalPrice, onClearCart }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  return (
    <div className="text-right">
      <p className="text-xl font-bold text-gray-800">
        Total: Rs {totalPrice.toFixed(2)}
      </p>

      {/* Actions */}
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={onClearCart}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Clear Cart
        </button>
        <button
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            const message = generateCheckoutMessage(cart);
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://web.whatsapp.com/send?phone=${"+918586810252"}&text=${encodedMessage}`;
            // window.location.href = whatsappUrl;
            console.log(whatsappUrl);
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

// EmptyCart Component
const EmptyCart: React.FC = () => (
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

// CartPage Component
const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!/^\d{10}$/.test(mobile))
      newErrors.mobile = "Enter a valid 10-digit number.";
    if (!houseNumber.trim())
      newErrors.houseNumber = "House number is required.";
    if (!area.trim()) newErrors.area = "Area is required.";
    if (!/^\d{6}$/.test(pincode))
      newErrors.pincode = "Pincode must be 6 digits.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!state.trim()) newErrors.state = "State is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // ✅ Validate the form before proceeding
    if (!validateForm()) return;

    // ✅ Structure the address as expected by generateCheckoutMessage
    const address = {
      name: name.trim(), // Ensure trimming
      street: `${houseNumber.trim()}, ${area.trim()}`,
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      phone: mobile.trim(),
    };

    // ✅ Generate the WhatsApp message
    const message = generateCheckoutMessage(cart, address);
    const encodedMessage = encodeURIComponent(message);

    // ✅ Determine if the device is mobile or desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // ✅ Use correct WhatsApp URL schema
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=+918586810252&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=+918586810252&text=${encodedMessage}`;

    // ✅ Open WhatsApp appropriately
    window.open(whatsappUrl, isMobile ? "_self" : "_blank");
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-6">
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

            {/* 📦 Address Form */}
            <AddressForm
              name={name}
              mobile={mobile}
              houseNumber={houseNumber}
              area={area}
              pincode={pincode}
              city={city}
              state={state}
              setName={setName}
              setMobile={setMobile}
              setHouseNumber={setHouseNumber}
              setArea={setArea}
              setPincode={setPincode}
              setCity={setCity}
              setState={setState}
              errors={errors}
            />

            {/* 💰 Cart Total */}
            <div className="text-right">
              <p className="text-xl font-bold text-gray-800">
                Total: Rs {totalPrice.toFixed(2)}
              </p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
