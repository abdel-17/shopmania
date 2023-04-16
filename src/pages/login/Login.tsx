import Root from "../Root";
import "./Login.css";
import { useState } from "react";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const toggle = () => setIsLoggingIn((value) => !value);
  return (
    <Root>
      <div className="fullscreen centered">
        <form className="login-form">
          <label htmlFor="email " className="text-field-label">
            Email
          </label>
          <input name="email" type="email" className="text-field" />

          <label htmlFor="password" className="form-password-label text-field-label">
            Password
          </label>
          <input name="password" type="password" className="text-field" />

          <button type="submit" className="form-submit-button filled-button">
            {isLoggingIn ? "Login" : "Create Account"}
          </button>

          <div className="form-helper-text">
            {isLoggingIn ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggle}
              className="form-hyperlink-text text-button"
            >
              {isLoggingIn ? "Sign up" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </Root>
  );
}

export default Login;
