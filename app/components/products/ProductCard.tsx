"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "app/types/product";
import { Button } from "app/components/ui/Button";
import { useCart } from "app/lib/contexts/cart-context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        quantity: 1,
        selected: true,
      },
    });
  };

  return (
    <div className="group rounded-lg border-2 border-blue-100 p-3 hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square mb-3 overflow-hidden rounded-md">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <h3 className="font-medium text-base mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="text-base font-bold">
          ₩{product.price.toLocaleString()}
        </div>
      </Link>
      <div className="mt-3 flex justify-end">
        <Button
          onClick={handleAddToCart}
          className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
        >
          <ShoppingCartIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
