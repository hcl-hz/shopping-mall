"use client";

import Image from "next/image";
import { useCart } from "app/lib/contexts/cart-context";
import { CartItem as CartItemType } from "@/types/cart";
import { TrashIcon } from "@heroicons/react/24/outline";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  const handleToggleSelect = () => {
    dispatch({
      type: "TOGGLE_ITEM_SELECTION",
      payload: item.product.id,
    });
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item.product.id,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { ...item, quantity: newQuantity },
    });
  };

  return (
    <div className="flex gap-4 p-4 mb-4 bg-pink-300 border-2 border-blue-200 rounded-lg">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={item.selected}
          onChange={handleToggleSelect}
          className="w-4 h-4 rounded border-gray-300 text-blue-600"
        />
      </div>
      <div className="relative w-24 h-24">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.product.name}</h3>
          <button
            onClick={handleRemove}
            className="text-gray-500 hover:text-red-500"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-white">{item.product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-2 py-1 bg-pink-200 rounded-md disabled:opacity-50"
              disabled={item.quantity < 0}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-2 py-1 bg-pink-200 rounded-md"
            >
              +
            </button>
          </div>
          <div className="flex flex-col items-end gap-1">
            {item.quantity >= 2 && (
              <span className="text-sm text-white">
                ₩{item.product.price.toLocaleString()}
              </span>
            )}
            <div className="font-bold">
              ₩{(item.product.price * item.quantity).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
