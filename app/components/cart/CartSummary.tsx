"use client";

import { useCart } from "app/lib/contexts/cart-context";
import { Button } from "app/components/ui/Button";
import { useRouter } from "next/navigation";

export function CartSummary() {
  const { state } = useCart();
  const router = useRouter();

  // 선택된 상품만 필터링하여 총액 계산
  const totalPrice = state.items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // 선택된 상품이 있는지 확인
  const hasSelectedItems = state.items.some((item) => item.selected);

  return (
    <div className="bg-pink-300 border-2 border-blue-200 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">주문 요약</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>선택된 상품 금액</span>
          <span>₩{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>무료</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>총 결제금액</span>
          <span>₩{totalPrice.toLocaleString()}</span>
        </div>
      </div>
      <Button
        onClick={() => router.push("/checkout")}
        className="w-full bg-red-500 hover:bg-red-600 text-white"
        disabled={!hasSelectedItems}
      >
        {hasSelectedItems ? "주문하기" : "상품을 선택해주세요"}
      </Button>
    </div>
  );
}
