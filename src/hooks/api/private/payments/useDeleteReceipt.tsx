import { useMutation, useQueryClient } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type ParamsType = {
  id: string;
  attachmentId: string;
};

const useDeleteReceipt = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const deleteReceipt = async ({ id, attachmentId }: ParamsType) => {
    try {
      const url = `payments/${id}/attachments/${attachmentId}`;
      const res = await api.delete(url);
      console.log('success delete receipt', { res });
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('deleteReceipt', deleteReceipt, {
    onSuccess: () => {
      console.log('Done deleting receipt');
      /* Refetch */
      queryClient.invalidateQueries('myPayments');
    },
  });
};

export default useDeleteReceipt;
