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
  useTheme,
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
  const { palette } = useTheme();
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
        query = query.order(sortMethod.property, { ascending: sortMethod.ascending });
      }
      if (signal) {
        query = query.abortSignal(signal);
      }

      const { data, error } = await query;
      if (error) {
        throw error;
      }
      return data;
    },
    useErrorBoundary: true,
  });

  const products = data ?? Array<null>(6).fill(null);

  const brandStyle = { color: palette.primary.light };
  return (
    <Box padding={4}>
      <Typography component="h1" variant="h4" textAlign="center" fontWeight="bold">
        Welcome to <span style={brandStyle}>Shopmania!</span>
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
            tooltip="Sort"
            ButtonIcon={<SortIcon />}
            items={sortMethods}
            renderItem={(sortMethod) => sortMethod.label}
          />

          <SelectMenu
            selection={category}
            setSelection={setCategory}
            tooltip="Filter"
            ButtonIcon={<TuneIcon />}
            items={categories}
            renderItem={(category) => category}
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
            renderLabel={(category) => category}
          />

          <SelectChips
            selection={sortMethod}
            setSelection={setSortMethod}
            items={sortMethods}
            renderLabel={(sortMethod) => sortMethod.label}
          />
        </Stack>

        <Grid container spacing={2}>
          {products.map((product, i) => (
            <Grid key={product?.id ?? i} item xs={12} sm={6} md={4}>
              <ProductDetailLink id={product?.id}>
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

                  <Typography
                    color="primary.light"
                    textAlign="center"
                    fontSize={18}
                    fontWeight={500}
                  >
                    {product ? `${product.price} $` : <Skeleton />}
                  </Typography>
                </Paper>
              </ProductDetailLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function ProductDetailLink(props: { id: number | undefined; children: React.ReactNode }) {
  const { id, children } = props;

  // Don't link to any page until the data has been loaded.
  if (!id) {
    return <>{children}</>;
  }

  return (
    <Link to={id.toString()} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
}

function SelectChips<T>(props: {
  selection: T | null;
  setSelection: React.Dispatch<React.SetStateAction<T | null>>;
  items: T[];
  renderLabel: (item: T) => React.ReactNode;
}) {
  const { selection, setSelection, items, renderLabel } = props;

  function SelectChip(props: { item: T }) {
    const { item } = props;
    const isSelected = item === selection;

    const onClick = () => setSelection(item);
    // Chips can only be deleted (deselected) if they are selected.
    const onDelete = isSelected ? () => setSelection(null) : undefined;

    return (
      <Chip
        variant="filled"
        label={renderLabel(item)}
        color={isSelected ? "secondary" : "default"}
        onClick={onClick}
        onDelete={onDelete}
      />
    );
  }

  return (
    <Stack direction="row" justifyContent="center" spacing={1}>
      {items.map((item, i) => (
        <SelectChip key={i} item={item} />
      ))}
    </Stack>
  );
}

function SelectMenu<T>(props: {
  selection: T | null;
  setSelection: React.Dispatch<React.SetStateAction<T | null>>;
  tooltip: string;
  ButtonIcon: React.ReactNode;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}) {
  const { selection, setSelection, tooltip, ButtonIcon, items, renderItem } = props;
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const onOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const onClose = () => {
    setAnchor(null);
  };

  function SelectMenuItem(props: { item: T }) {
    const { item } = props;

    const onClick = () => {
      // If the option is currently selected, deselect it.
      // Otherwise, set it as selected.
      setSelection((selection) => (item === selection ? null : item));
      onClose();
    };

    return (
      <MenuItem selected={item === selection} onClick={onClick}>
        {renderItem(item)}
      </MenuItem>
    );
  }

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
          <SelectMenuItem key={i} item={item} />
        ))}
      </Menu>
    </>
  );
}
