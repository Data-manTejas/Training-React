import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); 

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">${product.price}</p>
      <button className="product-button" onClick={() => navigate(`/product/${product.id}`)}>
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
