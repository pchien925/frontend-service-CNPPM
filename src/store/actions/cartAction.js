// src/store/actions/cartAction.js

export const FETCH_CART = 'FETCH_CART';
export const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST';
export const SET_CART = 'SET_CART';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';

export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const UPDATE_CART_ITEM_REQUEST = 'UPDATE_CART_ITEM_REQUEST';
export const UPDATE_CART_ITEM_SUCCESS = 'UPDATE_CART_ITEM_SUCCESS';
export const UPDATE_CART_ITEM_FAILURE = 'UPDATE_CART_ITEM_FAILURE';

export const DELETE_CART_ITEM_REQUEST = 'DELETE_CART_ITEM_REQUEST';
export const DELETE_CART_ITEM_SUCCESS = 'DELETE_CART_ITEM_SUCCESS';
export const DELETE_CART_ITEM_FAILURE = 'DELETE_CART_ITEM_FAILURE';

export const CLEAR_CART_REQUEST = 'CLEAR_CART_REQUEST';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
export const CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE';

export const RESET_CART_ERROR = 'RESET_CART_ERROR';

// Action creators
export const fetchCart = () => ({
  type: FETCH_CART,
});

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const addToCart = (data) => ({
  type: ADD_TO_CART_REQUEST,
  payload: data,
});

export const updateCartItem = (data) => ({
  type: UPDATE_CART_ITEM_REQUEST,
  payload: data,
});

export const deleteCartItem = (cartItemId) => ({
  type: DELETE_CART_ITEM_REQUEST,
  payload: { cartItemId },
});

export const clearCart = () => ({
  type: CLEAR_CART_REQUEST,
});

export const resetCartError = () => ({
  type: RESET_CART_ERROR,
});
