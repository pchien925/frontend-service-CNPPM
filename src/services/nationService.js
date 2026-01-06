import apiClient from './apiClient';

const nationService = {
  // Get list of nations (provinces, districts, wards)
  getNationList: async (params = {}) => {
    try {
      const res = await apiClient.get('/api/nation/list', { params });
      return res.data;
    } catch (err) {
      console.error('Get nations error:', err);
      throw err;
    }
  },

  // Get provinces (kind = 3)
  getProvinces: async () => {
    try {
      const res = await apiClient.get('/api/nation/list', {
        params: { page: 0, limit: 100, kind: 3 }
      });
      
      if (res.data?.result && res.data?.data?.content) {
        return res.data.data.content;
      }
      return [];
    } catch (err) {
      console.error('Get provinces error:', err);
      return [];
    }
  },

  // Get districts by province (kind = 2, parentId = provinceId)
  getDistricts: async (provinceId) => {
    try {
      if (!provinceId) return [];
      
      const res = await apiClient.get('/api/nation/list', {
        params: { 
          page: 0, 
          limit: 100, 
          kind: 2,
          parentId: provinceId
        }
      });
      
      if (res.data?.result && res.data?.data?.content) {
        return res.data.data.content;
      }
      return [];
    } catch (err) {
      console.error('Get districts error:', err);
      return [];
    }
  },

  // Get wards by district (kind = 1, parentId = districtId)
  getWards: async (districtId) => {
    try {
      if (!districtId) return [];
      
      const res = await apiClient.get('/api/nation/list', {
        params: { 
          page: 0, 
          limit: 100, 
          kind: 1,
          parentId: districtId
        }
      });
      
      if (res.data?.result && res.data?.data?.content) {
        return res.data.data.content;
      }
      return [];
    } catch (err) {
      console.error('Get wards error:', err);
      return [];
    }
  },

  // Get nation by ID
  getNationById: async (id) => {
    try {
      const res = await apiClient.get(`/api/nation/${id}`);
      return res.data;
    } catch (err) {
      console.error('Get nation by ID error:', err);
      throw err;
    }
  }
};

export default nationService;
