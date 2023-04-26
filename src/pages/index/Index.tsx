import { Fragment } from "react";
import { Product, ProductCategory as ProductCategory, useProducts } from "../../api";
import "./Index.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  category: ProductCategory;
}

function CategoryProducts(props: CategoryProductsProps) {
  const { data: products } = useProducts(props.category);
  return (
    <div className="products-container">
      {products
        ? products.map((product) => (
            <div className="category-product" key={product.id}>
              <ProductCard product={product} key={product.id} />
            </div>
          ))
        : [1, 2, 3].map((i) => (
            <div className="category-product" key={i}>
              <ProductCardPlaceholder key={i} />
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

function ProductCardPlaceholder() {
  return (
    <div className="product-card">
      <Skeleton width="100%" height={175} />
      <Skeleton count={2} />
    </div>
  );
}

export default Index;
