import {
  Box,
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
import { useState } from "react";
import { Sort as SortIcon, Tune as TuneIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";

interface SortMethod {
  label: string;
  property: "title" | "price";
  ascending: boolean;
}

const categories = ["Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"];
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

export default function Products() {
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
    <Box padding={4}>
      <Typography component="h1" variant="h4" textAlign="center" fontWeight="bold">
        Welcome to{" "}
        <Box component="span" color="primary.light">
          Shopmania
        </Box>
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

      <Container maxWidth="lg">
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
          {/* We show a menu for filtering/sorting products on mobile. */}
          <SelectMenu
            selection={sortMethod}
            setSelection={setSortMethod}
            items={sortMethods}
            tooltip="Sort"
            ButtonIcon={<SortIcon />}
            renderItem={renderSortMethod}
          />

          <SelectMenu
            selection={category}
            setSelection={setCategory}
            items={categories}
            tooltip="Filter"
            ButtonIcon={<TuneIcon />}
            renderItem={renderCategory}
          />
        </Stack>

        <Stack
          display={{
            xs: "none",
            sm: "flex",
          }}
          spacing={1}
          marginBottom={3}
        >
          {/* On tablets and desktops, we show two rows of chips instead of menus.*/}
          <SelectChips
            selection={category}
            setSelection={setCategory}
            items={categories}
            renderLabel={renderCategory}
          />

          <SelectChips
            selection={sortMethod}
            setSelection={setSortMethod}
            items={sortMethods}
            renderLabel={renderSortMethod}
          />
        </Stack>

        <Grid container spacing={2}>
          {products.map((product, i) => (
            <Grid key={product?.id ?? i} item xs={12} sm={6} md={4}>
              {product ? (
                <Link to={`${product.id}`} style={{ textDecoration: "none" }}>
                  <ProductCard product={product} />
                </Link>
              ) : (
                <ProductCard />
              )}
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

function ProductCard(props: { product?: Product }) {
  const { product } = props;
  return (
    <Paper
      sx={{
        padding: 2,
        background: "#222",
        transition: "0.5s",
        ":hover": {
          scale: "1.05",
        },
      }}
    >
      <Box display="flex" justifyContent="center">
        {product ? (
          <img
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            style={{
              objectFit: "contain",
              background: "white",
              padding: "12px",
              borderRadius: "8px",
            }}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={200}
            height={200}
            sx={{ borderRadius: "8px" }}
          />
        )}
      </Box>

      <Typography textAlign="center" noWrap marginTop={2}>
        {product?.title ?? <Skeleton />}
      </Typography>

      <Typography color="primary.light" textAlign="center" fontSize={18} fontWeight={500}>
        {product ? `${product.price} $` : <Skeleton />}
      </Typography>
    </Paper>
  );
}

function SelectChips<T>(props: {
  selection: T | null;
  setSelection: React.Dispatch<React.SetStateAction<T | null>>;
  items: T[];
  renderLabel: (item: T) => React.ReactNode;
}) {
  const { selection, setSelection, items, renderLabel: renderItem } = props;
  return (
    <Stack direction="row" justifyContent="center" spacing={1}>
      {items.map((item, i) => {
        const isSelected = item === selection;
        return (
          <Chip
            key={i}
            variant="filled"
            label={renderItem(item)}
            color={isSelected ? "secondary" : "default"}
            onClick={() => setSelection(item)}
            onDelete={
              // Chips can only be deleted (deselected) if they are selected.
              isSelected ? () => setSelection(null) : undefined
            }
          />
        );
      })}
    </Stack>
  );
}

function SelectMenu<T>(props: {
  selection: T | null;
  setSelection: React.Dispatch<React.SetStateAction<T | null>>;
  items: T[];
  tooltip: string;
  ButtonIcon: React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
}) {
  const { selection, setSelection, items, tooltip, ButtonIcon, renderItem } = props;
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const onOpen = (event: React.MouseEvent<HTMLElement>) => setAnchor(event.currentTarget);
  const onClose = () => setAnchor(null);

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton onClick={onOpen}>{ButtonIcon}</IconButton>
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
        {items.map((item, i) => (
          <MenuItem
            key={i}
            selected={item === selection}
            onClick={() => {
              // If the option is currently selected, deselect it.
              // Otherwise, select it.
              setSelection((selection) => (item === selection ? null : item));
              onClose();
            }}
          >
            {renderItem(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
