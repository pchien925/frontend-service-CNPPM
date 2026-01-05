// src/store/reducers/cartReducer.js
import * as cartActions from '../actions/cartAction';

const initialState = {
  cart: {
    id: null,
    totalPrice: 0,
    items: [],
  },
  loading: false,
  error: null,
  success: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    // Fetch cart
    case cartActions.FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case cartActions.SET_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };

    case cartActions.FETCH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Add to cart
    case cartActions.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case cartActions.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
        success: 'Item added to cart successfully',
      };

    case cartActions.ADD_TO_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update cart item
    case cartActions.UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case cartActions.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
        success: 'Cart item updated successfully',
      };

    case cartActions.UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete cart item
    case cartActions.DELETE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case cartActions.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
        success: 'Item removed from cart',
      };

    case cartActions.DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear cart
    case cartActions.CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case cartActions.CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
        success: 'Cart cleared successfully',
      };

    case cartActions.CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reset error
    case cartActions.RESET_CART_ERROR:
      return {
        ...state,
        error: null,
        success: null,
      };

    default:
      return state;
  }
}
