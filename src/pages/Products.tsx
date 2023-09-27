import { Sort as SortIcon, Tune as TuneIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Link } from "../components";
import { useAddToCart } from "../hooks";
import { supabase } from "../supabase";

const categories = [
  "Electronics",
  "Jewelery",
  "Men's Clothing",
  "Women's Clothing",
];

interface SortMethod {
  label: string;
  property: "title" | "price";
  ascending: boolean;
}
const sortMethods: SortMethod[] = [
  {
    label: "A-Z",
    property: "title",
    ascending: true,
  },
  {
    label: "Price (High to Low)",
    property: "price",
    ascending: false,
  },
  {
    label: "Price (Low to High)",
    property: "price",
    ascending: true,
  },
];

export function Products() {
  const [category, setCategory] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<SortMethod | null>(null);

  const { data } = useQuery({
    queryKey: ["products", category, sortMethod],
    queryFn: async ({ signal }) => {
      let query = supabase.from("products").select("id, title, image, price");

      if (category) {
        query = query.eq("category", category);
      }

      if (sortMethod) {
        const { property, ascending } = sortMethod;
        query = query.order(property, { ascending });
      }

      if (signal) {
        query = query.abortSignal(signal);
      }

      return (await query.throwOnError()).data;
    },
  });

  // Show 6 placeholder cards while loading.
  const products = data ?? Array<null>(6).fill(null);

  const renderCategory = (category: string) => category;
  const renderSortMethod = (sortMethod: SortMethod) => sortMethod.label;

  return (
    <Box padding={3}>
      <Typography
        component="h1"
        variant="h4"
        textAlign="center"
        fontWeight="bold"
      >
        Welcome to{" "}
        <Box component="span" color="primary.light">
          Shopmania
        </Box>
      </Typography>

      <Typography
        component="h2"
        variant="h6"
        fontWeight={400}
        textAlign="center"
        marginTop={1}
      >
        Browse our diverse product catalog
      </Typography>

      <Container maxWidth="lg" disableGutters sx={{ marginTop: 3 }}>
        {/* On mobile, we show a menu for filtering/sorting products. */}
        <Stack
          direction="row"
          display={{
            xs: "flex",
            sm: "none",
          }}
          justifyContent="end"
          spacing={1}
          marginBottom={1}
        >
          <SelectMenu
            items={sortMethods}
            selected={sortMethod}
            onSelectedChange={setSortMethod}
            tooltipText="Sort"
            TriggerIcon={<SortIcon />}
            renderItem={renderSortMethod}
          />

          <SelectMenu
            items={categories}
            selected={category}
            onSelectedChange={setCategory}
            tooltipText="Filter"
            TriggerIcon={<TuneIcon />}
            renderItem={renderCategory}
          />
        </Stack>

        {/* On tablets and desktops, we show two rows of chips instead of menus.*/}
        <Stack
          display={{
            xs: "none",
            sm: "flex",
          }}
          spacing={1}
          marginBottom={3}
        >
          <SelectChips
            items={categories}
            selected={category}
            onSelectedChange={setCategory}
            renderLabel={renderCategory}
          />

          <SelectChips
            items={sortMethods}
            selected={sortMethod}
            onSelectedChange={setSortMethod}
            renderLabel={renderSortMethod}
          />
        </Stack>

        <Grid container spacing={2}>
          {products.map((product, i) => (
            <Grid key={product?.id ?? i} item xs={12} sm={6} lg={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

function ProductCard(props: { product: Product | null }) {
  const { product } = props;
  const addToCart = useAddToCart();
  return (
    <Paper sx={{ padding: 2, borderRadius: 2 }}>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        {product ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            width={200}
            height={200}
            style={{
              objectFit: "contain",
              padding: "8px",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={200}
            height={200}
            sx={{ borderRadius: "4px" }}
          />
        )}
      </Box>

      {product ? (
        <Link
          to={`${product.id}`}
          display="block"
          fontSize={18}
          fontWeight={600}
          color="white"
          underline="hover"
          noWrap
          textAlign="center"
        >
          {product ? product.title : <Skeleton />}
        </Link>
      ) : (
        <Skeleton sx={{ fontSize: 18 }} />
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        marginTop={2}
      >
        {product && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addToCart.mutate({ productId: product.id, quantity: 1 });
            }}
          >
            Add to Cart
          </Button>
        )}

        <Typography
          fontSize={18}
          fontWeight={500}
          color="primary"
          textAlign="center"
          flexShrink={0}
          flexGrow={
            // Make the skeleton take up all available space.
            product ? undefined : 1
          }
        >
          {product ? `${product.price} $` : <Skeleton />}
        </Typography>
      </Stack>
    </Paper>
  );
}

function SelectChips<T>(props: {
  items: T[];
  selected: T | null;
  onSelectedChange: (value: T | null) => void;
  renderLabel: (item: T) => React.ReactNode;
}) {
  const { items, selected, onSelectedChange, renderLabel } = props;
  return (
    <Stack direction="row" justifyContent="center" spacing={1}>
      {items.map((item, i) => {
        const isSelected = item === selected;
        return (
          <Chip
            key={i}
            variant="filled"
            label={renderLabel(item)}
            color={isSelected ? "secondary" : "default"}
            onClick={() => onSelectedChange(item)}
            onDelete={
              // Chips can only be deleted (deselected) if they are already selected.
              isSelected ? () => onSelectedChange(null) : undefined
            }
          />
        );
      })}
    </Stack>
  );
}

function SelectMenu<T>(props: {
  items: T[];
  selected: T | null;
  onSelectedChange: (value: T | null) => void;
  tooltipText: string;
  TriggerIcon: React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
}) {
  const {
    items,
    selected,
    onSelectedChange,
    tooltipText,
    TriggerIcon,
    renderItem,
  } = props;
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <Tooltip title={tooltipText}>
        <IconButton onClick={(event) => setAnchor(event.currentTarget)}>
          {TriggerIcon}
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
        onClose={() => setAnchor(null)}
      >
        {items.map((item, i) => {
          const isSelected = item === selected;
          return (
            <MenuItem
              key={i}
              selected={isSelected}
              onClick={() => {
                onSelectedChange(isSelected ? null : item);
                setAnchor(null);
              }}
            >
              {renderItem(item)}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
