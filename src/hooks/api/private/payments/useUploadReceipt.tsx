import { useMutation, useQueryClient } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type ParamsType = {
  id: string;
  payload: Record<string, any>;
};

const useUploadReceipt = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const uploadReceipt = async ({ id, payload }: ParamsType) => {
    try {
      const url = `payments/${id}/attachments`;
      const res = await api.post(url, payload);
      console.log('success upload receipt', { res });
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('uploadReceipt', uploadReceipt, {
    onSuccess: () => {
      queryClient.invalidateQueries('myPayments');
    },
  });
};

export default useUploadReceipt;
