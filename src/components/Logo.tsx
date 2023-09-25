import logo from "../assets/logo.svg";

export default function Logo(props: {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}) {
  const { style, ...rest } = props;
  return (
    <img
      src={logo}
      alt="Shopmania"
      width={250}
      style={{
        // Contain the image within the parent component.
        maxWidth: "100%",
        ...style,
      }}
      {...rest}
    />
  );
}
