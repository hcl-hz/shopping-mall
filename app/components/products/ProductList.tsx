"use client";

import { Product } from "app/types/product";
import { ProductCard } from "./ProductCard";

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "베이직 티셔츠",
    price: 29000,
    description: "편안한 착용감의 베이직 티셔츠",
    images: ["/products/1.webp"],
    category: "clothing",
  },
  {
    id: "2",
    name: "데님 청바지",
    price: 59000,
    description: "클래식한 스트레이트 핏 청바지",
    images: ["/products/2.webp"],
    category: "clothing",
  },
  {
    id: "3",
    name: "가죽 스니커즈",
    price: 89000,
    description: "편안한 착용감의 가죽 스니커즈",
    images: ["/products/3.webp"],
    category: "shoes",
  },
  {
    id: "4",
    name: "캔버스 백팩",
    price: 49000,
    description: "실용적인 디자인의 캔버스 백팩",
    images: ["/products/4.webp"],
    category: "accessories",
  },
  {
    id: "5",
    name: "후드 집업",
    price: 69000,
    description: "따뜻한 착용감의 후드 집업",
    images: ["/products/5.webp"],
    category: "clothing",
  },
  {
    id: "6",
    name: "니트 스웨터",
    price: 79000,
    description: "부드러운 터치감의 니트 스웨터",
    images: ["/products/6.webp"],
    category: "clothing",
  },
  {
    id: "7",
    name: "슬링백",
    price: 129000,
    description: "세련된 디자인의 여성 슬링백",
    images: ["/products/7.webp"],
    category: "accessories",
  },
  {
    id: "8",
    name: "레더 벨트",
    price: 39000,
    description: "고급스러운 가죽 벨트",
    images: ["/products/8.webp"],
    category: "accessories",
  },
];

export function ProductList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {DUMMY_PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
