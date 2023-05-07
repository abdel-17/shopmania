import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip } from "@mui/material";
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  ShoppingCartOutlined as OutlinedCartIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";
import useSession from "../hooks/session";
import supabase from "../supabase/client";

export default function Layout(props: { children: ReactNode }) {
  const session = useSession();
  const isLoggedOut = session === null;
  return (
    <>
      <AppBar component="header">
        <Toolbar>
          <Box component="nav" display="flex" flexGrow={1}>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </Box>

          {isLoggedOut && <LoginButton />}
          {session && <CartButton />}
          {session && <LogoutButton />}
        </Toolbar>
      </AppBar>

      <Toolbar />

      <main>{props.children}</main>
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
  const [loading, setLoading] = useState(false);
  
  const onClick = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <Tooltip title="Logout">
      <IconButton onClick={onClick} disabled={loading} sx={{ marginLeft: 1 }}>
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
}

function CartButton() {
  const { pathname } = useLocation();
  const isSelected = pathname === "/cart";
  return (
    <Tooltip title="Shopping Cart">
      <IconButton component={Link} to="/cart">
        {isSelected ? <CartIcon /> : <OutlinedCartIcon />}
      </IconButton>
    </Tooltip>
  );
}
