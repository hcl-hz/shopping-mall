"use client";

import { useState } from "react";
import { Button } from "app/components/ui/Button";

interface InquiryFormProps {
  productId: string;
  onSubmit: (inquiry: {
    title: string;
    content: string;
    isPrivate: boolean;
    productId: string;
  }) => void;
}

export function InquiryForm({ productId, onSubmit }: InquiryFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("제목을 입력해주세요");
    if (!content.trim()) return alert("문의 내용을 입력해주세요");

    onSubmit({ title, content, isPrivate, productId });
    setTitle("");
    setContent("");
    setIsPrivate(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="문의 제목"
        className="w-full p-2 border rounded-md bg-pink-200 focus:outline-none focus:ring-1 focus:ring-blue-200"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="문의 내용을 작성해주세요"
        className="w-full h-32 p-2 border rounded-md bg-pink-200 focus:outline-none focus:ring-1 focus:ring-blue-200"
        required
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPrivate"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="isPrivate">비공개 문의</label>
      </div>
      <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
        문의하기
      </Button>
    </form>
  );
}
