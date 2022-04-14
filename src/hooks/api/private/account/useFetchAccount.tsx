import { useQuery } from 'react-query';
import useApi from 'hooks/useApi';
import Account from 'models/Account';

const useFetchAccount = () => {
  const { api } = useApi();

  const fetchAccount = async () => {
    try {
      const acctRes = await api.get('account/me/');
      const account = new Account(acctRes.data.payload);
      return account;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useQuery('account', fetchAccount);
};

export default useFetchAccount;
