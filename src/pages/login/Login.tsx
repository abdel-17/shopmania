import Root from "../Root";
import "./Login.css";
import { FormEvent, useState } from "react";
import { isSignedIn, signIn, signUp } from "./auth";
import { Navigate, useNavigate } from "react-router";

function Login() {
  // If we're already logged in, navigate to the home page.
  if (isSignedIn()) {
    return <Navigate to="/" replace />
  }

  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const navigate = useNavigate();

  const toggle = () => setIsLoggingIn((value) => !value);

  const onSubmit = (event: FormEvent) => {
    // Prevent the page from refreshing.
    event.preventDefault();

    const submission = new FormData(event.target as HTMLFormElement);
    const email = submission.get("email") as string;
    const password = submission.get("password") as string;

    try {
      if (isLoggingIn) {
        signIn(email, password);
      } else {
        signUp(email, password);
      }
      // Navigate back to the previous destination.
      navigate(-1);
    } catch (error) {
      // Alert the user if login fails.
      alert(error);
    }
  };

  return (
    <Root>
      <div className="fullscreen centered">
        <form onSubmit={onSubmit} className="login-form">
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
