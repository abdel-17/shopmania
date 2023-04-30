import { useQuery } from "@tanstack/react-query";

const productCategories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
] as const;

type ProductCategory = (typeof productCategories)[number];

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const baseUrl = "https://fakestoreapi.com";

function useProducts(category?: ProductCategory) {
  return useQuery<Product[]>(["products", category], async () => {
    const url = new URL(
      category ? `/products/category/${category}` : "/products",
      baseUrl
    );
    const response = await fetch(url);
    return await response.json();
  });
}

function useProduct(id: number) {
  return useQuery<Product>(["products", id], async () => {
    const url = new URL(`/products/${id}`, baseUrl);
    const response = await fetch(url);
    return await response.json();
  });
}

export { useProducts, useProduct, productCategories };
export type { Product, ProductCategory };
