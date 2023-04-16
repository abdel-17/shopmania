import Root from "../Root";
import { isSignedIn } from "../login/auth";
import "./Home.css";

function Home() {
  const action = isSignedIn() ?  "cart" : "login"
  return (
    <Root action={action}>
      <div className="fullscreen">
        <div className="container">
          <h1>Welcome to Shopmania!</h1>
        </div>
      </div>
    </Root>
  );
}

export default Home;
