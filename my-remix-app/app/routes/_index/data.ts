import { KeyedCache } from "~/helpers/cache";
import { supabase, type Tables } from "~/supabase";

export const categories = [
	"Men's Clothing",
	"Women's Clothing",
	"Jewelery",
	"Electronics",
] as const;

export type ProductCategory = (typeof categories)[number];

export type Product = Tables<"products">;

export async function getProducts(category: string | null): Promise<Product[]> {
	const cache = new KeyedCache<Product[]>(`products-${category ?? "all"}`);
	const cachedProducts = await cache.get();
	if (cachedProducts !== undefined) {
		return cachedProducts;
	}

	const products = await fetchProducts(category);
	await cache.set(products);
	return products;
}

async function fetchProducts(category: string | null): Promise<Product[]> {
	let query = supabase.from("products").select("*");

	if (category !== null && categories.includes(category as ProductCategory)) {
		query = query.eq("category", category);
	}

	const { data, error } = await query;
	if (error !== null) {
		throw error;
	}
	return data;
}
