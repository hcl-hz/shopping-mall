"use client";

import { useState } from "react";
import { Radio } from "app/components/ui/Radio";

type PaymentType = "card" | "virtualAccount" | "transfer";

interface PaymentOption {
  value: PaymentType;
  label: string;
  description: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    value: "card",
    label: "신용/체크카드",
    description: "모든 카드 결제가 가능합니다",
  },
  {
    value: "virtualAccount",
    label: "가상계좌",
    description: "무통장입금 결제가 가능합니다",
  },
  {
    value: "transfer",
    label: "실시간 계좌이체",
    description: "실시간 계좌이체가 가능합니다",
  },
];

export function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentType>("card");

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">결제 수단</h2>
      <div className="space-y-4">
        {PAYMENT_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-start p-4 border rounded-lg cursor-pointer hover:border-blue-500"
          >
            <Radio
              name="paymentMethod"
              value={option.value}
              checked={selectedMethod === option.value}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentType)}
            />
            <div className="ml-3">
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
