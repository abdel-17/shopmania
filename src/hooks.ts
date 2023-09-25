import { useQuery } from "@tanstack/react-query";

import { useSession } from "./components/SessionProvider";
import { supabase } from "./supabase";

export { useSession };

export type CartItem = {
  quantity: number;
  product: {
    id: number;
    title: string;
    category: string;
    image: string;
    price: number;
  };
};

export function useCartItems() {
  const session = useSession();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async ({ signal }) => {
      let query = supabase
        .from("cart_items")
        .select(
          `quantity,
            product:products(
              id,
              title,
              category,
              image,
              price
            )`,
        )
        .order("quantity", { ascending: false });

      if (signal) {
        query = query.abortSignal(signal);
      }

      const { data } = await query.throwOnError();
      return data as unknown as CartItem[];
    },
    enabled: Boolean(session), // Fetch cart items only if the user is authenticated.
  });
}
