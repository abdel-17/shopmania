import { Fragment } from "react";
import { Product, ProductCategory, productCategories, useProducts } from "../../api";
import "./Index.css";

function Index() {
  return (
    <div className="fullscreen">
      <h1 className="welcome-message">Welcome to Shopmania!</h1>

      {productCategories.map((category) => (
        <Fragment key={category}>
          <h2 className="category-name">{category}</h2>
          <CategoryProducts category={category} />
        </Fragment>
      ))}
    </div>
  );
}

function CategoryProducts(props: { category: ProductCategory }) {
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
function ProductCard(props: { product: Product }) {
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
      Loading...
      {/* <Skeleton width="100%" height={175} />
      <Skeleton count={2} /> */}
    </div>
  );
}

export default Index;
