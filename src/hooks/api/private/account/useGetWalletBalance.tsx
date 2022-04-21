import { useQuery } from 'react-query';

import { UserWalletBalance } from 'models/Wallet';
import useApi from 'hooks/useApi';

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

const useGetWalletBalance = (id: string | undefined) => {
  const { api } = useApi();

  const getBalance = async () => {
    try {
      const response = await api.get(`users/${id}/wallet_balance`);
      const wallet = new UserWalletBalance(response.data.payload);
      return wallet;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const config = { retry: 5 };

  return useQuery(['walletBalance', id], getBalance, config);
};

export default useGetWalletBalance;
