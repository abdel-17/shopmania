import { Link } from "react-router-dom";
import Root from "../Root";
import "./Login.css";

function Login() {
  return (
    <Root>
      <div className="fullscreen centered">
        <form className="login-form">
          <label className="text-field-label" htmlFor="email">
            Email
          </label>
          <input name="email" className="text-field" type="email" />

          <label className="password-label text-field-label" htmlFor="password">
            Password
          </label>
          <input name="password" className="text-field" type="password" />

          <button className="login filled-button" type="submit">
            Login
          </button>

          <div className="centered">
            <Link to="/register" className="register text-button">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </Root>
  );
}

export default Login;
