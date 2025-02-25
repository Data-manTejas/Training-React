import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart } = useContext(CartContext);

  if (!cart) {
    console.error("⚠️ CartContext is not providing `cart` correctly.");
    return <p>Error: Cart not available</p>;
  }

  console.log("🛒 Current Cart:", cart);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={`${item.id}-${index}`}> 
            <h2>{item.title}</h2>
            <p>${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
