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

export function useProduct(id: number | string) {
  const notFound = "Product not found";
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: async ({ signal }) => {
      let response;
      try {
        const url = new URL(`/products/${id}`, baseUrl);
        response = await fetch(url, { signal });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to load product data");
      }

      // Something weird about the Fake Store API. It returns an
      // empty response with status 200 if the product id is
      // incorrect, so `response.ok` would return `true` even if
      // it failed. To work around this, we check if `response.json()`
      // fails to make sure the product id is correct.
      try {
        return await response.json();
      } catch (error) {
        console.error(error);
        throw new Error(notFound);
      }
    },
    retry: (failureCount, error) =>
      // Retry upto 3 times only if fetching failed.
      error.message !== notFound && failureCount <= 3,
  });
}
