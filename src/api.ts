import { useQuery } from "@tanstack/react-query";

interface Product {
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

interface ProductOptions {
  category?: ProductCaegory;
  limit?: number;
  sort?: "desc" | "asc";
}

type ProductCaegory = "electronics" | "jewelery" | "men's clothing" | "women's clothing";

const baseUrl = "https://fakestoreapi.com";

function useProducts(options: ProductOptions = {}) {
  return useQuery<Product[]>(["products", options], async () => {
    const { category, limit, sort } = options;
    const url = new URL(category ? `/products/category/${category}` : "/products", baseUrl);
    
    if (limit) {
      url.searchParams.set("limit", limit.toString());
    }

    if (sort) {
      url.searchParams.set("sort", sort);
    }

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

export { useProducts, useProduct };
export type { Product, ProductCaegory };
