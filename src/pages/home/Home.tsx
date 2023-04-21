import Root from "../Root";
import "./Home.css";
import { useAuth } from "../../firebase/auth";

function Home() {
  const user = useAuth();
  return (
    <Root action={user !== null ? "cart" : "login"}>
      <div className="fullscreen">
        <div className="container">
          <h1>Welcome to Shopmania!</h1>
        </div>
      </div>
    </Root>
  );
}

export default Home;
