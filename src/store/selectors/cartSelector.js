// src/store/selectors/cartSelector.js

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalItems = (state) => state.cart.totalItems;

export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export const selectCartItemById = (foodId) => (state) =>
  state.cart.items.find((item) => item.foodId === foodId);

export const selectCartIsEmpty = (state) => state.cart.items.length === 0;
