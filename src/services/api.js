import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

// API client with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Projects API
export const projectsAPI = {
  getAll: async (tech = null, status = null) => {
    const params = {};
    if (tech) params.tech = tech;
    if (status) params.status = status;
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },
  
  create: async (projectData) => {
    const response = await apiClient.post('/admin/projects', projectData);
    return response.data;
  },
  
  update: async (id, projectData) => {
    const response = await apiClient.put(`/admin/projects/${id}`, projectData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/projects/${id}`);
    return response.data;
  },
};

// Contact API
export const contactAPI = {
  submit: async (contactData) => {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  },
  
  getAll: async () => {
    const response = await apiClient.get('/admin/contacts');
    return response.data;
  },
  
  updateStatus: async (id, status) => {
    const response = await apiClient.put(`/admin/contacts/${id}`, { status });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/contacts/${id}`);
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  login: async (username, password) => {
    const response = await apiClient.post('/admin/login', { username, password });
    if (response.data.success && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUsername', response.data.username);
    }
    return response.data;
  },
  
  logout: async () => {
    try {
      await apiClient.post('/admin/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUsername');
    }
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },
  
  getUsername: () => {
    return localStorage.getItem('adminUsername');
  },
};

export default apiClient;
