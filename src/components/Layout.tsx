import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, useFirebaseAuth } from "../firebase-hooks/auth";
import { FirebaseError } from "firebase/app";
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip } from "@mui/material";
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  ShoppingCartOutlined as OutlinedCartIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";

export default function Layout(props: { children: ReactNode }) {
  const user = useFirebaseAuth();

  const isLoggedIn = user !== null && user !== undefined;
  const isLoggedOut = user === null;

  return (
    <>
      <AppBar component="header">
        <Toolbar>
          <Box component="nav" display="flex" flexGrow={1}>
            <NavLink to="/">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </Box>

          {isLoggedOut && <LoginButton />}
          {isLoggedIn && <CartButton />}
          {isLoggedIn && <LogoutButton />}
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
  const onClick = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        alert(error.message);
      }
    }
  };

  return (
    <Tooltip title="Logout">
      <IconButton onClick={onClick} sx={{ marginLeft: 1 }}>
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
