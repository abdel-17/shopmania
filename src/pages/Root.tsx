import "./Root.css";
import logo from "../assets/logo.svg";
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, useAuth } from "../firebase/auth";
import cart from "../assets/cart.svg";
import { FirebaseError } from "firebase/app";

interface RootProps {
  children: ReactNode;
}

function Root(props: RootProps) {
  const { pathname } = useLocation();
  const user = useAuth();

  // Hide the login and cart buttons in the login screen.
  const showActionButtons = pathname !== "/login";
  const isLoggedIn = user !== null && user !== undefined;
  const isLoggedOut = user === null;

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </nav>

        {showActionButtons && (
          <div className="action-buttons">
            {isLoggedIn && <LogoutButton />}
            {isLoggedOut && <LoginButton />}
            {isLoggedIn && <CartButton />}
          </div>
        )}
      </header>

      <main>{props.children}</main>

      <footer>
        <img src={logo} alt="logo" className="logo" />
        Shopmania
      </footer>
    </>
  );
}

interface NavLinkProps {
  to: string;
  children: string;
}

function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();
  const isSelected = props.to === pathname;
  const className = isSelected ? "selected destination" : "destination";
  return (
    <Link to={props.to} className="no-underline">
      <div className={className}>{props.children}</div>
    </Link>
  );
}

function LoginButton() {
  return (
    <Link to="/login" className="action-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 96 960 960"
        className="icon-button"
      >
        <path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z" />
      </svg>
    </Link>
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
    <button onClick={onClick} className="action-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 96 960 960"
        className="icon-button"
      >
        <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" />
      </svg>
    </button>
  );
}

function CartButton() {
  return (
    <Link to="/cart" className="action-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 96 960 960"
        className="icon-button"
      >
        <path d="M286.788 975Q257 975 236 953.788q-21-21.213-21-51Q215 873 236.212 852q21.213-21 51-21Q317 831 338 852.212q21 21.213 21 51Q359 933 337.788 954q-21.213 21-51 21Zm400 0Q657 975 636 953.788q-21-21.213-21-51Q615 873 636.212 852q21.213-21 51-21Q717 831 738 852.212q21 21.213 21 51Q759 933 737.788 954q-21.213 21-51 21ZM235 315l110 228h288l125-228H235Zm-30-60h589.074q22.964 0 34.945 21Q841 297 829 318L694 561q-11 19-28.559 30.5Q647.881 603 627 603H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z" />
      </svg>
    </Link>
  );
}

export default Root;
