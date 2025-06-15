"use client";

import { useState, useEffect } from "react";

const BANNERS = [
  {
    id: 1,
    title: "신상품 할인",
    description: "최대 30% 할인",
  },
  {
    id: 2,
    title: "여름 세일",
    description: "시원한 여름 상품",
  },
];

export function MainBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-purple-300 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          {BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={`transition-opacity duration-500 ${
                index === currentBanner ? "opacity-100" : "opacity-0 absolute"
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">{banner.title}</h1>
              <p className="text-xl">{banner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
