// api.ts
import axios, { AxiosInstance } from 'axios';
import { useMsal } from '@azure/msal-react';
import { apiEndpoint } from './authConfig';

const instance: AxiosInstance = axios.create({
  baseURL: apiEndpoint, // Replace with your API endpoint
  timeout: 5000,
});

export const useAxiosWithAuth = () => {
  const { accounts, instance } = useMsal();

  // Add event callback to handle login success event
  instance.addEventCallback((response) => {
    if (response.eventType === 'loginSuccess') {
      const account = response.payload.account;
      const accessToken = response.payload.idTokenClaims?.accessToken;
      if (account && accessToken) {
        instance.setActiveAccount(account);
        instance.setAccessToken(accessToken);
      }
    }
  });

  // Add interceptor to include bearer token in request headers
  instance.interceptors.request.use((config) => {
    const activeAccount = accounts[0] || null;
    const accessToken = activeAccount?.idTokenClaims?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};

export default instance;
