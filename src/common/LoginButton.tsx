import { Link } from "react-router-dom";
import "./LoginButton.css";

function LoginButton() {
  return (
    <Link to="/login" className="login">
      Login
    </Link>
  );
}

export default LoginButton;
