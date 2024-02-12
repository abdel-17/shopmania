import "./app.postcss";

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
	type MetaFunction,
} from "@remix-run/react";
import { Spinner } from "./components/Spinner";

export const meta: MetaFunction = () => [
	{ title: "Shopmania" },
	{
		name: "description",
		content: "E-Commerce website built with React and Supabase.",
	},
];

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function HydrateFallback() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<div className="flex h-full items-center justify-center">
					<Spinner aria-label="Loading" />
				</div>
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	return (
		<html lang="en">
			<head>
				<title>Shopmania - Error</title>
				<Meta />
				<Links />
			</head>
			<body>
				<div className="flex h-full items-center justify-center">
					<p className="text-3xl">{formatError(error)}</p>
				</div>
				<Scripts />
			</body>
		</html>
	);
}

function formatError(error: unknown): string {
	if (error instanceof Response) {
		return `${error.status} - ${error.statusText}`;
	} else if (error instanceof Error) {
		return error.message;
	} else {
		return "An unknown error occurred";
	}
}
