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
import { Sort as SortIcon, Tune as TuneIcon } from "@mui/icons-material";

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
const categoryStyle = { textTransform: "capitalize" } as const;

interface SortMethod {
  label: string;
  comparator?: (first: Product, second: Product) => number;
}
const sortMethods: SortMethod[] = [
  {
    label: "A-Z",
    comparator: (first, second) => first.title.localeCompare(second.title),
  },
  {
    label: "Price (Low to High)",
    comparator: (first, second) => first.price - second.price,
  },
  {
    label: "Price (High to Low)",
    comparator: (first, second) => second.price - first.price,
  },
];

export default function Index() {
  const { palette } = useTheme();
  const products = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSortMethod, setSelectedSortMethod] = useState<SortMethod | null>(null);

  if (products.error) {
    return <ErrorFallback error={products.error} onRetry={products.refetch} />;
  }

  // We show a menu for filtering/sorting products on mobile.
  function FilterMenu() {
    return (
      <SelectMenu
        selection={selectedCategory}
        setSelection={setSelectedCategory}
        tooltip="Filter"
        ButtonIcon={<TuneIcon />}
        items={categories}
        renderItem={(category) => <span style={categoryStyle}>{category}</span>}
      />
    );
  }
  function SortMenu() {
    return (
      <SelectMenu
        selection={selectedSortMethod}
        setSelection={setSelectedSortMethod}
        tooltip="Sort"
        ButtonIcon={<SortIcon />}
        items={sortMethods}
        renderItem={(sortMethod) => sortMethod.label}
      />
    );
  }

  // On tablets and desktops, we show two rows of chips, instead.
  // One for filtering and another for sorting.
  function FilterChips() {
    return (
      <SelectChips
        selection={selectedCategory}
        setSelection={setSelectedCategory}
        items={categories}
        renderLabel={(category) => <span style={categoryStyle}>{category}</span>}
      />
    );
  }
  function SortChips() {
    return (
      <SelectChips
        selection={selectedSortMethod}
        setSelection={setSelectedSortMethod}
        items={sortMethods}
        renderLabel={(sortMethod) => sortMethod.label}
      />
    );
  }

  function ProductsGrid(props: { products: Product[] }) {
    let { products } = props;

    if (selectedCategory) {
      products = products.filter((product) => product.category === selectedCategory);
    }

    if (selectedSortMethod) {
      // In JS, sorting is done in-place. For React to work properly,
      // state should be updated immutably, so we replace `products`
      // with a sorted copy of itself.
      products = [...products].sort(selectedSortMethod.comparator);
    }

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

              <Typography
                color="primary"
                textAlign="center"
                fontSize={18}
                fontWeight={500}
              >
                {product.price} $
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
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
            <SortMenu />
            <FilterMenu />
          </Stack>

          <Stack
            display={{
              xs: "none",
              sm: "flex",
            }}
            spacing={1}
            marginBottom={2}
          >
            <FilterChips />
            <SortChips />
          </Stack>

          <ProductsGrid products={products.data} />
        </Container>
      )}
    </Box>
  );
}

function LoadingFallback() {
  return <div>Loading...</div>;
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
