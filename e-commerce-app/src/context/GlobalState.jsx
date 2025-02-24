import { createContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  products: [],  // Stores all products
  cart: [],      // Stores cart items
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
