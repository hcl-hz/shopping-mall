"use client";

import { useState } from "react";
import { Input } from "app/components/ui/Input";
import { loadPostcode } from "app/lib/utils/loadPostcode";
import type { PostcodeData } from "app/types/postcode";

interface ShippingFormData {
  name: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  memo?: string;
}

export function ShippingForm() {
  const [formData, setFormData] = useState<ShippingFormData>({
    name: "",
    phone: "",
    zipCode: "",
    address: "",
    addressDetail: "",
    memo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchAddress = async () => {
    const Postcode = await loadPostcode();
    new Postcode({
      oncomplete: (data: PostcodeData) => {
        setFormData((prev) => ({
          ...prev,
          zipCode: data.zonecode,
          address: data.address,
          addressDetail: "",
        }));
      },
      width: 500,
      height: 500,
    }).open();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">배송 정보</h2>
      <div className="space-y-4">
        <Input
          label="받는 사람"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="연락처"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
          required
        />
        <div className="flex gap-2">
          <Input
            label="우편번호"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            readOnly
          />
          <button
            type="button"
            onClick={handleSearchAddress}
            className="self-end px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            주소 찾기
          </button>
        </div>
        <Input
          label="주소"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          readOnly
        />
        <Input
          label="상세주소"
          name="addressDetail"
          value={formData.addressDetail}
          onChange={handleChange}
          placeholder="상세 주소를 입력해주세요"
        />
        <Input
          label="배송 메모"
          name="memo"
          value={formData.memo}
          onChange={handleChange}
          placeholder="배송시 요청사항을 입력해주세요"
        />
      </div>
    </div>
  );
}
