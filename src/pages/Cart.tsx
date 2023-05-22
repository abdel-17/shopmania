import {
  Box,
  Container,
  Divider,
  Link as MuiLink,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { Link, Navigate } from "react-router-dom";
import Stepper from "../components/Stepper";
import { useSession } from "../App";
import cart from "../assets/cart.svg";
import FullscreenBox from "../components/FullscreenBox";
import { useEffect, useState } from "react";

export default function Cart() {
  const session = useSession();

  const { data } = useQuery({
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

      return (await query.throwOnError()).data;
    },
  });

  // Navigate to the login page if the user is logged out.
  if (!session) {
    return <Navigate to="/login" />;
  }

  const items = data ?? Array<null>(3).fill(null);

  if (items.length === 0) {
    return <EmptyCartPlaceholder />;
  }

  return (
    <Container maxWidth="md" disableGutters sx={{ paddingY: 2 }}>
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        marginLeft={3}
        marginY={2}
      >
        Shopping Cart
      </Typography>

      <Stack divider={<Divider />}>
        {items.map((item, i) => (
          // @ts-expect-error
          <CartItem key={item?.product?.id ?? i} item={item} />
        ))}
      </Stack>
    </Container>
  );
}

interface Item {
  product: {
    id: number;
    title: string;
    category: string;
    image: string;
    price: number;
    quantity: number;
  };
  quantity: number;
}

function CartItem(props: { item: Item | null }) {
  const { item } = props;
  const [optimisticQuantity, setOptimisticQuantity] = useState(item?.quantity);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (item?.quantity !== undefined) {
      // Keep the optimistic quantity in sync with the actual quantity.
      setOptimisticQuantity(item.quantity);
    }
  }, [item?.quantity]);

  const updateQuantity = useMutation(
    async ({ item, newQuantity }: { item: Item; newQuantity: number }) => {
      setOptimisticQuantity(newQuantity); // Optimistically update the quantity.

      const { error } = await supabase.rpc("update_cart_quantity", {
        product: item.product.id,
        new_quantity: newQuantity,
      });

      if (error) {
        console.error(error);
        alert("Failed to update cart items");
        setOptimisticQuantity(item.quantity); // Rollback the optimistic update.
        return;
      }

      console.log(`Updated quantity of ${item.product.id} to ${newQuantity}.`);
      queryClient.invalidateQueries(["cart"]); // Refetch the cart items from the database.
    }
  );

  const onQuantityChange = (newQuantity: number) => {
    if (!item) {
      return;
    }
    if (newQuantity === item.quantity) {
      // No need for a server request if the quantity is the same.
      return;
    }
    updateQuantity.mutate({ item, newQuantity });
  };

  return (
    <Box display="flex" marginX={3} marginY={2}>
      {item ? (
        <img
          src={item.product.image}
          alt={item.product.title}
          width={120}
          height={120}
          style={{
            objectFit: "contain",
            flexShrink: 0,
            padding: 8,
            borderRadius: 8,
            background: "white",
          }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width={120}
          height={120}
          sx={{ borderRadius: "8px" }}
        />
      )}

      <Stack marginLeft={2} flexGrow={1}>
        {item ? (
          <MuiLink
            component={Link}
            to={`/products/${item.product.id.toString()}`}
            color="white"
            underline="hover"
          >
            <Typography fontWeight={500} fontSize={17}>
              {item.product.title}
            </Typography>
          </MuiLink>
        ) : (
          <Typography fontSize={17}>
            <Skeleton />
          </Typography>
        )}

        <Typography color="text.secondary" fontSize={15}>
          {item ? item.product.category : <Skeleton />}
        </Typography>

        <Box display="flex" alignItems="end" flexGrow={1}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            {optimisticQuantity !== undefined ? (
              <Stepper
                value={optimisticQuantity}
                onChange={onQuantityChange}
                disabled={updateQuantity.isLoading}
              />
            ) : (
              <Skeleton variant="rectangular" width={100} />
            )}

            <Typography fontSize={20} textAlign="end" flexGrow={1}>
              {item &&
                // Show only two decimal places
                `${(item.product.price * item.quantity).toFixed(2)} $`}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

function EmptyCartPlaceholder() {
  return (
    <FullscreenBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <img src={cart} alt="Customer browsing Shopmania" style={{ maxWidth: 400 }} />

      <Typography component="h1" variant="h5" marginTop={4}>
        You have no items in your cart
      </Typography>

      <MuiLink
        component={Link}
        to="/products"
        color="primary.light"
        fontSize={18}
        marginTop={1}
      >
        Browse our products
      </MuiLink>
    </FullscreenBox>
  );
}
