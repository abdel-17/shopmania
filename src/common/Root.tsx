import "./Root.css";
import logo from "../assets/logo.svg";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface RootProps {
  selectedDestination: Destination;
  actionButton: ReactNode;
  children: ReactNode;
}

type Destination = "home" | "products" | "about" | "contact" | "cart";

function Root({ selectedDestination, actionButton, children }: RootProps) {
  function classOf(destination: Destination) {
    return destination === selectedDestination ? "selected" : "deselected";
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/" className={classOf("home")}>
            Home
          </Link>

          <Link to="/products" className={classOf("products")}>
            Products
          </Link>

          <Link to="/about" className={classOf("about")}>
            About
          </Link>

          <Link to="/contact" className={classOf("contact")}>
            Contact Us
          </Link>
        </nav>

        {actionButton}
      </header>

      <main>{children}</main>

      <footer>
        <img src={logo} alt="logo" className="logo" />
        Shopmania
      </footer>
    </>
  );
}

export default Root;
