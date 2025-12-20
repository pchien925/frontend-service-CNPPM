import { getCacheAccessToken } from './userService';

const profileService = {
  getProfile: async () => {
    const accessToken = getCacheAccessToken();
    
    if (!accessToken) {
      throw new Error('No access token found');
    }

    try {
      const response = await fetch('https://backend-service-cnppm.onrender.com/api/account/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }
        throw new Error('Failed to fetch profile');
      }

      const res = await response.json();
      return res.data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  },
};

export default profileService;
