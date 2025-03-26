import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useProductStore from "../store/productStore"; // Import the product store
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Product } from "../types"; // Import the Product type

// ProductNotFound Component
const ProductNotFound: React.FC = () => {
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
};

// Breadcrumb Component
const Breadcrumb: React.FC<{ productName: string }> = ({ productName }) => {
  return (
    <nav className="text-sm mb-6">
      <Link to="/" className="text-gray-600 hover:text-pink-500">
        Home
      </Link>
      <span className="mx-2">/</span>
      <Link to="/shop" className="text-gray-600 hover:text-pink-500">
        Shop
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-800">{productName}</span>
    </nav>
  );
};

// ProductImage Component
const ProductImage: React.FC<{ image: string; name: string }> = ({
  image,
  name,
}) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={image}
        alt={name}
        className="w-full h-96 object-cover rounded-lg"
      />
    </div>
  );
};

// ProductInformation Component
interface ProductInformationProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-2xl font-bold text-gray-800">Rs {product.price}</p>
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
          <span className="font-bold">Material:</span> {product.material}
        </p>
      )}
      <p className="text-gray-600">
        <span className="font-bold">Rating:</span> {product.rating}/5
      </p>
      <button
        onClick={onAddToCart}
        className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

// ProductDetails Component
interface ProductDetailsProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <ProductImage image={product.image || ""} name={product.name} />
        <ProductInformation product={product} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
};

// ProductPage Component
const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Extract productId from URL
  const { addToCart } = useCartStore();
  const { findById, loading, error } = useProductStore();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  // Fetch the product details when productId changes
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;

      try {
        const fetchedProduct = await findById(productId);
        setProduct(fetchedProduct);
      } catch (err) {
        console.error("Error fetching product:", err);
        // Optionally set error state for UI feedback
      }
    };

    loadProduct();
  }, [productId, findById]);
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
    return <ProductNotFound />;
  }

  return (
    <div className="font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {" "}
        {/* Add padding-top to account for the header height */}
        <div className="container mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb productName={product.name} />

          {/* Product Details */}
          <ProductDetails product={product} onAddToCart={handleAddToCart} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductPage;
