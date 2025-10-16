import axios, { type AxiosError, type AxiosInstance } from "axios";
import { store } from "@/store/store.ts";
import { logout } from "@/store/authSlice";
import { removeJWTLocalStorage } from "@/services/users";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/authentication";
import { storage } from "@/utils/storage";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.access || storage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // If refresh token request itself failed -> logout immediately
    if (originalRequest?.url?.includes("api/token/refresh/")) {
      console.warn("Refresh token expired or invalid. Logging out.");
      store.dispatch(logout(null));
      removeJWTLocalStorage();
      if (typeof window !== 'undefined') {
        window.location.href = "/";
      }
      return Promise.reject(error);
    }

    // Exclude the next routes from interceptor
    const isAuthRoute =
      originalRequest?.url?.includes("api/auth/") ||
      originalRequest?.url?.includes("api/token/") ||
      originalRequest?.url?.includes("login")

    // Handle normal 401s with refresh logic
    if (error.response?.status === 401 && !isAuthRoute) {
      const refresh = storage.getItem(REFRESH_TOKEN);
      if (refresh) {
        try {
          const res = await api.post<{ access: string }>("api/token/refresh/", { refresh });

          storage.setItem(ACCESS_TOKEN, res.data.access);
          if (originalRequest?.headers) {
            return api.request({
              ...originalRequest,
              headers: {
                ...originalRequest?.headers,
                Authorization: `Bearer ${res.data.access}`,
              },
            });
          }
        } catch (refreshError) {
          console.error("Refresh failed, logging out:", refreshError);
          store.dispatch(logout(null));
          removeJWTLocalStorage();
          if (typeof window !== 'undefined') {
            window.location.href = "/";
          }
        }
      } else {
        store.dispatch(logout(null));
        if (typeof window !== 'undefined') {
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
