// src/pages/AdminPage.tsx

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { Product } from "../types";
import useProductStore from "../store/productStore";
import { toast } from "react-hot-toast";

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
  const { loading } = useProductStore();

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
          {/* Category */}
          <InputField
            label="Category"
            id="category"
            name="category"
            value={newProduct.category}
            onChange={onInputChange}
          />

          {/* Name */}
          <InputField
            label="Product Name"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={onInputChange}
          />

          {/* Price */}
          <InputField
            label="Price"
            id="price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={onInputChange}
          />

          {/* Stock */}
          <InputField
            label="Stock"
            id="stock"
            name="stock"
            type="number"
            value={newProduct.stock}
            onChange={onInputChange}
          />

          {/* Description */}
          <InputField
            label="Description"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={onInputChange}
          />

          {/* Image URL */}
          <InputField
            label="Image URL"
            id="image"
            name="image"
            value={newProduct.image}
            onChange={onInputChange}
          />

          {/* Image Upload */}
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
              disabled={loading}
              className={`w-full ${loading ? "bg-pink-300" : "bg-pink-500"} text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300`}
            >
              {loading
                ? "Saving..."
                : isEditing
                  ? "Update Product"
                  : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Reusable Input Field
interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value?: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}
const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </div>
);

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
    uploadImage,
  } = useProductStore();

  const initialProduct = () => ({
    category: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] =
    useState<Partial<Product>>(initialProduct());
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const loadingToast = toast.loading("Loading products...");
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
        toast.success("Products loaded successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch products.");
      } finally {
        toast.dismiss(loadingToast);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadingToast = toast.loading("Uploading image...");

    try {
      const imageUrl = await uploadImage(file);
      setNewProduct({ ...newProduct, image: imageUrl });
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    } finally {
      toast.dismiss(uploadingToast);
    }
  };

  const validateProduct = (): boolean => {
    if (!newProduct.name?.trim())
      return toast.error("Product name is required"), false;
    if (!newProduct.category?.trim())
      return toast.error("Category is required"), false;
    if (!newProduct.price || newProduct.price <= 0)
      return toast.error("Price must be greater than 0"), false;
    if (newProduct.stock === undefined || newProduct.stock < 0)
      return toast.error("Stock must be 0 or greater"), false;
    return true;
  };

  const handleAddOrUpdateProduct = async () => {
    if (!validateProduct()) return;

    const savingToast = toast.loading(
      isEditing ? "Updating product..." : "Adding product...",
    );

    try {
      if (isEditing && editingProductId) {
        const updatedProduct = await updateProduct(
          editingProductId,
          newProduct,
        );
        setProducts(
          products.map((p) => (p.id === editingProductId ? updatedProduct : p)),
        );
        toast.success("Product updated successfully!");
      } else {
        const productWithId = { ...newProduct, id: `temp-${Date.now()}` };
        const createdProduct = await createProduct(productWithId);
        setProducts([...products, createdProduct]);
        toast.success("Product added successfully!");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product.");
    } finally {
      toast.dismiss(savingToast);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const deletingToast = toast.loading("Deleting product...");

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    } finally {
      toast.dismiss(deletingToast);
    }
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditingProductId(product.id);
  };

  const resetForm = () => {
    setNewProduct(initialProduct());
    setIsEditing(false);
    setEditingProductId(null);
  };

  return (
    <>
      <Header />
      <HeroSection
        title="Admin Panel"
        backgroundImage="https://source.unsplash.com/featured/?technology"
      />
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>

          <ProductForm
            newProduct={newProduct}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onImageUpload={handleImageUpload}
            onSubmit={handleAddOrUpdateProduct}
          />

          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminPage;
