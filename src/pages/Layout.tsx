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
            <Box
              component="nav"
              display={{
                xs: "none",
                md: "flex",
              }}
            >
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </Box>

            <IconButton
              onClick={onOpenMenu}
              sx={{
                display: { md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
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

      <Menu
        anchorEl={menuAnchor}
        open={menuAnchor !== null}
        onClose={onCloseMenu}
      >
        <MenuLinkItem
          to="/products"
          Icon={<StoreOutlinedIcon />}
          SelectedIcon={<StoreIcon />}
          label="Products"
          onClick={onCloseMenu}
        />
        <MenuLinkItem
          to="/about"
          Icon={<InfoOutlinedIcon />}
          SelectedIcon={<InfoIcon />}
          label="About"
          onClick={onCloseMenu}
        />
        <MenuLinkItem
          to="/contact"
          Icon={<SupportAgentOutlinedIcon />}
          SelectedIcon={<SupportAgentIcon />}
          label="Contact Us"
          onClick={onCloseMenu}
        />
      </Menu>

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
      sx={{
        marginRight: 1,
        color: isSelected ? "primary.light" : "white",
      }}
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
  const onClick = () => logout();
  return (
    <Tooltip title="Logout">
      <IconButton onClick={onClick} disabled={isLoading}>
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
  Icon: React.ReactNode;
  SelectedIcon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const { to, Icon, SelectedIcon, label, onClick } = props;
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
