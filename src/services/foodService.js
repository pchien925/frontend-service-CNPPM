// src/services/foodService.js
import apiClient from './apiClient';

const FOOD_API = '/api/food';

/**
 * Lấy danh sách món ăn
 * @param {number} page - Trang (mặc định 0)
 * @param {number} limit - Số lượng trên trang (mặc định 20)
 * @returns {Promise}
 */
export const getFoodList = (page = 0, limit = 20) => {
  return apiClient.get(`${FOOD_API}/list`, {
    params: {
      page,
      limit,
    },
  });
};

/**
 * Lấy chi tiết một món ăn
 * @param {string} foodId - ID của món ăn
 * @returns {Promise}
 */
export const getFoodDetail = (foodId) => {
  return apiClient.get(`${FOOD_API}/get/${encodeURIComponent(foodId)}`);
};

const foodService = {
  getFoodList,
  getFoodDetail,
};

export default foodService;
