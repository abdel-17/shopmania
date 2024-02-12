import { getCachedProducts } from "~/helpers/cache/products";
import { supabase } from "~/supabase";
import type { Product } from "~/types";

export async function getProduct(id: number): Promise<Product | null> {
	if (Number.isNaN(id)) {
		return null;
	}

	const cachedProducts = await getCachedProducts();
	if (cachedProducts !== undefined) {
		return cachedProducts.find((product) => product.id === id) ?? null;
	}

	const { data, error } = await supabase
		.from("products")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error !== null) {
		throw error;
	}

	return data;
}
