import { Fragment, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  ShoppingCartOutlined as OutlinedCartIcon,
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Store as StoreIcon,
  StoreOutlined as StoreOutlinedIcon,
  SupportAgent as SupportAgentIcon,
  SupportAgentOutlined as SupportAgentOutlinedIcon,
  Info as InfoIcon,
  InfoOutlined as InfoOutlinedIcon,
} from "@mui/icons-material";
import supabase from "../supabase/client";
import Logo from "./Logo";
import { useSession } from "../App";

export default function Layout() {
  const session = useSession();
  const [showDrawer, setShowDrawer] = useState(false);

  const onShowDrawer = () => setShowDrawer(true);
  const onHideDrawer = () => setShowDrawer(false);

  return (
    <>
      <AppBar component="header">
        <Toolbar sx={{ position: "relative" }}>
          <Box width="100%">
            <Box
              component="nav"
              display={{
                xs: "none",
                md: "inherit",
              }}
            >
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </Box>

            <IconButton
              onClick={onShowDrawer}
              sx={{
                display: {
                  md: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Logo
            width={140}
            style={{
              position: "absolute",
              left: "calc(50% - 70px)",
            }}
          />

          {session ? (
            <Fragment>
              <CartButton />
              <LogoutButton />
            </Fragment>
          ) : (
            <LoginButton />
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={showDrawer} onClose={onHideDrawer}>
        <List sx={{ width: 200, paddingTop: 2 }}>
          <ListItemLink
            to="/products"
            Icon={<StoreOutlinedIcon />}
            SelectedIcon={<StoreIcon />}
            label="Products"
            onClick={onHideDrawer}
          />
          <ListItemLink
            to="/about"
            Icon={<InfoOutlinedIcon />}
            SelectedIcon={<InfoIcon />}
            label="About"
            onClick={onHideDrawer}
          />
          <ListItemLink
            to="/contact"
            Icon={<SupportAgentOutlinedIcon />}
            SelectedIcon={<SupportAgentIcon />}
            label="Contact Us"
            onClick={onHideDrawer}
          />
        </List>
      </Drawer>

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

function ListItemLink(props: {
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
    <ListItemButton component={Link} to={to} selected={isSelected} onClick={onClick}>
      <ListItemIcon>{isSelected ? SelectedIcon : Icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItemButton>
  );
}
