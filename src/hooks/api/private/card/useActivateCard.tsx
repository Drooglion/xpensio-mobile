/* --- */

import { useMutation, useQueryClient } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

type Params = {
  cardId: string;
  code: string;
};

const useActivateCard = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const activateCard = async ({ cardId, code }: Params) => {
    try {
      const payload = { code };
      const res = await api.post(`cards/${cardId}/activate`, payload);
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.payload.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('getActivationCode', activateCard, {
    onSuccess: () => {
      queryClient.invalidateQueries('myCards');
    },
  });
};

export default useActivateCard;
