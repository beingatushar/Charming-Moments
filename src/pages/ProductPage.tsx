import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../types';
import Spinner from '../components/Spinner';
import { FaSearchMinus, FaSearchPlus } from 'react-icons/fa';
import { useProductStore } from '../stores/useProductStore';
import useCartStore from '../stores/useCartStore';

// ProductNotFound Component
const ProductNotFound: React.FC = () => (
  <div className="font-sans text-center py-12">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
    <Link
      to="/"
      className="text-pink-500 hover:text-pink-600 transition duration-300"
    >
      Go back to the homepage
    </Link>
  </div>
);

// Breadcrumb Component
const Breadcrumb: React.FC<{ productName: string }> = ({ productName }) => (
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

// Image Zoom and Drag Component
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
      setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    }
  };

  const handleMouseUp = () => setDragging(false);

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
      const distance = getDistance(e.touches[0], e.touches[1]);
      if (containerRef.current) {
        const scaleFactor = distance / 200;
        setScale(Math.min(Math.max(scaleFactor, 1), 5));
      }
    }
  };

  const handleTouchEnd = () => setDragging(false);

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 5));
  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 1));
    if (scale <= 1.2) setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <div className="relative flex justify-center items-center">
        <img
          loading="lazy"
          src={image}
          alt={name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-pink-500 hover:text-white transition"
        >
          <FaSearchPlus />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden"
            style={{ width: '80vw', height: '80vh' }}
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
                loading="lazy"
                src={image}
                alt={name}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: dragging ? 'none' : 'transform 0.3s ease',
                }}
                className="w-full h-full object-contain select-none cursor-grab"
                draggable={false}
              />
            </div>

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

// Product Information Component
interface ProductInformationProps {
  product: Product;
}

const ProductInformation: React.FC<ProductInformationProps> = ({ product }) => {
  const { handleAddToCart } = useCartStore();
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
        onClick={() => handleAddToCart(product)}
        className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

// Product Details Component
interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <ProductImage image={product.image || ''} name={product.name} />
      <ProductInformation product={product} />
    </div>
  </div>
);

// ProductPage Component
const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { getProductById, loading } = useProductStore();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  // Fetch product details on load
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    loadProduct();
  }, [productId, getProductById]);

  return (
    <div className="font-sans">
      <Header />
      {loading ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : !product ? (
        <ProductNotFound />
      ) : (
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-6">
            <Breadcrumb productName={product.name} />
            <ProductDetails product={product} />
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default ProductPage;
