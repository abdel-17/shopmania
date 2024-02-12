import "material-ripple-web/ripple.css";

import { Ripple as MaterialRipple } from "material-ripple-web";
import { useEffect, useRef } from "react";

export type RippleProps = {
	disabled?: boolean;
};

export function Ripple({ disabled }: RippleProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current === null) return;
		const ripple = new MaterialRipple(ref.current);
		return ripple.destroy.bind(ripple);
	}, []);

	return <div ref={ref} data-disabled={disabled ? "" : undefined} />;
}
