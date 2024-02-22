import "material-ripple-web/ripple.css";
import { useRippleRef } from "material-ripple-web/react";

export function Ripple(props: { disabled?: boolean }) {
	const ref = useRippleRef<HTMLDivElement>(props);
	return <div ref={ref} />;
}
