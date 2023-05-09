import logo from "../assets/logo.svg";

export default function Logo(props: {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}) {
  return <img src={logo} alt="Shopmania" {...props} />;
}
