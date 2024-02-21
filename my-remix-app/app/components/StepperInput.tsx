import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Ripple } from "./Ripple";

export interface StepperInputProps
	extends React.ComponentPropsWithoutRef<"div"> {
	name: string;
	defaultValue?: number;
	min?: number;
	max?: number;
	className?: string;
}

export function StepperInput({
	name,
	defaultValue = 1,
	min,
	max,
	className = "",
	...props
}: StepperInputProps) {
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

	function handleKeyDown(event: React.KeyboardEvent) {
		switch (event.key) {
			case "ArrowUp":
			case "ArrowRight":
				event.preventDefault();
				increment();
				break;
			case "ArrowDown":
			case "ArrowLeft":
				event.preventDefault();
				decrement();
				break;
			case "Home":
				if (min === undefined) break;
				event.preventDefault();
				setValue(min);
				break;
			case "End":
				if (max === undefined) break;
				event.preventDefault();
				setValue(max);
				break;
		}
	}

	return (
		<div
			{...props}
			role="spinbutton"
			tabIndex={0}
			aria-valuenow={value}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-label="Quantity"
			className={`relative flex items-center gap-4 focus:outline focus:outline-2 focus:outline-current ${className}`}
			onKeyDown={handleKeyDown}
		>
			<input type="hidden" value={value} name={name} />
			<button
				type="button"
				tabIndex={-1}
				aria-label="Decrement quantity"
				disabled={value === min}
				className="icon-btn relative"
				onClick={decrement}
			>
				<Ripple disabled={value === min} />
				<MinusIcon />
			</button>
			<p className="text-lg font-medium tabular-nums">{value}</p>
			<button
				type="button"
				tabIndex={-1}
				aria-label="Increment quantity"
				disabled={value === max}
				className="icon-btn relative"
				onClick={increment}
			>
				<Ripple disabled={value === max} />
				<PlusIcon />
			</button>
		</div>
	);
}
