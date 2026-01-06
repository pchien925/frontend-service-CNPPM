import apiClient from './apiClient';

const branchService = {
  // Get list of branches with pagination
  getBranchList: (params = {}) => {
    return apiClient.get('/api/branch/list', { params });
  },

  // Get branch detail by ID
  getBranchById: (id) => {
    return apiClient.get(`/api/branch/get/${id}`);
  },

  // Create new branch (admin only)
  createBranch: (data) => {
    return apiClient.post('/api/branch/create', data);
  },

  // Update branch (admin only)
  updateBranch: (data) => {
    return apiClient.put('/api/branch/update', data);
  },

  // Delete branch (admin only)
  deleteBranch: (id) => {
    return apiClient.delete(`/api/branch/delete/${id}`);
  },
};

export default branchService;
