import Root from "../Root";
import "./Login.css";
import { FormEvent, useState } from "react";
import { isSignedIn, signIn, signUp } from "./auth";
import { Navigate, useNavigate } from "react-router";

function Login() {
  // If we're already logged in, navigate to the home page.
  if (isSignedIn()) {
    return <Navigate to="/" replace />;
  }

  type FormTab = "login" | "register";

  const [selectedTab, setSelectedTab] = useState<FormTab>("login");
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {
    // Prevent the page from refreshing.
    event.preventDefault();

    const submission = new FormData(event.target as HTMLFormElement);
    const email = submission.get("email") as string;
    const password = submission.get("password") as string;

    try {
      if (selectedTab === "login") {
        signIn(email, password);
      } else if (selectedTab === "register") {
        signUp(email, password);
      }
      // Navigate to the home destination.
      navigate("/", { replace: true });
    } catch (error) {
      // Alert the user if login fails.
      alert(error);
    }
  };

  interface TabButtonProps {
    tab: FormTab
  }

  function TabButton(props: TabButtonProps) {
    const { tab } = props;

    const isSelected = tab === selectedTab;
    const className = `form-tab ${tab}-tab ${isSelected ? "active-tab" : ""}`;

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

            <button type="submit" className="form-submit-button filled-button">
              {selectedTab === "login" ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </Root>
  );
}

export default Login;
