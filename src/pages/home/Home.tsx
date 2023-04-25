import { ProductCaegory, useProducts } from "../../api";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

function Home() {
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ] as const;
  return (
    <div className="fullscreen">
      <h1 className="welcome-message">Welcome to Shopmania!</h1>

      {categories.map((category) => (
        <>
          <h2 className="category-name">{category}</h2>
          <CategoryProducts category={category} key={category} />
        </>
      ))}
    </div>
  );
}

interface CategoryProductsProps {
  category: ProductCaegory;
}

function CategoryProducts(props: CategoryProductsProps) {
  const { category } = props;
  const { data: products } = useProducts({ category });
  return (
    <div className="products-container">
      {products?.map((product) => (
        <div className="category-product">
          <ProductCard product={product} key={product.id} />
        </div>
      ))}
    </div>
  );
}

export default Home;
