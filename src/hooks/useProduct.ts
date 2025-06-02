import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiError, Product } from '../types';

// Helper function for error handling
const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ApiError>;
        return err.response?.data?.message || err.message;
    }
    return 'An unknown error occurred';
};

export const useProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllProducts = useCallback(async (): Promise<Product[]> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Product[]>(
                `${import.meta.env.VITE_BACKEND_URL}/api/products`
            );
            setLoading(false);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    }, []);

    const findById = useCallback(async (id: string): Promise<Product> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Product>(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
            );
            setLoading(false);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    }, []);

    const createProduct = useCallback(async (newProduct: Partial<Product>): Promise<Product> => {
        setLoading(true);
        setError(null);
        try {
            const productToCreate = newProduct.id
                ? newProduct
                : { ...newProduct, id: 'temp-here' };
            const response = await axios.post<Product>(
                `${import.meta.env.VITE_BACKEND_URL}/api/products`,
                productToCreate
            );
            setLoading(false);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    }, []);

    const updateProduct = useCallback(async (
        id: string,
        updatedProduct: Partial<Product>
    ): Promise<Product> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put<Product>(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
                updatedProduct
            );
            setLoading(false);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    }, []);

    const deleteProduct = useCallback(async (id: string): Promise<string> => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
            );
            setLoading(false);
            return `Product ${id} deleted successfully`;
        } catch (error: unknown) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    }, []);

    const uploadImage = useCallback(async (imageFile: File): Promise<string> => {
        setLoading(true);
        setError(null);
        const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        const CLOUDINARY_API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;
        const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

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

            setLoading(false);
            return uploadResult.secure_url;
        } catch (error: unknown) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);
            setLoading(false);
            throw new Error(errorMessage);
        }
    }, []);

    return {
        loading,
        error,
        fetchAllProducts,
        findById,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
    };
};