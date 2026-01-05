// src/store/selectors/cartSelector.js

export const selectCart = (state) => state.cart.cart;

export const selectCartItems = (state) => state.cart.cart?.items || [];

export const selectCartTotalPrice = (state) => state.cart.cart?.totalPrice || 0;

export const selectCartLoading = (state) => state.cart.loading;

export const selectCartError = (state) => state.cart.error;

export const selectCartSuccess = (state) => state.cart.success;

export const selectCartIsEmpty = (state) => {
  const items = state.cart.cart?.items || [];
  return items.length === 0;
};
