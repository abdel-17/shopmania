import logo from "../assets/logo.svg";

type LogoProps = {
  width?: string | number;
  height?: string | number;
};

export function Logo(props: LogoProps) {
  const { width = 250, height = "auto" } = props;
  return <img src={logo} alt="Shopmania logo" width={width} height={height} />;
}
