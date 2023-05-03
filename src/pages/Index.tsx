import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ErrorFallback from "../components/ErrorFallback";
import { Product, useProducts } from "../hooks/products";
import { useState } from "react";
import { FilterList as FilterListIcon } from "@mui/icons-material";

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export default function Index() {
  const { palette } = useTheme();
  const products = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (products.error) {
    return <ErrorFallback error={products.error} onRetry={products.refetch} />;
  }

  function FilterMenu() {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const onOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchor(event.currentTarget);
    };
    const onClose = () => {
      setAnchor(null);
    };

    return (
      <Box
        display={{
          xs: "flex",
          sm: "none",
        }}
        justifyContent="end"
        marginBottom={1}
      >
        <Tooltip title="Filter">
          <IconButton onClick={onOpen}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchor}
          open={anchor !== null}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          onClose={onClose}
        >
          {categories.map((category) => (
            <MenuItem
              selected={category === selectedCategory}
              onClick={() => {
                setSelectedCategory((current) =>
                  category === current ? null : category
                );
                onClose();
              }}
            >
              <span style={{ textTransform: "capitalize" }}>{category}</span>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }

  function FilterChips() {
    return (
      <Stack
        display={{
          xs: "none",
          sm: "flex",
        }}
        direction="row"
        justifyContent="center"
        spacing={1}
        marginBottom={2}
      >
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          return (
            <Chip
              variant="filled"
              label={<span style={{ textTransform: "capitalize" }}>{category}</span>}
              color={isSelected ? "secondary" : "default"}
              onClick={() => setSelectedCategory(category)}
              onDelete={isSelected ? () => setSelectedCategory(null) : undefined}
            />
          );
        })}
      </Stack>
    );
  }

  return (
    <Box padding={4}>
      <Typography component="h1" variant="h4" textAlign="center" fontWeight="bold">
        Welcome to <span style={{ color: palette.primary.light }}>Shopmania!</span>
      </Typography>

      <Typography
        component="h2"
        variant="h5"
        textAlign="center"
        marginTop={2}
        marginBottom={4}
      >
        Browse our diverse product catalog
      </Typography>

      {products.isLoading ? (
        <LoadingFallback />
      ) : (
        <Container maxWidth="md">
          <FilterMenu />

          <FilterChips />

          <ProductsGrid
            products={products.data.filter(
              (product) => !selectedCategory || product.category === selectedCategory
            )}
          />
        </Container>
      )}
    </Box>
  );
}

function ProductsGrid(props: { products: Product[] }) {
  const { products } = props;
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              padding: 2,
              background: "white",
              transition: "0.5s",
              ":hover": {
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
