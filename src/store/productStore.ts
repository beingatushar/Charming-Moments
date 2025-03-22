import { create } from "zustand";
import { Product } from "../types"; // Define your Product type

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
  fetchProducts: () => Promise<void>;
  findById: (id: string) => Product | undefined;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (
    id: string,
    updatedProduct: Partial<Product>,
  ) => Promise<void>;
  createProduct: (newProduct: Partial<Product>) => Promise<void>;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  hasFetched: false,

  // Function to fetch products from the API
  fetchProducts: async () => {
    const { hasFetched } = get();
    if (hasFetched) return;

    set({ loading: true, error: null });

    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      set({ products: data, loading: false, hasFetched: true });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Function to find a product by ID
  findById: (id: string) => {
    const { products } = get();
    return products.find((product) => product.id === id);
  },

  // Function to create a new product
  createProduct: async (newProduct: Partial<Product>) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const createdProduct = await response.json();
      set((state) => ({
        products: [...state.products, createdProduct],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Function to update a product
  updateProduct: async (id: string, updatedProduct: Partial<Product>) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedData = await response.json();
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? updatedData : product,
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Function to delete a product
  deleteProduct: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
