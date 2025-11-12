import axios from 'axios';
import { auth } from '@/firebase.config'; // Import your Firebase auth service

// 1. Define the base URL of your backend
const API_BASE_URL = 'http://localhost:5001/api';

// 2. Create the custom axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// 3. Set up the request interceptor (This is the magic!)
// This function will run before EVERY request is sent
apiClient.interceptors.request.use(
  async (config) => {
    // Get the current user from Firebase auth
    const user = auth.currentUser;

    if (user) {
      // Get the Firebase ID token
      const token = await user.getIdToken();
      
      // Set the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config; // Continue with the request
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default apiClient;