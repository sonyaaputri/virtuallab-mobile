// app/api/config.ts
export const API_CONFIG = {
  BASE_URL: 'https://virtuallab-production.up.railway.app',
  ENDPOINTS: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
};

export function getAuthHeaders(token?: string | null) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

type ApiCallOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  token?: string | null;
};

export async function apiCall(endpoint: string, options: ApiCallOptions = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...getAuthHeaders(options.token),
      ...(options.headers || {}),
    },
  };

  if (options.body !== undefined) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);

    // kadang backend balikin non-json saat error tertentu
    const text = await response.text();
    const data = text ? safeJsonParse(text) : null;

    if (!response.ok) {
      // web version kamu pakai data.detail untuk error :contentReference[oaicite:2]{index=2}
      const message =
        (data && (data.detail || data.message)) ||
        `Request gagal (HTTP ${response.status})`;
      throw new Error(message);
    }

    return data;
  } catch (error: any) {
    // error jaringan / CORS (di RN biasanya: TypeError: Network request failed)
    if (error?.name === 'TypeError') {
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi & BASE_URL.');
    }
    throw error;
  }
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}