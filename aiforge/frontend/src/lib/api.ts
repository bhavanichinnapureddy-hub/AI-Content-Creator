import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// ─── API Client ───────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true, // Send cookies (refresh token in HttpOnly cookie)
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// ─── Token Management ─────────────────────────────────────────────────────────

// Access token stored in memory ONLY — not localStorage/sessionStorage
// This prevents XSS from stealing tokens
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

// ─── Request Interceptor ──────────────────────────────────────────────────────

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor (Token Refresh) ─────────────────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If 401 and not a retry, try to refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh' &&
      originalRequest.url !== '/auth/login'
    ) {
      if (isRefreshing) {
        // Queue requests while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post<{ accessToken: string }>('/auth/refresh');
        const newToken = response.data.accessToken;
        setAccessToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        setAccessToken(null);
        // Redirect to login on refresh failure
        window.location.href = '/login?session=expired';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// ─── API Error Extractor ──────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  fields?: Array<{ field: string; message: string }>;
  requestId?: string;
}

export function extractApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiError | undefined;
    return data?.error ?? error.message ?? 'An unexpected error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export function extractFieldErrors(
  error: unknown
): Record<string, string> | null {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiError | undefined;
    if (data?.fields) {
      return Object.fromEntries(
        data.fields.map(({ field, message }) => [field, message])
      );
    }
  }
  return null;
}
