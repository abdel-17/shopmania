import { Fragment } from "react";
import { Product, ProductCaegory, useProducts } from "../../api";
import "./Index.css";

function Index() {
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
        <Fragment key={category}>
          <h2 className="category-name">{category}</h2>
          <CategoryProducts category={category} />
        </Fragment>
      ))}
    </div>
  );
}

interface CategoryProductsProps {
  category: ProductCaegory;
}

function CategoryProducts(props: CategoryProductsProps) {
  const { data: products } = useProducts(props.category);
  return (
    <div className="products-container">
      {products?.map((product) => (
        <div className="category-product" key={product.id}>
          <ProductCard product={product} key={product.id} />
        </div>
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard(props: ProductCardProps) {
  const { product } = props;
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div>
        <div className="product-name">{product.title}</div>
        <div className="product-price">{product.price}$</div>
      </div>
    </div>
  );
}

export default Index;
