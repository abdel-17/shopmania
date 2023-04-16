import Root from "../Root";
import "./Home.css";

function Home() {
  const isLoggedIn = localStorage.getItem("email") !== null;
  const action = isLoggedIn ? "cart" : "login"
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
