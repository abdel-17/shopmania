import {
  Box,
  Container,
  Divider,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";
import getData from "../supabase/getData";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Cart() {
  const { data: items } = useQuery({
    queryKey: ["cart"],
    queryFn: async () =>
      getData(
        await supabase
          .from("cart_items")
          .select(
            `quantity,
             product:products(
              id,
              title,
              category,
              image,
              price
            )`
          )
          .order("quantity", { ascending: false })
      ),
  });

  if (!items) {
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth="md" disableGutters sx={{ paddingY: 2 }}>
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        marginLeft={3}
        marginY={2}
      >
        Shopping Cart
      </Typography>

      <Stack divider={<Divider />}>
        {items.map(({ product, quantity }) => (
          <CartItem key={product.id} product={product} quantity={quantity} />
        ))}
      </Stack>
    </Container>
  );
}

function CartItem(props: {
  product: {
    id: number;
    title: string;
    category: string;
    image: string;
    price: number;
  };
  quantity: number;
}) {
  const { product, quantity } = props;
  return (
    <Box display="flex" marginX={3} marginY={2}>
      <img
        src={product.image}
        width={150}
        height={150}
        style={{
          objectFit: "contain",
          flexShrink: 0,
          padding: 8,
          borderRadius: 16,
          background: "white",
        }}
      />

      <Stack marginLeft={2} flexGrow={1}>
        <MuiLink
          component={Link}
          to={`/products/${product.id.toString()}`}
          sx={{
            color: "white",
            textDecoration: "none",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          <Typography fontWeight={500} fontSize={17}>
            {product.title}
          </Typography>
        </MuiLink>

        <Typography color="text.secondary" fontSize={15}>
          {product.category}
        </Typography>

        <Box display="flex" alignItems="end" flexGrow={1}>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <IconButton size="medium">
              <Add fontSize="inherit" />
            </IconButton>

            <Typography fontWeight={500} fontSize={18} marginX={1}>
              {quantity}
            </Typography>

            <IconButton size="medium">
              <Remove fontSize="inherit" />
            </IconButton>

            <Typography fontSize={18} textAlign="end" flexGrow={1}>
              {product.price * quantity} $
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
