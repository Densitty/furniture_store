import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getItemFromLS = () => {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getItemFromLS(),
  totalItems: 0,
  tax: 7.5,
  totalAmount: 0,
  shippingFee: 100000,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /* add item to cart */
  const addToCart = (id, color, amount, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { data: { id, color, amount, product } },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { data: id } });
  };

  const toggleAmount = (id, value) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: { data: { id, value } },
    });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  /* to save cart in LS */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));

    // track the amounts of items in cart whenever cart changes
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
