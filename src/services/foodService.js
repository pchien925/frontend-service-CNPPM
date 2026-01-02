import apiClient from './apiClient';

const foodService = {
  getFoodList: (params = {}) => {
    return apiClient.get('/api/food/list', { params });
  },

  getFoodById: (id) => {
    return apiClient.get(`/api/food/get/${encodeURIComponent(id)}`);
  },
};

export default foodService;
