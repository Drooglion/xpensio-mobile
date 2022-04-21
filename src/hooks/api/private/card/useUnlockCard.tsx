import { useMutation, useQueryClient } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type Params = {
  id: string;
  payload: { pin: string };
};

const useUnlockCard = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const unlockCard = async ({ id, payload }: Params) => {
    try {
      const res = await api.put(`cards/${id}/unlock`, payload);
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.payload.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('unlockCard', unlockCard, {
    onSuccess: () => {
      queryClient.invalidateQueries('myCards');
    },
  });
};

export default useUnlockCard;
