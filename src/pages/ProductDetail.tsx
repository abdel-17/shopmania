import { useParams } from "react-router";
import FullscreenBox from "../components/FullscreenBox";
import { Box, Button, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";

export default function ProductDetail() {
  const { id } = useParams();

  // Make sure we use this component in the correct route.
  if (!id) {
    console.error("ProductDetail needs an id url parameter");
    return null;
  }

  const [quantity, setQuantity] = useState(0);
  const { data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: async ({ signal }) => {
      let query = supabase.from("products").select().eq("id", id);

      if (signal) {
        query = query.abortSignal(signal);
      }

      // Return a single value instead of an array.
      const { data, error } = await query.single();
      if (error) {
        throw error;
      }
      return data;
    },
    useErrorBoundary: true
  });

  const onIcrement = () => setQuantity((current) => current + 1);
  const onDecrement = () => setQuantity((current) => current - 1);

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
              <Button variant="contained" fullWidth sx={{ marginRight: 2 }}>
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
