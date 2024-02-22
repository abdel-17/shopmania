import { useLoaderData, type ClientLoaderFunctionArgs } from "@remix-run/react";
import { Ripple } from "~/components/Ripple";
import { StepperInput } from "~/components/StepperInput";
import { getProduct } from "./data";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
	const id = Number(params.id);
	const product = await getProduct(id);
	if (product === null) {
		throw new Response(null, {
			status: 404,
			statusText: "Product not found",
		});
	}
	return { product };
}

export default function Page() {
	const { product } = useLoaderData<typeof clientLoader>();
	return (
		<div className="flex min-h-full items-center justify-center p-8">
			<div className="flex flex-col items-center gap-6 md:flex-row">
				<img
					src={product.image}
					alt={product.title}
					className="h-[300px] w-[300px] shrink-0 rounded bg-white object-contain p-4"
				/>
				<div className="flex max-w-lg flex-col justify-center">
					<h1 className="text-3xl">{product.title}</h1>
					<p className="chip mt-3 w-fit">{product.category}</p>
					<p className="mt-5">{product.description}</p>
					<div className="mt-7 flex gap-6">
						{/* TODO: implement add to cart */}
						<button className="btn relative w-full">
							<Ripple />
							<span>Add to Cart</span>
						</button>
						<StepperInput min={1} name="quantity" />
					</div>
				</div>
			</div>
		</div>
	);
}
