import { MinusIcon, PlusIcon } from "lucide-react";
import { useState, type ComponentPropsWithoutRef } from "react";
import { Ripple } from "./Ripple";

export interface StepperProps extends ComponentPropsWithoutRef<"div"> {
	defaultValue?: number;
	min?: number;
	max?: number;
	className?: string;
}

export function Stepper({
	defaultValue = 0,
	min,
	max,
	className = "",
	...props
}: StepperProps) {
	const [value, setValue] = useState(defaultValue);

	function increment() {
		setValue((value) => {
			if (max !== undefined) {
				return Math.min(value + 1, max);
			}
			return value + 1;
		});
	}

	function decrement() {
		setValue((value) => {
			if (min !== undefined) {
				return Math.max(value - 1, min);
			}
			return value - 1;
		});
	}

	return (
		<div className={`flex items-center gap-4 ${className}`} {...props}>
			<input
				type="hidden"
				value={value}
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
			/>
			<button
				aria-label="Increment"
				disabled={value === max}
				className="icon-btn relative"
				onClick={increment}
			>
				<Ripple disabled={value === max} />
				<PlusIcon />
			</button>
			<p className="text-lg font-medium tabular-nums">{value}</p>
			<button
				aria-label="Decrement"
				disabled={value === min}
				className="icon-btn relative"
				onClick={decrement}
			>
				<Ripple disabled={value === min} />
				<MinusIcon />
			</button>
		</div>
	);
}
