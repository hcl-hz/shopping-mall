"use client";

import Link from "next/link";
import { useCart } from "app/lib/contexts/cart-context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export function Header() {
  const { state } = useCart();
  const itemCount = state.items.length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Shop
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <div className="h-16"></div> {/* 헤더의 높이만큼 여백 추가 */}
    </>
  );
}
