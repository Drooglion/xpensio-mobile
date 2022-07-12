import useApi from 'hooks/useApi';
import { useQuery } from 'react-query';
import UserMetrics from 'models/UserMetrics';

const useGetMyMetrics = () => {
  const { api } = useApi();

  const getMyMetrics = async () => {
    try {
      const response = await api.get('analytics/mine/metrics');
      const metrics = new UserMetrics(response.data.payload);
      return metrics;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useQuery('myMetrics', getMyMetrics);
};

export default useGetMyMetrics;
