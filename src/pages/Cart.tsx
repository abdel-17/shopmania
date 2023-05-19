import {
  Box,
  Container,
  Divider,
  Link as MuiLink,
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

  const { data: items } = useQuery({
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

  if (!items) {
    return <div>Loading...</div>;
  }

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
        {items.map(({ product, quantity }) => (
          // @ts-expect-error
          <CartItem key={product.id} product={{ ...product, quantity: quantity }} />
        ))}
      </Stack>
    </Container>
  );
}

function CartItem(props: {
  product: {
    id: number;
    title: string;
    category: string;
    image: string;
    price: number;
    quantity: number;
  };
}) {
  const { product } = props;
  const [optimisticQuantity, setOptimisticQuantity] = useState(product.quantity);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Keep the optimistic quantity in sync with the actual quantity.
    setOptimisticQuantity(product.quantity);
  }, [product.quantity]);

  const updateQuantity = useMutation(async (newQuantity: number) => {
    if (newQuantity === product.quantity) {
      // No need for a server request if the quantity is the same.
      return;
    }

    const { error } = await supabase.rpc("update_cart_quantity", {
      product: product.id,
      new_quantity: newQuantity,
    });

    if (error) {
      console.error(error);
      alert("Failed to update cart items");
      return;
    }

    console.log(`Updated quantity of ${product.id} to ${newQuantity}.`);
    setOptimisticQuantity(newQuantity);
    queryClient.invalidateQueries(["cart"]); // Refetch the cart items from the database.
  });

  const onQuantityChange = (newQuantity: number) => {
    updateQuantity.mutate(newQuantity);
  };

  const totalPrice = optimisticQuantity * product.price;
  return (
    <Box display="flex" marginX={3} marginY={2}>
      <img
        src={product.image}
        alt={product.title}
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

      <Stack marginLeft={2} flexGrow={1}>
        <MuiLink
          component={Link}
          to={`/products/${product.id.toString()}`}
          color="white"
          underline="hover"
        >
          <Typography fontWeight={500} fontSize={17}>
            {product.title}
          </Typography>
        </MuiLink>

        <Typography color="text.secondary" fontSize={15}>
          {product.category}
        </Typography>

        <Box display="flex" alignItems="end" flexGrow={1}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Stepper
              value={optimisticQuantity}
              onChange={onQuantityChange}
              disabled={updateQuantity.isLoading}
            />

            <Typography fontSize={20} textAlign="end" flexGrow={1}>
              {/** Show only two decimal places */}
              {totalPrice.toFixed(2)} $
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
