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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry hanya untuk error "sementara" yang sering muncul ketika server belum siap / transient.
 * Kita sengaja batasi agar tidak mengubah logika lain.
 */
function isTransientLoginError(error: any) {
  const msg = String(error?.message ?? '');
  return /Application failed to respond|Tidak dapat terhubung ke server|Network request failed|Failed to fetch|timeout/i.test(
    msg
  );
}

// Login function (DITAMBAH retry 1x)
export async function login(email: string, password: string): Promise<LoginResponse> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
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
    } catch (error: any) {
      // retry sekali saja kalau errornya transient
      if (attempt === 1 && isTransientLoginError(error)) {
        await sleep(1200);
        continue;
      }
      throw error;
    }
  }

  // Secara teori tidak akan sampai sini
  throw new Error('Login gagal.');
}

// Signup function (TIDAK DIUBAH)
export async function signup(name: string, email: string, password: string) {
  const data = await apiCall(API_CONFIG.ENDPOINTS.REGISTER, {
    method: 'POST',
    body: { name, email, password },
  });

  return data;
}

// Logout function
export async function logout() {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
}

// Get current user from storage
export async function getCurrentUser(): Promise<User | null> {
  const userJson = await AsyncStorage.getItem(USER_KEY);
  return userJson ? (JSON.parse(userJson) as User) : null;
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