import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddressForm from '../components/AddressForm';
import { generateCheckoutMessage } from '../utils/utils';
import useCartStore from '../stores/useCartStore';
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
  <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
    <img
      loading="lazy"
      src={item.image}
      alt={item.name}
      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
    />
    <div className="flex-1 ml-0 sm:ml-4">
      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
      <p className="text-gray-600">Price: Rs {item.price}</p>
    </div>
    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={(e) =>
          onUpdateQuantity(item.id, Math.max(1, Number(e.target.value)))
        }
        className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        aria-label={`Quantity of ${item.name}`}
      />
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 transition duration-300"
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </div>
  </div>
);

// Hook for form state and validation
const useAddressForm = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    houseNumber: '',
    area: '',
    pincode: '',
    city: '',
    state: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback((field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((errs) => ({ ...errs, [field]: '' })); // Clear error on change
  }, []);

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = 'Enter a valid 10-digit number.';
    if (!form.houseNumber.trim())
      newErrors.houseNumber = 'House number is required.';
    if (!form.area.trim()) newErrors.area = 'Area is required.';
    if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = 'Pincode must be 6 digits.';
    if (!form.city.trim()) newErrors.city = 'City is required.';
    if (!form.state.trim()) newErrors.state = 'State is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  return { form, errors, updateField, validate };
};

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

const CartPage: React.FC = () => {
  const { removeFromCart, updateQuantity, clearCart, cart } = useCartStore();
  const { form, errors, updateField, validate } = useAddressForm();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!validate()) return;

      const address = {
        name: form.name.trim(),
        street: `${form.houseNumber.trim()}, ${form.area.trim()}`,
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
        phone: form.mobile.trim(),
      };

      const message = generateCheckoutMessage(cart, address);
      const encodedMessage = encodeURIComponent(message);

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      const whatsappUrl = isMobile
        ? `whatsapp://send?phone=${import.meta.env.VITE_CONTACT_PHONE}&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${import.meta.env.VITE_CONTACT_PHONE}&text=${encodedMessage}`;

      window.open(whatsappUrl, isMobile ? '_self' : '_blank');
    },
    [cart, form, validate]
  );

  if (cart.length === 0)
    return (
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
          <EmptyCart />
        </main>
        <Footer />
      </div>
    );
  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        <AddressForm
          {...form}
          errors={errors}
          setName={(v) => updateField('name', v)}
          setMobile={(v) => updateField('mobile', v)}
          setHouseNumber={(v) => updateField('houseNumber', v)}
          setArea={(v) => updateField('area', v)}
          setPincode={(v) => updateField('pincode', v)}
          setCity={(v) => updateField('city', v)}
          setState={(v) => updateField('state', v)}
        />

        <div className="text-right space-y-4">
          <p className="text-xl font-bold text-gray-800">
            Total: Rs {totalPrice.toFixed(2)}
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              type="button"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
              type="button"
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
