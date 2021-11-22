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
      // get the max price
      const productPrices = action.payload.data.map((product) => {
        // console.log(product);
        return product.price;
      });
      // to get the max of the prices in maxPrice, spread the values of the maxPrice [] & run Math.max() on it
      const max_price = Math.max(...productPrices);
      const min_price = Math.min(...productPrices);

      return {
        ...state,
        allProducts: [...action.payload.data],
        filteredProducts: [...action.payload.data], // copy the data so as to get the default product
        filters: {
          ...state.filters,
          maxPrice: max_price,
          minPrice: min_price,
          actualPrice: max_price,
        },
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
      // console.log(action.payload);
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

    case UPDATE_FILTERS:
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          actualPrice: state.filters.maxPrice,
          shipping: false,
        },
      };

    case FILTER_PRODUCTS:
      // console.log("filtering products");
      const { allProducts } = state;
      const { text, category, company, color, shipping, actualPrice } =
        state.filters;

      // console.log(state);

      let tempProducts = [...allProducts];

      // filtereing stages
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name
            .toLowerCase()
            .startsWith(text.trim().toLowerCase());
        });
      }

      if (category !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.category.toLowerCase() === category.toLowerCase();
        });
      }

      if (company !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.company.toLowerCase() === company.toLowerCase();
        });
      }

      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.includes(color);
        });
      }

      if (actualPrice > 0) {
        tempProducts = tempProducts.filter((product) => {
          return product.price <= actualPrice;
        });
      }

      if (shipping) {
        tempProducts = tempProducts.filter((product) => {
          return product.shipping;
        });
      }

      // console.log(tempProducts);

      return {
        ...state,
        filteredProducts: tempProducts,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
