// pages/index.tsx
import { NextPage } from "next";
import Filter from "@/components/custom/checkbox/Filter";

const products = [
  { id: 1, name: "Product 1", category: "Category 1" },
  { id: 2, name: "Product 2", category: "Category 2" },
  { id: 3, name: "Product 3", category: "Category 1" },
  { id: 4, name: "Product 4", category: "Category 3" },
];

const Home: NextPage = () => {
  return (
    <div className="min-h-screen p-8">
      <Filter products={products} />
    </div>
  );
};

export default Home;
