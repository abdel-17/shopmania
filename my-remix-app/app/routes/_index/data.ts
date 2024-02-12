import { getCachedProducts, setCachedProducts } from "~/helpers/cache/products";
import { supabase } from "~/supabase";
import type { Product } from "~/types";

export const categories = [
	"Men's Clothing",
	"Women's Clothing",
	"Jewelery",
	"Electronics",
] as const;

export type Category = (typeof categories)[number];

export async function getProducts(category: string | null): Promise<Product[]> {
	const products = await getAllProducts();
	if (category === null || !categories.includes(category as never)) {
		return products;
	}
	return products.filter((product) => product.category === category);
}

async function getAllProducts(): Promise<Product[]> {
	const cachedProducts = await getCachedProducts();
	if (cachedProducts !== undefined) {
		return cachedProducts;
	}

	const { data, error } = await supabase.from("products").select("*");
	if (error !== null) {
		throw error;
	}

	await setCachedProducts(data);
	return data;
}
