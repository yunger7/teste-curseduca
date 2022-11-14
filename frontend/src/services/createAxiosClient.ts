import axios from 'axios';

const API_BASE_URL = import.meta.env['VITE_BASE_URL']
  ? `${import.meta.env['VITE_BASE_URL']}/api/v1`
  : 'http://localhost:8000/api/v1';
const REFRESH_TOKEN_URL = `${API_BASE_URL}/auth/refreshToken`;

// This function is a wrapper around Axios that will automatically send/refresh the access token between requests.
export const createAxiosClient = () => {
  let failedQueue: any[] = [];
  let isRefreshing = false;

  const processQueue = (error: any) => {
    failedQueue.forEach(promise => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve();
      }
    });

    failedQueue = [];
  };

  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    config => {
      if (config.authorization !== false) {
        const accessToken = localStorage.getItem('cosmos-access-token');

        if (accessToken) {
          if (config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          } else {
            config.headers = { Authorization: `Bearer ${accessToken}` };
          }
        }
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(undefined, error => {
    const originalRequest = error.config;

    // Workaround for axios header issue (v1.1.3)
    // More info: https://github.com/axios/axios/issues/5089
    originalRequest.headers = JSON.parse(
      JSON.stringify(originalRequest.headers || {})
    );

    const refreshToken = localStorage.getItem('cosmos-refresh-token');

    const handleError = (error: any) => {
      processQueue(error);

      localStorage.removeItem('cosmos-access-token');
      localStorage.removeItem('cosmos-refresh-token');
      localStorage.removeItem('cosmos-user-id');

      window.location.replace('/');

      return Promise.reject(error);
    };

    if (
      refreshToken &&
      error.response?.status === 401 &&
      error.response.data.message === 'TokenExpiredError' &&
      originalRequest?.url !== REFRESH_TOKEN_URL &&
      originalRequest?._retry !== true
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return client(originalRequest);
          })
          .catch(error => {
            return Promise.reject(error);
          });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      return client
        .post(REFRESH_TOKEN_URL, {
          refreshToken,
        })
        .then(res => {
          const tokens = {
            accessToken: res.data?.accessToken,
            refreshToken: res.data?.refreshToken,
          };

          localStorage.setItem('cosmos-access-token', tokens.accessToken);
          localStorage.setItem('cosmos-refresh-token', tokens.refreshToken);
          processQueue(null);

          return client(originalRequest);
        }, handleError)
        .finally(() => {
          isRefreshing = false;
        });
    }

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'TokenExpiredError'
    ) {
      return handleError(error);
    }

    return Promise.reject(error);
  });

  return client;
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    authorization?: boolean;
  }
}
