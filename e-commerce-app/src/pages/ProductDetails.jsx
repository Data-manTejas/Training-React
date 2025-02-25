import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/fakeStoreApi";
import { CartContext } from "../context/CartContext";


const ProductDetails = () => {
  const { id } = useParams();
  const { dispatch } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProducts().then((products) => {
      const selectedProduct = products.find((item) => item.id === parseInt(id));
      setProduct(selectedProduct);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button 
        className="add-to-cart" 
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
      >
        Add to Cart
      </button>
     

    </div>
  );
};

export default ProductDetails;
