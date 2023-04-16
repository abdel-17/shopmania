import CartButton from "../../common/CartButton";
import LoginButton from "../../common/LoginButton";
import Root from "../../common/Root";
import "./Home.css";

function Home() {
  const isLoggedIn = localStorage.getItem("email") !== null;
  const actionButton = isLoggedIn ? <CartButton /> : <LoginButton />;

  return (
    <Root selectedDestination="home" actionButton={actionButton}>
      <div className="container">
        <h1>Welcome to Shopmania!</h1>
      </div>
    </Root>
  );
}

export default Home;
