// src/services/cartService.js
import api from './api';

const CART_API = '/api/cart';

/**
 * Lấy giỏ hàng của user hiện tại
 * @returns {Promise}
 */
export const getMyCart = async () => {
  try {
    const response = await api.get(`${CART_API}/my-cart`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Thêm thực phẩm hoặc combo vào giỏ hàng
 * @param {Object} data - {itemId, itemKind, quantity, note, optionIds, comboSelectionFoodIds}
 * @returns {Promise}
 */
export const addToCart = async (data) => {
  try {
    const response = await api.post(`${CART_API}/add`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Cập nhật số lượng hoặc ghi chú của item trong giỏ
 * @param {Object} data - {cartItemId, quantity, note}
 * @returns {Promise}
 */
export const updateCartItem = async (data) => {
  try {
    const response = await api.patch(`${CART_API}/update-item`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Xóa một item khỏi giỏ hàng
 * @param {string} cartItemId - ID của cart item
 * @returns {Promise}
 */
export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await api.delete(`${CART_API}/item/${cartItemId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Xóa tất cả items trong giỏ hàng
 * @returns {Promise}
 */
export const clearCart = async () => {
  try {
    const response = await api.delete(`${CART_API}/clear`);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getMyCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
