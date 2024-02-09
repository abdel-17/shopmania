import { Loader2 as SpinnerIcon, type LucideProps } from "lucide-react";

export type SpinnerProps = LucideProps;

export function Spinner({ size = 48, className, ...props }: SpinnerProps) {
	return (
		<SpinnerIcon
			size={size}
			className={`animate-spin text-primary ${className}`}
			{...props}
		/>
	);
}
