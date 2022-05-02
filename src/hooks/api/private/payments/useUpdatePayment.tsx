import { useMutation, useQueryClient } from 'react-query';

import Payment from 'models/Payment';
import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type ParamsType = {
  id: string;
  payload: Record<string, string | number>;
};

const useUpdatePayment = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const updatePayment = async ({ id, payload }: ParamsType) => {
    try {
      const res = await api.put(`payments/${id}`, payload);
      const payment = new Payment(res.data.payload);
      return payment;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('updatePayment', updatePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('myPayments');
    },
  });
};

export default useUpdatePayment;
