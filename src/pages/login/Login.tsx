import Root from "../Root";
import "./Login.css";
import { FormEvent, useState } from "react";
import { signIn, signUp } from "./auth";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const toggle = () => setIsLoggingIn((value) => !value);

  const onSubmit = (event: FormEvent) => {
    // Prevent the page from refreshing.
    event.preventDefault();

    const submission = new FormData(event.target as HTMLFormElement);
    const email = submission.get("email") as string;
    const password = submission.get("password") as string;

    if (isLoggingIn) {
      signIn(email, password);
    } else {
      signUp(email, password);
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
