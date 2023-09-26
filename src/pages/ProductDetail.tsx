import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Stepper } from "../components";
import { useAddToCart, useSession } from "../hooks";
import { supabase } from "../supabase";

export function ProductDetail() {
  const { id } = useParams();
  if (!id) {
    throw new Error("ProductDetail needs an id url parameter.");
  }

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const session = useSession();

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

  const addToCart = useAddToCart();

  const onAddToCart = () => {
    if (!product) {
      return;
    }
    // Users must be logged in to add items to their cart.
    if (!session) {
      navigate("/login");
      return;
    }
    addToCart.mutate({ productId: product.id, quantity });
  };

  return (
    <Box
      className="fullscreen"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={3}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={4}
        alignItems="center"
      >
        {product ? (
          <img
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            style={{
              padding: "16px",
              borderRadius: "8px",
              objectFit: "contain",
              backgroundColor: "white",
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

        <Box maxWidth={480}>
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
