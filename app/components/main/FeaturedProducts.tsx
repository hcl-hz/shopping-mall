"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "app/lib/api/products";
import { ProductCard } from "app/components/products/ProductCard";

export function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => getProducts({ sort: "popular" }),
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products?.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
