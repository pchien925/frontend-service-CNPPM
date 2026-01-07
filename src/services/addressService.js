import apiClient from './apiClient';

const addressService = {
  // Get list of addresses for current account
  getAddressList: (params = {}) => {
    return apiClient.get('/api/address/list', { params });
  },

  // Get addresses with pagination and accountId
  getAddresses: (page = 0, limit = 20, accountId = null) => {
    const params = { page, limit };
    if (accountId) {
      params.accountId = accountId;
    }
    return apiClient.get('/api/address/list', { params });
  },

  // Get address detail by ID
  getAddressById: (id) => {
    return apiClient.get(`/api/address/get/${id}`);
  },

  // Auto-complete address search
  autoCompleteAddress: (params = {}) => {
    return apiClient.get('/api/address/auto-complete', { params });
  },

  // Create new address
  createAddress: (data) => {
    return apiClient.post('/api/address/create', data);
  },

  // Update address
  updateAddress: (data) => {
    return apiClient.put('/api/address/update', data);
  },

  // Delete address
  deleteAddress: (id) => {
    return apiClient.delete(`/api/address/delete/${id}`);
  },
};

export default addressService;
