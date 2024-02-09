import "./app.postcss";

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
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
					<Spinner />
				</div>
				<Scripts />
			</body>
		</html>
	);
}
