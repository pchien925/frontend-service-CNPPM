// src/services/comboGroupService.js
import api from './api';

const COMBO_GROUP_API = '/api/combo-group';

/**
 * Lấy danh sách combo groups của một combo
 * @param {string} comboId - ID của combo
 * @param {number} page - Trang (mặc định 0)
 * @param {number} limit - Giới hạn kết quả (mặc định 20)
 * @returns {Promise}
 */
export const getComboGroups = async (comboId, page = 0, limit = 20) => {
  try {
    const response = await api.get(`${COMBO_GROUP_API}/list`, {
      params: {
        page,
        limit,
        comboId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Lấy chi tiết combo group
 * @param {string} comboGroupId - ID của combo group
 * @returns {Promise}
 */
export const getComboGroupDetail = async (comboGroupId) => {
  try {
    const response = await api.get(`${COMBO_GROUP_API}/get/${comboGroupId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getComboGroups,
  getComboGroupDetail,
};
