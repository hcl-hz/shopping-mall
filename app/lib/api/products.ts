import axios from "axios";
import { Product } from "app/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const params = new URLSearchParams();
  
  if (filters?.category) params.append("category", filters.category);
  if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
  if (filters?.sort) params.append("sort", filters.sort);

  const response = await axios.get(`${API_URL}/products?${params.toString()}`);
  return response.data;
}

export async function getProduct(id: string): Promise<Product> {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
} 