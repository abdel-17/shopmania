import {
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Navigate } from "react-router-dom";

import ShoppingIcon from "../assets/shopping.svg?react";
import { Link, Stepper } from "../components";
import { useCartItems, useSession, type CartItem } from "../hooks";
import { supabase } from "../supabase";

export function Cart() {
  const session = useSession();
  const { data } = useCartItems();

  // Navigate to the login page if the user is logged out.
  if (session === null) {
    return <Navigate to="/login" />;
  }

  const items = data ?? Array<null>(3).fill(null);

  if (items.length === 0) {
    return <EmptyCartPlaceholder />;
  }

  return (
    <Container maxWidth="sm" sx={{ padding: 3 }}>
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        textAlign="center"
      >
        Shopping Cart
      </Typography>

      <Stack divider={<Divider />} spacing={2} marginTop={4}>
        {items.map((item, i) => (
          <CartListItem key={item?.product?.id ?? i} item={item} />
        ))}
      </Stack>
    </Container>
  );
}

function CartListItem(props: { item: CartItem | null }) {
  const { item } = props;
  const cartItems = useCartItems();

  const updateQuantity = useMutation(
    async ({
      productId,
      newQuantity,
    }: {
      productId: number;
      newQuantity: number;
    }) => {
      if (newQuantity === 0) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("product_id", productId);

        if (error) {
          console.error(error);
          enqueueSnackbar("Failed to remove item from cart", {
            variant: "error",
          });
          return;
        }
      } else {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("product_id", productId);

        if (error) {
          console.error(error);
          enqueueSnackbar("Failed to update item quantity", {
            variant: "error",
          });
          return;
        }
      }

      await cartItems.refetch();
    },
  );

  const onQuantityChange = (newQuantity: number) => {
    if (!item) {
      return;
    }
    if (newQuantity === item.quantity) {
      // No need for a database request.
      return;
    }
    updateQuantity.mutate({
      productId: item.product.id,
      newQuantity,
    });
  };

  return (
    <Box display="flex">
      {item ? (
        <img
          src={item.product.image}
          alt={item.product.title}
          width={120}
          height={120}
          style={{
            objectFit: "contain",
            alignSelf: "center",
            flexShrink: 0,
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: "white",
          }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width={120}
          height={120}
          sx={{ borderRadius: "4px" }}
        />
      )}

      <Box display="flex" flexDirection="column" marginLeft={2} flexGrow={1}>
        {item ? (
          <Link
            to={`/products/${item.product.id.toString()}`}
            color="white"
            underline="hover"
          >
            <Typography fontWeight={500} fontSize={18}>
              {item.product.title}
            </Typography>
          </Link>
        ) : (
          <Typography fontSize={18}>
            <Skeleton />
          </Typography>
        )}

        <Typography color="text.secondary" fontSize={15}>
          {item ? item.product.category : <Skeleton />}
        </Typography>

        <Box display="flex" alignItems="end" flexGrow={1} marginTop={1}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexGrow={1}
          >
            {item?.quantity !== undefined ? (
              <Stepper
                value={item?.quantity}
                onChange={onQuantityChange}
                disabled={updateQuantity.isLoading}
              />
            ) : (
              <Skeleton width={100} />
            )}

            {item ? (
              <Typography fontSize={18}>
                {(item.product.price * item.quantity).toFixed(2)} $
              </Typography>
            ) : (
              <Skeleton width={75} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function EmptyCartPlaceholder() {
  return (
    <Box
      className="fullscreen"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={3}
      >
        <ShoppingIcon style={{ maxWidth: 300 }} />

        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          fontWeight={500}
          marginTop={4}
        >
          You have no items in your cart
        </Typography>

        <Link
          to="/products"
          textAlign="center"
          color="primary.light"
          fontSize={18}
          marginTop={1}
        >
          Browse our products
        </Link>
      </Box>
    </Box>
  );
}
