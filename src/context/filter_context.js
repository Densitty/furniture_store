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
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    actualPrice: 0,
    shipping: false,
  },
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

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    /* 3 elements trigger updateFilters, <input/> and <button/> & <select></select>. Button does not have value attr, input & option inside select have, in order to cater for the name attribute on a btn to assign the textContent to the name ppty (another approach is to use <input type='button')> instead of <button> */
    if (name === "category") {
      value = e.target.textContent;
    }

    // for the color buttons, approach for category didn't work because it doesn't have a textContent, just background-color; hence approach of using a data-property
    if (name === "color") {
      value = e.target.dataset.color;
    }

    /* to convert the value from the range input to a number */
    if (name === "actualPrice") {
      value = Number(value);
    }

    /* to get the checked status for a checked input */
    if (name === "shipping") {
      value = e.target.checked;
    }

    // to get the text value typed into <input />, pass name & value into dispatch and use dynamic values to assign value to name (just as it's done in useState)
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  /* on changing the state value of filters.text as we are typing inside the <input />, reload the component to effect the products displayed */
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });

    /* anytime any of the state value of filters obj change, trigger component re-rendering */
  }, [state.filters]);

  const clearFilters = (e) => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        showProductsInGrid,
        showProductsInList,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
