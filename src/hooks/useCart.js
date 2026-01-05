// src/hooks/useCart.js
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import {
  selectCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartLoading,
  selectCartError,
  selectCartSuccess,
  selectCartIsEmpty,
} from '../store/selectors/cartSelector';
import {
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  resetCartError,
} from '../store/actions/cartAction';

const useCart = () => {
  const dispatch = useDispatch();

  // Select từ Redux
  const cart = useSelector(selectCart);
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const success = useSelector(selectCartSuccess);
  const isEmpty = useSelector(selectCartIsEmpty);

  // Fetch cart khi mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Hàm thêm vào giỏ
  const onAddToCart = useCallback((data) => {
    dispatch(addToCart(data));
  }, [dispatch]);

  // Hàm cập nhật item
  const onUpdateCartItem = useCallback((data) => {
    dispatch(updateCartItem(data));
  }, [dispatch]);

  // Hàm xóa item
  const onDeleteCartItem = useCallback((cartItemId) => {
    dispatch(deleteCartItem(cartItemId));
  }, [dispatch]);

  // Hàm xóa tất cả
  const onClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Reset error
  const onResetError = useCallback(() => {
    dispatch(resetCartError());
  }, [dispatch]);

  return {
    cart,
    items,
    totalPrice,
    loading,
    error,
    success,
    isEmpty,
    // Methods
    fetchCart: () => dispatch(fetchCart()),
    addToCart: onAddToCart,
    updateCartItem: onUpdateCartItem,
    deleteCartItem: onDeleteCartItem,
    clearCart: onClearCart,
    resetError: onResetError,
  };
};

export default useCart;
