import { productsCache } from "~/helpers/cache/products";
import { supabase } from "~/supabase";

export async function getProduct(id: number) {
	if (Number.isNaN(id)) {
		return null;
	}

	const cached = await productsCache.get(id);
	if (cached !== undefined) {
		return cached;
	}

	const { data: product, error } = await supabase
		.from("products")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error !== null) {
		throw error;
	}

	return product;
}
