import { useQuery } from 'react-query';
import useApi from 'hooks/useApi';
import Account from 'models/Account';

type Props = {
  onSuccess?: (account: Account) => void;
  onError?: () => void;
};

const useFetchAccount = ({ onSuccess, onError }: Partial<Props>) => {
  const { api } = useApi();

  const fetchAccount = async () => {
    try {
      const acctRes = await api.get('account/me/');
      const account = new Account(acctRes.data.payload);
      onSuccess && onSuccess(account);
      return account;
    } catch (err: any) {
      onError && onError();
      throw new Error(err);
    }
  };

  return useQuery('account', fetchAccount);
};

export default useFetchAccount;
