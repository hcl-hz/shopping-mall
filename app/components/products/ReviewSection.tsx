"use client";

import { useQuery } from "@tanstack/react-query";
import { Review } from "app/types/review";

interface ReviewSectionProps {
  productId: string;
}

async function getReviews(productId: string): Promise<Review[]> {
  const response = await fetch(`/api/products/${productId}/reviews`);
  return response.json();
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviews(productId),
  });

  const averageRating =
    reviews?.reduce((acc, review) => acc + review.rating, 0) ??
    0 / (reviews?.length || 1);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">상품 리뷰</h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-5 h-5 ${
                  star <= averageRating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500">({reviews?.length || 0})</span>
        </div>
      </div>

      {isLoading ? (
        <div>리뷰를 불러오는 중...</div>
      ) : (
        <div className="space-y-4">
          {reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="font-medium">{review.userName}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-4 h-4 ${
                  star <= review.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-600">{review.content}</p>
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
