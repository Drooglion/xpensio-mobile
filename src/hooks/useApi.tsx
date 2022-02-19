import axios from 'axios';
import Config from 'react-native-config';

const baseURL = Config.API_URL;

const useApi = () => {
  console.log('hostname', baseURL);
  const api = axios.create({ baseURL });

  return { api };
};

export default useApi;
