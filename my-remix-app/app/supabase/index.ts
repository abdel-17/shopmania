import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function validateString(value: unknown): string {
	if (typeof value !== "string") {
		throw new Error(`Expected a string, but got ${value}`);
	}
	return value;
}

const supabaseUrl = validateString(import.meta.env.VITE_SUPABASE_URL);
const supabaseKey = validateString(import.meta.env.VITE_SUPABASE_KEY);

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type * from "./types";
