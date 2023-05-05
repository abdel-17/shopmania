import { useParams } from "react-router";
import ErrorFallback from "../components/ErrorFallback";
import { Product, useProduct } from "../hooks/products";
import FullscreenBox from "../components/FullscreenBox";
import { Box, Button, IconButton, Rating, Stack, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();

  // Make sure we use this component in the correct route.
  if (!id) {
    console.error("ProductDetail needs an id url parameter");
    return null;
  }

  const [quantity, setQuantity] = useState(0);
  const product = useProduct(id);

  const onIcrement = () => setQuantity((current) => current + 1);
  const onDecrement = () => setQuantity((current) => current - 1);

  if (product.error) {
    return <ErrorFallback error={product.error} onRetry={product.refetch} />;
  }

  if (product.isLoading) {
    return <>Loading...</>;
  }

  const { data } = product;
  return (
    <FullscreenBox display="flex" alignItems="center" justifyContent="center" padding={4}>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={3}
      >
        <img
          src={data.image}
          alt={data.title}
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

        <Box maxWidth={500}>
          <Typography component="h1" variant="h5" fontWeight={500}>
            {data.title}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            textTransform="capitalize"
            marginTop={1}
            marginBottom={1}
          >
            {data.category}
          </Typography>

          <RatingView rating={data.rating} />

          <Typography marginTop={3}>{data.description}</Typography>

          <Box display="flex" alignItems="center" marginTop={4}>
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
        </Box>
      </Stack>
    </FullscreenBox>
  );
}

function RatingView(props: { rating: Product["rating"] }) {
  const { rating } = props;
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      padding={1}
      bgcolor="rgba(255, 255, 255, 12%)"
      borderRadius={2}
    >
      <Rating value={rating.rate} readOnly precision={0.1} />

      <Typography marginLeft={1}>{rating.count} ratings</Typography>
    </Box>
  );
}
