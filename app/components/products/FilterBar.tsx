import { Select } from "app/components/ui/Select";
import { Input } from "app/components/ui/Input";

interface FilterBarProps {
  onFilterChange: (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const categories = [
    { value: "", label: "전체 카테고리" },
    { value: "electronics", label: "전자기기" },
    { value: "clothing", label: "의류" },
    { value: "books", label: "도서" },
  ];

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "price_asc", label: "가격 낮은순" },
    { value: "price_desc", label: "가격 높은순" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          label="카테고리"
          options={categories}
          onChange={(e) => onFilterChange({ category: e.target.value })}
        />
        <div className="flex gap-2">
          <Input
            label="최소 가격"
            type="number"
            placeholder="0"
            onChange={(e) =>
              onFilterChange({ minPrice: Number(e.target.value) })
            }
          />
          <Input
            label="최대 가격"
            type="number"
            placeholder="1000000"
            onChange={(e) =>
              onFilterChange({ maxPrice: Number(e.target.value) })
            }
          />
        </div>
        <Select
          label="정렬"
          options={sortOptions}
          onChange={(e) => onFilterChange({ sort: e.target.value })}
        />
      </div>
    </div>
  );
}
