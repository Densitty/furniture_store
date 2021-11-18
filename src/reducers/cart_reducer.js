import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // get the product details and the product object from the payload data (obtained 4rm AddToCart component)
      const { id, amount, color, product } = action.payload.data;

      // to add items
      // first check if product is inside the cart array
      const tempItem = state.cart.find((cartItem) => {
        /* check if the item is in the cart by comparing it with the (id + color) of the product clicked (need to check for color, together with id, because an item can have multiple colors). id + color is coming from the SingleProduct page */
        return cartItem.id === id + color;
      });
      // console.log(tempItem);

      // if item (i.e the item clicked and the exact same color, if there are many colors) already exists in cart, increase its qty
      if (tempItem) {
        // 1. loop over the items in the cart
        const tempCart = state.cart.map((cartItem) => {
          // console.log(cartItem);

          // 1a check for the id if it matches
          if (cartItem.id === id + color) {
            /* cartItem is the old amount/qty already in d cart, amount is the new amout/qty we clicked on in the item page */
            let newAmount = cartItem.amount + amount;

            // before newAmount is accepted, check if it is not above the stock value, which is max
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }

            return { ...cartItem, amount: newAmount };
          } else {
            // if no match id (i.e same product [already exists in cart] but now different color chosen), return the item, i.e d item is new

            return cartItem;
          }
        });

        return { ...state, cart: tempCart };
      } else {
        // else, item not in cart, add to cart
        const newItem = {
          id: id + color /* combine product color & id 2 form d new id */,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock, // a new ppty 2 check for stock value
        };

        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }

    case REMOVE_CART_ITEM:
      const tempCart = state.cart.filter((item) => {
        return item.id !== action.payload.data;
      });

      return {
        ...state,
        cart: tempCart,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case TOGGLE_CART_ITEM_AMOUNT:
      const {
        data: { id: cartItemID, value },
      } = action.payload;

      const temp = state.cart.map((cartItem) => {
        // check if id of item clicked is present in the cart
        if (cartItem.id === cartItemID) {
          // check if the btn is an increment btn
          if (value === "inc") {
            let newAmount = cartItem.amount + 1;
            // check the amount/qty of item against the max in stock
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }

            return {
              ...cartItem,
              amount: newAmount,
            };
          }

          // check if the btn is an increment btn
          if (value === "dec") {
            let newAmount = cartItem.amount - 1;
            // check the amount/qty of item less than or
            if (newAmount < 1) {
              newAmount = 1;
            }

            return {
              ...cartItem,
              amount: newAmount,
            };
          }
        } else {
          // if the id of the item is not in the cart, return the whole cart
          return cartItem;
        }
      });

      return {
        ...state,
        cart: temp,
      };

    case COUNT_CART_TOTALS:
      const { totalItems, totalAmount } = state.cart.reduce(
        (acc, item) => {
          const { amount, price } = item;
          // on each loop, add the amount on each item to the totalItems (qties) on cart
          acc.totalItems += amount;
          // add the price based on the price and the amount (qty) of the item
          acc.totalAmount += price * amount;

          return acc;
        },
        {
          totalItems: 0,
          totalAmount: 0,
        }
      );

      return {
        ...state,
        totalItems,
        totalAmount,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
