import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, AUTH_TOKEN_KEY } from '@env';
import Toast from 'react-native-toast-message';

console.log('api url is here ----->' , API_URL , AUTH_TOKEN_KEY)

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});


// Add token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('token is here ---->' , token)
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Network error
    if (!error.response) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
      return Promise.reject(error);
    }

    // Handle 401 errors (unauthorized)
    if (error.response.status === 401) {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      Toast.show({
        type: 'error',
        text1: 'Session Expired',
        text2: 'Please login again',
      });
    }

    // Handle 500 errors (server error)
    if (error.response.status >= 500) {
      Toast.show({
        type: 'error',
        text1: 'Server Error',
        text2: 'Something went wrong. Please try again later',
      });
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

// Tiles API
export const tilesAPI = {
  getTiles: () => api.get('/tiles'),
  getTileById: (id) => api.get(`/tiles/${id}`),
  updateTilePosition: (id, position) => api.put(`/tiles/${id}/position`, { position }),
};

// Posts API
export const postsAPI = {
  createPost: (postData) => {
    const formData = new FormData();
    formData.append('category', postData.category);
    formData.append('text', postData.text);
    if (postData.file) {
      formData.append('file', postData.file.uri);
    }
    console.log('form data is here--->' , formData)
    return api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getPosts: (page = 1, limit = 10) => api.get(`/posts?page=${page}&limit=${limit}`),
  getPostById: (id) => api.get(`/posts/${id}`),
  likePost: (id) => api.post(`/posts/${id}/like`),
  unlikePost: (id) => api.delete(`/posts/${id}/like`),
  addComment: (id, text) => api.post(`/posts/${id}/comments`, { text }),
  removeComment: (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`),
};

// Chat API
export const chatAPI = {
  sendMessage: (message) => api.post('/chat/message', { message }),
  getChatHistory: (page = 1, limit = 20) => api.get(`/chat/history?page=${page}&limit=${limit}`),
};

// Auth helpers
export const setAuthToken = async (token) => {
  if (token) {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
};

// Asset APIs
export const assetAPI = {
  getAllAssets: () => api.get('/assets'),
  getAssetById: (id) => api.get(`/assets/${id}`),
  deleteAsset: (id) => api.delete(`/assets/${id}`),
};

// Crypto APIs
export const cryptoAPI = {
  getAllCryptos: () => api.get('/crypto'),
  addCrypto: (cryptoData) => api.post('/crypto', cryptoData),
  updateCrypto: (id, cryptoData) => api.put(`/crypto/${id}`, cryptoData),
};

// Real Estate APIs
export const realEstateAPI = {
  getAllProperties: () => api.get('/real-estate'),
  addProperty: (propertyData) => api.post('/real-estate', propertyData),
  updateProperty: (id, propertyData) => api.put(`/real-estate/${id}`, propertyData),
};

// Cash APIs
export const cashAPI = {
  getAllCashEntries: () => api.get('/cash'),
  addCashEntry: (cashData) => api.post('/cash', cashData),
  updateCashEntry: (id, cashData) => api.put(`/cash/${id}`, cashData),
};

// Stock APIs
export const stockAPI = {
  getAllStocks: () => api.get('/stocks'),
  addStock: (stockData) => api.post('/stocks', stockData),
  updateStock: (id, stockData) => api.put(`/stocks/${id}`, stockData),
};

// Topic APIs
export const topicAPI = {
  getAllTopics: () => api.get('/topics'),
  addTopic: (topicData) => api.post('/topics', topicData),
  updateTopic: (id, topicData) => api.put(`/topics/${id}`, topicData),
  deleteTopic: (id) => api.delete(`/topics/${id}`),
};

export default api; 





