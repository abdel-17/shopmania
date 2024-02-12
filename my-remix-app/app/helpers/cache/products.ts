import { get, set } from "idb-keyval";
import type { Product } from "~/types";

const CACHE_KEY = "products";

export function getCachedProducts() {
	return get<Product[]>(CACHE_KEY);
}

export function setCachedProducts(products: Product[]) {
	return set(CACHE_KEY, products);
}
