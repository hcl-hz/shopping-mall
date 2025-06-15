"use client";

import { Product } from "app/types/product";
import { useState } from "react";
import { Button } from "app/components/ui/Button";
import { useCart } from "app/lib/contexts/cart-context";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const handleQuantityChange = (direction: "decrease" | "increase") => {
    if (direction === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (direction === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        quantity,
        selected: true,
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-white mb-4">{product.description}</p>
      <div className="text-2xl font-bold mb-6">
        ₩{product.price.toLocaleString()}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium">수량:</label>
        <div className="flex items-center bg-pink-200 rounded-md">
          <button
            onClick={() => handleQuantityChange("decrease")}
            className="px-2 py-1 hover:bg-pink-300 rounded-l-md"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button
            onClick={() => handleQuantityChange("increase")}
            className="px-2 py-1 hover:bg-pink-300 rounded-r-md"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
      >
        <ShoppingCartIcon className="w-6 h-6" />
      </Button>
    </div>
  );
}
