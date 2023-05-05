import { Navigate } from "react-router";

export default function Index() {
  // Replace the index page ("/") with "/products"
  return <Navigate to="/products" replace />;
}
