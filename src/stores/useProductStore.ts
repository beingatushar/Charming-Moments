import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { ApiError, Product, ProductSortOption } from '../types';

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiError>;
    return err.response?.data?.message || err.message;
  }
  return 'An unknown error occurred';
};

interface ProductStore {
  error: string | null;
  setError: (error: string | null) => void;

  fetchAllProducts: (options?: {
    categories?: string[];
    sortBy?: ProductSortOption;
  }) => Promise<Product[]>;

  getAllCategories: () => Promise<string[]>;
  getProductById: (id: string) => Promise<Product>;
  createProduct: (productData: Partial<Product>) => Promise<Product>;
  updateProduct: (id: string, updateData: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  cleanProducts: () => Promise<{ updatedCount: number; totalProducts: number }>;
  uploadImage: (imageFile: File) => Promise<string>;
}

export const useProductStore = create<ProductStore>((set) => {
  const setError = (error: string | null) => set({ error });

  return {
    loading: false,
    error: null,
    setError,

    fetchAllProducts: async (options) => {
      setError(null);
      try {
        const params = new URLSearchParams();
        if (options?.categories) {
          params.append('category', JSON.stringify(options.categories));
        }
        if (options?.sortBy) {
          params.append('sortBy', options.sortBy);
        }

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/products?${params.toString()}`;
        const { data } = await axios.get<Product[]>(url);
        return data;
      } catch (error: unknown) {
        const message = handleApiError(error);
        setError(message);
        throw new Error(message);
      } finally {
      }
    },

    getAllCategories: async () => {
      setError(null);
      try {
        const { data } = await axios.get<string[]>(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/category`
        );
        return data;
      } catch (error: unknown) {
        const message = handleApiError(error);
        setError(message);
        throw new Error(message);
      } finally {
      }
    },

    getProductById: async (id) => {
      setError(null);
      try {
        const { data } = await axios.get<Product>(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
        return data;
      } catch (error: unknown) {
        const message = handleApiError(error);
        setError(message);
        throw new Error(message);
      } finally {
      }
    },

    createProduct: async (productData) => {
      setError(null);
      try {
        const { data } = await axios.post<Product>(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`,
          productData
        );
        return data;
      } catch (error: unknown) {
        const message = handleApiError(error);
        setError(message);
        throw new Error(message);
      } finally {
      }
    },

    updateProduct: async (id, updateData) => {
      setError(null);
      try {
        const { data } = await axios.put<Product>(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
          updateData
        );
        return data;
      } catch (error: unknown) {
        const message = handleApiError(error);
        setError(message);
        throw new Error(message);
      } finally {
      }
    },

    deleteProduct: async (id) => {
      setError(null);
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
      } catch (error: unknown) {
        const message = handleApiError(error);
        setError(message);
        throw new Error(message);
      } finally {
      }
    },

    cleanProducts: async () => {
      setError(null);
      try {
        const { data } = await axios.post<{
          updatedCount: number;
          totalProducts: number;
        }>(`${import.meta.env.VITE_BACKEND_URL}/api/products/clean`);
        return data;
      } catch (error: unknown) {
        const message = handleApiError(error);
        setError(message);
        throw new Error(message);
      } finally {
      }
    },

    uploadImage: async (imageFile) => {
      setError(null);
      const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const CLOUDINARY_API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;
      const CHUNK_SIZE = 5 * 1024 * 1024;

      const uniqueUploadId = `uqid-${Date.now()}`;
      const totalChunks = Math.ceil(imageFile.size / CHUNK_SIZE);

      const uploadChunk = async (start: number, end: number): Promise<any> => {
        const formData = new FormData();
        formData.append('file', imageFile.slice(start, end));
        formData.append('cloud_name', CLOUD_NAME);
        formData.append('upload_preset', UPLOAD_PRESET);
        const contentRange = `bytes ${start}-${end - 1}/${imageFile.size}`;

        try {
          const response = await axios.post(
            `${CLOUDINARY_API_URL}/${CLOUD_NAME}/auto/upload`,
            formData,
            {
              headers: {
                'X-Unique-Upload-Id': uniqueUploadId,
                'Content-Range': contentRange,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          return response.data;
        } catch (error: unknown) {
          throw new Error(handleApiError(error));
        }
      };

      try {
        let currentChunk = 0;
        let uploadResult: any;

        for (let i = 0; i < totalChunks; i++) {
          const start = currentChunk * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, imageFile.size);
          uploadResult = await uploadChunk(start, end);
          currentChunk++;
        }

        return uploadResult.secure_url;
      } catch (error: unknown) {
        const message = handleApiError(error);
        setError(message);
        throw new Error(message);
      } finally {
      }
    },
  };
});
