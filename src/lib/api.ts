import axios from 'axios';
import { Contact, ContactFormData } from '@/types/contact';

// Configure axios defaults
const API_BASE_URL = 'https://api.contactsphere.com'; // Replace with your actual API URL
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Auth API calls
export const authAPI = {
  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await axios.post('/api/users/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/api/users/login', credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axios.get('/api/users/current');
    return response.data;
  }
};

// Contacts API calls (all require authentication)
export const contactsAPI = {
  getContacts: async (): Promise<Contact[]> => {
    const response = await axios.get('/api/contacts');
    return response.data;
  },

  createContact: async (contactData: ContactFormData): Promise<Contact> => {
    const response = await axios.post('/api/contacts', contactData);
    return response.data;
  },

  getContact: async (id: string): Promise<Contact> => {
    const response = await axios.get(`/api/contacts/${id}`);
    return response.data;
  },

  updateContact: async (id: string, contactData: Partial<ContactFormData>): Promise<Contact> => {
    const response = await axios.put(`/api/contacts/${id}`, contactData);
    return response.data;
  },

  deleteContact: async (id: string): Promise<void> => {
    await axios.delete(`/api/contacts/${id}`);
  }
};

// Utility function to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Axios interceptors for handling auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('contactsphere_token');
      setAuthToken(null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default { authAPI, contactsAPI, setAuthToken };