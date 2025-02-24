const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return { ...state, products: action.payload };
  
      case "ADD_TO_CART":
        return { ...state, cart: [...state.cart, action.payload] };
  
      case "REMOVE_FROM_CART":
        return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
  
      case "ADD_PRODUCT":
        return { ...state, products: [...state.products, action.payload] };
  
      case "EDIT_PRODUCT":
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  