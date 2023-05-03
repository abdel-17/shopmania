import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ErrorFallback from "../components/ErrorFallback";
import { Product, useProducts } from "../hooks/products";
import { useState } from "react";

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export default function Index() {
  const { palette } = useTheme();
  const products = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (products.error) {
    return <ErrorFallback error={products.error} onRetry={products.refetch} />;
  }

  const brandStyle = { color: palette.primary.light };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <Typography component="h1" variant="h4" textAlign="center" fontWeight="bold">
        Welcome to <span style={brandStyle}>Shopmania!</span>
      </Typography>

      <Typography component="h2" variant="h5" textAlign="center" marginTop={2}>
        Browse our diverse product catalog
      </Typography>

      {products.isLoading ? (
        <LoadingFallback />
      ) : (
        <>
          <Stack direction="row" spacing={2} marginTop={4}>
            {categories.map((category) => (
              <FilterChip
                key={category}
                category={category}
                isSelected={selectedCategory === category}
                setSelectedCategory={setSelectedCategory}
              />
            ))}
          </Stack>

          <ProductsGrid
            products={products.data.filter(
              (product) => !selectedCategory || product.category === selectedCategory
            )}
          />
        </>
      )}
    </Box>
  );
}

function FilterChip(props: {
  category: string;
  isSelected: boolean;
  setSelectedCategory: (category: string | null) => void;
}) {
  const { category, isSelected, setSelectedCategory } = props;

  const onClick = () => setSelectedCategory(category);
  const onDelete = isSelected ? () => setSelectedCategory(null) : undefined;

  const labelStyle = { textTransform: "capitalize" } as const;
  return (
    <Chip
      label={<span style={labelStyle}>{category}</span>}
      color="secondary"
      variant={isSelected ? "filled" : "outlined"}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
}

function ProductsGrid(props: { products: Product[] }) {
  const { products } = props;
  return (
    <Grid container maxWidth="md" spacing={2} marginTop={1}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: 2,
              background: "white",
              transition: "0.5s",
              "&:hover": {
                scale: "1.05",
              },
            }}
          >
            <Box display="flex" justifyContent="center">
              <img
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
              />
            </Box>

            <Typography color="black" textAlign="center" noWrap marginTop={2}>
              {product.title}
            </Typography>

            <Typography color="primary" textAlign="center" fontSize={18} fontWeight={500}>
              {product.price} $
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function LoadingFallback() {
  return <div>Loading...</div>;
}
