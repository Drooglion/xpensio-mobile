import { useState, useEffect } from 'react';

import { UserWalletBalance } from 'models/Wallet';
import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import { IWalletBalance } from 'types/Wallet';

/*
 * Get Wallet Balance
 *
 * Returns
 * {balance, currency}: object containing the values
 * refresh: function retrieve user's wallet balance
 * loading: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  userId: string;
};

const useGetWalletBalance = () => {
  const [params, setParams] = useState<ParamsType>();
  const [balance, setBalance] = useState<IWalletBalance>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const getBalance = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.get(
            `users/${params.userId}/wallet_balance`,
          );
          const wallet = new UserWalletBalance(response.data.payload);
          dispatch({ type: 'SET_USER_BALANCE', wallet });
          setBalance(wallet);
          setLoading(false);
        } catch (err: any) {
          console.log('balance', { err });
          /* Because api returns a firebase related error message, set a friendly message instead. */
          setError(err!.response.data.payload.messages[0] as string);
          setBalance(undefined);
          setLoading(false);
        }
      }
    };

    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    balance,
    getBalance: setParams,
    loading,
    error,
  };
};

export default useGetWalletBalance;
