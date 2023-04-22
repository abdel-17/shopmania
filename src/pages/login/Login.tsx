import Root from "../Root";
import "./Login.css";
import { FormEvent, useState } from "react";
import { Navigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth, useAuth } from "../../firebase/auth";

type FormTab = "login" | "register";

function Login() {
  const [selectedTab, setSelectedTab] = useState<FormTab>("login");
  const [loading, setLoading] = useState(false);
  const user = useAuth();

  if (user !== null) {
    // Replace this commponent with the home page on login.
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (event: FormEvent) => {
    // Prevent the page from refreshing.
    event.preventDefault();

    // Extract the form submission.
    const submission = new FormData(event.target as HTMLFormElement);
    const email = submission.get("email") as string;
    const password = submission.get("password") as string;

    try {
      setLoading(true);
      if (selectedTab === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (selectedTab === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        // Alert the user if login/registration fails.
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  interface TabButtonProps {
    tab: FormTab;
  }

  function TabButton(props: TabButtonProps) {
    const { tab } = props;

    const isSelected = tab === selectedTab;
    const className = `form-tab ${tab}-tab ${isSelected ? "active-tab" : "inactive-tab"}`;

    const onClick = () => setSelectedTab(tab);

    return (
      <button onClick={onClick} className={className}>
        {tab}
      </button>
    );
  }

  return (
    <Root>
      <div className="fullscreen centered">
        <div className="form-container">
          <div>
            <TabButton tab="login" />
            <TabButton tab="register" />
          </div>

          <form method="post" onSubmit={onSubmit} className="login-form">
            <label htmlFor="email" className="text-field-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="text-field"
            />

            <label htmlFor="password" className="form-password-label text-field-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete={selectedTab === "login" ? "current-password" : "new-password"}
              required
              className="text-field"
            />

            <button
              type="submit"
              disabled={loading}
              className="form-submit-button filled-button"
            >
              {selectedTab === "login" ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </Root>
  );
}

export default Login;
