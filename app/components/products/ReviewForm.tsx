"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button } from "app/components/ui/Button";

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: {
    rating: number;
    content: string;
    productId: string;
  }) => void;
}

export function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("별점을 선택해주세요");
    if (!content.trim()) return alert("리뷰 내용을 입력해주세요");

    onSubmit({ rating, content, productId });
    setRating(0);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="flex items-center gap-2">
        <span className="font-medium">별점:</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1"
            >
              <StarIcon
                className={`w-6 h-6 ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="리뷰를 작성해주세요"
        className="w-full h-32 p-2 border rounded-md bg-pink-200 focus:outline-none focus:ring-1 focus:ring-blue-200"
        required
      />
      <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
        리뷰 작성
      </Button>
    </form>
  );
}
