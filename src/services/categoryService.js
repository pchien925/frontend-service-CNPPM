// src/services/categoryService.js
import api from './api';

const CATEGORY_API = '/api/category';

/**
 * Lấy danh sách danh mục
 * @param {number} page - Trang (mặc định 0)
 * @param {number} limit - Số lượng trên trang (mặc định 20)
 * @returns {Promise}
 */
export const getCategoryList = async (page = 0, limit = 20) => {
  try {
    const response = await api.get(`${CATEGORY_API}/list`, {
      params: {
        page,
        limit,
        status: 1, // Only active categories
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy chi tiết một danh mục
 * @param {string} categoryId - ID của danh mục
 * @returns {Promise}
 */
export const getCategoryDetail = async (categoryId) => {
  try {
    const response = await api.get(`${CATEGORY_API}/get/${categoryId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getCategoryList,
  getCategoryDetail,
};
