// src/utils/imageUrl.js

const BASE_URL = 'https://backend-service-cnppm.onrender.com';

/**
 * Xử lý image URL
 * Nếu là relative path (chứa /), sử dụng API download endpoint
 * Nếu là đầy đủ URL, return as-is
 * 
 * @param {string} imageUrl - URL của ảnh từ API
 * @param {string} type - Loại file (AVATAR, CATEGORY, FOOD, etc.)
 * @returns {string} - Full URL để download ảnh
 */
export const buildImageUrl = (imageUrl, type = 'FOOD') => {
  // Nếu là full URL
  if (!imageUrl) {
    return `${BASE_URL}/api/file/download/${type}/placeholder.jpg`;
  }

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // Nếu là path như "c96adcdf-26a2-45ab-8a6d-578b3727df18.jpg"
  // Convert thành "/api/file/download/FOOD/c96adcdf-26a2-45ab-8a6d-578b3727df18.jpg"
  if (imageUrl && !imageUrl.includes('/')) {
    return `${BASE_URL}/api/file/download/${type}/${imageUrl}`;
  }

  // Nếu đã là path như "CATEGORY/1c53b4d6-bad2-4352-8167-8dd150913256.jpg"
  // Return with full URL
  return `${BASE_URL}/api/file/download/${imageUrl}`;
};

/**
 * Kiểm tra xem URL có hợp lệ không
 * @param {string} url 
 * @returns {boolean}
 */
export const isValidImageUrl = (url) => {
  return url && (url.startsWith('http') || url.length > 0);
};

export default {
  buildImageUrl,
  isValidImageUrl,
};
