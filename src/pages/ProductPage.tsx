import React from "react";
import { useParams, Link } from "react-router-dom";
import { allProducts, Product } from "../sampleData";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Mock function to simulate fetching a product by ID
const fetchProductById = (productId: string): Product | undefined => {
  return allProducts.find((product) => product.id === productId);
};

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Extract productId from URL
  const { addToCart } = useCartStore();

  // Fetch the product details based on productId
  const product = fetchProductById(productId || "");

  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "https://via.placeholder.com/150",
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    }
  };

  // If the product is not found, display a message
  if (!product) {
    return (
      <div className="font-sans text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h1>
        <Link
          to="/"
          className="text-pink-500 hover:text-pink-600 transition duration-300"
        >
          Go back to the homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm mb-6">
            <Link to="/" className="text-gray-600 hover:text-pink-500">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="text-gray-600 hover:text-pink-500">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>

          {/* Product Details */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-2xl font-bold text-gray-800">
                  Rs {product.price}
                </p>
                {product.features && (
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {product.material && (
                  <p className="text-gray-600">
                    <span className="font-bold">Material:</span>{" "}
                    {product.material}
                  </p>
                )}
                <p className="text-gray-600">
                  <span className="font-bold">Rating:</span> {product.rating}/5
                </p>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductPage;
