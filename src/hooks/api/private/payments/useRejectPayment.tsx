import { useMutation, useQueryClient } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type ParamsType = {
  id: string;
  payload: {
    reason: string;
  };
};

const useRejectPayment = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const rejectPayment = async ({ id, payload }: ParamsType) => {
    try {
      const res = await api.put(`payments/${id}/disapprove`, payload);
      const message = res.data.payload.messages[0] as string;
      /* payload: { messages: ['Successfully disapproved payment'] } */
      return message;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('useRejectPayment', rejectPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('myPayments');
    },
  });
};

export default useRejectPayment;
