"use client";

import { useCart } from "app/lib/contexts/cart-context";
import { CartItem } from "app/components/cart/CartItem";
import { CartSummary } from "app/components/cart/CartSummary";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function CartPage() {
  const { state, dispatch } = useCart();

  // 전체 선택 상태 계산
  const totalItems = state.items.length;
  const selectedItems = state.items.filter((item) => item.selected).length;
  const allSelected = totalItems > 0 && selectedItems === totalItems;
  const someSelected = selectedItems > 0 && selectedItems < totalItems;

  const handleToggleAll = (checked: boolean) => {
    dispatch({
      type: "TOGGLE_ALL_SELECTION",
      payload: checked,
    });
  };

  const handleDeleteSelected = () => {
    state.items.forEach((item) => {
      if (item.selected) {
        dispatch({
          type: "REMOVE_ITEM",
          payload: item.product.id,
        });
      }
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-pink-300">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8">장바구니</h1>
          <div className="text-center py-16">
            <p className="text-gray-500">장바구니가 비어있습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">장바구니</h1>
        <div className="mb-4 flex items-center gap-8">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(inputRef) => {
                if (inputRef) {
                  inputRef.indeterminate = someSelected;
                }
              }}
              onChange={(e) => handleToggleAll(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <span>
              전체 선택 ({selectedItems}/{totalItems})
            </span>
          </label>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedItems === 0}
            className="flex items-center gap-1 text-black hover:text-black disabled:opacity-50"
          >
            <TrashIcon className="w-4 h-4" />
            <span>선택 삭제 ({selectedItems}개)</span>
          </button>
        </div>
        <div className="space-y-4">
          {state.items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
        <div className="mt-8">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
