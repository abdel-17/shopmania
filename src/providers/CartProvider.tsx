import { PropsWithChildren, createContext, useContext } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSession } from "./SessionProvider";
import supabase from "../supabase/client";

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

const CartItemsContext = createContext<UseQueryResult<CartItem[]> | null>(null);

export function CartItemsProvider(props: PropsWithChildren) {
  const session = useSession();

  const cartItems = useQuery({
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
            )`
        )
        .order("quantity", { ascending: false });

      if (signal) {
        query = query.abortSignal(signal);
      }

      const { data } = await query.throwOnError();
      return data as CartItem[];
    },
    enabled: Boolean(session), // Fetch cart items only if the user is authenticated.
  });

  return <CartItemsContext.Provider value={cartItems} {...props} />;
}

export function useCartItems() {
  const cartItems = useContext(CartItemsContext);
  if (!cartItems) {
    throw new Error("CartItemsProvider needs to be a parent of this component.");
  }
  return cartItems;
}
