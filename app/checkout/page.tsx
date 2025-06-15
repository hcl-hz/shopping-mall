"use client";

import { useCart } from "app/lib/contexts/cart-context";
import { useRouter } from "next/navigation";
import { ShippingForm } from "app/components/checkout/ShippingForm";
import { PaymentMethod } from "app/components/checkout/PaymentMethod";
import { OrderSummary } from "app/components/checkout/OrderSummary";

export default function CheckoutPage() {
  const { state } = useCart();
  const router = useRouter();

  // 선택된 상품만 필터링
  const selectedItems = state.items.filter((item) => item.selected);

  // 선택된 상품이 없으면 장바구니로 리다이렉트
  if (selectedItems.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">주문/결제</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ShippingForm />
          <PaymentMethod />
        </div>
        <div>
          <OrderSummary items={selectedItems} />
        </div>
      </div>
    </div>
  );
}
