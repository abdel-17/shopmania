import localforage from "localforage";

export class Cache<T> {
	constructor(readonly key: string) {}

	async get(): Promise<T | null> {
		return localforage.getItem<T>(this.key);
	}

	async set(value: T): Promise<T> {
		return localforage.setItem<T>(this.key, value);
	}
}
