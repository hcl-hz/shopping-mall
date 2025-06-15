"use client";

import Image from "next/image";

interface ProductImageProps {
  images: string[];
}

export function ProductImage({ images }: ProductImageProps) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden w-1/2 mx-auto">
      <Image
        src={images[0]}
        alt="상품 이미지"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
