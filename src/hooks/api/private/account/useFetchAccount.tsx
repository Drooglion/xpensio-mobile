import { useCallback } from 'react';
import { useQuery } from 'react-query';
import useApi from 'hooks/useApi';
import Account from 'models/Account';
import { useResource } from 'contexts/resourceContext';

type Props = {
  onSuccess?: (account: Account) => void;
  onError?: () => void;
};

const useFetchAccount = ({ onSuccess, onError }: Partial<Props>) => {
  const { api } = useApi();
  const { dispatch } = useResource();

  const defaultOnSuccess = useCallback(
    (actAsAdmin: boolean) => {
      dispatch({
        type: 'SET_ACT_AS_ADMIN',
        actAsAdmin,
      });
    },
    [dispatch],
  );

  const fetchAccount = async () => {
    try {
      const acctRes = await api.get('account/me/');
      const account = new Account(acctRes.data.payload);
      onSuccess && onSuccess(account);
      defaultOnSuccess(account.getActAsAdmin());
      return account;
    } catch (err: any) {
      onError && onError();
      throw new Error(err);
    }
  };

  return useQuery('account', fetchAccount);
};

export default useFetchAccount;
