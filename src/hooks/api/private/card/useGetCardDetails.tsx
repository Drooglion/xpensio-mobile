import { useMutation, useQueryClient } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type Params = {
  id: string;
  payload: { pin: string };
};

const useGetCardDetails = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const getCardDetails = async ({ id, payload }: Params) => {
    try {
      const res = await api.post(`cards/${id}`, payload);
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.payload.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('getCardDetails', getCardDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries('myCards');
    },
  });
};

export default useGetCardDetails;
