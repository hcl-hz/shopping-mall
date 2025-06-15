import { CartItem } from "@/types/cart";
import { Button } from "app/components/ui/Button";

interface OrderSummaryProps {
  items: CartItem[];
}

export function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">주문 내역</h2>
      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>
              {(item.product.price * item.quantity).toLocaleString()}원
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <span>상품 금액</span>
          <span>{subtotal.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>{shippingFee.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-4">
          <span>총 결제금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>
      </div>
      <Button className="w-full mt-6">결제하기</Button>
    </div>
  );
}
