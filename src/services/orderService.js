import apiClient from './apiClient';

const orderService = {
  // Create new order (checkout)
  createOrder: (data) => {
    return apiClient.post('/api/order/checkout', data);
  },

  // Get user's order history
  getMyOrders: (params = {}) => {
    return apiClient.get('/api/order/my-orders', { params });
  },

  // Get order detail by ID
  getOrderById: (id) => {
    return apiClient.get(`/api/order/${id}`);
  },

  // Cancel order
  cancelOrder: (id, reason) => {
    return apiClient.patch(`/api/order/${id}/cancel`, { cancelReason: reason });
  },

  // Get order list (admin only)
  getOrderList: (params = {}) => {
    return apiClient.get('/api/order/list', { params });
  },

  // Update order status (admin only)
  updateOrderStatus: (id, data) => {
    return apiClient.put(`/api/order/${id}/status`, data);
  },
};

export default orderService;
