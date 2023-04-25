import { Product } from "../../api";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

function ProductCard(props: ProductCardProps) {
  const { product } = props;
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-name">{product.title}</div>
    </div>
  );
}

export default ProductCard;
