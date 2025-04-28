import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useProductStore from "../store/productStore"; // Import the product store
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Product } from "../types"; // Import the Product type
import Spinner from "../components/Spinner";
import { FaCross, FaSearchMinus, FaSearchPlus } from "react-icons/fa";

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
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1); // Zoom scale
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Image position
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setDragging(true);
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragging && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y,
      });
    } else if (e.touches.length === 2) {
      // Pinch zoom
      const distance = getDistance(e.touches[0], e.touches[1]);
      if (containerRef.current) {
        const scaleFactor = distance / 200; // Adjust sensitivity
        setScale(Math.min(Math.max(scaleFactor, 1), 5)); // Limit zoom between 1 and 5
      }
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 5)); // Max zoom 5x
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 1)); // Min zoom 1x
    if (scale <= 1.2) setPosition({ x: 0, y: 0 }); // Reset position if zoomed out fully
  };

  return (
    <>
      {/* Product Image */}
      <div className="relative flex justify-center items-center">
        <img
          src={image}
          alt={name}
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* Maximize Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-pink-500 hover:text-white transition"
        >
          <FaSearchPlus />
        </button>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden"
            style={{ width: "80vw", height: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={containerRef}
              className="w-full h-full overflow-hidden touch-none relative"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={image}
                alt={name}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: "center center",
                  transition: dragging ? "none" : "transform 0.3s ease",
                }}
                className="w-full h-full object-contain select-none cursor-grab"
                draggable={false}
              />
            </div>

            {/* Zoom Buttons */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
                className="bg-pink-500 text-white p-2 rounded-full shadow-md hover:bg-pink-600 transition"
              >
                <FaSearchPlus />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
                className="bg-pink-500 text-white p-2 rounded-full shadow-md hover:bg-pink-600 transition"
              >
                <FaSearchMinus />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-pink-500 hover:text-white transition"
            >
              <FaSearchMinus />
            </button>
          </div>
        </div>
      )}
    </>
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
  return (
    <div className="font-sans">
      {/* Header */}
      <Header />

      {loading ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : !product ? (
        <ProductNotFound />
      ) : (
        <main className="flex-1 pt-20">
          {/* Add padding-top to account for the header height */}
          <div className="container mx-auto px-6">
            {/* Breadcrumb Navigation */}
            <Breadcrumb productName={product.name} />

            {/* Product Details */}
            <ProductDetails product={product} onAddToCart={handleAddToCart} />
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
