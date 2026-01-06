// src/store/sagas/cartSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import * as cartActions from '../actions/cartAction';
import * as cartService from '../../services/cartService';

/**
 * Fetch giỏ hàng từ API
 */
function* fetchCartSaga() {
  yield put({ type: cartActions.FETCH_CART_REQUEST });
  try {
    const response = yield call(cartService.getMyCart);
    yield put({
      type: cartActions.SET_CART,
      payload: response.data || {},
    });
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    yield put({
      type: cartActions.FETCH_CART_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch cart',
    });
  }
}

/**
 * Thêm item vào giỏ hàng
 */
function* addToCartSaga(action) {
  try {
    const response = yield call(cartService.addToCart, action.payload);

    yield put({
      type: cartActions.ADD_TO_CART_SUCCESS,
      payload: response.data || {},
    });
  } catch (error) {
    console.error('Failed to add to cart:', error);
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      'Failed to add item to cart';

    yield put({
      type: cartActions.ADD_TO_CART_FAILURE,
      payload: errorMsg,
    });
  }
}

/**
 * Cập nhật item trong giỏ hàng
 */
function* updateCartItemSaga(action) {
  try {
    const response = yield call(cartService.updateCartItem, action.payload);
    yield put({
      type: cartActions.UPDATE_CART_ITEM_SUCCESS,
      payload: response.data || {},
    });
  } catch (error) {
    console.error('Failed to update cart item:', error);
    yield put({
      type: cartActions.UPDATE_CART_ITEM_FAILURE,
      payload: error.response?.data?.message || 'Failed to update cart item',
    });
  }
}

/**
 * Xóa item khỏi giỏ hàng
 */
function* deleteCartItemSaga(action) {
  try {
    const response = yield call(
      cartService.deleteCartItem,
      action.payload.cartItemId
    );
    yield put({
      type: cartActions.DELETE_CART_ITEM_SUCCESS,
      payload: response.data || {},
    });
  } catch (error) {
    console.error('Failed to delete cart item:', error);
    yield put({
      type: cartActions.DELETE_CART_ITEM_FAILURE,
      payload: error.response?.data?.message || 'Failed to delete cart item',
    });
  }
}

/**
 * Xóa tất cả items trong giỏ hàng
 */
function* clearCartSaga() {
  try {
    const response = yield call(cartService.clearCart);
    yield put({
      type: cartActions.CLEAR_CART_SUCCESS,
      payload: response.data || {},
    });
  } catch (error) {
    console.error('Failed to clear cart:', error);
    yield put({
      type: cartActions.CLEAR_CART_FAILURE,
      payload: error.response?.data?.message || 'Failed to clear cart',
    });
  }
}

export default function* cartSaga() {
  yield takeLatest(cartActions.FETCH_CART, fetchCartSaga);
  yield takeLatest(cartActions.ADD_TO_CART_REQUEST, addToCartSaga);
  yield takeLatest(cartActions.UPDATE_CART_ITEM_REQUEST, updateCartItemSaga);
  yield takeLatest(cartActions.DELETE_CART_ITEM_REQUEST, deleteCartItemSaga);
  yield takeLatest(cartActions.CLEAR_CART_REQUEST, clearCartSaga);
}
