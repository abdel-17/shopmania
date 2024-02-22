import {
	Await,
	defer,
	Link,
	redirect,
	useLoaderData,
	useLocation,
	useNavigation,
	type ClientLoaderFunctionArgs,
} from "@remix-run/react";
import { CheckIcon } from "lucide-react";
import { Suspense, type ReactNode } from "react";
import { Ripple } from "~/components/Ripple";
import type { Product } from "~/types";
import { categories, getProducts, type Category } from "./data";

const PARAMS = {
	category: "category",
} as const;

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
	const url = new URL(request.url);
	const category = url.searchParams.get(PARAMS.category);

	if (category !== null && !categories.includes(category as never)) {
		url.searchParams.delete(PARAMS.category);
		return redirect(url.toString(), { status: 302 });
	}

	const products = getProducts(category);
	return defer({ products });
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
			<Suspense fallback={<Loading />}>
				<Await resolve={products}>
					{(products) => <Products products={products} />}
				</Await>
			</Suspense>
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

function CategoryChip({ category }: { category: Category }) {
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
			className="chip relative"
		>
			<Ripple />
			<span>{category}</span>
			{selected && <CheckIcon size={18} />}
		</Link>
	);
}

function Loading() {
	const items = Array(9);
	for (let i = 0; i < items.length; ++i) {
		items[i] = <ProductSkeleton key={i} />;
	}
	return <ProductsGrid loading>{items}</ProductsGrid>;
}

function ProductSkeleton() {
	return (
		<div
			aria-hidden="true"
			className="w-[350px] max-w-full rounded-md bg-neutral-800 p-4"
		>
			<div className="mx-auto block h-[200px] w-[200px] animate-pulse rounded bg-neutral-700" />

			<div className="mt-2 py-[0.3125rem]">
				<div className="h-[1.125rem] animate-pulse rounded bg-neutral-700" />
			</div>

			<div className="mt-4 flex items-center justify-center gap-4">
				<div className="h-10 w-32 animate-pulse rounded-full bg-neutral-700" />
				<div className="py-[0.3125rem]">
					<div className="h-[1.125rem] w-16 animate-pulse rounded bg-neutral-700" />
				</div>
			</div>
		</div>
	);
}

function Products({ products }: { products: Product[] }) {
	return (
		<ProductsGrid>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</ProductsGrid>
	);
}

function ProductsGrid({
	loading,
	children,
}: {
	loading?: boolean;
	children?: ReactNode;
}) {
	return (
		<div
			aria-live="polite"
			aria-busy={loading}
			className="mx-auto grid w-fit grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
		>
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

			<Link
				to={`/products/${product.id}`}
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
