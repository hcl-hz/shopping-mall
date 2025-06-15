import Link from "next/link";

const CATEGORIES = [
  { id: "top", name: "상의", icon: "📱" },
  { id: "pants", name: "하의", icon: "👕" },
  { id: "shoes", name: "신발", icon: "📚" },
  { id: "accessory", name: "잡화", icon: "🍎" },
];

export function Categories() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-end gap-4 py-8">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="flex flex-col items-center p-4 hover:text-red-500 transition-colors"
          >
            <span className="text-4xl mb-2">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
