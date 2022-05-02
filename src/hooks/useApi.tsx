import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = Config.API_URL;

const useApi = () => {
  const api = axios.create({ baseURL });

  api.interceptors.request.use(
    async (config: any) => {
      const token = await AsyncStorage.getItem('AUTH_TOKEN');
      if (token) {
        config.headers.Authorization = 'Token ' + token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  return { api };
};

export default useApi;
