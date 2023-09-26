import logo from "../assets/logo.svg";

type LogoProps = { scale?: number };

export function Logo(props: LogoProps) {
  const { scale = 1 } = props;
  return (
    <img
      src={logo}
      alt="Shopmania logo"
      width={scale * 267}
      height={scale * 71}
    />
  );
}
