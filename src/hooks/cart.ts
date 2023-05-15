import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

export function useCartItems<C extends string>(columns: C) {
  return useQuery({
    queryKey: ["cart", columns],
    queryFn: async ({ signal }) => {
      let query = supabase.from("cart_items").select(columns);
      if (signal) {
        query = query.abortSignal(signal);
      }

      const { data, error } = await query;
      if (error) {
        throw error;
      }
      return data;
    },
  });
}

interface CartItemIncrement {
  productId: number;
  increment: number;
}

export function useIncrementCartItem() {
  const queryClient = useQueryClient();
  return useMutation<number, PostgrestError, CartItemIncrement>({
    mutationFn: async (item) => {
      const result = await supabase.rpc("increment_cart_item", {
        increment: item.increment,
        product: item.productId,
      });

      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    onSuccess: (data, variables) => {
      console.log(
        `Updated the cart quantity for product ${variables.productId} to ${data}.`
      );
      // Invalidate cart queries. This ensures queries with "cart" in their key
      // are refetched.
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error(error);
      alert(`Failed to add the items to cart.`);
    },
  });
}
