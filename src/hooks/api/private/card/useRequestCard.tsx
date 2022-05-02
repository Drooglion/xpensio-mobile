import { useMutation, useQueryClient } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';
import { CardType } from 'types/Card';

export type Params = {
  cardType: CardType;
  pin: string;
};

const useRequestCard = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const requestCard = async (params: Params) => {
    try {
      const res = await api.post('cards/requests', params);
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.payload.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('requestCard', requestCard, {
    onSuccess: () => {
      queryClient.invalidateQueries('myCards');
    },
  });
};

export default useRequestCard;
