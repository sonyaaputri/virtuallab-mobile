// app/api/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, apiCall } from './config';

export interface User {
  id?: string;     // backend kamu mungkin pakai id / userId (biar fleksibel)
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

  // web kamu expect: data.access_token & data.user :contentReference[oaicite:6]{index=6}
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

  // web kamu setelah signup cuma alert sukses dan balik ke login :contentReference[oaicite:7]{index=7}
  return data;
}

// Logout function
export async function logout() {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  // web kamu coba hit endpoint logout kalau ada token :contentReference[oaicite:8]{index=8}
  if (token) {
    try {
      await apiCall(API_CONFIG.ENDPOINTS.LOGOUT, {
        method: 'POST',
        token,
      });
    } catch {
      // ignore error logout server-side (biar UX tetap jalan)
    }
  }

  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
}

// Get current user from storage
export async function getCurrentUser(): Promise<User | null> {
  const userStr = await AsyncStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

// Optional: kalau kamu butuh cek profile (web kamu punya /auth/profile) :contentReference[oaicite:9]{index=9}
export async function getUserProfile(): Promise<User> {
  const token = await getToken();
  if (!token) throw new Error('Tidak ada token');

  const data = await apiCall(API_CONFIG.ENDPOINTS.PROFILE, { token });

  // web kamu menyimpan data.user :contentReference[oaicite:10]{index=10}
  const user = data?.user ?? data;
  if (!user) throw new Error('Profile tidak ditemukan');

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  return user as User;
}