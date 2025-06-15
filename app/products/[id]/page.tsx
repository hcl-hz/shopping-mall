"use client";

import { ProductImage } from "app/components/products/ProductImage";
import { ProductInfo } from "app/components/products/ProductInfo";
import { DUMMY_PRODUCTS } from "app/components/products/ProductList";
import { ReviewForm } from "app/components/products/ReviewForm";
import { InquiryForm } from "app/components/products/InquiryForm";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = DUMMY_PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-pink-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ProductImage images={product.images} />
          <ProductInfo product={product} />
        </div>
        <div className="mt-8 space-y-8">
          <div className="bg-pink-300 border-2 border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">상품 상세 설명</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {product.description}
            </p>
          </div>
          <div className="bg-pink-300 border-2 border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">상품 리뷰</h2>
            <ReviewForm
              productId={resolvedParams.id}
              onSubmit={(review) => {
                // 리뷰 제출 처리
                console.log(review);
              }}
            />
          </div>
          <div className="bg-pink-300 border-2 border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">상품 문의</h2>
            <InquiryForm
              productId={resolvedParams.id}
              onSubmit={(inquiry) => {
                // 문의 제출 처리
                console.log(inquiry);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
