import { useNavigate, useParams } from "react-router";
import FullscreenBox from "../components/FullscreenBox";
import { Box, Button, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { useSession } from "../App";
import getData from "../supabase/getData";

export default function ProductDetail() {
  const { id } = useParams();
  if (!id) {
    console.error("ProductDetail needs an id url parameter.");
    return null;
  }

  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: async ({ signal }) => {
      let query = supabase.from("products").select().eq("id", id);
      if (signal) {
        query = query.abortSignal(signal);
      }
      // Return a single value instead of an array.
      return getData(await query.single());
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
      alert("Failed to add items to cart.");
      return;
    }
    queryClient.invalidateQueries(["cart"]); // Refetch queries that depend on cart data.
    alert(`${quantity === 1 ? "Item" : "Items"} added to cart successfully.`);
  });

  const onIcrement = () => setQuantity((current) => current + 1);

  // Make sure the quantity never drops below zero.
  const onDecrement = () => setQuantity((current) => Math.max(current - 1, 0));

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
    <FullscreenBox display="flex" alignItems="center" justifyContent="center" padding={4}>
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

        <Box display="flex" flexDirection="column" justifyContent="center" maxWidth={500}>
          <Typography component="h1" variant="h5" fontWeight={500}>
            {product?.title ?? <Skeleton width={300} />}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" marginTop={1}>
            {product?.category ?? <Skeleton width={100} />}
          </Typography>

          <Typography marginY={3}>{product?.description ?? <Skeleton />}</Typography>

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

              <IconButton onClick={onIcrement}>
                <AddIcon />
              </IconButton>

              <Typography fontSize={18} marginX={1}>
                {quantity}
              </Typography>

              <IconButton onClick={onDecrement} disabled={quantity === 0}>
                <RemoveIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Stack>
    </FullscreenBox>
  );
}
