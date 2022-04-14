import { useQuery } from 'react-query';
import useApi from 'hooks/useApi';
import Notification from 'models/Notification';

const useFetchNotifications = () => {
  const { api } = useApi();

  const fetch = async () => {
    try {
      const acctRes = await api.get('account/notifications');
      const account = acctRes.data.payload as Notification[];
      return account;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useQuery('account', fetch);
};

export default useFetchNotifications;
