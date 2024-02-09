import {
	Link,
	useLoaderData,
	useLocation,
	useNavigation,
	type ClientLoaderFunctionArgs,
} from "@remix-run/react";
import { CheckIcon } from "lucide-react";
import React from "react";
import { Ripple } from "~/components/Ripple";
import {
	PARAMS,
	categories,
	getProducts,
	type Product,
	type ProductCategory,
} from "./data";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
	const url = new URL(request.url);
	const products = await getProducts(url.searchParams);
	return { products };
}

export default function Page() {
	const { products } = useLoaderData<typeof clientLoader>();
	return (
		<div className="p-4 pt-8">
			<h1 className="text-center text-4xl font-bold">
				Welcome to <span className="text-primary">Shopmania</span>
			</h1>

			<h2 className="mt-3 text-center text-2xl">
				Browse our diverse product catalog
			</h2>

			<FilterNav className="mb-6 mt-8" />
			<Products products={products} />
		</div>
	);
}

function FilterNav({ className }: { className?: string }) {
	return (
		<nav className={className}>
			{/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
			<ul role="list" className="flex flex-wrap justify-center gap-3">
				{categories.map((category) => (
					<li key={category}>
						<CategoryChip category={category} />
					</li>
				))}
			</ul>
		</nav>
	);
}

function CategoryChip({ category }: { category: ProductCategory }) {
	const navigation = useNavigation();
	const location = useLocation();

	const selected =
		navigation.state === "loading" &&
		navigation.location.pathname === location.pathname
			? new URLSearchParams(navigation.location.search).get(PARAMS.category) ===
				category
			: new URLSearchParams(location.search).get(PARAMS.category) === category;

	const searchParams = new URLSearchParams(location.search);
	if (selected) {
		searchParams.delete(PARAMS.category);
	} else {
		searchParams.set(PARAMS.category, category);
	}

	return (
		<Link
			to={`?${searchParams}`}
			preventScrollReset
			prefetch="intent"
			role="checkbox"
			aria-checked={selected}
			className="relative inline-flex h-8 items-center justify-center gap-2 rounded-md bg-secondary-700 px-3 text-sm font-medium text-secondary-50"
		>
			<Ripple />
			<span>{category}</span>
			{selected && <CheckIcon size={18} />}
		</Link>
	);
}

function Products({ products }: { products: Product[] }) {
	const navigation = useNavigation();

	if (navigation.state === "loading" && navigation.location.pathname === "/") {
		const items = Array(9);
		for (let i = 0; i < items.length; ++i) {
			items[i] = <ProductSkeleton key={i} />;
		}
		return <ResponsiveGrid>{items}</ResponsiveGrid>;
	}

	return (
		<ResponsiveGrid>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</ResponsiveGrid>
	);
}

function ProductSkeleton() {
	return (
		<div className="h-[325px] w-[350px] max-w-full animate-pulse rounded-md bg-neutral-700" />
	);
}

function ResponsiveGrid({ children }: { children?: React.ReactNode }) {
	return (
		<div className="mx-auto grid w-fit grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{children}
		</div>
	);
}

function ProductCard({ product }: { product: Product }) {
	return (
		<div className="w-[350px] max-w-full rounded-md bg-neutral-800 p-4">
			<img
				loading="lazy"
				src={product.image}
				alt={product.title}
				className="mx-auto block h-[200px] w-[200px] rounded bg-white object-contain p-2"
			/>

			{/* TODO: change the link's href */}
			<Link
				to={`#`}
				className="mt-2 line-clamp-1 text-center text-lg font-medium text-white hover:underline"
			>
				{product.title}
			</Link>

			<div className="mt-4 flex items-center justify-center gap-4">
				{/* TODO: implement add to cart */}
				<button className="btn relative">
					<Ripple />
					<span>Add to Cart</span>
				</button>

				<p className="text-center text-lg font-medium text-primary">
					{product.price} $
				</p>
			</div>
		</div>
	);
}
