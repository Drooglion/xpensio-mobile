import { useMutation } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

type Params = {
  cardId: string;
};

const useGetActivationCode = () => {
  const { api } = useApi();

  const getActivationCode = async ({ cardId }: Params) => {
    try {
      const res = await api.post(`cards/${cardId}/get_activation_code`);
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.payload.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('getActivationCode', getActivationCode);
};

export default useGetActivationCode;
