// components/ProductList.tsx
import { FC } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="space-y-2">
      {products.map((product) => (
        <li key={product.id} className="p-2 border border-gray-300 rounded">
          {product.name} - {product.category}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
