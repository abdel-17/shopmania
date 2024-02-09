import "material-ripple-web/ripple.css";

import { Ripple as MaterialRipple } from "material-ripple-web";
import React from "react";

export function Ripple() {
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (ref.current === null) return;
		const ripple = new MaterialRipple(ref.current);
		return ripple.destroy.bind(ripple);
	}, []);

	return <div ref={ref} />;
}
