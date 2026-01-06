// src/services/optionService.js
import api from './api';

const OPTION_VALUE_API = '/api/option-value';

/**
 * Lấy danh sách giá trị của một option
 * @param {string} optionId - ID của Option (không phải FoodOption)
 * @param {number} page - Trang (mặc định 0)
 * @param {number} limit - Giới hạn kết quả (mặc định 20)
 * @returns {Promise}
 */
export const getOptionValues = async (optionId, page = 0, limit = 20) => {
  try {
    const response = await api.get(`${OPTION_VALUE_API}/list`, {
      params: {
        page,
        limit,
        optionId, // Query parameter để lọc theo Option ID
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getOptionValues,
};
