// import { useContext } from "react";
// import { GlobalContext } from "../context/GlobalState";
// import CartItem from "../components/CartItem";

// const Cart = () => {
//   const { state } = useContext(GlobalContext);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Your Cart</h1>
//       {state.cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         state.cart.map((item) => <CartItem key={item.id} item={item} />)
//       )}
//     </div>
//   );
// };

// export default Cart;
// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";

// const Cart = () => {
//   const { cart, dispatch } = useContext(CartContext);

//   console.log("🛒 Current Cart:", cart); // ✅ Check if cart data is available here

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <ul>
//           {cart.map((item) => (
//             <li key={item.id}>
//               {item.title} - ${item.price}
//               <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Cart;
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart } = useContext(CartContext);

  console.log("🛒 Current Cart:", cart); // ✅ Debugging log

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        cart.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
