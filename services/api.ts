import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

let cookies = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['next-auth.token']}`
  }
});

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies();
      const { 'next-auth.refreshToken': refreshToken } = cookies;

      api.post('refresh', {
        refreshToken
      }).then(response => {
        const { token, refreshToken: newRefreshToken } = response.data;

        setCookie(undefined, 'next-auth.token', token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        });
  
        setCookie(undefined, 'next-auth.refreshToken', newRefreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        });

        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      });
    } else {

    }
  }
});