import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { Product } from "../types";
import useProductStore from "../store/productStore";

// ProductForm Component
interface ProductFormProps {
  newProduct: Partial<Product>;
  isEditing: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}
const ProductForm: React.FC<ProductFormProps> = ({
  newProduct,
  isEditing,
  onInputChange,
  onImageUpload,
  onSubmit,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category Input */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              placeholder="Category"
              name="category"
              value={newProduct.category}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Product Name Input */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Price Input */}
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Stock Input */}
          <div className="flex flex-col">
            <label
              htmlFor="stock"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              placeholder="Stock"
              name="stock"
              value={newProduct.stock}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Image URL Input */}
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Image Upload Input */}
          <div className="flex flex-col">
            <label
              htmlFor="image-upload"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={onImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Image Preview */}
          {newProduct.image && (
            <div className="col-span-full">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Image Preview
              </label>
              <img
                src={newProduct.image}
                alt="Product Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
            >
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
// ProductTable Component
interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
              >
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">Rs {product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const {
    fetchAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    loading: apiLoading,
    error: apiError,
  } = useProductStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      setLocalLoading(true);
      setLocalError(null);
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setLocalError("Failed to fetch products. Please try again later.");
        console.error("Failed to fetch products:", err);
      } finally {
        setLocalLoading(false);
      }
    };
    loadProducts();
  }, [fetchAllProducts]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProduct = (): boolean => {
    if (!newProduct.name?.trim()) {
      setLocalError("Product name is required");
      return false;
    }
    if (!newProduct.category?.trim()) {
      setLocalError("Category is required");
      return false;
    }
    if (!newProduct.price || newProduct.price <= 0) {
      setLocalError("Price must be greater than 0");
      return false;
    }
    if (newProduct.stock === undefined || newProduct.stock < 0) {
      setLocalError("Stock must be 0 or greater");
      return false;
    }
    return true;
  };

  const handleAddOrUpdateProduct = async () => {
    if (!validateProduct()) return;

    setLocalLoading(true);
    setLocalError(null);

    try {
      if (isEditing && editingProductId) {
        const updatedProduct = await updateProduct(
          editingProductId,
          newProduct,
        );
        setProducts(
          products.map((p) => (p.id === editingProductId ? updatedProduct : p)),
        );
      } else {
        // Generate a temporary ID for new products
        const productWithId = {
          ...newProduct,
          id: `temp-${Date.now()}`, // Temporary ID for frontend use
        };
        const createdProduct = await createProduct(productWithId);
        setProducts([...products, createdProduct]);
      }

      resetForm();
    } catch (err) {
      setLocalError(
        err instanceof Error
          ? err.message
          : "Failed to save product. Please try again.",
      );
      console.error("Error saving product:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setLocalLoading(true);
    setLocalError(null);

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      setLocalError("Failed to delete product. Please try again.");
      console.error("Error deleting product:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditingProductId(product.id);
  };

  const resetForm = () => {
    setNewProduct({
      category: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
    });
    setIsEditing(false);
    setEditingProductId(null);
  };

  const isLoading = apiLoading || localLoading;
  const error = apiError || localError;

  return (
    <>
      <Header />
      <HeroSection title="Admin Panel" backgroundImage="" />
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        <main className="container px-4 sm:px-6 lg:px-8 py-12 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <ProductForm
            newProduct={newProduct}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onImageUpload={handleImageUpload}
            onSubmit={handleAddOrUpdateProduct}
          />

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <ProductTable
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdminPage;
