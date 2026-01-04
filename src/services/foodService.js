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
    const response = await api.get(`${FOOD_API}/list`, {
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

export default {
  getFoodList,
  getFoodDetail,
};
import apiClient from './apiClient';
const findFirstFoodArray = (obj, depth = 0, maxDepth = 7) => {
  if (!obj || depth > maxDepth) return null;

  if (Array.isArray(obj)) {
    if (
      obj.length === 0 ||
      (typeof obj[0] === 'object' &&
        obj[0] !== null &&
        ('name' in obj[0] || 'basePrice' in obj[0] || 'imageUrl' in obj[0]))
    ) {
      return obj;
    }
    return null;
  }

  if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const found = findFirstFoodArray(obj[k], depth + 1, maxDepth);
      if (found) return found;
    }
  }

  return null;
};

const extractFoodList = (resBody) => {
  const arr = findFirstFoodArray(resBody);
  return Array.isArray(arr) ? arr : [];
};

const foodService = {
  getFoodList: async (params = {}) => {
    const body = await apiClient.get('/api/food/public-list', { params });
    return extractFoodList(body);
  },

  getFoodById: (id) => {
    return apiClient.get(`/api/food/get/${encodeURIComponent(id)}`);
  },
};

export default foodService;
