// src/services/foodService.js
import api from './api';

const FOOD_API = '/api/food';

/**
 * Lấy danh sách món ăn
 * @param {number} page - Trang (mặc định 0)
 * @param {number} limit - Số lượng trên trang (mặc định 20)
 * @returns {Promise}
 */
export const getFoodList = async (page = 0, limit = 20) => {
  try {
    const response = await api.get(`${FOOD_API}/public-list`, {
      params: {
        page,
        limit,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy chi tiết một món ăn
 * @param {string} foodId - ID của món ăn
 * @returns {Promise}
 */
export const getFoodDetail = async (foodId) => {
  try {
    const response = await api.get(`${FOOD_API}/get/${foodId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy danh sách tùy chọn (options) của một món ăn
 * @param {string} foodId - ID của món ăn
 * @param {number} page - Trang (mặc định 0)
 * @param {number} limit - Số lượng trên trang (mặc định 20)
 * @returns {Promise}
 */
export const getFoodOptions = async (foodId, page = 0, limit = 20) => {
  try {
    const response = await api.get('/api/food-option/list', {
      params: {
        foodId,
        page,
        limit,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getFoodList,
  getFoodDetail,
  getFoodOptions,
};
