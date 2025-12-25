// Configuration untuk API Backend
import Constants from 'expo-constants';

const isLocal = false; // true saat development

export const API_CONFIG = {
  BASE_URL: 'https://virtuallab-production.up.railway.app',
  ENDPOINTS: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
};

// Helper function untuk get headers dengan token
export function getAuthHeaders(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// Helper function untuk API calls dengan error handling lengkap
export async function apiCall(endpoint: string, options: {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  token?: string;
} = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...getAuthHeaders(options.token),
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Request gagal');
    }

    return data;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.');
    }
    throw error;
  }
}