import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      console.log(action);
      return {
        ...state,
        isSidebarOpen: true,
      };

    case SIDEBAR_CLOSE:
      console.log(action);
      return {
        ...state,
        isSidebarOpen: false,
      };

    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        productsLoading: true,
      };

    case GET_PRODUCTS_SUCCESS:
      // console.log(action.payload);
      const featured_products = action.payload.data.filter((product) => {
        return product.featured === true;
      });

      return {
        ...state,
        productsLoading: false,
        featuredProducts: featured_products,
        products: action.payload.data,
      };

    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        productsLoading: false,
        productsError: true,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
    // return state;
  }
};

export default products_reducer;
