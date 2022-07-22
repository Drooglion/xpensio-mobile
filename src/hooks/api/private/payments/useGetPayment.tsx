import { useMutation, useQueryClient } from 'react-query';

import Payment from 'models/Payment';
import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type ParamsType = {
  id: string;
};

const useGetPayment = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const getPayment = async ({ id }: ParamsType) => {
    try {
      const res = await api.get(`payments/${id}`);
      const payment = new Payment(res.data.payload);
      return payment;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('getPayment', getPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('myPayments');
    },
  });
};

export default useGetPayment;
