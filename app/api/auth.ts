import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, apiCall } from './config';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

// Login function
export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await apiCall(API_CONFIG.ENDPOINTS.LOGIN, {
    method: 'POST',
    body: { email, password },
  });

  // Simpan token dan user
  await AsyncStorage.setItem('access_token', data.access_token);
  await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));

  return data;
}

// Signup/Register function
export async function signup(name: string, email: string, password: string): Promise<any> {
  const data = await apiCall(API_CONFIG.ENDPOINTS.REGISTER, {
    method: 'POST',
    body: { name, email, password },
  });

  return data;
}

// Logout function
export async function logout(): Promise<void> {
  const token = await AsyncStorage.getItem('access_token');

  if (token) {
    try {
      await apiCall(API_CONFIG.ENDPOINTS.LOGOUT, {
        method: 'POST',
        token,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('currentUser');
}

// Check if user is logged in
export async function isLoggedIn(): Promise<boolean> {
  const token = await AsyncStorage.getItem('access_token');
  const user = await AsyncStorage.getItem('currentUser');
  return !!(token && user);
}

// Get user profile
export async function getUserProfile(): Promise<User> {
  const token = await AsyncStorage.getItem('access_token');

  if (!token) {
    throw new Error('Tidak ada token');
  }

  try {
    const data = await apiCall(API_CONFIG.ENDPOINTS.PROFILE, {
      token,
    });

    await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));

    return data.user;
  } catch (error) {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('currentUser');
    throw error;
  }
}

// Get current user from storage
export async function getCurrentUser(): Promise<User | null> {
  const userStr = await AsyncStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}