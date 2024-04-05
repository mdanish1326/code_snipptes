import axios from 'axios';

// Function to create an Axios instance
const createAxiosInstance = (endpoint, version) => {
  const axiosInstance = axios.create({
    baseURL: `${endpoint}/${version}`, // Example: 'https://api.example.com/v1'
  });

  // Request interceptor to add the auth token before each request
  axiosInstance.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem('access_token');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token expiration and refresh
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Check if the error is due to a 401 Unauthorized response
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Assuming you have an endpoint to refresh the token
          const refreshToken = localStorage.getItem('refresh_token');
          const response = await axios.post('/api/token/refresh', {
            refresh_token: refreshToken,
          });

          // Save the new tokens in localStorage
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);

          // Update the header with the new token and retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Handle the failure of token refresh here (e.g., redirect to login)
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
