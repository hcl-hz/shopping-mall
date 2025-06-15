interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="bg-white rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">상품 상세 설명</h2>
      <p className="text-gray-600 whitespace-pre-line">{description}</p>
    </div>
  );
}
