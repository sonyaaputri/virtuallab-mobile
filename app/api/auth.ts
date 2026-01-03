// app/api/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, apiCall } from './config';

export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

const TOKEN_KEY = 'access_token';
const USER_KEY = 'currentUser';

// Login function
export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await apiCall(API_CONFIG.ENDPOINTS.LOGIN, {
    method: 'POST',
    body: { email, password },
  });

  if (!data?.access_token || !data?.user) {
    throw new Error('Format response login tidak sesuai (token/user tidak ada).');
  }

  await AsyncStorage.setItem(TOKEN_KEY, data.access_token);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data as LoginResponse;
}

// Signup function
export async function signup(name: string, email: string, password: string) {
  const data = await apiCall(API_CONFIG.ENDPOINTS.REGISTER, {
    method: 'POST',
    body: { name, email, password },
  });

  return data;
}

// Logout function
export async function logout() {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  if (token) {
    try {
      await apiCall(API_CONFIG.ENDPOINTS.LOGOUT, {
        method: 'POST',
        token,
      });
    } catch {
    }
  }

  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
}

export async function getCurrentUser(): Promise<User | null> {
  const userStr = await AsyncStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function getUserProfile(): Promise<User> {
  const token = await getToken();
  if (!token) throw new Error('Tidak ada token');
  const data = await apiCall(API_CONFIG.ENDPOINTS.PROFILE, { token });
  const user = data?.user ?? data;
  if (!user) throw new Error('Profile tidak ditemukan');
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  return user as User;
}