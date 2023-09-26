import {
  Info as InfoIcon,
  InfoOutlined as InfoOutlinedIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Store as StoreIcon,
  StoreOutlined as StoreOutlinedIcon,
  SupportAgent as SupportAgentIcon,
  SupportAgentOutlined as SupportAgentOutlinedIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Logo } from "../components";
import { useCartItems, useSession } from "../hooks";
import { supabase } from "../supabase";

export function Layout() {
  const session = useSession();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const onCloseMenu = () => setMenuAnchor(null);

  return (
    <>
      <AppBar component="header">
        <Toolbar>
          <Box width="100%">
            <Stack
              component="nav"
              direction="row"
              spacing={0.5}
              display={{
                xs: "none",
                md: "flex",
              }}
            >
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </Stack>

            <IconButton
              onClick={onOpenMenu}
              sx={{
                display: { md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={menuAnchor}
              open={menuAnchor !== null}
              onClose={onCloseMenu}
            >
              <MenuLinkItem
                to="/products"
                label="Products"
                Icon={<StoreOutlinedIcon />}
                SelectedIcon={<StoreIcon />}
                onClick={onCloseMenu}
              />
              <MenuLinkItem
                to="/about"
                label="About"
                Icon={<InfoOutlinedIcon />}
                SelectedIcon={<InfoIcon />}
                onClick={onCloseMenu}
              />
              <MenuLinkItem
                to="/contact"
                label="Contact Us"
                Icon={<SupportAgentOutlinedIcon />}
                SelectedIcon={<SupportAgentIcon />}
                onClick={onCloseMenu}
              />
            </Menu>
          </Box>

          {/** Center the logo horizontally in the toolbar */}
          <Link
            to="/"
            style={{
              position: "absolute",
              left: "50%",
              translate: "-50%",
            }}
          >
            <Logo scale={0.5} />
          </Link>

          {session && (
            <Stack direction="row" spacing={0.5}>
              <LogoutButton />
              <CartButton />
            </Stack>
          )}
          {session === null && <LoginButton />}
        </Toolbar>
      </AppBar>

      <Toolbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

function NavLink(props: { to: string; children: string }) {
  const { pathname } = useLocation();
  const { to, children } = props;
  const isSelected = to === pathname;
  return (
    <Button
      component={Link}
      to={to}
      variant="text"
      color={isSelected ? "primary" : "inherit"}
    >
      {children}
    </Button>
  );
}

function LoginButton() {
  return (
    <Tooltip title="Login">
      <IconButton component={Link} to="/login">
        <LoginIcon />
      </IconButton>
    </Tooltip>
  );
}

function LogoutButton() {
  const { mutate: logout, isLoading } = useMutation(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  });

  return (
    <Tooltip title="Logout">
      <IconButton onClick={() => logout()} disabled={isLoading}>
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
}

function CartButton() {
  const cartItems = useCartItems();
  const { pathname } = useLocation();

  const isSelected = pathname === "/cart";

  // Add up the quantities of all items in the cart.
  const totalQuantity = cartItems.data?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Tooltip title="Shopping Cart">
      <IconButton
        component={Link}
        to="/cart"
        color={isSelected ? "primary" : "default"}
      >
        <Badge
          color="primary"
          badgeContent={totalQuantity}
          invisible={isSelected}
        >
          {isSelected ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

function MenuLinkItem(props: {
  to: string;
  label: string;
  Icon: React.ReactNode;
  SelectedIcon: React.ReactNode;
  onClick: () => void;
}) {
  const { to, label, Icon, SelectedIcon, onClick } = props;
  const { pathname } = useLocation();
  const isSelected = to === pathname;
  return (
    <MenuItem
      component={Link}
      to={to}
      selected={isSelected}
      onClick={onClick}
      sx={{ width: 200, height: 50 }}
    >
      <ListItemIcon>{isSelected ? SelectedIcon : Icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}
