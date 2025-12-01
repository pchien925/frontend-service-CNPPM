import axiosInstance from "../services/api";

const apiClient = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => {
    if (data instanceof FormData) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      };
    }
    return axiosInstance.post(url, data, config);
  },
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),

  upload: (url, formData, config = {}) => {
    return axiosInstance.post(url, formData, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data', ...config.headers },
    });
  },
};

export default apiClient;