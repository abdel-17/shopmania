import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

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
        .order("created_at", { ascending: false });

      if (signal) {
        query = query.abortSignal(signal);
      }

      const { data } = await query.throwOnError();
      return data as unknown as CartItem[];
    },
    enabled: Boolean(session), // Fetch cart items only if the user is authenticated.
  });
}

export function useAddToCart() {
  const cartItems = useCartItems();
  return useMutation(
    async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      const { error } = await supabase.rpc("add_to_cart", {
        product: productId,
        amount: quantity,
      });

      if (error) {
        console.error(error);
        enqueueSnackbar("Failed to add items to cart.", { variant: "error" });
        return;
      }

      enqueueSnackbar(
        `Added ${quantity} ${quantity === 1 ? "item" : `items`} to cart`,
        { variant: "success" },
      );
      cartItems.refetch();
    },
  );
}
