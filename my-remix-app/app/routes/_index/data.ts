import { supabase, type Tables } from "~/supabase";

export const PARAMS = {
	category: "category",
} as const;

export const categories = [
	"Men's Clothing",
	"Women's Clothing",
	"Jewelery",
	"Electronics",
] as const;

export type ProductCategory = (typeof categories)[number];

export type Product = Tables<"products">;

const productsCache = new Map<string, Product[]>();

export function getProducts(searchParams: URLSearchParams) {
	const category = searchParams.get(PARAMS.category);

	const cacheKey = category ?? "all";
	const cached = productsCache.get(cacheKey);
	if (cached !== undefined) {
		return cached;
	}

	return fetchProducts(cacheKey, category);
}

async function fetchProducts(cacheKey: string, category: string | null) {
	let query = supabase.from("products").select("*");

	if (category !== null && categories.includes(category as ProductCategory)) {
		query = query.eq("category", category);
	}

	const { data, error } = await query;
	if (error !== null) {
		throw error;
	}

	productsCache.set(cacheKey, data);
	return data;
}
