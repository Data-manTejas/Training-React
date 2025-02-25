import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/fakeStoreApi";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const HomePage = () => {
  const [category, setCategory] = useState("all");

  const { data: products, error, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div>
      <CategoryFilter setCategory={setCategory} />
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
