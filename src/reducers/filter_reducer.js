import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      // console.log(action.payload);
      return {
        ...state,
        allProducts: [...action.payload.data],
        filteredProducts: [...action.payload.data], // copy the data so as to get the default product
      };

    case SET_GRIDVIEW:
      return {
        ...state,
        gridView: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        gridView: false,
      };

    case UPDATE_SORT:
      console.log(action.payload);
      return {
        ...state,
        sort: action.payload.data,
      };

    case SORT_PRODUCTS:
      //get the filteredProducts and sort values from state
      const { filteredProducts, sort } = state;

      let temp = [...filteredProducts];

      if (sort === "price-lowest") {
        temp = temp.sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "price-highest") {
        temp = temp.sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "name-a") {
        temp = temp.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }

          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }

          return 0;
        });
      }

      if (sort === "name-z") {
        temp = temp.sort((a, b) => {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        });
      }

      return {
        ...state,
        filteredProducts: temp,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
