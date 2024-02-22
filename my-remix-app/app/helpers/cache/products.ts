import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Product } from "~/types";

interface ProductsDatabase extends DBSchema {
	products: {
		key: number;
		value: Product;
	};
}

let db: IDBPDatabase<ProductsDatabase> | null = null;

async function getDatabase() {
	if (db === null) {
		db = await openDB<ProductsDatabase>("Products", 1, {
			upgrade(db) {
				db.createObjectStore("products", {
					keyPath: "id",
				});
			},
		});
	}
	return db;
}

export const productsCache = {
	async get(id: number) {
		const db = await getDatabase();
		return db.get("products", id);
	},
	async getAll() {
		const db = await getDatabase();
		return db.getAll("products");
	},
	async add(product: Product) {
		const db = await getDatabase();
		await db.put("products", product);
	},
	async addAll(products: Product[]) {
		const db = await getDatabase();
		const tx = db.transaction("products", "readwrite");
		await Promise.all([
			...products.map((product) => tx.store.put(product)),
			tx.done,
		]);
	},
};
