import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const CartItem = ({ item }) => {
  const { dispatch } = useContext(GlobalContext);

  return (
    <div className="flex justify-between p-4 border-b">
      <div className="flex gap-4">
        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover" />
        <div>
          <h2 className="text-lg">{item.title}</h2>
          <p>${item.price}</p>
        </div>
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
