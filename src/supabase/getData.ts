import { PostgrestSingleResponse } from "@supabase/supabase-js";

// A helper for throwing errors returned from supabase queries.
export default function getData<T>(response: PostgrestSingleResponse<T>) {
  const { data, error } = response;
  if (error) {
    throw error;
  }
  return data;
}
