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
 * Tìm kiếm và lọc món ăn
 * @param {object} filters - Các filter
 * @returns {Promise}
 */
export const searchFoods = async (filters = {}) => {
  try {
    const response = await api.get(`${FOOD_API}/list`, {
      params: {
        page: filters.page || 0,
        limit: filters.limit || 20,
        name: filters.name || undefined,
        categoryId: filters.categoryId || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        status: filters.status !== undefined ? filters.status : 1,
        tagIds: filters.tagIds || undefined,
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
