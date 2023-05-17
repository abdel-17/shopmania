import {
  Box,
  Container,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";
import getData from "../supabase/getData";
import { Link } from "react-router-dom";
import Stepper from "../components/Stepper";
import { useState } from "react";

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
          // @ts-expect-error
          <CartItem key={product.id} product={{ ...product, quantity: quantity }} />
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
    quantity: number;
  };
}) {
  const { product } = props;
  const [quantity, setQuantity] = useState(product.quantity);
  const totalPrice = product.price * quantity;
  return (
    <Box display="flex" marginX={3} marginY={2}>
      <img
        src={product.image}
        alt={product.title}
        width={120}
        height={120}
        style={{
          objectFit: "contain",
          flexShrink: 0,
          padding: 8,
          borderRadius: 8,
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
            <Stepper value={quantity} onChange={setQuantity} />

            <Typography fontSize={20} textAlign="end" flexGrow={1}>
              {/** Show only two decimal places */}
              {totalPrice.toFixed(2)} $
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
