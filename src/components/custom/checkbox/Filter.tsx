"use client";

// components/Filter.tsx
import { FC, useState } from "react";
import Checkbox from "./Checkbox";
import ProductList from "./ProductList";

interface Product {
  id: number;
  name: string;
  category: string;
}

interface FilterProps {
  products: Product[];
}

const Filter: FC<FilterProps> = ({ products }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const allSelected = selectedCategories.length === categories.length;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleAll = () => {
    setSelectedCategories(allSelected ? [] : categories);
  };

  const filteredProducts = selectedCategories.length
    ? products.filter((p) => selectedCategories.includes(p.category))
    : products;

  return (
    <div className="space-y-4">
      <Checkbox label="Select All" checked={allSelected} onChange={toggleAll} />
      {categories.map((category) => (
        <Checkbox
          key={category}
          label={category}
          checked={selectedCategories.includes(category)}
          onChange={() => toggleCategory(category)}
        />
      ))}
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Filter;
