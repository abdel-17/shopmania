import { productsCache } from "~/helpers/cache/products";
import { supabase } from "~/supabase";

export const categories = [
	"Men's Clothing",
	"Women's Clothing",
	"Jewelery",
	"Electronics",
] as const;

export type Category = (typeof categories)[number];

export async function getProducts(category: string | null) {
	const products = await getAllProducts();
	if (category === null) {
		return products;
	}
	return products.filter((product) => product.category === category);
}

async function getAllProducts() {
	const cached = await productsCache.getAll();
	if (cached.length > 0) {
		return cached;
	}

	const { data: products, error } = await supabase.from("products").select("*");
	if (error !== null) {
		throw error;
	}

	await productsCache.addAll(products);
	return products;
}
