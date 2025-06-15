import { Product } from "app/types/product";
 
export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
} 