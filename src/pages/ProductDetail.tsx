import { useNavigate, useParams } from "react-router";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";
import Stepper from "../components/Stepper";
import { useSession } from "../providers/SessionProvider";
import { useCartItems } from "../providers/CartItemsProvider";
import { enqueueSnackbar } from "notistack";

export default function ProductDetail() {
  const { id } = useParams();
  if (!id) {
    throw new Error("ProductDetail needs an id url parameter.");
  }

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const session = useSession();
  const cartItems = useCartItems();

  const { data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: async ({ signal }) => {
      let query = supabase.from("products").select().eq("id", id);
      if (signal) {
        query = query.abortSignal(signal);
      }
      // Return a single value instead of an array.
      return (await query.single().throwOnError()).data;
    },
  });

  const addToCart = useMutation(async (quantity: number) => {
    if (!product) {
      console.error("Product is added to the cart before the page loads.");
      return;
    }

    const { error } = await supabase.rpc("add_to_cart", {
      product: product.id,
      amount: quantity,
    });

    if (error) {
      console.error(error);
      enqueueSnackbar("Failed to add items to cart.", { variant: "error" });
      return;
    }

    enqueueSnackbar(
      `Added ${quantity} ${quantity === 1 ? "item" : `items`} to cart`,
      {
        variant: "success",
      },
    );
    cartItems.refetch();
  });

  const onAddToCart = () => {
    if (!product) {
      return;
    }
    // Users must be logged in to add items to their cart.
    if (!session) {
      navigate("/login");
      return;
    }
    addToCart.mutate(quantity);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" padding={4}>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={4}
      >
        {product ? (
          <img
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            style={{
              objectFit: "contain",
              alignSelf: "center",
              background: "white",
              padding: "16px",
              borderRadius: "8px",
            }}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={300}
            height={300}
            sx={{ borderRadius: "8px" }}
          />
        )}

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth={500}
        >
          <Typography component="h1" variant="h5" fontWeight={500}>
            {product?.title ?? <Skeleton width={300} />}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" marginTop={1}>
            {product?.category ?? <Skeleton width={100} />}
          </Typography>

          <Typography marginY={3}>
            {product?.description ?? <Skeleton />}
          </Typography>

          {product && (
            <Box display="flex" alignItems="center">
              <Button
                onClick={onAddToCart}
                variant="contained"
                fullWidth
                disabled={quantity === 0 || addToCart.isLoading}
                sx={{ marginRight: 2 }}
              >
                Add to Cart
              </Button>

              <Stepper value={quantity} onChange={setQuantity} min={1} />
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
