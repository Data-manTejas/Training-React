
import React, { createContext, useReducer } from "react"; 

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        console.log("🛒 Adding to cart:", action.payload);
        return [...state, action.payload];
  
      case "REMOVE_FROM_CART":
        return state.filter((item) => item.id !== action.payload);
  
      default:
        return state;
    }
  };
  

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  console.log("📦 Cart State Updated:", cart); // ✅ Debugging log

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
