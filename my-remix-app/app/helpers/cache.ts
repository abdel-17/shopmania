import { get, set } from "idb-keyval";

export class KeyedCache<T> {
	constructor(readonly key: IDBValidKey) {}

	async get(): Promise<T | undefined> {
		return get(this.key);
	}

	async set(value: T): Promise<void> {
		return set(this.key, value);
	}
}
