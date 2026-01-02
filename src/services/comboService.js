// src/services/comboService.js
import api from './api';

const COMBO_API = '/api/combo';

/**
 * Lấy danh sách combo
 * @param {number} page - Trang (mặc định 0)
 * @param {number} limit - Số lượng trên trang (mặc định 20)
 * @returns {Promise}
 */
export const getComboList = async (page = 0, limit = 20) => {
  try {
    const response = await api.get(`${COMBO_API}/list`, {
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
 * Lấy chi tiết một combo
 * @param {string} comboId - ID của combo
 * @returns {Promise}
 */
export const getComboDetail = async (comboId) => {
  try {
    const response = await api.get(`${COMBO_API}/get/${comboId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getComboList,
  getComboDetail,
};
