import apiClient from './apiClient';

const authService = {
  login: (credentials) => apiClient.post('/api/auth/login', credentials),

  register: (userData) => apiClient.post('/api/auth/register', userData),

  verifyOtp: (data) => apiClient.post('/api/auth/verify-otp', data),

  resendOtp: (data) => apiClient.post('/api/auth/resend-otp', data),

  forgotPassword: (email) =>
    apiClient.post('/api/auth/forgot-password', { email }),

  resetPassword: ({ email, otpCode, newPassword }) =>
    apiClient.post('/api/auth/reset-password', { email, otpCode, newPassword }),
};

export default authService;
