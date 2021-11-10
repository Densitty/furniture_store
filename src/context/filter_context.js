import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "price-lowest",
};

const FilterContext = React.createContext();

/* 
<ProductProvider>
  <FilterProvider>...</FilterProvider> // to access data 4rm product context 2 be accessed in FilterContext, wrap d FilterProvider with ProductContext
</ProductProvider>
*/

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { products } = useProductsContext();

  // to get data passed from parent provider to child provider, reload the comp when products data (coming from products context) change
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: { data: products } });
  }, [products]);

  /* on changing the sort state value, reload the component */
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });

    // products needs to be part of the dependency its initial value from the ProductsContext is [] before it gets populated from the request to api
  }, [products, state.sort]);

  const showProductsInGrid = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const showProductsInList = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const targetName = e.target.name;
    const value = e.target.value;

    dispatch({ type: UPDATE_SORT, payload: { data: value } });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, showProductsInGrid, showProductsInList, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
