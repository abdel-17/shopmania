import { useQuery } from "@tanstack/react-query";

// Data is fetched from the Fake Store API. They're pretty cool
// for making it available for free. Check them out!
const baseUrl = "https://fakestoreapi.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export function useProducts() {
  return useQuery<Product[], Error>(["products"], async ({ signal }) => {
    try {
      const url = new URL("/products", baseUrl);
      const response = await fetch(url, { signal });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to load store products");
    }
  });
}

export function useProduct(id: number) {
  return useQuery<Product, Error>(["product", id], async ({ signal }) => {
    try {
      const url = new URL(`/products/${id}`, baseUrl);
      const response = await fetch(url, { signal });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to load product data");
    }
  });
}
