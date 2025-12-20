
import api from './api';

const apiClient = {
  get: (url, config = {}) => api.get(url, config),

  post: (url, data = {}, config = {}) => {
    if (data instanceof FormData) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      };
    }
    return api.post(url, data, config);
  },

  put: (url, data = {}, config = {}) =>
    api.put(url, data, config),

  patch: (url, data = {}, config = {}) =>
    api.patch(url, data, config),

  delete: (url, config = {}) =>
    api.delete(url, config),

  upload: (url, formData, config = {}) =>
    api.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers,
      },
    }),
};

export default apiClient;